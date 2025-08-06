// import axios from 'axios'
// import {
//     OPENAI_ENDPOINT,
//     OPENAI_MODEL,
//     OPENAI_API_VERSION,
//     OPENAI_API_KEY,
//     OPENAI_ANALYZE_PROMPT_MAX_TOKENS,
//     OPENAI_ANALYZE_PROMPT_TEMPERATURE,
//     OPENAI_ANALYZE_PROMPT_TOP_P,
//     OPENAI_ANALYZE_PROMPT_FREQUENCY_PENALTY,
//     OPENAI_ANALYZE_PROMPT_PRESENCE_PENALTY,
//     OPENAI_ANALYZE_PROMPT_STOP,
// } from './constants'
// import tiktoken from './tiktoken'
// import delay from '@/utils/classes/delay'

// const openAI = async (prompt) => {
//     console.log('Token by prompt: ', tiktoken(prompt))

//     try {
//         // Gửi prompt đến OpenAI API
//         const response = await axios.post(
//             `${OPENAI_ENDPOINT}${OPENAI_MODEL}?api-version=${OPENAI_API_VERSION}`,
//             {
//                 messages: prompt,
//                 max_tokens: OPENAI_ANALYZE_PROMPT_MAX_TOKENS,
//                 temperature: OPENAI_ANALYZE_PROMPT_TEMPERATURE, //Quyết định mức độ sáng tạo
//                 top_p: OPENAI_ANALYZE_PROMPT_TOP_P, // Quy định rằng chỉ một nhóm token có tổng xác suất cao nhất được cân nhắc trong mỗi bước.
//                 frequency_penalty: OPENAI_ANALYZE_PROMPT_FREQUENCY_PENALTY, // Quy định mức độ mà mô hình sẽ tránh lặp lại các token
//                 presence_penalty: OPENAI_ANALYZE_PROMPT_PRESENCE_PENALTY, // Quy định mức độ mà mô hình sẽ tránh sử dụng các token đã xuất hiện trong prompt
//                 stop: OPENAI_ANALYZE_PROMPT_STOP, // Dừng khi gặp chuỗi '###'
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'api-key': OPENAI_API_KEY,
//                 },
//             }
//         )
//         // Kiểm tra phản hồi từ API
//         if (response.data.error) {
//             throw new Error(`OpenAI API Error: ${response.data.error.message}`)
//         }
//         await delay(5000)
//         return response.data.choices[0].message.content
//     } catch (error) {
//         console.error('Error calling OpenAI API:', error.response ? error.response.data : error.message)
//         return error
//     }
// }

// export default openAI
