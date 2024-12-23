import React from "react";
import styles from "./styles.module.scss";
import BoxBasicTalent from "./BoxBasicTalent";
import TalentCardSkeleton from "components/skeleton/TalentCardSkeleton";
import { useSelector } from "react-redux";
import NotFound from "components/UI/NotFound";

const ListTalents = ({ handleGetDetailTalent }) => {
	const { loadingRecruitTalents, talents } = useSelector(
		(state) => state.talent
	);

	if (talents.length === 0 && !loadingRecruitTalents) {
		return <NotFound content={"No suitable talent found"} size={"10rem"} />;
	} else
		return (
			<div className={styles.listTalentsWrap}>
				<div className={styles.listTalentContent}>
					{loadingRecruitTalents ? (
						<TalentCardSkeleton count={12} />
					) : (
						talents.length > 0 &&
						talents.map((talent, index) => (
							<BoxBasicTalent
								key={talent.user_data._id}
								index={index}
								talentInfo={talent}
								handleGetDetailTalent={handleGetDetailTalent}
							/>
						))
					)}
				</div>
			</div>
		);
};

export default ListTalents;
