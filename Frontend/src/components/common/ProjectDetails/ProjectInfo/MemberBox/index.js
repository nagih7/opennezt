import React from "react";
import styles from "./styles.module.scss";
import AvatarDefault from "assets/images/default/AvatarDefault.png";

const MemberBox = ({ member }) => {
	return (
		<div className={styles.memberBoxWrap}>
			<div className={styles.memberBoxAvatar}>
				<img
					src={member.avatar ? member.avatar : AvatarDefault}
					alt={member.name}
				/>
			</div>
			<span className={styles.memberBoxName}>{member.name}</span>
		</div>
	);
};

export default MemberBox;
