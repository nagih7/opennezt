import React from "react";
import styles from "./styles.module.scss";
import AvatarDefault from "assets/images/default/AvatarDefault.png";
import { getTalentDetails } from "api/talent";
import { useDispatch } from "react-redux";

const MemberBox = ({ member }) => {
	const dispatch = useDispatch();

	const showMemberDetails = (member) => {
		console.log("member", member);
		dispatch(getTalentDetails(member._id));
	};

	return (
		<div className={styles.memberBoxWrap}>
			<div className={styles.memberBoxAvatar}>
				<img
					src={member.avatar ? member.avatar : AvatarDefault}
					alt={member.name}
					onClick={() => showMemberDetails(member)}
				/>
			</div>
			<span
				className={styles.memberBoxName}
				onClick={() => showMemberDetails(member)}>
				{member.name}
			</span>
		</div>
	);
};

export default MemberBox;
