import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getChatHistory } from 'api/chat'
import NotFound from 'components/UI/NotFound'
import { MESSAGES } from 'utils/constants'
import { Avatar, Stack, Text } from '@chakra-ui/react'
import { DIRECT_CONVERSATION, GROUP_CONVERSATION } from 'utils/constants'
import { CheckCircleFilled } from '@ant-design/icons'
import { MoreOutlined } from '@ant-design/icons'
import './styles.module.scss'
import { useNavigate } from 'react-router-dom'

const PopoverMessage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { conversations } = useSelector((state) => state.chat)
    const { language } = useSelector((state) => state.app)

    const [searchQuery, setSearchQuery] = useState('')
    const [debouncedTerm, setDebouncedTerm] = useState('')

    // NEW
    const handleGetChatHistory = (conversation) => {
        dispatch(getChatHistory(conversation._id))
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchQuery)
        }, 300)

        return () => {
            clearTimeout(handler)
        }
    }, [searchQuery])

    useEffect(() => {
        // dispatch(getChatList(debouncedTerm));
    }, [debouncedTerm, dispatch])

    const handleSearchQuery = (value) => {
        setSearchQuery(value)
    }
    const MAX_LENGTH = 15
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? '...' : text
    }

    const handleNavigateChat = (id) => {
        navigate(`/conversation/${id}`)
    }

    return (
        <Stack className="bg-[#ffffff] rounded-md">
            <div className="mx-2 p-[16px] border-b border-gray-200 text-lg font-medium ">
                {MESSAGES.MESSAGES[language]}
            </div>
            {/* <input
					type="text"
					placeholder={MESSAGES.SEARCH[language]}
					className={styles.searchInput}
					value={searchQuery}
					onChange={(e) => handleSearchQuery(e.target.value)}
				/>
				<InputCustom height="30px" /> */}
            <Stack
                className={`${
                    conversations.length >= 3
                        ? 'flex flex-col items-center max-h-[250px] p-0 m-0 overflow-y-scroll scrollbar-thumb-gray-400 scrollbar-track-gray-200'
                        : ''
                } p-2`}
            >
                {conversations.length > 0 ? (
                    conversations.map((conversation, index) => {
                        return (
                            <Stack
                                key={index}
                                onClick={() => handleGetChatHistory(conversation)}
                                className="group cursor-pointer p-[15px] hover:bg-[#f6f5f5] w-full border-r-2"
                            >
                                {(() => {
                                    switch (conversation.type.name) {
                                        case DIRECT_CONVERSATION:
                                            return (
                                                <Stack
                                                    className="flex flex-row items-center w-full gap-2"
                                                    spacing={4}
                                                    onClick={() => handleNavigateChat(conversation._id)}
                                                >
                                                    <Avatar.Root size={'lg'}>
                                                        <Avatar.Fallback name={conversation.members[0]?.name} />
                                                        <Avatar.Image src={conversation.members[0]?.avatar} />
                                                    </Avatar.Root>
                                                    <Stack className="flex flex-col w-full gap-0">
                                                        <Text className="flex items-center gap-1 mb-0 text-sm">
                                                            {conversation.members[0]?.name}
                                                            <CheckCircleFilled className="text-blue-500" />
                                                        </Text>
                                                        <Text className="mb-0 text-xs text-[#6f7f92] font-medium">
                                                            {truncateText('No message', MAX_LENGTH)}
                                                        </Text>
                                                    </Stack>
                                                    <div className="justify-end hidden group-hover:flex">
                                                        <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                    </div>
                                                </Stack>
                                            )
                                        case GROUP_CONVERSATION:
                                            return (
                                                <Stack
                                                    className="flex flex-row items-center w-full gap-2"
                                                    spacing={4}
                                                    onClick={() => handleNavigateChat(conversation._id)}
                                                >
                                                    <Avatar.Root size={'lg'}>
                                                        <Avatar.Fallback name={conversation.data?.project?.name} />
                                                        <Avatar.Image src={conversation.data?.project?.logo} />
                                                    </Avatar.Root>
                                                    <Stack className="flex flex-col w-full gap-0">
                                                        <Text className="flex items-center gap-1 mb-0 text-sm">
                                                            {conversation.data?.project?.name}
                                                            <CheckCircleFilled className="text-blue-500" />
                                                        </Text>
                                                        <Text className="mb-0 text-xs text-[#6f7f92] font-medium">
                                                            {truncateText('No message', MAX_LENGTH)}
                                                        </Text>
                                                    </Stack>
                                                    <div className="justify-end hidden group-hover:flex">
                                                        <MoreOutlined className="w-[15px] h-[15px] text-black" />
                                                    </div>
                                                </Stack>
                                            )
                                        default:
                                            return null
                                    }
                                })()}
                            </Stack>
                        )
                    })
                ) : (
                    <div>
                        <NotFound content="Not found" size="100" />
                    </div>
                )}
            </Stack>
        </Stack>
    )
}

export default PopoverMessage
