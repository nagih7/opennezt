import React from "react";
import styles from "./styles.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AvatarDefault from "../../../assets/images/default/AvatarDefault.png";
import BackgroundDefault from "../../../assets/images/default/BackgroundDefault.jpg";
import verify from "../../../assets/images/icon/verify.png";
import { Button } from "antd";
import { useSelector } from "react-redux";

const TalentProfileCard = ({ talent, handleSkip }) => {
	const { loadingSkipTalent } = useSelector((state) => state.talent);

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
				<div className={styles.avatar}>
					{talent.avatar ? (
						<LazyLoadImage alt="User Avatar" src={talent.avatar} />
					) : (
						<LazyLoadImage alt="User Avatar" src={AvatarDefault} />
					)}
				</div>
				<div className={styles.userInfoWrap}>
					<div className={styles.userInfo}>
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
						<Button
							style={{
								borderRadius: "0.5rem",
							}}
							type="primary"
							loading={true}
							// onClick={() => enterLoading(0)}
						>
							Send Message
						</Button>
						<Button
							style={{
								backgroundColor: "#767676",
								color: "#fff",
								borderRadius: "0.5rem",
							}}
							type="primary"
							loading={loadingSkipTalent}
							onClick={handleSkip}>
							Skip for Now
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TalentProfileCard;
