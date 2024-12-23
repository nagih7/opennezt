import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { recruitTalents, getTalentDetails } from "api/talent";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import { getRequestAddFriend } from "api/notification";
import RecruitWrap from "./RecuitWrap";
import ListTalents from "./ListTalents";
import LazyLoading from "components/UI/LazyLoading";

const TalentProfile = React.lazy(() =>
	import("components/common/TalentProfile")
);

function RecruitTalents() {
	console.log("Re-render RecruitTalents");
	const dispatch = useDispatch();
	const { talents, loadingRecruitTalents, talentRecruitPage } = useSelector(
		(state) => state.talent
	);

	const [formRecruitTalents, setFormRecruitTalents] = useState({
		sector: "",
		experience_level: "",
		education_level: "",
		commitment: "",
		location: "",
		language: "",
		page: 0,
	});

	useEffect(() => {
		setFormRecruitTalents((prevState) => ({
			...prevState,
			page: talentRecruitPage,
		}));
	}, [talentRecruitPage]);

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
		setFormRecruitTalents((prevState) => ({
			...prevState,
			page: 0,
		}));
	};
	const handleConfirmRecruitTalents = () => {
		console.log(formRecruitTalents);
		dispatch(recruitTalents({ ...formRecruitTalents }));
	};

	const handleGetDetailTalent = useCallback(
		(id) => {
			dispatch(getTalentDetails(id));
			dispatch(getRequestAddFriend(id));
			setModalTalentDetails(true);
		},
		[dispatch]
	);

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
				<LazyLoading>
					<TalentProfile />
				</LazyLoading>
			</Modal>
		</div>
	);
}

export default RecruitTalents;
