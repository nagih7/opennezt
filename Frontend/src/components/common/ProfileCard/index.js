import React from "react";
import styles from "./styles.module.scss";
import verify from "../../../assets/images/icon/verify.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BackgroundDefault from "../../../assets/images/default/BackgroundDefault.png";
import AvatarDefault from "../../../assets/images/default/AvatarDefault.png";
import { Button } from "antd";
import ProfileCardSkeleton from "./ProfileCardSkeleton";
import { useSelector } from "react-redux";

const ProfileCard = (props) => {
	const { handleOpenModal } = props;

	const authUser = useSelector((state) => state.auth.authUser);
	const { loadingUpdateFounderProfile, loadingGetFounderProfile } =
		useSelector((state) => state.founder);

	return (
		<div className={styles.profileCardWrap}>
			{loadingGetFounderProfile ? (
				<ProfileCardSkeleton />
			) : (
				<div className={styles.bannerContainer}>
					<div className={styles.banner}>
						<div className={styles.background}>
							<LazyLoadImage
								alt={authUser.name}
								src={authUser.background || BackgroundDefault}
								onError={(e) => {
									e.target.onerror = null;
									e.target.src = BackgroundDefault;
								}}
							/>
						</div>
					</div>

					<div className={styles.userInfoWrap}>
						<div className={styles.userInfo}>
							<div className={styles.avatar}>
								<LazyLoadImage
									alt={authUser.name}
									src={authUser.avatar || AvatarDefault}
									onError={(e) => {
										e.target.onerror = null;
										e.target.src = AvatarDefault;
									}}
								/>
							</div>
							<h1>
								{authUser.name}
								<LazyLoadImage
									alt="icon-verify"
									src={verify}
									className={styles.verifyIcon}
								/>
							</h1>
							<p>
								{authUser.city && authUser.region
									? `${authUser.city}, ${authUser.region}`
									: authUser.city && authUser.region
									? `${authUser.city}, ${authUser.region}`
									: authUser.city
									? `${authUser.city}`
									: authUser.region
									? `${authUser.region}`
									: ""}
							</p>
							<p>{authUser.language.join(", ")}</p>
							{authUser.linkedin && (
								<a
									href={authUser.linkedin}
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
			)}
		</div>
	);
};

export default ProfileCard;
