import {
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
    // Format the content before sending to text-to-speech service
    const formattedContent = formatContentForSpeech(content)
    const audioUrl = await textToSpeechGoogleCloud(formattedContent)
    return audioUrl
}

export async function convertSpeechToText(audioFile) {
    // const transcription = await speechToTextGoogleCloud(audioFile)
    const transcription = await speechToTextOpenAI(audioFile)
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

        const audioFile = new FileUpload({
            originalname: `audio_${Date.now()}.wav`,
            mimetype: 'audio/wav',
            buffer: response.audioContent,
            expiryTime: 60 * 1000 * 5, // Set to auto-delete after 5 minutes
        })

        // Save the file to the uploads/audio directory
        const audioUrl = audioFile.save('audio_interview')
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
        const audioFile = new FileUpload({
            originalname: `audio_${Date.now()}.mp3`,
            mimetype: 'audio/mpeg',
            buffer: response.data, // Use the binary data directly
            expiryTime: 60 * 1000 * 5, // Set to auto-delete after 5 minutes
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

export async function speechToTextGoogleCloud(audioFile) {
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

export async function speechToTextOpenAI(audioFile) {
    try {
        const formData = new FormData()
        formData.append('file', fs.createReadStream(audioFile))
        formData.append('model', 'whisper-1')
        formData.append('language', 'vi')

        const response = await axios.post(OPENAI_API_SPEECH_URL, formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
        })
        console.log('Response from OpenAI:', response)
        const transcription = response.text
        return transcription
    } catch (error) {
        console.error('Error in speech to text conversion:', error.message)
        return
    }
}

/**
 * Formats text content to improve text-to-speech quality
 * @param {string} content - The text content to be formatted
 * @returns {string} - The formatted content ready for text-to-speech conversion
 */
export function formatContentForSpeech(content) {
    if (!content || typeof content !== 'string') {
        return ''
    }

    let formattedContent = content

    // Replace common abbreviations
    formattedContent = formattedContent.replace(/(\b)Dr\.(\s)/g, '$1Doctor$2')
    formattedContent = formattedContent.replace(/(\b)Mr\.(\s)/g, '$1Mister$2')
    formattedContent = formattedContent.replace(/(\b)Mrs\.(\s)/g, '$1Misses$2')
    formattedContent = formattedContent.replace(/(\b)Ms\.(\s)/g, '$1Miss$2')

    // Add pauses (using commas) around certain punctuation to improve pacing
    formattedContent = formattedContent.replace(/(\w)([.!?])(\s+\w)/g, '$1$2,$3')

    // Normalize spacing
    formattedContent = formattedContent.replace(/\s+/g, ' ').trim()

    // Convert numbers to words when appropriate (for Vietnamese, we might keep numbers as is)
    // For advanced number formatting specific to Vietnamese, additional logic would be needed

    // Handle special Vietnamese characters and diacritics properly
    // (Vietnamese-specific handling if needed)

    return formattedContent
}
