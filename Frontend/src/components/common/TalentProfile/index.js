import React from "react";
import styles from "./styles.module.scss";
import TalentProfileCard from "../TalentProfileCard";
import FounderProfile from "../FounderProfile";
import TalentProfileSkeleton from "components/skeleton/TalentProfileSkeleton";
import TalentProfileCardSkeleton from "components/skeleton/TalentProfileCardSkeleton";
import { useSelector } from "react-redux";

const TalentProfile = () => {
	const { talentDetails, isLoadingGetTalentDetails } = useSelector(
		(state) => state.talent
	);
	const { loadingGetRequestAddFriend } = useSelector(
		(state) => state.notification
	);

	return (
		<div className={styles.talentProfileWrap}>
			{loadingGetRequestAddFriend && isLoadingGetTalentDetails ? (
				<TalentProfileCardSkeleton />
			) : (
				talentDetails && <TalentProfileCard talent={talentDetails} />
			)}
			{isLoadingGetTalentDetails ? (
				<TalentProfileSkeleton />
			) : (
				talentDetails &&
				talentDetails.talent_profile && (
					<FounderProfile founderProfile={talentDetails.talent_profile} />
				)
			)}
		</div>
	);
};

export default TalentProfile;
