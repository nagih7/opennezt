import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "antd";
import LazyLoading from "components/UI/LazyLoading";
import AvatarDefault from "assets/images/default/AvatarDefault.png";
import { COMPATIBILITY, VIEW_DETAILS } from "utils/constains";
import styles from "./styles.module.scss";
import { setOpenModalMatchingTalents } from "states/modules/artificialIntelligence";
import { getTalentDetails } from "api/talent";
import { getRequestAddFriend } from "api/notification";
import TalentProfile from "components/common/TalentProfile";
import Compatibility from "components/UI/Compatibility";

const MatchingTalentsModal = () => {
	const dispatch = useDispatch();
	const { openModalMatchingTalents, talents } = useSelector(
		(state) => state.artificialIntelligence
	);
	const { language } = useSelector((state) => state.app);

	const [modalTalentDetails, setModalTalentDetails] = useState(false);

	const handleGetDetailTalent = useCallback(
		(id) => {
			setModalTalentDetails(true);
			dispatch(getTalentDetails(id));
			dispatch(getRequestAddFriend(id));
		},
		[dispatch]
	);

	return (
		<>
			<Modal
				title=""
				okText="Update now"
				open={openModalMatchingTalents}
				footer={null}
				onCancel={() => dispatch(setOpenModalMatchingTalents(false))}
				width={1000}>
				<LazyLoading>
					<div className={styles.modalMatchingTalentsWrap}>
						{talents.map((talent, index) => (
							<div className={styles.talentWrap} key={index}>
								<div className={styles.talentAvatar}>
									<img
										src={talent.avatar || AvatarDefault}
										alt={talent.name}
										onError={(e) => {
											e.target.onerror = null;
											e.target.src = AvatarDefault;
										}}
									/>
								</div>
								<span className={styles.name}>{talent.name}</span>
								<div className={styles.matchScore}>
									<Compatibility percent={talent.match_score} />
									{COMPATIBILITY[language]}
								</div>
								<div className={styles.talentActions}>
									<Button
										type="primary"
										onClick={() => handleGetDetailTalent(talent._id)}>
										{VIEW_DETAILS[language]}
									</Button>
								</div>
							</div>
						))}
					</div>
				</LazyLoading>
			</Modal>
			<Modal
				footer={null}
				title=""
				okText="OK"
				open={modalTalentDetails}
				confirmLoading={false}
				onCancel={() => setModalTalentDetails(false)}
				width={1000}>
				<LazyLoading>
					<TalentProfile />
				</LazyLoading>
			</Modal>
		</>
	);
};

export default MatchingTalentsModal;
