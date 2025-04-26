import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { replyInterview } from 'api/interview'
import formatMessage from 'utils/formatMessage'
import { Spinner } from '@chakra-ui/react'
import { FaMicrophone, FaMicrophoneSlash, FaPaperPlane, FaTrash } from 'react-icons/fa'
import { BiPause, BiPlay } from 'react-icons/bi'

const ChatConversation = () => {
    const [message, setMessage] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const [audioBlob, setAudioBlob] = useState(null)
    const [audioURL, setAudioURL] = useState(null)
    const [recordingTime, setRecordingTime] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [permissionError, setPermissionError] = useState(false)

    const messageContainerRef = useRef(null)
    const mediaRecorderRef = useRef(null)
    const audioChunksRef = useRef([])
    const streamRef = useRef(null)
    const timerRef = useRef(null)
    const audioRef = useRef(null)

    const dispatch = useDispatch()

    // STATE FROM REDUX STORE
    const { conversation, messages, hasJoined, isLoadingReplyInterview, currentAction } = useSelector(
        (state) => state.interview
    )

    useEffect(() => {
        return () => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                mediaRecorderRef.current.stop()
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop())
            }
        }
    }, [])

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            streamRef.current = stream
            mediaRecorderRef.current = new MediaRecorder(stream)
            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data)
            }
            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
                setAudioBlob(audioBlob)
                setAudioURL(URL.createObjectURL(audioBlob))
                audioChunksRef.current = []
            }
            mediaRecorderRef.current.start()
            setIsRecording(true)
            setPermissionError(false)
            timerRef.current = setInterval(() => {
                setRecordingTime((prevTime) => prevTime + 1)
            }, 1000)
        } catch (error) {
            console.error('Error accessing microphone', error)
            setPermissionError(true)
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop()
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop())
        }
        setIsRecording(false)
        clearInterval(timerRef.current)
        setRecordingTime(0)
    }

    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play()
            setIsPlaying(true)
            audioRef.current.onended = () => {
                setIsPlaying(false)
            }
        }
    }

    const pauseAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause()
            setIsPlaying(false)
        }
    }

    const deleteAudio = () => {
        setAudioBlob(null)
        setAudioURL(null)
    }

    // Function to send audio recording to server
    const sendAudioMessage = async () => {
        if (!audioBlob || !hasJoined) return

        try {
            // Create a FormData object to send the audio file
            const formData = new FormData()
            const audioFile = new File([audioBlob], `voice_message_${Date.now()}.wav`, {
                type: 'audio/wav',
            })

            formData.append('conversation_id', conversation._id)
            formData.append('audio', audioFile)
            formData.append('messageType', 'audio')

            // Call API to reply to interview with audio
            dispatch(
                replyInterview({
                    conversation_id: conversation._id,
                    content: 'Audio message',
                    audio: audioFile,
                    messageType: 'audio',
                })
            )

            // Clear audio state after sending
            setAudioBlob(null)
            setAudioURL(null)
        } catch (error) {
            console.error('Error sending audio message:', error)
        }
    }

    // Scroll to bottom when messages change
    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
        }
    }, [messages])

    // Handle send message
    const handleSendMessage = (e) => {
        e.preventDefault()
        if (!message.trim() || !hasJoined) return

        // Call API to reply to interview
        dispatch(
            replyInterview({
                conversation_id: conversation._id,
                content: message,
            })
        )

        // Clear input
        setMessage('')
    }

    if (!hasJoined) return null

    return (
        <div className="bg-white rounded-lg shadow-md mt-4 w-full max-w-[850px]">
            <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Interview Chat</h3>
            </div>

            <div ref={messageContainerRef} className="p-4 h-[300px] overflow-y-auto">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-4 ${
                            msg.type?.class === 'bot-message' ? 'flex justify-start' : 'flex justify-end'
                        }`}
                    >
                        <div
                            className={`p-3 rounded-lg max-w-[80%] ${
                                msg.type?.class === 'bot-message'
                                    ? 'bg-blue-100 text-gray-800'
                                    : 'bg-blue-500 text-white'
                            }`}
                        >
                            {formatMessage(msg.content)}
                            {msg.status !== 'sent' && <Spinner size="sm" color="white.500" className="ml-2" />}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-gray-200">
                {permissionError && (
                    <div className="p-2 mb-2 text-red-600 bg-red-100 rounded-md">
                        Microphone permission denied. Please enable it in your browser settings.
                    </div>
                )}

                <form onSubmit={handleSendMessage} className="flex">
                    <input
                        disabled={isLoadingReplyInterview || currentAction === 'speaking'}
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        onClick={isRecording ? stopRecording : startRecording}
                        disabled={isLoadingReplyInterview || currentAction === 'speaking'}
                        className={`px-4 py-2 text-white ${
                            isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        title={isRecording ? 'Stop recording' : 'Start voice recording'}
                    >
                        {isRecording ? <FaMicrophoneSlash size={18} /> : <FaMicrophone size={18} />}
                    </button>
                    <button
                        disabled={isLoadingReplyInterview || currentAction === 'speaking' || !message.trim()}
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
                    >
                        Send
                    </button>
                </form>
                {isRecording && (
                    <div className="flex items-center mt-2">
                        <span className="w-2 h-2 mr-2 bg-red-500 rounded-full animate-pulse"></span>
                        <span className="text-sm text-gray-500">Recording... {recordingTime}s</span>
                    </div>
                )}
                {audioURL && (
                    <div className="flex items-center mt-2">
                        <audio ref={audioRef} src={audioURL} controls className="hidden" />
                        <button
                            type="button"
                            onClick={isPlaying ? pauseAudio : playAudio}
                            className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {isPlaying ? <BiPause size={18} /> : <BiPlay size={18} />}
                        </button>
                        <button
                            type="button"
                            onClick={deleteAudio}
                            className="px-2 py-1 ml-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <FaTrash size={18} />
                        </button>
                        <button
                            type="button"
                            onClick={sendAudioMessage}
                            className="px-2 py-1 ml-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <FaPaperPlane size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatConversation
