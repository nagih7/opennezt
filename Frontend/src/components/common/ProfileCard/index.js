import React from "react";
import styles from "./styles.module.scss";
import verify from "../../../assets/images/icon/verify.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BackgroundDefault from "../../../assets/images/default/BackgroundDefault.jpg";
import AvatarDefault from "../../../assets/images/default/AvatarDefault.png";

const ProfileCard = (props) => {
	const { background, avatar, name, city, region, language, linkedIn } = props;

	return (
		<div className={styles.profileCardWrap}>
			<div className={styles.bannerContainer}>
				<div className={styles.banner}>
					<div className={styles.background}>
						{background ? (
							<LazyLoadImage alt="User Background" src={background} />
						) : (
							<LazyLoadImage
								alt="User Background"
								src={BackgroundDefault}
							/>
						)}
					</div>
				</div>
				<div className={styles.avatar}>
					{avatar ? (
						<LazyLoadImage alt="User Avatar" src={avatar} />
					) : (
						<LazyLoadImage alt="User Avatar" src={AvatarDefault} />
					)}
				</div>
				<div className={styles.userInfo}>
					<h1>
						{name}
						<LazyLoadImage
							alt="Verify"
							src={verify}
							className={styles.verifyIcon}
						/>
					</h1>
					<p>
						{city}, {region}
					</p>
					<p>{language}</p>
					<a href={linkedIn} target="_blank" rel="noopener noreferrer">
						LinkedIn Profile
					</a>
				</div>
			</div>
		</div>
	);
};

export default ProfileCard;
