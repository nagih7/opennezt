import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";

const BoxMessage = ({ messages }) => {
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
						msg.isSender ? styles.sent : styles.received
					}`}>
					<span className={styles.message}>{msg.message}</span>
				</div>
			))}
		</div>
	);
};

export default BoxMessage;
