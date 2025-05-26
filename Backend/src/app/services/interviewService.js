import { ObjectId, Interview } from '@/models'
import { LINK_STATIC_URL, PUBLIC_DIR } from '@/configs/constants'
import path from 'path'
import { getInterviewPracticeProjects, getProjectByMatching, getProjectDetailsToMatching } from './projectService'
import { getTypeOfBotMessage, getTypeOfUserMessage } from './typeService'
import { FileUpload } from '@/utils/classes'
import { callAPIInterview, convertSpeechToText, convertTextToSpeech, getProjectMatchingInterview } from './apiService'
import verifyVoice from '@/utils/classes/verify-voice'

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
    const { content, type, attachments } = payload
    // Thêm tin nhắn vào cuộc phỏng vấn
    // const interview = await Interview.findById(interview_id).lean()
    // if (!interview) return
    const message = { content, type, attachments }
    // interview.messages.push(message)
    // await Interview.updateOne({ _id: interview_id }, { $set: { messages: interview.messages } })
    return {
        ...message,
        attachments: attachments ? `${LINK_STATIC_URL}${attachments}` : null,
    }
}

export async function startInterview(currentUser, projectId) {
    // Lấy chi tiết thông tin dự án
    const project = await getProjectDetailsToMatching(projectId)
    project.user_name = currentUser.name
    // Call API tới AI interview bắt đầu cuộc phỏng vấn
    const interviewAI = await callAPIInterview(currentUser, project)
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
        type: botMessageType,
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
        const audioPath = path.join(PUBLIC_DIR, tempWavFile)
        // Verify if the audio has voice content using manual verification
        const hasVoice = verifyVoice(audioPath)
        if (!hasVoice) {
            // Clean up the temp file
            FileUpload.remove(tempWavFile)
            return { error: 'No voice detected in the audio file' }
        }

        // Call API để chuyển đổi giọng nói thành văn bản
        const content = await convertSpeechToText(audioPath)
        // Xóa file tạm thời
        FileUpload.remove(tempWavFile)
        if (!content || content === '') {
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
            type: userMessageType,
            attachments: null,
        })

        // Lấy BOT message type
        const botMessageType = await getTypeOfBotMessage()
        const botMessage = addInterviewMessage({
            interview_id: interview._id,
            content: botResponse.answer,
            type: botMessageType,
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

// Call API tới AI interview để lấy danh sách projects
export async function getProjectMatching(userId, profile) {
    const matches = await getProjectMatchingInterview(userId, profile)

    for (const match of matches) {
        const project = await getProjectByMatching(match.id)
        match.project = project
    }

    return matches
}

export async function getPracticeProjects() {
    return await getInterviewPracticeProjects()
}
