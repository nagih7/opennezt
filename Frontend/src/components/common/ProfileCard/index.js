import React from "react";
import styles from "./styles.module.scss";
import verify from "../../../assets/images/icon/verify.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BackgroundDefault from "../../../assets/images/default/BackgroundDefault.png";
import AvatarDefault from "../../../assets/images/default/AvatarDefault.png";
import { Button, Tooltip } from "antd";
import ProfileCardSkeleton from "./ProfileCardSkeleton";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { matchingProjects } from "api/artificialIntelligence";
import { setOpenModalMatchingProjects } from "states/modules/artificialIntelligence";
import {
	MATCHING_PROJECTS_WITH_AI,
	LINKEDIN_PROFILE,
	VIEW_MATCHING_PROJECTS,
	UPDATE_PROFILE,
} from "utils/constains";

const ProfileCard = (props) => {
	const dispatch = useDispatch();
	const { handleOpenModal } = props;

	const { authUser } = useSelector((state) => state.auth);
	const { language } = useSelector((state) => state.app);
	const { founderProfile } = useSelector((state) => state.founder);
	const { loadingUpdateFounderProfile, loadingGetFounderProfile } =
		useSelector((state) => state.founder);
	const { projects, loadingMatchingProjects } = useSelector(
		(state) => state.artificialIntelligence
	);

	const handleMatchingWithAI = () => {
		dispatch(matchingProjects());
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
									{LINKEDIN_PROFILE[language]}
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
									{VIEW_MATCHING_PROJECTS[language]}
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
									{MATCHING_PROJECTS_WITH_AI[language]}
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
										{MATCHING_PROJECTS_WITH_AI[language]}
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
								{UPDATE_PROFILE[language]}
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileCard;
