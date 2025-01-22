import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Select, Button, Input } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import {
	SECTOR,
	EXPERIENCE_LEVEL,
	EDUCATION_LEVEL,
	COMMITMENT,
	LOCATION,
	LANGUAGE,
	SEARCH,
	RESET,
	INPUT_PLACEHOLDER,
} from "utils/constains";
import { useDispatch, useSelector } from "react-redux";
import { recruitTalents } from "api/talent";
import {
	setFormRecruitTalents,
	resetFormRecruitTalents,
} from "states/modules/talent";

const RecruitWrap = () => {
	const dispatch = useDispatch();
	const { loadingRecruitTalents, formRecruitTalents } = useSelector(
		(state) => state.talent
	);
	const { language } = useSelector((state) => state.app);

	const [canDeleteForm, setCanDeleteForm] = useState(false);

	useEffect(() => {
		if (
			formRecruitTalents.keyword ||
			formRecruitTalents.sector ||
			formRecruitTalents.experience_level ||
			formRecruitTalents.education_level ||
			formRecruitTalents.commitment ||
			formRecruitTalents.location ||
			formRecruitTalents.language
		) {
			setCanDeleteForm(true);
		}
	}, [formRecruitTalents]);

	const handleOnChange = (event, nameSelect) => {
		console.log(event, nameSelect);
		dispatch(setFormRecruitTalents({ event, nameSelect }));
	};

	const handleConfirmRecruitTalents = () => {
		dispatch(
			recruitTalents({
				...formRecruitTalents,
				keyword: formRecruitTalents.keyword ?? "",
				sector: formRecruitTalents.sector ?? "",
				experience_level: formRecruitTalents.experience_level ?? "",
				education_level: formRecruitTalents.education_level ?? "",
				commitment: formRecruitTalents.commitment ?? "",
				location: formRecruitTalents.location ?? "",
				language: formRecruitTalents.language ?? "",
			})
		);
	};

	const handleResetForm = () => {
		setCanDeleteForm(false);
		dispatch(
			recruitTalents({
				keyword: "",
				sector: "",
				experience_level: "",
				education_level: "",
				commitment: "",
				location: "",
				language: "",
				page: 0,
			})
		);
		dispatch(resetFormRecruitTalents());
	};

	console.log(formRecruitTalents);

	return (
		<div className={styles.recruitWrap}>
			<Button
				// disabled={!canDeleteForm || loadingRecruitTalents}
				disabled={
					formRecruitTalents.page <= 1 &&
					formRecruitTalents.keyword === null &&
					formRecruitTalents.sector === null &&
					formRecruitTalents.experience_level === null &&
					formRecruitTalents.education_level === null &&
					formRecruitTalents.commitment === null &&
					formRecruitTalents.location === null &&
					formRecruitTalents.language === null
				}
				className={styles.deleteButton}
				type="dashed"
				danger
				icon={<DeleteOutlined />}
				onClick={() => handleResetForm()}>
				{RESET[language]}
			</Button>
			<div className={styles.recruitSelectWrap}>
				<Input
					value={formRecruitTalents.keyword}
					placeholder={INPUT_PLACEHOLDER.NAME[language]}
					style={{ width: "100%", borderRadius: "8px" }}
					onChange={(e) => handleOnChange(e.target, "keyword")}
				/>
				<Select
					value={formRecruitTalents.sector}
					style={{ width: "13rem" }}
					showSearch
					placeholder={INPUT_PLACEHOLDER.SECTOR[language]}
					options={SECTOR[language]}
					optionLabelProp="label"
					onChange={(value, option) => handleOnChange(option, "sector")}
				/>
				<Select
					value={formRecruitTalents.experience_level}
					style={{ width: "13rem" }}
					showSearch
					placeholder={INPUT_PLACEHOLDER.EXPERIENCE_LEVEL[language]}
					options={EXPERIENCE_LEVEL[language]}
					onChange={(value, option) =>
						handleOnChange(option, "experience_level")
					}
				/>
				<Select
					value={formRecruitTalents.education_level}
					style={{ width: "13rem" }}
					showSearch
					placeholder={INPUT_PLACEHOLDER.EDUCATION_LEVEL[language]}
					options={EDUCATION_LEVEL[language]}
					onChange={(value, option) =>
						handleOnChange(option, "education_level")
					}
				/>
				<Select
					value={formRecruitTalents.commitment}
					style={{ width: "13rem" }}
					showSearch
					placeholder={INPUT_PLACEHOLDER.COMMITMENT[language]}
					options={COMMITMENT[language]}
					onChange={(value, option) =>
						handleOnChange(option, "commitment")
					}
				/>
				<Select
					value={formRecruitTalents.location}
					style={{ width: "13rem" }}
					showSearch
					placeholder={INPUT_PLACEHOLDER.LOCATION[language]}
					options={LOCATION[language]}
					onChange={(value, option) => handleOnChange(option, "location")}
				/>
				<Select
					value={formRecruitTalents.language}
					style={{ width: "13rem" }}
					showSearch
					placeholder={INPUT_PLACEHOLDER.LANGUAGE[language]}
					options={LANGUAGE[language]}
					onChange={(value, option) => handleOnChange(option, "language")}
				/>
			</div>
			<Button
				className={styles.recruitButton}
				type="primary"
				icon={<SearchOutlined />}
				loading={loadingRecruitTalents}
				onClick={handleConfirmRecruitTalents}>
				{SEARCH[language]}
			</Button>
		</div>
	);
};

export default RecruitWrap;
