import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import store from "states/configureStore";
import { recruitTalents, skipTalent, getTalentDetails } from "api/talent";
import { getChatInvitation } from "api/chat";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import LazyLoadingMedium from "components/UI/LazyLoadingMedium";

const RecruitWrap = React.lazy(() => import("./RecuitWrap"));
const ListTalents = React.lazy(() => import("./ListTalents"));
const TalentProfile = React.lazy(() =>
	import("components/common/TalentProfile")
);

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
		per_page: 10,
	});
	const [skip, setSkip] = useState(0);
	const [modalTalentDetails, setModalTalentDetails] = useState(false);

	// useEffect(() => {
	// 	store.dispatch(
	// 		recruitTalents({
	// 			page: 1,
	// 			per_page: 10,
	// 		})
	// 	);
	// }, []);

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
		await store.dispatch(getTalentDetails(id));
		await store.dispatch(getChatInvitation(id));
		setModalTalentDetails(true);
	};

	const handleClosePopup = () => {
		setModalTalentDetails(false);
	};

	return (
		<div className={styles.searchContainer}>
			<LazyLoadingMedium>
				<RecruitWrap
					handleOnChange={handleOnChange}
					handleConfirmRecruitTalents={handleConfirmRecruitTalents}
					loadingRecruitTalents={loadingRecruitTalents}
				/>
			</LazyLoadingMedium>
			<LazyLoadingMedium>
				<ListTalents
					talents={talents}
					handleGetDetailTalent={handleGetDetailTalent}
				/>
			</LazyLoadingMedium>

			<Modal
				title=""
				okText="OK"
				open={modalTalentDetails}
				onOk={handleClosePopup}
				confirmLoading={false}
				onCancel={handleClosePopup}
				width={1000}>
				<LazyLoadingMedium>
					<TalentProfile talent={talentDetails} handleSkip={handleSkip} />
				</LazyLoadingMedium>
			</Modal>
		</div>
	);
}

export default RecruitTalents;
