import React from "react";
import styles from "./styles.module.scss";
import TalentProfileCard from "../TalentProfileCard";
import FounderProfile from "../FounderProfile";
import TalentProfileSkeleton from "components/skeleton/TalentProfileSkeleton";
import { useSelector } from "react-redux";

function TalentProfile({ talent }) {
	const { talent_profile, ...user_data } = talent;

	const { loadingGetTalentDetails } = useSelector((state) => state.talent);

	return (
		<div className={styles.talentProfileWrap}>
			{talent && <TalentProfileCard talent={user_data} />}
			{loadingGetTalentDetails ? (
				<TalentProfileSkeleton />
			) : (
				<FounderProfile founderProfile={talent_profile} />
			)}
		</div>
	);
}

export default TalentProfile;
