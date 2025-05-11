import {
    AI_API_TOKEN,
    AI_API_URL,
    AI_INTERVIEW_API_URL,
    AI_INTERVIEW_TOKEN,
    AI_TEXT_TO_SPEECH_TOKEN,
    GOOGLE_CLOUD_CREDENTIALS,
    OPENAI_API_KEY,
    OPENAI_API_SPEECH_URL,
} from '@/configs'

import fs from 'fs'
import { FileUpload } from '@/utils/classes'
import axios from 'axios'
import formatContentForSpeech from '@/utils/classes/format-content'

// Call API BOT phỏng vấn
export async function callAPIInterview(user, content, conversationId) {
    const requestData = {
        inputs: {},
        query: JSON.stringify(content),
        response_mode: 'blocking',
        conversation_id: conversationId ? conversationId : '',
        user: user._id.toString(),
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
        return
    }
}

// Call API TEXT TO SPEECH để chuyển đổi văn bản thành giọng nói
export async function convertTextToSpeech(content) {
    // Format the content before sending to text-to-speech service
    const formattedContent = formatContentForSpeech(content)
    const audioUrl = await textToSpeechGoogleCloud(formattedContent)
    return audioUrl
}

export async function convertSpeechToText(audioPath) {
    // const transcription = await speechToTextGoogleCloud(audioPath)
    const transcription = await speechToTextOpenAI(audioPath)
    return transcription
}

export async function textToSpeechGoogleCloud(content) {
    try {
        const textToSpeech = require('@google-cloud/text-to-speech')
        const client = new textToSpeech.TextToSpeechClient({
            keyFilename: GOOGLE_CLOUD_CREDENTIALS,
        })

        const request = {
            input: { text: content },
            voice: {
                languageCode: 'vi-VN',
                name: 'vi-VN-Wavenet-A',
                voiceClone: {},
            },
            audioConfig: {
                audioEncoding: 'LINEAR16',
            },
        }

        const [response] = await client.synthesizeSpeech(request)

        const audioPath = new FileUpload({
            originalname: `audio_${Date.now()}.wav`,
            mimetype: 'audio/wav',
            buffer: response.audioContent,
            expiryTime: 60 * 1000 * 3, // Set to auto-delete after 3 minutes
        })

        // Save the file to the uploads/audio directory
        const audioUrl = audioPath.save('audio_interview')
        return audioUrl
    } catch (error) {
        console.error('Error calling Text-to-Speech API:', error)
        return
    }
}

export async function textToSpeechViettelAI(content) {
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
        const audioPath = new FileUpload({
            originalname: `audio_${Date.now()}.mp3`,
            mimetype: 'audio/mpeg',
            buffer: response.data, // Use the binary data directly
            expiryTime: 60 * 1000 * 3, // Set to auto-delete after 3 minutes
        })

        // Save the file to the uploads/audio directory
        const audioUrl = audioPath.save('audio_interview')

        // Return the URL to access the audio file
        // const audioUrl = `${LINK_STATIC_URL}${filePath}`
        return audioUrl
    } catch (error) {
        console.error('Error calling Text-to-Speech API:', error)
        return
    }
}

export async function speechToTextGoogleCloud(audioPath) {
    try {
        const speech = require('@google-cloud/speech')
        const client = new speech.SpeechClient({
            keyFilename: GOOGLE_CLOUD_CREDENTIALS,
        })

        const file = fs.readFileSync(audioPath)

        // Cấu hình và gửi yêu cầu như code gốc
        const config = {
            encoding: 'LINEAR16',
            // sampleRateHertz: 44100, // Using 44100 Hz as specified
            languageCode: 'vi-VN',
            enableAutomaticPunctuation: true,
        }

        const request = {
            audio: {
                content: file.toString('base64'),
            },
            config: config,
        }

        // Gửi yêu cầu và nhận kết quả
        const [response] = await client.recognize(request)

        // Xử lý kết quả
        if (response.results && response.results.length > 0) {
            const transcription = response.results.map((result) => result.alternatives[0].transcript).join('\n')
            return transcription
        } else {
            return
        }
    } catch (error) {
        console.error('Error in speech to text conversion:', error.message)
        return
    }
}

export async function speechToTextOpenAI(audioPath) {
    try {
        // Create a proper FormData object
        const FormData = require('form-data')
        const formData = new FormData()

        // Read the file as a Buffer and append to FormData with the correct filename
        const fileBuffer = fs.readFileSync(audioPath)
        const fileName = audioPath.split('/').pop()

        // Append the file buffer with filename and content type
        formData.append('file', fileBuffer, {
            filename: fileName,
            contentType: 'audio/wav',
        })

        formData.append('model', 'whisper-1')
        formData.append('language', 'vi')

        const response = await axios.post(OPENAI_API_SPEECH_URL, formData, {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
        })

        const transcription = response.data.text
        return transcription
    } catch (error) {
        console.error('Error in speech to text conversion:', error.response?.data?.error?.message || error.message)
        return
    }
}

export async function getProjectMatchingInterview(userId, profile) {
    try {
        const requestData = {
            inputs: profile,
            query: JSON.stringify(profile),
            response_mode: 'blocking',
            user: userId.toString(),
        }

        const response = await axios.post(`${AI_API_URL}chat-messages`, requestData, {
            headers: {
                Authorization: `Bearer ${AI_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
        })

        const matches = JSON.parse(response.data?.answer)?.matches

        return matches
    } catch (error) {
        console.error('Error calling Dify API:', error.response?.data || error.message)
        throw error
    }
}
