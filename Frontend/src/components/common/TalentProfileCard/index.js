import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AvatarDefault from "../../../assets/images/default/AvatarDefault.png";
import BackgroundDefault from "../../../assets/images/default/BackgroundDefault.png";
import verify from "../../../assets/images/icon/verify.png";
import { Button } from "antd";
import { useSelector } from "react-redux";
import store from "states/configureStore";
import { useSocket } from "../SocketContext";
import { requestChatInvitation } from "../../../api/chat";
const TalentProfileCard = ({ talent }) => {
	const socket = useSocket();
	const { loadingRequestChatInvitation, chatInvitation } = useSelector(
		(state) => state.chat
	);

	const handleRequestChatInvitation = async (receiver_id, receiver_name) => {
		console.log("Request Chat Invitation:", receiver_id, receiver_name);
		await store.dispatch(requestChatInvitation(receiver_id, receiver_name));
	};

	const handleInvite = (receiver_id) => {
		// Gửi yêu cầu 'invite' lên server khi user nhấn nút
		socket.emit("invite", receiver_id);
	};

	return (
		<div className={styles.talentProfileCardWrap}>
			<div className={styles.bannerContainer}>
				<div className={styles.banner}>
					<div className={styles.background}>
						{talent.background ? (
							<LazyLoadImage
								alt="User Background"
								src={talent.background}
							/>
						) : (
							<LazyLoadImage
								alt="User Background"
								src={BackgroundDefault}
							/>
						)}
					</div>
				</div>

				<div className={styles.userInfoWrap}>
					<div className={styles.userInfo}>
						<div className={styles.avatar}>
							{talent.avatar ? (
								<LazyLoadImage alt="User Avatar" src={talent.avatar} />
							) : (
								<LazyLoadImage alt="User Avatar" src={AvatarDefault} />
							)}
						</div>
						<h1>
							{talent.name}
							<LazyLoadImage
								alt="Verify"
								src={verify}
								className={styles.verifyIcon}
							/>
						</h1>
						<p>
							{talent.city && talent.region
								? `${talent.city}, ${talent.region}`
								: talent.city && talent.region
								? `${talent.city}, ${talent.region}`
								: talent.city
								? `${talent.city}`
								: talent.region
								? `${talent.region}`
								: ""}
						</p>
						<p>{talent.language}</p>
						<a
							href={talent.linkedin}
							target="_blank"
							rel="noopener noreferrer">
							LinkedIn Profile
						</a>
					</div>
					<div className={styles.userActions}>
						{chatInvitation === "waiting" ? (
							<Button
								style={{
									borderRadius: "0.5rem",
									backgroundColor: "green",
								}}
								type="primary"
								loading={loadingRequestChatInvitation}
								onClick={() => handleInvite(talent._id)}>
								Requested
							</Button>
						) : chatInvitation === "accepted" ? (
							<Button
								style={{
									borderRadius: "0.5rem",
								}}
								type="primary"
								loading={loadingRequestChatInvitation}>
								Chat Now
							</Button>
						) : (
							<Button
								style={{
									borderRadius: "0.5rem",
								}}
								type="primary"
								loading={loadingRequestChatInvitation}
								onClick={() =>
									handleRequestChatInvitation(talent._id, talent.name)
								}>
								Send Request
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TalentProfileCard;
