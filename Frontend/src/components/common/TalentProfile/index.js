import React from "react";
import styles from "./styles.module.scss";
import TalentProfileCard from "../TalentProfileCard";
import FounderProfile from "../FounderProfile";

function TalentProfile({ talent, handleSkip }) {
	const { talent_profile, ...user_data } = talent;
	return (
		<div className={styles.talentProfileWrap}>
			{talent && (
				<TalentProfileCard talent={user_data} handleSkip={handleSkip} />
			)}
			{talent_profile &&
				talent_profile.industry &&
				talent_profile.industry && (
					<div className={styles.talentDetailsWrap}>
						<FounderProfile founderProfile={talent_profile} />
					</div>
				)}
		</div>
	);
}

export default TalentProfile;
