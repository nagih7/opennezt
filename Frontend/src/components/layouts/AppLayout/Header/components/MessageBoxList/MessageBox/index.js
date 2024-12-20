import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import LazyLoadingMedium from "components/UI/LazyLoadingMedium";
import CloseIcon from "@mui/icons-material/Close";
import AvatarDefault from "assets/images/default/AvatarDefault.png";
import { getChatHistory } from "api/chat";
import { useSocket } from "context/SocketContext";
import { useSelector } from "react-redux";
import store from "states/configureStore";
import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import GroupsIcon from "@mui/icons-material/Groups";
import MicIcon from "@mui/icons-material/Mic";
import { Modal } from "antd";
import { getProjects } from "api/project";

const MessageBoxContent = React.lazy(() => import("./MessageBoxContent"));
const Projects = React.lazy(() => import("components/common/Projects"));

const MessageBox = ({ chatBox, closeChatBox, sendMessage }) => {
	const socket = useSocket();

	const { loadingGetChatHistory } = useSelector((state) => state.chat);

	const [content, setContent] = useState("");
	const [newMessage, setNewMessage] = useState([]);
	const [showMoreActions, setShowMoreActions] = useState(false);
	const [modalProjectInvitation, setModalProjectInvitation] = useState(false);
	const [inviteeId, setInviteeId] = useState(null);
	const moreActionsRef = useRef(null);

	useEffect(() => {
		store.dispatch(getChatHistory(chatBox.user_id));
	}, [chatBox.user_id]);

	useEffect(() => {
		setNewMessage(chatBox.messages);
	}, [chatBox.messages]);

	useEffect(() => {
		socket.on("message", (message) => {
			store.dispatch(getChatHistory(message.sender_id));
		});

		return () => {
			socket.off("message");
		};
	}, [socket]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				moreActionsRef.current &&
				!moreActionsRef.current.contains(event.target)
			) {
				setShowMoreActions(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleEnterKey = (event, receiver_id) => {
		if (event.key === "Enter") {
			handleSendMessage(receiver_id);
		}
	};

	const handleSendMessage = (receiver_id) => {
		if (!content) return;
		const date = new Date().toISOString();
		const message = {
			receiver_id: receiver_id,
			content: content,
			timestamp: date,
		};
		sendMessage(message);
		store.dispatch(getChatHistory(receiver_id));

		setContent("");
	};

	const handleShowMoreActions = () => {
		setShowMoreActions(!showMoreActions);
	};

	const handleSendProjectInvitation = (user_id) => {
		setModalProjectInvitation(true);
		setInviteeId(user_id);
		store.dispatch(getProjects());
	};

	return (
		<div className={styles.messageBoxWrap}>
			<div className={styles.miniChatHeader}>
				<div className={styles.miniChatHeaderContent}>
					<div className={styles.avatar}>
						<img
							src={
								chatBox.user_avatar
									? chatBox.user_avatar
									: AvatarDefault
							}
							alt="avatar"
						/>
					</div>
					<span>{chatBox.user_name}</span>
				</div>
				<button
					onClick={() => closeChatBox(chatBox.user_id)}
					className={styles.closeButton}>
					<CloseIcon />
				</button>
			</div>
			<div className={styles.miniChatContent}>
				<LazyLoadingMedium>
					<MessageBoxContent
						messages={newMessage}
						receiver_id={chatBox.user_id}
					/>
				</LazyLoadingMedium>
			</div>
			<div className={styles.miniChatFooter}>
				<div className={styles.chatActions}>
					<button
						ref={moreActionsRef}
						onClick={() => handleShowMoreActions()}
						className={styles.addButton}>
						<AddCircleIcon className={styles.AddIcon} />
					</button>
					<button className={styles.addButton}>
						<InsertPhotoIcon className={styles.AddIcon} />
					</button>
				</div>
				<div
					className={`${styles.chatMoreActions} ${
						showMoreActions ? styles.visible : ""
					}`}>
					<button
						className={styles.moreActionsButton}
						onClick={() => handleSendProjectInvitation(chatBox.user_id)}>
						<GroupsIcon className={styles.icon} />
						<span>Send project invitation</span>
					</button>
					<button className={styles.moreActionsButton}>
						<MicIcon className={styles.icon} />
						<span>Send voice message</span>
					</button>
				</div>
				<input
					onKeyDown={(e) => handleEnterKey(e, chatBox.user_id)}
					type="text"
					placeholder="Type a message..."
					className={styles.miniChatInput}
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<button
					onClick={() => handleSendMessage(chatBox.user_id)}
					className={styles.sendButton}>
					<SendIcon />
				</button>
			</div>
			<Modal
				footer={null}
				title=""
				okText="OK"
				onOk={() => setModalProjectInvitation(false)}
				open={modalProjectInvitation}
				confirmLoading={false}
				onCancel={() => setModalProjectInvitation(false)}
				width={1000}>
				<LazyLoadingMedium>
					<Projects inviteeId={inviteeId} />
				</LazyLoadingMedium>
			</Modal>
		</div>
	);
};

export default React.memo(MessageBox);
