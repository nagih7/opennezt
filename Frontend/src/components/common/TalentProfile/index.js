import React from "react";
import styles from "./styles.module.scss";
import TalentProfileCard from "../TalentProfileCard";
import FounderProfile from "../FounderProfile";

function TalentProfile({ talent, handleSkip }) {
	return (
		<div className={styles.talentProfileWrap}>
			{talent && talent.user_data && (
				<TalentProfileCard
					talent={talent.user_data}
					handleSkip={handleSkip}
				/>
			)}
			{talent && talent.industry && talent.industry && (
				<div className={styles.talentDetailsWrap}>
					<FounderProfile founderProfile={talent} />
				</div>
			)}
		</div>
	);
}

export default TalentProfile;
