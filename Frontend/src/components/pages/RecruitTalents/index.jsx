import React, { useState } from "react";
import styles from "./styles.module.scss";
import { recruitTalents, getTalentDetails } from "api/talent";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import { getRequestAddFriend } from "api/notification";
import RecruitWrap from "./RecuitWrap";
import ListTalents from "./ListTalents";
import TalentProfile from "components/common/TalentProfile";

function RecruitTalents() {
	const dispatch = useDispatch();
	const { talents, loadingRecruitTalents, talentDetails } = useSelector(
		(state) => state.talent
	);
	const [formRecruitTalents, setFormRecruitTalents] = useState({
		sector: "",
		experience_level: "",
		education_level: "",
		commitment: "",
		location: "",
		language: "",
		page: 1,
		per_page: 12,
	});
	const [skip, setSkip] = useState(0);
	const [modalTalentDetails, setModalTalentDetails] = useState(false);

	const handleOnChange = (event, nameSelect) => {
		if (nameSelect) {
			setFormRecruitTalents((prevState) => ({
				...prevState,
				[nameSelect]: event,
			}));
		} else {
			const { name, value } = event.target;
			setFormRecruitTalents((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};
	const handleConfirmRecruitTalents = () => {
		dispatch(recruitTalents({ ...formRecruitTalents, skip: 0 }));
		setSkip(0);
	};

	const handleGetDetailTalent = (id) => {
		setModalTalentDetails(true);
		dispatch(getTalentDetails(id));
		dispatch(getRequestAddFriend(id));
	};

	const handleClosePopup = () => {
		setModalTalentDetails(false);
	};

	return (
		<div className={styles.searchContainer}>
			<RecruitWrap
				handleOnChange={handleOnChange}
				handleConfirmRecruitTalents={handleConfirmRecruitTalents}
				loadingRecruitTalents={loadingRecruitTalents}
			/>
			<ListTalents
				talents={talents}
				handleGetDetailTalent={handleGetDetailTalent}
			/>

			<Modal
				footer={null}
				title=""
				okText="OK"
				open={modalTalentDetails}
				onOk={handleClosePopup}
				confirmLoading={false}
				onCancel={handleClosePopup}
				width={1000}>
				<TalentProfile talent={talentDetails} />
			</Modal>
		</div>
	);
}

export default RecruitTalents;
