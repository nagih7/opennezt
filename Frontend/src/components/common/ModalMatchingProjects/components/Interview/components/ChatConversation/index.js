import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { replyInterview } from 'api/interview'
import formatMessage from 'utils/formatMessage'
import { Spinner } from '@chakra-ui/react'

const ChatConversation = () => {
    const [message, setMessage] = useState('')
    const messageContainerRef = useRef(null)
    const dispatch = useDispatch()

    // STATE FROM REDUX STORE
    const { conversation, messages, hasJoined } = useSelector((state) => state.interview)

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

            {/* Message container */}
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

            {/* Message input */}
            <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatConversation
