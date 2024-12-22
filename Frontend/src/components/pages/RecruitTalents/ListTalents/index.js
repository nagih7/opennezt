import React from "react";
import styles from "./styles.module.scss";
import BoxBasicTalent from "./BoxBasicTalent";
import TalentCardSkeleton from "components/skeleton/TalentCardSkeleton";
import { useSelector } from "react-redux";

const ListTalents = ({ talents, handleGetDetailTalent }) => {
	const { loadingRecruitTalents } = useSelector((state) => state.talent);
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
							talent={talent}
							handleGetDetailTalent={handleGetDetailTalent}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default ListTalents;
