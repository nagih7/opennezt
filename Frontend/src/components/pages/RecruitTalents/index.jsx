import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import store from "states/configureStore";
import { recruitTalents, skipTalent, getTalentDetails } from "api/talent";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { getRequestAddFriend } from "api/notification";
import RecruitWrap from "./RecuitWrap";
import ListTalents from "./ListTalents";
import TalentProfile from "components/common/TalentProfile";

function RecruitTalents() {
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
	const handleConfirmRecruitTalents = async () => {
		await store.dispatch(recruitTalents({ ...formRecruitTalents, skip: 0 }));
		setSkip(0);
	};

	const handleSkip = async () => {
		setSkip((prevState) => prevState + 1);
		await store.dispatch(
			skipTalent({ ...formRecruitTalents, skip: skip + 1 })
		);
	};

	const handleGetDetailTalent = async (id) => {
		setModalTalentDetails(true);
		await store.dispatch(getTalentDetails(id));
		await store.dispatch(getRequestAddFriend(id));
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
				<TalentProfile talent={talentDetails} handleSkip={handleSkip} />
			</Modal>
		</div>
	);
}

export default RecruitTalents;
