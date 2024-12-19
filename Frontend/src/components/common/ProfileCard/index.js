import React from "react";
import styles from "./styles.module.scss";
import verify from "../../../assets/images/icon/verify.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BackgroundDefault from "../../../assets/images/default/BackgroundDefault.png";
import AvatarDefault from "../../../assets/images/default/AvatarDefault.png";
import { Button } from "antd";

const ProfileCard = (props) => {
	const { user, handleOpenModal, loadingUpdateFounderProfile } = props;

	return (
		<div className={styles.profileCardWrap}>
			<div className={styles.bannerContainer}>
				<div className={styles.banner}>
					<div className={styles.background}>
						{user.background ? (
							<LazyLoadImage
								alt="User Background"
								src={user.background}
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
							{user.avatar ? (
								<LazyLoadImage alt="User Avatar" src={user.avatar} />
							) : (
								<LazyLoadImage alt="User Avatar" src={AvatarDefault} />
							)}
						</div>
						<h1>
							{user.name}
							<LazyLoadImage
								alt="Verify"
								src={verify}
								className={styles.verifyIcon}
							/>
						</h1>
						<p>
							{user.city && user.region
								? `${user.city}, ${user.region}`
								: user.city && user.region
								? `${user.city}, ${user.region}`
								: user.city
								? `${user.city}`
								: user.region
								? `${user.region}`
								: ""}
						</p>
						<p>{user.language.join(", ")}</p>
						{user.linkedin && (
							<a
								href={user.linkedin}
								target="_blank"
								rel="noopener noreferrer">
								LinkedIn Profile
							</a>
						)}
					</div>
					<div className={styles.userActions}>
						<Button
							style={{
								borderRadius: "0.5rem",
							}}
							type="primary"
							loading={loadingUpdateFounderProfile}
							onClick={() => handleOpenModal()}>
							Update Profile
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileCard;
