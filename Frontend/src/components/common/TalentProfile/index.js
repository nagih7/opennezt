import React from "react";
import styles from "./styles.module.scss";
import TalentProfileCard from "../TalentProfileCard";
import FounderProfile from "../FounderProfile";
import TalentProfileSkeleton from "components/skeleton/TalentProfileSkeleton";
import TalentProfileCardSkeleton from "components/skeleton/TalentProfileCardSkeleton";
import { useSelector } from "react-redux";

function TalentProfile() {
	const { talentDetails, loadingGetTalentDetails } = useSelector(
		(state) => state.talent
	);
	const { loadingGetRequestAddFriend } = useSelector(
		(state) => state.notification
	);

	return (
		<div className={styles.talentProfileWrap}>
			{loadingGetRequestAddFriend && loadingGetTalentDetails ? (
				<TalentProfileCardSkeleton />
			) : (
				talentDetails && <TalentProfileCard talent={talentDetails} />
			)}
			{loadingGetTalentDetails ? (
				<TalentProfileSkeleton />
			) : (
				talentDetails &&
				talentDetails.talent_profile && (
					<FounderProfile founderProfile={talentDetails.talent_profile} />
				)
			)}
		</div>
	);
}

export default TalentProfile;
