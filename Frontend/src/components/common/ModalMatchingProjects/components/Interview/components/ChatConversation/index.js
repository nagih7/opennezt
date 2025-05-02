// import React, { useState, useRef, useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { replyInterview, replyInterviewByMessage } from 'api/interview'
// import formatMessage from 'utils/formatMessage'
// import { Spinner } from '@chakra-ui/react'
// import { FaMicrophone, FaMicrophoneSlash, FaPaperPlane, FaTrash, FaEdit } from 'react-icons/fa'
// import { BiPause, BiPlay } from 'react-icons/bi'

// // Audio recording configuration
// const AUDIO_FORMAT = {
//     sampleRate: 44100,
//     channels: 1,
//     bitsPerSample: 16,
// }

// // Function to convert AudioBuffer to WAV format
// const createWavFile = (audioData, sampleRate) => {
//     const numChannels = 1 // Mono
//     const bitsPerSample = 16
//     const bytesPerSample = bitsPerSample / 8
//     const blockAlign = numChannels * bytesPerSample

//     // Create buffer view for the WAV header + audio data
//     const dataLength = audioData.length * bytesPerSample
//     const bufferLength = 44 + dataLength
//     const buffer = new ArrayBuffer(bufferLength)
//     const view = new DataView(buffer)

//     // Write WAV header
//     // "RIFF" chunk descriptor
//     writeString(view, 0, 'RIFF')
//     view.setUint32(4, 36 + dataLength, true)
//     writeString(view, 8, 'WAVE')

//     // "fmt " sub-chunk
//     writeString(view, 12, 'fmt ')
//     view.setUint32(16, 16, true) // Subchunk1Size (16 for PCM)
//     view.setUint16(20, 1, true) // AudioFormat (1 for PCM)
//     view.setUint16(22, numChannels, true) // NumChannels
//     view.setUint32(24, sampleRate, true) // SampleRate
//     view.setUint32(28, sampleRate * blockAlign, true) // ByteRate
//     view.setUint16(32, blockAlign, true) // BlockAlign
//     view.setUint16(34, bitsPerSample, true) // BitsPerSample

//     // "data" sub-chunk
//     writeString(view, 36, 'data')
//     view.setUint32(40, dataLength, true)

//     // Write audio data
//     const offset = 44
//     const volume = 1
//     for (let i = 0; i < audioData.length; i++) {
//         const sample = Math.max(-1, Math.min(1, audioData[i])) * volume
//         const sampleValue = sample < 0 ? sample * 0x8000 : sample * 0x7fff
//         view.setInt16(offset + i * bytesPerSample, sampleValue, true)
//     }

//     return new Blob([buffer], { type: 'audio/wav' })
// }

// // Helper function to write strings to the DataView
// const writeString = (view, offset, string) => {
//     for (let i = 0; i < string.length; i++) {
//         view.setUint8(offset + i, string.charCodeAt(i))
//     }
// }

// const ChatConversation = () => {
//     const [message, setMessage] = useState('')
//     const [isRecording, setIsRecording] = useState(false)
//     const [audioBlob, setAudioBlob] = useState(null)
//     const [audioURL, setAudioURL] = useState(null)
//     const [recordingTime, setRecordingTime] = useState(0)
//     const [isPlaying, setIsPlaying] = useState(false)
//     const [permissionError, setPermissionError] = useState(false)
//     const [transcribedText, setTranscribedText] = useState('')
//     const [isEditingTranscription, setIsEditingTranscription] = useState(false)
//     const [textInputRows, setTextInputRows] = useState(1)
//     const [messageInput, setMessageInput] = useState('')

//     const messageContainerRef = useRef(null)
//     const mediaRecorderRef = useRef(null)
//     const audioChunksRef = useRef([])
//     const audioContextRef = useRef(null)
//     const streamRef = useRef(null)
//     const timerRef = useRef(null)
//     const audioRef = useRef(null)
//     const processorRef = useRef(null)
//     const audioDataRef = useRef([])

//     const dispatch = useDispatch()

//     // STATE FROM REDUX STORE
//     const {
//         conversation,
//         messages,
//         hasJoined,
//         isLoadingReplyInterview,
//         currentAction,
//         speechToText,
//         isLoadingConvertSpeechToText,
//     } = useSelector((state) => state.interview)

//     useEffect(() => {
//         return () => {
//             if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
//                 mediaRecorderRef.current.stop()
//             }
//             if (streamRef.current) {
//                 streamRef.current.getTracks().forEach((track) => track.stop())
//             }
//             if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
//                 audioContextRef.current.close()
//             }
//         }
//     }, [])

//     const startRecording = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
//             streamRef.current = stream

//             // Create audio context for processing
//             const audioContext = new (window.AudioContext || window.webkitAudioContext)({
//                 sampleRate: AUDIO_FORMAT.sampleRate,
//             })
//             audioContextRef.current = audioContext

//             // Create source node from the stream
//             const source = audioContext.createMediaStreamSource(stream)

//             // Create script processor node for raw audio data access
//             const processor = audioContext.createScriptProcessor(4096, 1, 1)
//             processorRef.current = processor

//             // Reset audio data array
//             audioDataRef.current = []

//             // Process audio
//             processor.onaudioprocess = (e) => {
//                 const inputData = e.inputBuffer.getChannelData(0)
//                 const audioData = new Float32Array(inputData)
//                 audioDataRef.current = [...audioDataRef.current, ...Array.from(audioData)]
//             }

//             // Connect nodes
//             source.connect(processor)
//             processor.connect(audioContext.destination)

//             // Additional MediaRecorder for backup and compatibility
//             mediaRecorderRef.current = new MediaRecorder(stream)
//             audioChunksRef.current = []
//             mediaRecorderRef.current.ondataavailable = (event) => {
//                 audioChunksRef.current.push(event.data)
//             }
//             mediaRecorderRef.current.onstop = () => {
//                 // The primary audio data now comes from the processor
//                 // This is just a fallback
//                 if (audioDataRef.current.length === 0) {
//                     const fallbackBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
//                     setAudioBlob(fallbackBlob)
//                     setAudioURL(URL.createObjectURL(fallbackBlob))
//                 }
//             }
//             mediaRecorderRef.current.start()

//             setIsRecording(true)
//             setPermissionError(false)
//             timerRef.current = setInterval(() => {
//                 setRecordingTime((prevTime) => prevTime + 1)
//             }, 1000)
//         } catch (error) {
//             console.error('Error accessing microphone', error)
//             setPermissionError(true)
//         }
//     }

//     const stopRecording = () => {
//         if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
//             mediaRecorderRef.current.stop()
//         }

//         if (processorRef.current) {
//             processorRef.current.disconnect()
//             processorRef.current = null
//         }

//         if (audioContextRef.current) {
//             audioContextRef.current.close().catch((error) => console.error('Error closing audio context:', error))
//         }

//         if (streamRef.current) {
//             streamRef.current.getTracks().forEach((track) => track.stop())
//         }

//         // Create WAV file from the collected audio data
//         if (audioDataRef.current.length > 0) {
//             const wavBlob = createWavFile(audioDataRef.current, AUDIO_FORMAT.sampleRate)
//             setAudioBlob(wavBlob)
//             setAudioURL(URL.createObjectURL(wavBlob))
//         }

//         setIsRecording(false)
//         clearInterval(timerRef.current)
//         setRecordingTime(0)
//     }

//     const playAudio = () => {
//         if (audioRef.current) {
//             audioRef.current.play()
//             setIsPlaying(true)
//             audioRef.current.onended = () => {
//                 setIsPlaying(false)
//             }
//         }
//     }

//     const pauseAudio = () => {
//         if (audioRef.current) {
//             audioRef.current.pause()
//             setIsPlaying(false)
//         }
//     }

//     const deleteAudio = () => {
//         setAudioBlob(null)
//         setAudioURL(null)
//     }

//     // Handle speech-to-text results
//     useEffect(() => {
//         if (speechToText) {
//             setTranscribedText(speechToText)
//             setMessageInput(speechToText)
//             setIsEditingTranscription(true)
//             setAudioBlob(null)
//             setAudioURL(null)
//             // Set rows based on content length
//             const lineBreaks = (speechToText.match(/\n/g) || []).length
//             setTextInputRows(Math.min(Math.max(lineBreaks + 1, 2), 5))
//         }
//     }, [speechToText])

//     // Update text input rows based on content
//     useEffect(() => {
//         if (isEditingTranscription) {
//             const lineBreaks = (messageInput.match(/\n/g) || []).length
//             setTextInputRows(Math.min(Math.max(lineBreaks + 1, 2), 5))
//         } else {
//             setTextInputRows(1)
//         }
//     }, [messageInput, isEditingTranscription])

//     // Function to send audio recording to server
//     const sendAudioMessage = async () => {
//         if (!audioBlob || !hasJoined) return

//         try {
//             // Create a FormData object to send the audio file
//             const audioFile = new File([audioBlob], `voice_message_${Date.now()}.wav`, {
//                 type: 'audio/wav',
//             })

//             // Call API to reply to interview with audio
//             dispatch(replyInterview(audioFile))

//             // Clear audio state after sending
//             setAudioBlob(null)
//             setAudioURL(null)
//         } catch (error) {
//             console.error('Error sending audio message:', error)
//         }
//     }

//     // Send transcribed message after editing
//     const sendTranscribedMessage = () => {
//         if (!messageInput.trim() || !hasJoined) return

//         // Call API to reply to interview
//         dispatch(
//             replyInterviewByMessage({
//                 conversation_id: conversation._id,
//                 content: messageInput,
//             })
//         )

//         // Clear transcription state
//         setTranscribedText('')
//         setIsEditingTranscription(false)
//         setMessageInput('')
//         setTextInputRows(1)
//     }

//     // Cancel transcription editing
//     const cancelTranscriptionEdit = () => {
//         setTranscribedText('')
//         setIsEditingTranscription(false)
//         setMessageInput('')
//         setTextInputRows(1)
//     }

//     // Scroll to bottom when messages change
//     useEffect(() => {
//         if (messageContainerRef.current) {
//             messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
//         }
//     }, [messages])

//     // Handle send message
//     const handleSendMessage = (e) => {
//         e.preventDefault()
//         if (!messageInput.trim() || !hasJoined) return

//         // Call API to reply to interview
//         dispatch(
//             replyInterviewByMessage({
//                 conversation_id: conversation._id,
//                 content: messageInput,
//             })
//         )

//         // Clear input
//         setMessageInput('')
//     }

//     // Handle input change
//     const handleInputChange = (e) => {
//         setMessageInput(e.target.value)
//         if (isEditingTranscription) {
//             setTranscribedText(e.target.value)
//         }
//     }

//     // Handle key press for textarea
//     const handleKeyPress = (e) => {
//         // Send message on Enter (without shift for newline)
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault()
//             if (isEditingTranscription) {
//                 sendTranscribedMessage()
//             } else {
//                 handleSendMessage(e)
//             }
//         }
//     }

//     if (!hasJoined) return null

//     return (
//         <div className="bg-white rounded-lg shadow-md mt-4 w-full max-w-[850px]">
//             <div className="p-4 border-b border-gray-200">
//                 <h3 className="text-lg font-semibold">Interview Chat</h3>
//             </div>

//             <div ref={messageContainerRef} className="p-4 h-[300px] overflow-y-auto">
//                 {messages.map((msg, index) => (
//                     <div
//                         key={index}
//                         className={`mb-4 ${
//                             msg.type?.class === 'bot-message' ? 'flex justify-start' : 'flex justify-end'
//                         }`}
//                     >
//                         <div
//                             className={`p-3 rounded-lg max-w-[80%] ${
//                                 msg.type?.class === 'bot-message'
//                                     ? 'bg-blue-100 text-gray-800'
//                                     : 'bg-blue-500 text-white'
//                             }`}
//                         >
//                             {formatMessage(msg.content)}
//                             {msg.status !== 'sent' && <Spinner size="sm" color="white.500" className="ml-2" />}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <div className="p-4 border-t border-gray-200">
//                 {permissionError && (
//                     <div className="p-2 mb-2 text-red-600 bg-red-100 rounded-md">
//                         Microphone permission denied. Please enable it in your browser settings.
//                     </div>
//                 )}

//                 <form onSubmit={handleSendMessage} className="flex">
//                     <textarea
//                         disabled={isLoadingReplyInterview || currentAction === 'speaking'}
//                         value={messageInput}
//                         onChange={handleInputChange}
//                         onKeyDown={handleKeyPress}
//                         placeholder={
//                             isEditingTranscription ? 'Edit your transcribed message...' : 'Type your message...'
//                         }
//                         className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         rows={textInputRows}
//                         style={{ minHeight: textInputRows === 1 ? '40px' : 'auto' }}
//                     />

//                     {isEditingTranscription ? (
//                         <div className="flex flex-col">
//                             <button
//                                 type="button"
//                                 onClick={sendTranscribedMessage}
//                                 className="px-3 py-2 text-white bg-green-500 rounded-tr-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
//                                 title="Send edited transcription"
//                             >
//                                 <FaPaperPlane size={16} />
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={cancelTranscriptionEdit}
//                                 className="px-3 py-2 text-white bg-red-500 rounded-br-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
//                                 title="Cancel"
//                             >
//                                 <FaTrash size={16} />
//                             </button>
//                         </div>
//                     ) : (
//                         <>
//                             <button
//                                 type="button"
//                                 onClick={isRecording ? stopRecording : startRecording}
//                                 disabled={isLoadingReplyInterview || currentAction === 'speaking'}
//                                 className={`px-4 py-2 text-white ${
//                                     isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'
//                                 } focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                 title={isRecording ? 'Stop recording' : 'Start voice recording'}
//                             >
//                                 {isRecording ? <FaMicrophoneSlash size={18} /> : <FaMicrophone size={18} />}
//                             </button>
//                             <button
//                                 disabled={
//                                     isLoadingReplyInterview || currentAction === 'speaking' || !messageInput.trim()
//                                 }
//                                 type="submit"
//                                 className="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
//                             >
//                                 Send
//                             </button>
//                         </>
//                     )}
//                 </form>

//                 {isLoadingConvertSpeechToText && (
//                     <div className="flex items-center mt-2">
//                         <Spinner size="sm" color="blue.500" className="mr-2" />
//                         <span className="text-sm text-gray-500">Converting speech to text...</span>
//                     </div>
//                 )}

//                 {isRecording && (
//                     <div className="flex items-center mt-2">
//                         <span className="w-2 h-2 mr-2 bg-red-500 rounded-full animate-pulse"></span>
//                         <span className="text-sm text-gray-500">Recording... {recordingTime}s</span>
//                     </div>
//                 )}
//                 {audioURL && (
//                     <div className="flex items-center mt-2">
//                         <audio ref={audioRef} src={audioURL} controls className="hidden" />
//                         <button
//                             type="button"
//                             onClick={isPlaying ? pauseAudio : playAudio}
//                             className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             {isPlaying ? <BiPause size={18} /> : <BiPlay size={18} />}
//                         </button>
//                         <button
//                             type="button"
//                             onClick={deleteAudio}
//                             className="px-2 py-1 ml-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
//                         >
//                             <FaTrash size={18} />
//                         </button>
//                         <button
//                             type="button"
//                             onClick={sendAudioMessage}
//                             className="px-2 py-1 ml-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
//                             disabled={isLoadingConvertSpeechToText}
//                         >
//                             <FaPaperPlane size={18} />
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default ChatConversation
