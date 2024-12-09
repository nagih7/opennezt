import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";

const MessageBoxContent = ({ messages, receiver_id }) => {
	const chatBoxRef = useRef(null);

	useEffect(() => {
		const chatBox = chatBoxRef.current;
		// Scroll to bottom
		chatBox.scrollTop = chatBox.scrollHeight;
	}, [messages]);

	return (
		<div className={styles.boxMessageWrap} ref={chatBoxRef}>
			{messages.map((msg, index) => (
				<div
					key={index}
					className={`${styles.messageWrap} ${
						msg.receiver_id === receiver_id
							? styles.sent
							: styles.received
					}`}>
					<span className={styles.message}>{msg.content}</span>
				</div>
			))}
		</div>
	);
};

export default MessageBoxContent;
