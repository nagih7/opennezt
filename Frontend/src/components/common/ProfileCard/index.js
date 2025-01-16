import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import verify from "../../../assets/images/icon/verify.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BackgroundDefault from "../../../assets/images/default/BackgroundDefault.png";
import AvatarDefault from "../../../assets/images/default/AvatarDefault.png";
import { Button, message, Progress, Tooltip } from "antd";
import ProfileCardSkeleton from "./ProfileCardSkeleton";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { matchingProjects } from "api/artificialIntelligence";
import { setOpenModalMatchingProjects } from "states/modules/artificialIntelligence";

const ProfileCard = (props) => {
	const dispatch = useDispatch();
	const { handleOpenModal } = props;

	const { authUser } = useSelector((state) => state.auth);
	const { founderProfile } = useSelector((state) => state.founder);
	const { loadingUpdateFounderProfile, loadingGetFounderProfile } =
		useSelector((state) => state.founder);
	const { projects, loadingMatchingProjects, matchedProjects } = useSelector(
		(state) => state.artificialIntelligence
	);

	const handleMatchingWithAI = () => {
		dispatch(matchingProjects());
		message.loading({
			content: "Matching projects with AI...",
			key: "matchingProjects",
			duration: 100000,
		});
	};

	const handleViewMatchingProjects = () => {
		dispatch(setOpenModalMatchingProjects(true));
	};

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
							<p>{authUser.language && authUser.language.join(", ")}</p>
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
							{projects && projects.length > 0 ? (
								<Button
									color="cyan"
									variant="solid"
									style={{
										borderRadius: "0.5rem",
									}}
									icon={<VisibilityIcon />}
									loading={false}
									onClick={handleViewMatchingProjects}>
									View Matching Projects
								</Button>
							) : founderProfile &&
							  founderProfile.industry &&
							  founderProfile.areas_of_expertise ? (
								<Button
									style={{
										borderRadius: "0.5rem",
									}}
									icon={<SearchOutlined />}
									type="primary"
									loading={loadingMatchingProjects}
									onClick={handleMatchingWithAI}>
									Matching with AI
								</Button>
							) : (
								<Tooltip title="Please update your profile to get matching projects">
									<Button
										disabled
										style={{
											borderRadius: "0.5rem",
										}}
										icon={<SearchOutlined />}
										type="primary"
										loading={loadingMatchingProjects}
										onClick={handleMatchingWithAI}>
										Matching with AI
									</Button>
								</Tooltip>
							)}
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
