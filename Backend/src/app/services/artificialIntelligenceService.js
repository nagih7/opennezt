import { Project, ObjectId, Conversation, Message } from '@/models'
import {
    AI_API_TOKEN,
    AI_API_URL,
    AI_INTERVIEW_API_URL,
    AI_INTERVIEW_TOKEN,
    AI_TEXT_TO_SPEECH_TOKEN,
    LINK_STATIC_URL,
} from '@/configs/constants'
import axios from 'axios'
import getSkillsForProfile from '@/utils/classes/linkedin-crawl'
import { getProfileDetail } from './profileService'
import { getMatchingProjectDetails } from './projectService'
import { getTypeOfBotMessage, getTypeOfInterviewConversation, getTypeOfUserMessage } from './typeService'
import { FileUpload } from '@/utils/classes'
import { getMemberRoleOfDirectConversation } from './roleService'

// Tìm kiếm dự án phù hợp với người dùng
export async function matchingProjects(user, linkedInUsername) {
    // Lấy chi tiết thông tin cá nhân
    const profile = await getProfileDetail(user._id)
    if (linkedInUsername) {
        // Lấy thông tin người dùng từ LinkedIn
        const skills = await getSkillsForProfile(linkedInUsername)

        // Thêm kỹ năng vào thông tin cá nhân
        profile.skills ? profile.skills?.push(...skills) : (profile.skills = skills)
    }

    // Call API tới AI interview để lấy danh sách projects
    const projects = await getProjectMatching(user._id, profile)
    return projects || []
}

// Bắt đầu cuộc phỏng vấn
export async function startInterview(user, projectId) {
    // Lấy chi tiết thông tin dự án
    const project = await getMatchingProjectDetails(projectId)

    // Call API tới AI interview bắt đầu cuộc phỏng vấn
    const interviewData = await callBotInterview(user._id, project)

    // Lấy type cuộc hội thoại interview
    const conversationType = await getTypeOfInterviewConversation()
    // Lấy role member của cuộc hội thoại
    const memberRole = await getMemberRoleOfDirectConversation()

    // Tạo cuộc hội thoại
    const conversation = new Conversation({
        project_id: projectId,
        type_id: conversationType._id,
        members: [
            {
                user_id: user._id,
                role_id: memberRole._id,
            },
        ],
        data: { project_id: new ObjectId(projectId), interview_id: interviewData.conversation_id },
    })
    await conversation.save()

    // Call API TEXT TO SPEECH để chuyển đổi văn bản thành giọng nói
    const audioUrl = await convertTextToSpeech(interviewData.answer)

    // Lấy BOT message type
    const botMessageType = await getTypeOfBotMessage()

    // Lưu tin nhắn của AI
    const message = new Message({
        conversation_id: conversation._id,
        user_id: user._id,
        content: interviewData.answer,
        attachments: audioUrl,
        type_id: botMessageType._id,
    })
    await message.save()

    // Trả về kết quả
    return {
        event: interviewData.event,
        message: {
            _id: message._id,
            content: interviewData.answer,
            attachments: `${LINK_STATIC_URL}${message.attachments}`,
        },
        conversation_id: conversation._id,
    }
}

// Trả lời câu hỏi phỏng vấn
export async function replyInterview(user, requestBody) {
    const { conversation_id, content } = requestBody

    // Lấy thông tin cuộc hội thoại
    const conversation = await Conversation.findById(new ObjectId(conversation_id)).lean()

    // Gọi API tới AI interview
    const botResponse = await callBotInterview(user._id, content, conversation.data?.interview_id)

    // Call API TEXT TO SPEECH để chuyển đổi văn bản thành giọng nói
    const audioUrl = await convertTextToSpeech(botResponse.answer)

    // Lấy user message type
    const userMessageType = await getTypeOfUserMessage()

    // Lưu tin nhắn của người dùng
    const userMessage = new Message({
        conversation_id: conversation._id,
        user_id: user._id,
        content: content,
        type_id: userMessageType._id,
    })
    await userMessage.save()

    // Lấy BOT message type
    const botMessageType = await getTypeOfBotMessage()

    // Lưu tin nhắn của AI
    const botMessage = new Message({
        conversation_id: conversation._id,
        user_id: user._id,
        content: botResponse.answer,
        attachments: audioUrl,
        type_id: botMessageType._id,
    })
    await botMessage.save()

    return {
        event: botResponse.event,
        message: {
            _id: botMessage._id,
            content: botMessage.content,
            attachments: `${LINK_STATIC_URL}${botMessage.attachments}`,
        },
        conversation_id: conversation._id,
    }
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

// Call API BOT phỏng vấn
export async function callBotInterview(userId, content, conversationId) {
    const requestData = {
        inputs: {},
        query: JSON.stringify(content),
        response_mode: 'blocking',
        conversation_id: conversationId ? conversationId : '',
        user: userId.toString(),
    }

    try {
        const response = await axios.post(`${AI_API_URL}chat-messages`, requestData, {
            headers: {
                Authorization: `Bearer ${AI_INTERVIEW_TOKEN}`,
                'Content-Type': 'application/json',
            },
        })
        const result = typeof response.data === 'object' ? response.data : JSON.parse(response.data)
        return result
    } catch (error) {
        console.error('Error calling Dify API:', error.response?.data || error.message)
        throw error
    }
}

// Call API TEXT TO SPEECH để chuyển đổi văn bản thành giọng nói
export async function convertTextToSpeech(content) {
    const requestData = {
        text: content,
        voice: 'hn-quynhanh',
        speed: 1,
        tts_return_option: 3,
        token: AI_TEXT_TO_SPEECH_TOKEN,
        without_filter: false,
    }
    try {
        const response = await axios.post(AI_INTERVIEW_API_URL, requestData, {
            headers: {
                accept: '*/*',
                'Content-Type': 'application/json',
            },
            responseType: 'arraybuffer', // Important: Get binary data directly
        })

        // Create a FileUpload instance using the binary audio data directly
        const audioFile = new FileUpload({
            originalname: `audio_${Date.now()}.mp3`,
            mimetype: 'audio/mpeg',
            buffer: response.data, // Use the binary data directly
        })

        // Save the file to the uploads/audio directory
        const audioUrl = audioFile.save('audio_interview')

        // Return the URL to access the audio file
        // const audioUrl = `${LINK_STATIC_URL}${filePath}`
        return audioUrl
    } catch (error) {
        console.error('Error calling Text-to-Speech API:', error.response?.data || error.message)
        throw error
    }
}

// Kết thúc cuộc phỏng vấn
export async function closeInterview(userId, conversationId) {
    // Lấy thông tin cuộc hội thoại
    const conversation = await Conversation.findOne({
        _id: new ObjectId(conversationId),
        members: {
            $elemMatch: {
                user_id: userId,
            },
        },
    }).lean()
    if (!conversation) {
        throw new Error('Conversation not found')
    }

    // Xoá các audio trong Message của BOT trong cuộc hội thoại
    const botMessageType = await getTypeOfBotMessage()
    const messages = await Message.find({
        conversation_id: conversationId,
        user_id: userId,
        type_id: botMessageType._id,
    }).lean()

    if (messages && messages.length > 0) {
        for (const message of messages) {
            if (message.attachments) {
                FileUpload.remove(message.attachments)
                await Message.updateOne(
                    { _id: message._id },
                    {
                        $set: {
                            attachments: null,
                        },
                    }
                )
            }
        }
    }
}
