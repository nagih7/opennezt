import { GOOGLE_CLOUD_CREDENTIALS, PUBLIC_DIR } from '@/configs'
import fs from 'fs'

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
            sampleRateHertz: 44100,
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

            return {
                success: true,
                transcription: transcription,
            }
        } else {
            return {
                success: true,
                transcription: '',
                debug: { hasResults: false },
            }
        }
    } catch (error) {
        console.error('Error in speech to text conversion:', error)
        return {
            success: false,
            error: error.message,
        }
    }
}
