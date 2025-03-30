import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { LinkOutlined, MoreOutlined, RollbackOutlined } from '@ant-design/icons'
import { IconlySend, IconlyStar } from 'components/UI/Iconly'
import { useDispatch, useSelector } from 'react-redux'
import { getConversation, getMessages, sendMessage } from 'api/chat'
import { useParams } from 'react-router-dom'
import MyMessage from './components/MyMessage'
import OtherMessage from './components/OtherMessage'
import { Spinner, Text, VStack } from '@chakra-ui/react'
import { useSocket } from 'context/SocketContext'

const Chat = () => {
    const dispatch = useDispatch()
    const messagesContainerRef = useRef(null)
    const params = useParams()
    const { id } = params
    const socket = useSocket()
    // ========== STATE FROM REDUX ========== //
    const { authUser } = useSelector((state) => state.auth)
    const { conversation, isLoadingGetConversation } = useSelector((state) => state.chat)

    // ========== STATE ========== //
    const [message, setMessage] = useState('')

    // ========== USE EFFECT ========== //
    useEffect(() => {
        if (id) {
            dispatch(getConversation(id))
        }
    }, [dispatch, id])
    useEffect(() => {
        if (id && conversation._id) {
            dispatch(getMessages(conversation._id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, conversation._id])
    useEffect(() => {
        if (messagesContainerRef.current && conversation?.messages?.length) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
        }
    }, [conversation?.messages])

    // ========== HANDLE FUNCTION ========== //
    const handleChangeMessage = (e) => {
        setMessage(e.target.value)
    }

    const handleSendMessage = () => {
        dispatch(sendMessage(conversation._id, message, socket))
        setMessage('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage()
        }
    }

    // ========== RENDER ========== //
    return (
        <div className="flex flex-1 flex-col text-[#6f7f92] items-center w-full overflow-hidden">
            {!isLoadingGetConversation ? (
                <div className="flex-1 overflow-y-scroll scrollbar-hide bg-[#ffffff] w-full" ref={messagesContainerRef}>
                    <div className="flex justify-center pt-[15px] pb-[1px] w-full">
                        <div className="px-[10px] py-[5px]">
                            <span className="text-xs">Start of conversation</span>
                        </div>
                    </div>
                    <div className="relative flex flex-col items-center justify-center w-full">
                        <div className="after:z-20 px-[11px] rounded-md text-xs font-semibold text-[#2f65b9] py-[5px] my-[11px]">
                            {moment(conversation?.createdAt).format('MMMM D, YYYY')}
                        </div>
                        {conversation?.messages?.map((message, idx) => {
                            switch (message?.user?._id) {
                                case authUser?._id:
                                    return (
                                        <div
                                            className="flex justify-end gap-[10px] px-[15px] w-full flex-row-reverse"
                                            key={idx}
                                        >
                                            {(() => {
                                                switch (conversation?.messages[idx - 1]?.user._id) {
                                                    case message?.user?._id:
                                                        return <MyMessage message={message} />
                                                    default:
                                                        return <MyMessage message={message} haveAvatar />
                                                }
                                            })()}
                                        </div>
                                    )
                                default:
                                    return (
                                        <div className="flex gap-[10px] mb-[5px] px-[15px] w-full">
                                            {(() => {
                                                switch (conversation?.messages[idx - 1]?.user._id) {
                                                    case message?.user?._id:
                                                        return <OtherMessage message={message} />
                                                    default:
                                                        return <OtherMessage message={message} haveAvatar />
                                                }
                                            })()}
                                        </div>
                                    )
                            }
                        })}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center flex-1 w-full bg-gray-100">
                    <VStack colorPalette="teal">
                        <Spinner color="colorPalette.600" />
                        <Text color="colorPalette.600">Loading...</Text>
                    </VStack>
                </div>
            )}

            <div className="flex items-center border-t border-gray-200 w-full bg-[#ffffff]">
                <div className="flex justify-center items-center w-[50px] h-[40px] my-1">
                    <LinkOutlined className="text-xl w-[30px] h-[30px]" />
                </div>
                <div className="py-[12px] w-full">
                    <input
                        onKeyDown={handleKeyDown}
                        value={message}
                        onChange={handleChangeMessage}
                        type="text"
                        placeholder="Write your message"
                        className="w-full bg-white outline-none"
                    />
                </div>
                <div
                    className="min-w-[40px] mx-[10px] my-1 h-[40px] flex justify-center rounded-md bg-[#2f65b9] items-center cursor-pointer"
                    onClick={handleSendMessage}
                >
                    <IconlySend size={24} color={'#ffffff'} />
                </div>
            </div>
        </div>
    )
}

export default Chat
