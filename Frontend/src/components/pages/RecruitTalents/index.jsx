import React, { useState } from "react";
import styles from "./styles.module.scss";
import store from "states/configureStore";
import { recruitTalents, skipTalent, getTalentDetails } from "api/talent";
import RecruitWrap from "./RecuitWrap";
import TalentProfile from "components/common/TalentProfile";
import { useSelector } from "react-redux";
import ListTalents from "./ListTalents";
import { Modal } from "antd";

function RecruitTalents() {
	const { talents, loadingRecruitTalents, talentDetails } = useSelector(
		(state) => state.talent
	);
	const [formRecruitTalents, setFormRecruitTalents] = useState({
		sector: "",
		expertise_level: "",
		education_level: "",
		commitment: "",
		location: "",
		language: "",
		page: 1,
		per_page: 10,
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
		await store.dispatch(getTalentDetails(id));
		setModalTalentDetails(true);
	};

	const handleClosePopup = () => {
		setModalTalentDetails(false);
	};

	// const token = localStorage.getItem("token");

	// const getUserIdFromToken = useCallback(() => {
	// 	const decodedToken = JSON.parse(atob(token.split(".")[1]));
	// 	return decodedToken.data.user_id;
	// }, [token]);
	// const userId = getUserIdFromToken();

	// const mess = "hi";
	// const date = new Date().toISOString();
	// const createChat = async (userId, talentId, mess, date) => {
	// 	try {
	// 		const token = localStorage.getItem("token");
	// 		const ws = new WebSocket(
	// 			`${process.env.REACT_APP_WS_URL}/chat?token=${token}`
	// 		);
	// 		console.log(ws);
	// 		const response = await axios.post(
	// 			`${process.env.REACT_APP_API_URL}/chat/create-chat`,
	// 			{
	// 				userId,
	// 				receiverId: talentId,
	// 				message: mess,
	// 				date: date,
	// 			},
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 			}
	// 		);
	// 		console.log(response.data.message);

	// 		ws.onopen = () => {
	// 			console.log("WebSocket connection established");
	// 		};
	// 		ws.onmessage = (message) => {
	// 			console.log("Received message:", message.data);
	// 		};
	// 	} catch (error) {
	// 		console.error("Error creating chat:", error);
	// 	}
	// };

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
