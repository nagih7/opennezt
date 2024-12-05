import React from "react";
import styles from "./styles.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AvatarDefault from "../../../assets/images/default/AvatarDefault.png";
import BackgroundDefault from "../../../assets/images/default/BackgroundDefault.jpg";
import verify from "../../../assets/images/icon/verify.png";
import { Button } from "antd";
import { useSelector } from "react-redux";
import store from "states/configureStore";
import { requestChatInvitation } from "../../../api/chat";

const TalentProfileCard = ({ talent }) => {
	const { loadingRequestChatInvitation, chatInvitation } = useSelector(
		(state) => state.chat
	);

	const handleRequestChatInvitation = async (receiver_id) => {
		console.log("Request Chat Invitation:", receiver_id);
		await store.dispatch(requestChatInvitation(receiver_id));
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
							{talent.city}, {talent.region}
						</p>
						<p>{talent.language}</p>
						<a
							href={talent.linkedIn}
							target="_blank"
							rel="noopener noreferrer">
							LinkedIn Profile
						</a>
					</div>
					<div className={styles.userActions}>
						{chatInvitation === "pending" ? (
							<Button
								style={{
									borderRadius: "0.5rem",
									backgroundColor: "green",
								}}
								type="primary"
								loading={loadingRequestChatInvitation}
								// onClick={() => handleRequestChatInvitation(talent._id)}
							>
								Requested
							</Button>
						) : chatInvitation === "accepted" ? (
							<Button
								style={{
									borderRadius: "0.5rem",
								}}
								type="primary"
								loading={loadingRequestChatInvitation}
								// onClick={() => handleRequestChatInvitation(talent._id)}
							>
								Chat Now
							</Button>
						) : (
							<Button
								style={{
									borderRadius: "0.5rem",
								}}
								type="primary"
								loading={loadingRequestChatInvitation}
								onClick={() => handleRequestChatInvitation(talent._id)}>
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
