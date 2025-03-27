import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';
import AvatarDefault from 'assets/images/default/AvatarDefault.png';

const MessageBoxContent = ({ messages, conversation }) => {
    const chatBoxRef = useRef(null);

    const { authUser } = useSelector((state) => state.auth);

    useEffect(() => {
        const chatBox = chatBoxRef.current;
        if (chatBox) {
            // Scroll to bottom
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, [messages]);

    switch (conversation?.metadata?.type) {
        case 'Direct':
            return (
                <div className={styles.boxMessageWrap} ref={chatBoxRef}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`${styles.messageWrap} ${
                                msg.user_id === authUser._id ? styles.sent : styles.received
                            }`}
                        >
                            <span className={styles.message}>{msg.content}</span>
                        </div>
                    ))}
                </div>
            );
        case 'Group':
            return (
                <div className={styles.boxMessageWrap} ref={chatBoxRef}>
                    {messages.map((msg, index) => {
                        switch (msg.user_id) {
                            case authUser._id:
                                return (
                                    <div
                                        key={index}
                                        className={`${styles.messageWrap} ${styles.sent}`}
                                    >
                                        <span className={styles.message}>{msg.content}</span>
                                    </div>
                                );
                            default:
                                return (
                                    <div className={styles.msgWrap}>
                                        {conversation.members.map((member, index) => {
                                            if (member._id === msg.user_id) {
                                                return (
                                                    <div className={styles.avatarWrap} key={index}>
                                                        <Avatar
                                                            src={member.avatar || AvatarDefault}
                                                            alt={member.name}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = AvatarDefault;
                                                            }}
                                                        />
                                                    </div>
                                                );
                                            }
                                        })}
                                        <div className={styles.receivedWrap}>
                                            <span className={styles.name}>
                                                {conversation.members.map((member) => {
                                                    if (member._id === msg.user_id) {
                                                        return member.name;
                                                    }
                                                })}
                                            </span>
                                            <div
                                                key={index}
                                                className={`${styles.messageWrap} ${styles.received}`}
                                            >
                                                <span className={styles.message}>
                                                    {msg.content}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                        }
                    })}
                </div>
            );
        default:
            return null;
    }
};

export default MessageBoxContent;
