import React from "react";
import styles from "./styles.module.scss";
import LazyLoadingMedium from "components/UI/LazyLoadingMedium";

const TalentProfileCard = React.lazy(() => import("../TalentProfileCard"));
const FounderProfile = React.lazy(() => import("../FounderProfile"));

function TalentProfile({ talent, handleSkip }) {
	const { talent_profile, ...user_data } = talent;
	return (
		<div className={styles.talentProfileWrap}>
			{talent && (
				<LazyLoadingMedium>
					<TalentProfileCard talent={user_data} handleSkip={handleSkip} />
				</LazyLoadingMedium>
			)}
			{talent_profile &&
				talent_profile.industry &&
				talent_profile.industry && (
					<div className={styles.talentDetailsWrap}>
						<LazyLoadingMedium>
							<FounderProfile founderProfile={talent_profile} />
						</LazyLoadingMedium>
					</div>
				)}
		</div>
	);
}

export default TalentProfile;
