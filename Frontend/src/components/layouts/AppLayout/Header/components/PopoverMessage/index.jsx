import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChatHistory } from 'api/chat';
import NotFound from 'components/UI/NotFound';
import { MESSAGES } from 'utils/constants/appConstants';
import { Stack } from '@chakra-ui/react';

const PopoverMessage = () => {
    const dispatch = useDispatch();
    const { conversations } = useSelector((state) => state.chat);

    console.log(conversations);
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
        <Stack>
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
                        <></>;
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
