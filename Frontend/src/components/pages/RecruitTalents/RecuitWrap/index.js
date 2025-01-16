import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Select, Button, Input } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import {
	listSector,
	listExperienceLevel,
	listEducationLevel,
	listCommitment,
	listLocation,
	listLanguage,
} from "components/common/ListSelected";
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
		dispatch(setFormRecruitTalents({ event, nameSelect }));
	};

	const handleConfirmRecruitTalents = () => {
		console.log(formRecruitTalents);
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
		dispatch(resetFormRecruitTalents());
		setCanDeleteForm(false);
	};

	return (
		<div className={styles.recruitWrap}>
			<Button
				disabled={!canDeleteForm || loadingRecruitTalents}
				className={styles.deleteButton}
				type="dashed"
				danger
				icon={<DeleteOutlined />}
				onClick={() => handleResetForm()}>
				Reset
			</Button>
			<div className={styles.recruitSelectWrap}>
				<Input
					value={formRecruitTalents.keyword}
					placeholder="Name"
					style={{ width: "100%", borderRadius: "8px" }}
					onChange={(e) => handleOnChange(e.target.value, "keyword")}
				/>
				<Select
					value={formRecruitTalents.sector}
					style={{ width: "13rem" }}
					showSearch
					placeholder="Sector"
					filterOption={(input, option) =>
						(option?.label ?? "")
							.toLowerCase()
							.includes(input.toLowerCase())
					}
					options={listSector}
					onChange={(e) => handleOnChange(e, "sector")}
				/>
				<Select
					value={formRecruitTalents.experience_level}
					style={{ width: "13rem" }}
					showSearch
					placeholder="Experience Level"
					filterOption={(input, option) =>
						(option?.label ?? "")
							.toLowerCase()
							.includes(input.toLowerCase())
					}
					options={listExperienceLevel}
					onChange={(e) => handleOnChange(e, "experience_level")}
				/>
				<Select
					value={formRecruitTalents.education_level}
					style={{ width: "13rem" }}
					showSearch
					placeholder="Education Level"
					filterOption={(input, option) =>
						(option?.label ?? "")
							.toLowerCase()
							.includes(input.toLowerCase())
					}
					options={listEducationLevel}
					onChange={(e) => handleOnChange(e, "education_level")}
				/>
				<Select
					value={formRecruitTalents.commitment}
					style={{ width: "13rem" }}
					showSearch
					placeholder="Commitment"
					filterOption={(input, option) =>
						(option?.label ?? "")
							.toLowerCase()
							.includes(input.toLowerCase())
					}
					options={listCommitment}
					onChange={(e) => handleOnChange(e, "commitment")}
				/>
				<Select
					value={formRecruitTalents.location}
					style={{ width: "13rem" }}
					showSearch
					placeholder="Location"
					filterOption={(input, option) =>
						(option?.label ?? "")
							.toLowerCase()
							.includes(input.toLowerCase())
					}
					options={listLocation}
					onChange={(e) => handleOnChange(e, "location")}
				/>
				<Select
					value={formRecruitTalents.language}
					style={{ width: "13rem" }}
					showSearch
					placeholder="Language"
					filterOption={(input, option) =>
						(option?.label ?? "")
							.toLowerCase()
							.includes(input.toLowerCase())
					}
					options={listLanguage}
					onChange={(e) => handleOnChange(e, "language")}
				/>
			</div>
			<Button
				className={styles.recruitButton}
				type="primary"
				icon={<SearchOutlined />}
				loading={loadingRecruitTalents}
				onClick={handleConfirmRecruitTalents}>
				Search
			</Button>
		</div>
	);
};

export default RecruitWrap;
