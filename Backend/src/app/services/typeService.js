import { CONVERSATION_TYPE, INTERVIEW_CONVERSATION, INTERVIEW_MESSAGE_TYPE } from '@/configs'
import { Type } from '@/models'

// Lấy type cuộc hội thoại interview
export async function getTypeOfInterviewConversation() {
    const conversationType = await Type.findOne({
        class: CONVERSATION_TYPE,
        name: INTERVIEW_CONVERSATION,
    }).lean()
    return conversationType
}

// Lấy type message của BOT
export async function getTypeOfBotMessage() {
    const messageType = await Type.findOne({
        class: INTERVIEW_MESSAGE_TYPE.TYPE,
        name: INTERVIEW_MESSAGE_TYPE.BOT,
    }).lean()
    return messageType
}

// Lấy type message của USER
export async function getTypeOfUserMessage() {
    const messageType = await Type.findOne({
        class: INTERVIEW_MESSAGE_TYPE.TYPE,
        name: INTERVIEW_MESSAGE_TYPE.USER,
    }).lean()
    return messageType
}
