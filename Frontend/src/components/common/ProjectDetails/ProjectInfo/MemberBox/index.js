import React from "react";
import styles from "./styles.module.scss";
import AvatarDefault from "assets/images/default/AvatarDefault.png";

const MemberBox = ({ member, openModalMemberDetails }) => {
	return (
		<div className={styles.memberBoxWrap}>
			<div className={styles.memberBoxAvatar}>
				<img
					src={member.avatar ? member.avatar : AvatarDefault}
					onError={(e) => {
						e.target.onerror = null;
						e.target.src = AvatarDefault;
					}}
					alt={member.name}
					onClick={() => openModalMemberDetails(member)}
				/>
			</div>
			<span
				className={styles.memberBoxName}
				onClick={() => openModalMemberDetails(member)}>
				{member.name}
			</span>
		</div>
	);
};

export default MemberBox;
