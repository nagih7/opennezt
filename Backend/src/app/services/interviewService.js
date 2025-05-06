import { Project, ObjectId, Interview } from '@/models'
import { AI_API_TOKEN, AI_API_URL, LINK_STATIC_URL, PUBLIC_DIR } from '@/configs/constants'
import axios from 'axios'
import path from 'path'
import { getProjectDetailsToMatching } from './projectService'
import { getTypeOfBotMessage, getTypeOfUserMessage } from './typeService'
import { FileUpload } from '@/utils/classes'
import { callAPIInterview, convertSpeechToText, convertTextToSpeech } from './apiService'

export const createNewInterviewNotSave = (payload) => {
    const { project_id, user_id, conversation_id, ...data } = payload
    const interview = new Interview({
        project_id: new ObjectId(project_id),
        user_id: new ObjectId(user_id),
        conversation_id,
        ...data,
    })
    return interview
}

export const createNewInterview = async (payload) => {
    const { project_id, user_id, conversation_id, ...data } = payload
    const interview = new Interview({
        project_id: new ObjectId(project_id),
        user_id: new ObjectId(user_id),
        conversation_id,
        ...data,
    })
    // Lưu cuộc phỏng vấn vào cơ sở dữ liệu
    await interview.save()
    return interview
}

export const addInterviewMessage = (payload) => {
    const { content, type_id, attachments } = payload
    // Thêm tin nhắn vào cuộc phỏng vấn
    // const interview = await Interview.findById(interview_id).lean()
    // if (!interview) return
    const message = { content, type_id, attachments }
    // interview.messages.push(message)
    // await Interview.updateOne({ _id: interview_id }, { $set: { messages: interview.messages } })
    return {
        ...message,
        attachments: attachments ? `${LINK_STATIC_URL}${attachments}` : null,
    }
}

// Bắt đầu cuộc phỏng vấn
export async function startInterview(currentUser, projectId) {
    // Lấy chi tiết thông tin dự án
    const project = await getProjectDetailsToMatching(projectId)
    // Call API tới AI interview bắt đầu cuộc phỏng vấn
    const interviewAI = await callAPIInterview(currentUser._id, project)
    if (!interviewAI) {
        return { error: 'Error getting response from AI start interview' }
    }
    // Tạo cuộc phỏng vấn
    const interview = createNewInterviewNotSave({
        project_id: project._id,
        user_id: currentUser._id,
        conversation_id: interviewAI.conversation_id,
    })
    // Call API TEXT TO SPEECH để chuyển đổi văn bản thành giọng nói
    const audioUrl = await convertTextToSpeech(interviewAI.answer)
    if (!audioUrl) {
        return { error: 'Error converting text to speech' }
    }

    // Lấy BOT message type
    const botMessageType = await getTypeOfBotMessage()
    const botMessage = addInterviewMessage({
        interview_id: interview._id,
        content: interviewAI.answer,
        type_id: botMessageType._id,
        attachments: audioUrl,
    })

    return {
        result: {
            interview: interview,
            message: botMessage,
        },
    }
}

export async function replyInterview(currentUser, requestBody) {
    const { audio, interview } = requestBody
    if (audio instanceof FileUpload) {
        // lưu file tạm thời
        const tempWavFile = audio.save('audio_interview')
        // Sử dụng thư viện path để lấy đường dẫn tuyệt đối của file tạm thời
        const audioFile = path.join(PUBLIC_DIR, tempWavFile)
        // Call API GOOGLE CLOUD để chuyển đổi giọng nói thành văn bản
        const content = await convertSpeechToText(audioFile)
        // Xóa file tạm thời
        FileUpload.remove(tempWavFile)
        if (!content) {
            return { error: 'Error converting speech to text' }
        }
        // Lấy phản hồi từ AI
        const botResponse = await callAPIInterview(currentUser._id, content, interview.conversation_id)
        if (!botResponse || !botResponse.answer) {
            return { error: 'Error getting response from AI' }
        }
        // Call API TEXT TO SPEECH để chuyển đổi văn bản thành giọng nói của AI
        const audioUrl = await convertTextToSpeech(botResponse.answer)
        if (!audioUrl) {
            return { error: 'Error converting text to speech' }
        }
        // Lấy user message type
        const userMessageType = await getTypeOfUserMessage()
        const userMessage = addInterviewMessage({
            interview_id: interview._id,
            content: content,
            type_id: userMessageType._id,
            attachments: null,
        })

        // Lấy BOT message type
        const botMessageType = await getTypeOfBotMessage()
        const botMessage = addInterviewMessage({
            interview_id: interview._id,
            content: botResponse.answer,
            type_id: botMessageType._id,
            attachments: audioUrl,
        })

        return {
            result: {
                messages: [userMessage, botMessage],
                interview_id: interview._id,
            },
        }
    }
}

// Kết thúc cuộc phỏng vấn
export async function closeInterview(requestBody) {
    const { interview, storage, messages } = requestBody
    if (!storage) return
    else {
        // Xoá các audio trong Message của BOT trong cuộc hội thoại
        const newMessages = messages.map((message) => {
            if (message.attachments) {
                const path = message.attachments.replace(LINK_STATIC_URL, '')
                FileUpload.remove(path)
                message.attachments = null
            }
            return message
        })
        await createNewInterview({
            project_id: interview.project_id,
            user_id: interview.user_id,
            conversation_id: interview.conversation_id,
            messages: newMessages,
        })
    }
}

export function clearAIAudio(requestBody) {
    const path = requestBody.attachments.replace(LINK_STATIC_URL, '')
    FileUpload.remove(path)
}

// Call API tới AI interview để lấy danh sách projects
export async function getProjectMatching(userId, profile) {
    // API request data
    const requestData = {
        inputs: profile,
        query: JSON.stringify(profile),
        response_mode: 'blocking',
        user: userId.toString(),
    }

    // API call function
    try {
        const response = await axios.post(`${AI_API_URL}chat-messages`, requestData, {
            headers: {
                Authorization: `Bearer ${AI_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
        })

        const matches = JSON.parse(response.data?.answer)?.matches

        for (const match of matches) {
            const project = await Project.aggregate([
                {
                    $match: {
                        _id: new ObjectId(match.id),
                    },
                },
                {
                    $lookup: {
                        from: 'industries',
                        localField: 'industry_ids',
                        foreignField: '_id',
                        as: 'industries',
                        pipeline: [
                            {
                                $project: {
                                    _id: 0,
                                    name: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'stages',
                        localField: 'stage_id',
                        foreignField: '_id',
                        as: 'stage',
                        pipeline: [
                            {
                                $project: {
                                    _id: 0,
                                    name: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $unwind: '$stage',
                },

                {
                    $addFields: {
                        industries: {
                            $map: {
                                input: '$industries',
                                as: 'industry',
                                in: '$$industry.name',
                            },
                        },
                        stage: '$stage.name',
                    },
                },
                {
                    $lookup: {
                        from: 'project_additional_infos',
                        localField: '_id',
                        foreignField: 'project_id',
                        as: 'additional_infos',
                        pipeline: [
                            {
                                $project: {
                                    _id: 0,
                                    name: 1,
                                    content: 1,
                                    description: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'project_requirements',
                        localField: '_id',
                        foreignField: 'project_id',
                        as: 'requirement',
                        pipeline: [
                            {
                                $lookup: {
                                    from: 'roles',
                                    localField: 'team_role_ids',
                                    foreignField: '_id',
                                    as: 'team_roles',
                                    pipeline: [
                                        {
                                            $project: {
                                                _id: 0,
                                                name: 1,
                                            },
                                        },
                                    ],
                                },
                            },
                            {
                                $lookup: {
                                    from: 'roles',
                                    localField: 'role_ids',
                                    foreignField: '_id',
                                    as: 'roles',
                                    pipeline: [
                                        {
                                            $project: {
                                                _id: 0,
                                                name: 1,
                                            },
                                        },
                                    ],
                                },
                            },
                            {
                                $lookup: {
                                    from: 'industries',
                                    localField: 'industry_ids',
                                    foreignField: '_id',
                                    as: 'industries',
                                    pipeline: [
                                        {
                                            $project: {
                                                _id: 0,
                                                name: 1,
                                            },
                                        },
                                    ],
                                },
                            },
                            {
                                $lookup: {
                                    from: 'experience_levels',
                                    localField: 'experience_level_ids',
                                    foreignField: '_id',
                                    as: 'experience_levels',
                                    pipeline: [
                                        {
                                            $project: {
                                                _id: 0,
                                                name: 1,
                                            },
                                        },
                                    ],
                                },
                            },
                            {
                                $lookup: {
                                    from: 'skills',
                                    localField: 'skill_ids',
                                    foreignField: '_id',
                                    as: 'skills',
                                    pipeline: [
                                        {
                                            $project: {
                                                _id: 0,
                                                name: 1,
                                            },
                                        },
                                    ],
                                },
                            },
                            {
                                $addFields: {
                                    team_roles: {
                                        $map: {
                                            input: '$team_roles',
                                            as: 'team_role',
                                            in: '$$team_role.name',
                                        },
                                    },
                                    roles: {
                                        $map: {
                                            input: '$roles',
                                            as: 'role',
                                            in: '$$role.name',
                                        },
                                    },
                                    industries: {
                                        $map: {
                                            input: '$industries',
                                            as: 'industry',
                                            in: '$$industry.name',
                                        },
                                    },
                                    experience_levels: {
                                        $map: {
                                            input: '$experience_levels',
                                            as: 'experience_level',
                                            in: '$$experience_level.name',
                                        },
                                    },
                                    skills: {
                                        $map: {
                                            input: '$skills',
                                            as: 'skill',
                                            in: '$$skill.name',
                                        },
                                    },
                                },
                            },
                            {
                                $project: {
                                    _id: 0,
                                    project_id: 0,
                                    role_ids: 0,
                                    team_role_ids: 0,
                                    industry_ids: 0,
                                    experience_level_ids: 0,
                                    skill_ids: 0,
                                    created_at: 0,
                                    updated_at: 0,
                                },
                            },
                        ],
                    },
                },
                {
                    $unwind: {
                        path: '$requirement',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'project_members',
                        localField: '_id',
                        foreignField: 'project_id',
                        as: 'members',
                        pipeline: [
                            {
                                $lookup: {
                                    from: 'users',
                                    localField: 'user_id',
                                    foreignField: '_id',
                                    as: 'user',
                                    pipeline: [
                                        {
                                            $project: {
                                                _id: 0,
                                                name: 1,
                                                avatar: {
                                                    $cond: {
                                                        if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                                                        then: '$avatar',
                                                        else: { $concat: [LINK_STATIC_URL, '$avatar'] },
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                            {
                                $unwind: '$user',
                            },
                            {
                                $lookup: {
                                    from: 'roles',
                                    localField: 'team_role_id',
                                    foreignField: '_id',
                                    as: 'team_role',
                                    pipeline: [
                                        {
                                            $project: {
                                                _id: 0,
                                                name: 1,
                                            },
                                        },
                                    ],
                                },
                            },
                            {
                                $unwind: '$team_role',
                            },
                            {
                                $lookup: {
                                    from: 'roles',
                                    localField: 'role_id',
                                    foreignField: '_id',
                                    as: 'role',
                                    pipeline: [
                                        {
                                            $project: {
                                                _id: 0,
                                                name: 1,
                                            },
                                        },
                                    ],
                                },
                            },
                            {
                                $unwind: '$role',
                            },
                            {
                                $addFields: {
                                    name: '$user.name',
                                    avatar: '$user.avatar',
                                    team_role: '$team_role.name',
                                    role: '$role.name',
                                },
                            },
                            {
                                $project: {
                                    name: 1,
                                    avatar: 1,
                                    team_role: 1,
                                    role: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $project: {
                        name: 1,
                        description: 1,
                        industries: 1,
                        stage: 1,
                        experience_level: 1,
                        logo: {
                            $cond: {
                                if: { $eq: [{ $ifNull: ['$logo', ''] }, ''] },
                                then: '$logo',
                                else: { $concat: [LINK_STATIC_URL, '$logo'] },
                            },
                        },
                        background: {
                            $cond: {
                                if: { $eq: [{ $ifNull: ['$background', ''] }, ''] },
                                then: '$background',
                                else: { $concat: [LINK_STATIC_URL, '$background'] },
                            },
                        },
                        revenues: 1,
                        funding_sources: 1,
                        additional_infos: 1,
                        members: 1,
                        requirement: 1,
                        created_at: 1,
                    },
                },
            ])

            if (project && project.length > 0) {
                match.project = project[0]
            }
        }

        return matches
    } catch (error) {
        console.error('Error calling Dify API:', error.response?.data || error.message)
        throw error
    }
}
