import React, { useState, useCallback } from "react";
import styles from "./styles.module.scss";
import store from "states/configureStore";
import { recruitTalents, skipTalent } from "api/talent";
import axios from "axios";
import RecruitWrap from "./RecuitWrap";
import TalentProfile from "components/common/TalentProfile";
import { useSelector } from "react-redux";
import { set } from "lodash";

function RecruitTalents() {
	const { talents, loadingRecruitTalents } = useSelector(
		(state) => state.talent
	);
	const [formRecruitTalents, setFormRecruitTalents] = useState({
		sector: "",
		expertise_level: "",
		education_level: "",
		commitment: "",
		location: "",
		language: "",
	});
	const [skip, setSkip] = useState(0);
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

	const token = localStorage.getItem("token");

	const getUserIdFromToken = useCallback(() => {
		const decodedToken = JSON.parse(atob(token.split(".")[1]));
		return decodedToken.data.user_id;
	}, [token]);
	const userId = getUserIdFromToken();

	const mess = "hi";
	const date = new Date().toISOString();
	const createChat = async (userId, talentId, mess, date) => {
		try {
			const token = localStorage.getItem("token");
			const ws = new WebSocket(
				`${process.env.REACT_APP_WS_URL}/chat?token=${token}`
			);
			console.log(ws);
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/chat/create-chat`,
				{
					userId,
					receiverId: talentId,
					message: mess,
					date: date,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(response.data.message);

			ws.onopen = () => {
				console.log("WebSocket connection established");
			};
			ws.onmessage = (message) => {
				console.log("Received message:", message.data);
			};
		} catch (error) {
			console.error("Error creating chat:", error);
		}
	};

	return (
		<div className={styles.searchContainer}>
			<RecruitWrap
				handleOnChange={handleOnChange}
				handleConfirmRecruitTalents={handleConfirmRecruitTalents}
				loadingRecruitTalents={loadingRecruitTalents}
			/>
			<TalentProfile talent={talents} handleSkip={handleSkip} />
		</div>
	);
}

export default RecruitTalents;
