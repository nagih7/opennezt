import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import LazyLoadingMedium from "components/UI/LazyLoadingMedium";
import CloseIcon from "@mui/icons-material/Close";
import AvatarDefault from "assets/images/default/AvatarDefault.png";
import { useSocket } from "context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import GroupsIcon from "@mui/icons-material/Groups";
import MicIcon from "@mui/icons-material/Mic";
import { Avatar, message, Modal, Tooltip } from "antd";
import { closeChatBox, comfirmSendMessage } from "states/modules/chat";
import MessageBoxContent from "./MessageBoxContent";
import { ACTIONS } from "utils/constains";

const Projects = React.lazy(() => import("components/common/Projects"));

const MessageBox = ({ key, converse, sendMessage }) => {
	const dispatch = useDispatch();
	const socket = useSocket();

	const { authUser } = useSelector((state) => state.auth);
	const { language } = useSelector((state) => state.app);

	const [content, setContent] = useState("");
	const [showMoreActions, setShowMoreActions] = useState(false);
	const [modalProjectInvitation, setModalProjectInvitation] = useState(false);
	const moreActionsRef = useRef(null);

	useEffect(() => {
		socket.on("message", (message) => {
			dispatch(comfirmSendMessage(message));
		});

		return () => {
			socket.off("message");
		};
	}, [socket, dispatch]);

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

	const handleEnterKey = (event, converse) => {
		if (event.key === "Enter") {
			handleSendMessage(converse);
		}
	};

	const handleSendMessage = (converse) => {
		if (!content) return;
		const message = {
			user_id: authUser._id,
			conversation_id: converse.conversation._id,
			content: content,
			created_at: new Date().toISOString(),
			metadata: { type: "text", read_by: [] },
			updated_at: new Date().toISOString(),
		};
		sendMessage(message);
		dispatch(comfirmSendMessage(message));

		setContent("");
	};

	const handleShowMoreActions = () => {
		setShowMoreActions(!showMoreActions);
	};

	const handleSendProjectInvitation = async () => {
		setModalProjectInvitation(true);
		dispatch(getProjectInvitations(converse.conversation?.members[0]?._id));
	};

	const handleCloseChatBox = (conversation) => {
		dispatch(closeChatBox(conversation.conversation._id));
	};

	return (
		<div className={styles.messageBoxWrap}>
			<div className={styles.miniChatHeader}>
				{converse.conversation?.metadata?.type === "Direct" && (
					<div className={styles.miniChatHeaderContent}>
						<div className={styles.avatar}>
							<img
								src={
									converse.conversation?.members[0]?.avatar ||
									AvatarDefault
								}
								alt={converse.conversation?.members[0]?.name}
								onError={(e) => {
									e.target.onerror = null;
									e.target.src = AvatarDefault;
								}}
							/>
						</div>
						<span>{converse.conversation?.members[0]?.name}</span>
					</div>
				)}
				{converse.conversation?.metadata?.type === "Group" && (
					<div className={styles.miniChatHeaderContent}>
						<div className={styles.avatarGroup}>
							<Avatar.Group
								size={"medium"}
								max={{
									count: 2,
									style: {
										color: "#f56a00",
										backgroundColor: "#fde3cf",
									},
								}}>
								{converse.conversation?.members?.map((member, index) => (
									<Tooltip title={member.name} key={member._id}>
										<Avatar
											src={member.avatar || AvatarDefault}
											alt={member.name}
										/>
									</Tooltip>
								))}
							</Avatar.Group>
						</div>
						<span>
							{converse.conversation?.metadata?.data.project.name}
						</span>
					</div>
				)}

				<button
					onClick={() => handleCloseChatBox(converse)}
					className={styles.closeButton}>
					<CloseIcon />
				</button>
			</div>
			<div className={styles.miniChatContent}>
				<MessageBoxContent
					messages={converse.messages}
					conversation={converse.conversation}
				/>
			</div>
			<div className={styles.miniChatFooter}>
				<div className={styles.chatActions}>
					<button
						ref={moreActionsRef}
						onClick={() => handleShowMoreActions()}
						className={styles.addButton}>
						<AddCircleIcon className={styles.AddIcon} />
					</button>
					<button
						className={styles.addButton}
						onClick={() => message.info("Comming soon")}>
						<InsertPhotoIcon className={styles.AddIcon} />
					</button>
				</div>
				<div
					className={`${styles.chatMoreActions} ${
						showMoreActions ? styles.visible : ""
					}`}>
					<button
						className={styles.moreActionsButton}
						onClick={() => handleSendProjectInvitation()}>
						<GroupsIcon className={styles.icon} />
						<span>{ACTIONS.SEND_PROJECT_INVITATION[language]}</span>
					</button>
					<button
						className={styles.moreActionsButton}
						onClick={() => message.info("Comming soon")}>
						<MicIcon className={styles.icon} />
						<span>{ACTIONS.SEND_VOICE_MESSAGE[language]}</span>
					</button>
				</div>
				<input
					onKeyDown={(e) => handleEnterKey(e, converse)}
					type="text"
					placeholder={ACTIONS.ENTER_MESSAGE[language]}
					className={styles.miniChatInput}
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<button
					onClick={() => handleSendMessage(converse)}
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
					<Projects inviteeId={converse.conversation?.members[0]?._id} />
				</LazyLoadingMedium>
			</Modal>
		</div>
	);
};

export default React.memo(MessageBox);
