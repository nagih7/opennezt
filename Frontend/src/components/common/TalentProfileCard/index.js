import React from "react";
import styles from "./styles.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AvatarDefault from "../../../assets/images/default/AvatarDefault.png";
import BackgroundDefault from "../../../assets/images/default/BackgroundDefault.png";
import verify from "../../../assets/images/icon/verify.png";
import { Button } from "antd";
import { useSelector } from "react-redux";
import store from "states/configureStore";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
	sendRequestAddFriend,
	getRequestAddFriend,
} from "../../../api/notification";

const TalentProfileCard = ({ talent }) => {
	const { requestAddFriend, loadingSendRequestAddFriend } = useSelector(
		(state) => state.notification
	);

	const handleRequestAddFriend = async (user_id) => {
		const requestMessageForm = {
			user_id: user_id,
			metadata: {},
		};
		await store.dispatch(sendRequestAddFriend(requestMessageForm));
		await store.dispatch(getRequestAddFriend(user_id));
	};

	return (
		<div className={styles.talentProfileCardWrap}>
			<div className={styles.bannerContainer}>
				<div className={styles.banner}>
					<div className={styles.background}>
						<LazyLoadImage
							alt={authUser.name}
							src={talent.background || BackgroundDefault}
						/>
					</div>
				</div>

				<div className={styles.userInfoWrap}>
					<div className={styles.userInfo}>
						<div className={styles.avatar}>
							<LazyLoadImage
								alt={authUser.name}
								src={talent.avatar || AvatarDefault}
							/>
						</div>
						<h1>
							{talent.name}
							<LazyLoadImage
								alt="icon-verify"
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
						<Button
							style={{
								borderRadius: "0.5rem",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: "0.5rem",
							}}
							disabled={requestAddFriend}
							type="primary"
							loading={loadingSendRequestAddFriend}
							onClick={() => handleRequestAddFriend(talent._id)}>
							<PersonAddIcon />
							Add friend
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TalentProfileCard;
