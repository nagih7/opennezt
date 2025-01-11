import React, { useState } from "react";
import styles from "./styles.module.scss";
import AvatarDefault from "assets/images/default/AvatarDefault.png";
import { Button, Space, Tag } from "antd";
import InfoIcon from "@mui/icons-material/Info";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { getRequestAddFriend, sendRequestAddFriend } from "api/notification";
import { useDispatch } from "react-redux";

const BoxBasicTalent = ({ talentInfo, handleGetDetailTalent }) => {
	const [talent, setTalent] = useState(talentInfo);

	const dispatch = useDispatch();
	const handleRequestAddFriend = async (user_id) => {
		const requestMessageForm = {
			user_id: user_id,
			metadata: {},
		};
		dispatch(sendRequestAddFriend(requestMessageForm));
		setTalent({ ...talent, friend_request: true });
	};

	return (
		<div className={styles.boxBasicTalentWrap}>
			<div className={styles.avatarTalent}>
				<img
					src={talent.user_data.avatar || AvatarDefault}
					alt={talent.user_data.name}
				/>
			</div>
			<div className={styles.boxBasicTalentContent}>
				<div className={styles.nameTalent}>{talent.user_data.name}</div>
				<div className={styles.moreInfo}>
					<div className={styles.industriesTalent}>
						<Space size={1} wrap>
							{talent.industry?.slice(0, 2).map((industry) => (
								<Tag key={industry} color="red">
									{industry}
								</Tag>
							))}
							{talent.industry?.length > 2 ? (
								<Tag color="red">...</Tag>
							) : (
								""
							)}
						</Space>
					</div>
					<div className={styles.moreInfoTalent}>
						<Tag color="green">
							{talent.user_data.language.join(", ")}
						</Tag>
						{talent.user_data.region ? (
							<Tag color="blue">{talent.user_data.region}</Tag>
						) : (
							""
						)}
						{talent.user_data.city ? (
							<Tag color="blue">{talent.user_data.city}</Tag>
						) : (
							""
						)}
					</div>
				</div>
				<div className={styles.actionsTalent}>
					<Button
						style={{
							borderRadius: "4px",
							height: "2rem",
							width: "100%",
						}}
						color="primary"
						variant="outlined"
						onClick={() => handleGetDetailTalent(talent.user_data._id)}>
						<InfoIcon />
						View Details
					</Button>
					<Button
						disabled={talent.friend_request}
						style={{
							borderRadius: "4px",
							height: "2rem",
							width: "100%",
						}}
						type="primary"
						loading={false}
						onClick={() => handleRequestAddFriend(talent.user_data._id)}>
						<PersonAddIcon />
						Add friend
					</Button>
				</div>
			</div>
		</div>
	);
};

export default BoxBasicTalent;
