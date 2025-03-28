import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChatHistory } from 'api/chat';
import NotFound from 'components/UI/NotFound';
import { MESSAGES } from 'utils/constants/appConstants';
import { Avatar, Stack, Text } from '@chakra-ui/react';
import { DIRECT_CONVERSATION, GROUP_CONVERSATION } from 'utils/constants/typeConstants';

const PopoverMessage = () => {
    const dispatch = useDispatch();
    const { conversations } = useSelector((state) => state.chat);
    const { language } = useSelector((state) => state.app);

    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');

    // NEW
    const handleGetChatHistory = (conversation) => {
        dispatch(getChatHistory(conversation._id));
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchQuery);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    useEffect(() => {
        // dispatch(getChatList(debouncedTerm));
    }, [debouncedTerm, dispatch]);

    const handleSearchQuery = (value) => {
        setSearchQuery(value);
    };

    return (
        <Stack >
            <h3>{MESSAGES.MESSAGES[language]}</h3>
            {/* <input
					type="text"
					placeholder={MESSAGES.SEARCH[language]}
					className={styles.searchInput}
					value={searchQuery}
					onChange={(e) => handleSearchQuery(e.target.value)}
				/>
				<InputCustom height="30px" /> */}

            <Stack>
                {conversations.length > 0 ? (
                    conversations.map((conversation, index) => {
                        return (
                            <Stack
                                key={index}
                                onClick={() => handleGetChatHistory(conversation)}
                                className="cursor-pointer"
                            >
                                {(() => {
                                    switch (conversation.type.name) {
                                        case DIRECT_CONVERSATION:
                                            return (
                                                <Stack
                                                    direction="row"
                                                    className="items-center"
                                                    spacing={4}
                                                >
                                                    <Avatar.Root size={'md'}>
                                                        <Avatar.Fallback
                                                            name={conversation.members[0].name}
                                                        />
                                                        <Avatar.Image
                                                            src={conversation.members[0].avatar}
                                                        />
                                                    </Avatar.Root>
                                                    <Stack className="items-start flex-1">
                                                        <Text>{conversation.members[0].name}</Text>
                                                    </Stack>
                                                </Stack>
                                            );
                                        case GROUP_CONVERSATION:
                                            return (
                                                <div>
                                                    <div>{conversation.metadata.data.name}</div>
                                                    <div>{conversation.members.length} members</div>
                                                </div>
                                            );
                                        default:
                                            return null;
                                    }
                                })()}
                            </Stack>
                        );
                    })
                ) : (
                    <div>
                        <NotFound content="Not found" size="100" />
                    </div>
                )}
            </Stack>
        </Stack>
    );
};

export default PopoverMessage;
