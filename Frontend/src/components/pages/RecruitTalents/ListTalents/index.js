import React from "react";
import styles from "./styles.module.scss";
import BoxBasicTalent from "./BoxBasicTalent";

const ListTalents = ({ talents, handleGetDetailTalent }) => {
	return (
		<div className={styles.listTalentsWrap}>
			{talents.length > 0 &&
				talents.map((talent, index) => (
					<BoxBasicTalent
						key={talent.user_data._id}
						index={index}
						talent={talent}
						handleGetDetailTalent={handleGetDetailTalent}
					/>
				))}
		</div>
	);
};

export default ListTalents;
