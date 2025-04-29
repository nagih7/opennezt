import {
    AI_API_URL,
    AI_INTERVIEW_API_URL,
    AI_INTERVIEW_TOKEN,
    AI_TEXT_TO_SPEECH_TOKEN,
    GOOGLE_CLOUD_CREDENTIALS,
} from '@/configs'

import fs from 'fs'
import { FileUpload } from '@/utils/classes'
import axios from 'axios'

// Call API BOT phỏng vấn
export async function callAPIInterview(userId, content, conversationId) {
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
        return
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
        console.error('Error calling Text-to-Speech API:', error)
        return
    }
}

export async function convertSpeechToText(audioFile) {
    try {
        const speech = require('@google-cloud/speech')
        const client = new speech.SpeechClient({
            keyFilename: GOOGLE_CLOUD_CREDENTIALS,
        })

        const file = fs.readFileSync(audioFile)

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
            console.log('No transcription results found.')
            return
        }
    } catch (error) {
        console.error('Error in speech to text conversion:', error.message)
        return
    }
}
