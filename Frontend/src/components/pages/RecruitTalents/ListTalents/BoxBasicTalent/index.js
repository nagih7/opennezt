import React from "react";
import styles from "./styles.module.scss";
import AvatarDefault from "assets/images/default/AvatarDefault.png";
import { Button } from "antd";

const BoxBasicTalent = ({ talent, handleGetDetailTalent }) => {
	return (
		<div className={styles.boxBasicTalentWrap}>
			<div className={styles.avatarTalent}>
				{talent.user_data.avatar ? (
					<img src={talent.user_data.avatar} alt="Avatar" />
				) : (
					<img src={AvatarDefault} alt="Avatar" />
				)}
			</div>
			<div className={styles.boxBasicTalentContent}>
				<div className={styles.nameTalent}>
					<h4>{talent.user_data.name}</h4>
				</div>
				<div className={styles.industriesTalent}>
					{talent.industry.join(", ")}
				</div>
				<div className={styles.moreInfoTalent}>
					{talent.user_data.region}, {talent.user_data.city},{" "}
					{talent.user_data.language}
				</div>
				<div className={styles.actionsTalent}>
					<Button
						style={{
							borderRadius: "0.5rem",
							height: "2rem",
						}}
						type="primary"
						// loading={loadingGetTalentDetails}
						onClick={() => handleGetDetailTalent(talent.user_data._id)}>
						View Details
					</Button>
				</div>
			</div>
		</div>
	);
};

export default BoxBasicTalent;
