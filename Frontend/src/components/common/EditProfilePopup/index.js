import React from "react";
import styles from "./styles.module.scss";
import ExpertiseBox from "./ExpertiseBox";
import { listAreaOfExpertise, listCommitment } from "../ListSelected";
import { Select, Input } from "antd";
const { TextArea } = Input;
import {
	PROFESSIONAL_PROFILE,
	INPUT_PLACEHOLDER,
	SECTOR,
	EXPERIENCE_LEVEL,
	EDUCATION_LEVEL,
	CERTIFICATION,
	AREA_OF_EXPERTISE,
	COMMITMENT,
} from "utils/constains";
import { useSelector } from "react-redux";

const EditProfilePopup = ({ formData, onChange }) => {
	const { language } = useSelector((state) => state.app);
	return (
		<div className={styles.popupOverlay}>
			<h2>{PROFESSIONAL_PROFILE.EXPERTISE_BACKGROUND[language]}</h2>
			<Select
				value={formData.industry}
				mode="multiple"
				style={{
					width: "100%",
				}}
				required
				size="large"
				placeholder="What is your primary industry*"
				onChange={(value) => onChange(value, "industry")}
				options={SECTOR[language]}
			/>
			<Select
				value={formData.experience_level}
				required
				showSearch
				placeholder="What is your professional experience level?*"
				optionFilterProp="label"
				onChange={(value) => onChange(value, "experience_level")}
				size="large"
				style={{ width: "100%" }}
				options={EXPERIENCE_LEVEL[language]}
			/>
			<Select
				value={formData.degree}
				required
				showSearch
				placeholder="Which degrees do you hold?*"
				optionFilterProp="label"
				onChange={(value) => onChange(value, "degree")}
				size="large"
				style={{ width: "100%" }}
				options={EDUCATION_LEVEL[language]}
			/>
			<Select
				value={formData.certification}
				mode="multiple"
				style={{
					width: "100%",
				}}
				required
				size="large"
				placeholder="Which certifications do you hold?"
				onChange={(value) => onChange(value, "certification")}
				options={CERTIFICATION[language]}
			/>
			<div className={styles.areaOfExpertiseWrap}>
				<h4 style={{ margin: "0" }}>
					{PROFESSIONAL_PROFILE.WHICH_AREA_OF_EXPERTISE[language]}
				</h4>
				<ExpertiseBox
					value={formData.areas_of_expertise.accounting_and_finance}
					listValue={AREA_OF_EXPERTISE[language].ACCOUNTING_AND_FINANCE}
					onChange={onChange}
					ExpertiseName={
						INPUT_PLACEHOLDER.ACCOUNTING_AND_FINANCE[language]
					}
					ExpertiseTarget="accounting_and_finance"
				/>
				<ExpertiseBox
					value={formData.areas_of_expertise.human_resource}
					listValue={AREA_OF_EXPERTISE[language].HUMAN_RESOURCE}
					onChange={onChange}
					ExpertiseName={INPUT_PLACEHOLDER.HUMAN_RESOURCE[language]}
					ExpertiseTarget="human_resource"
				/>
				<ExpertiseBox
					value={formData.areas_of_expertise.international}
					listValue={AREA_OF_EXPERTISE[language].INTERNATIONAL}
					onChange={onChange}
					ExpertiseName={INPUT_PLACEHOLDER.INTERNATIONAL[language]}
					ExpertiseTarget="international"
				/>
				<ExpertiseBox
					value={formData.areas_of_expertise.law_and_legal}
					listValue={AREA_OF_EXPERTISE[language].LAW_AND_LEGAL}
					onChange={onChange}
					ExpertiseName={INPUT_PLACEHOLDER.LAW_AND_LEGAL[language]}
					ExpertiseTarget="law_and_legal"
				/>
				<ExpertiseBox
					value={formData.areas_of_expertise.management}
					listValue={AREA_OF_EXPERTISE[language].MANAGEMENT}
					onChange={onChange}
					ExpertiseName={INPUT_PLACEHOLDER.MANAGEMENT[language]}
					ExpertiseTarget="management"
				/>
				<ExpertiseBox
					value={formData.areas_of_expertise.marketing}
					listValue={AREA_OF_EXPERTISE[language].MARKETING}
					onChange={onChange}
					ExpertiseName={INPUT_PLACEHOLDER.MARKETING[language]}
					ExpertiseTarget="marketing"
				/>
				<ExpertiseBox
					value={formData.areas_of_expertise.operations}
					listValue={AREA_OF_EXPERTISE[language].OPERATIONS}
					onChange={onChange}
					ExpertiseName={INPUT_PLACEHOLDER.OPERATIONS[language]}
					ExpertiseTarget="operations"
				/>
				<ExpertiseBox
					value={formData.areas_of_expertise.sales}
					listValue={AREA_OF_EXPERTISE[language].SALES}
					onChange={onChange}
					ExpertiseName={INPUT_PLACEHOLDER.SALES[language]}
					ExpertiseTarget="sales"
				/>
				<ExpertiseBox
					value={formData.areas_of_expertise.starting_up}
					listValue={AREA_OF_EXPERTISE[language].STARTING_UP}
					onChange={onChange}
					ExpertiseName={INPUT_PLACEHOLDER.STARTING_UP[language]}
					ExpertiseTarget="starting_up"
				/>
				<ExpertiseBox
					value={formData.areas_of_expertise.sustainability}
					listValue={AREA_OF_EXPERTISE[language].SUSTAINABILITY}
					onChange={onChange}
					ExpertiseName={INPUT_PLACEHOLDER.SUSTAINABILITY[language]}
					ExpertiseTarget="sustainability"
				/>
				<ExpertiseBox
					value={formData.areas_of_expertise.technology_and_internet}
					listValue={AREA_OF_EXPERTISE[language].TECHNOLOGY_AND_INTERNET}
					onChange={onChange}
					ExpertiseName={
						INPUT_PLACEHOLDER.TECHNOLOGY_AND_INTERNET[language]
					}
					ExpertiseTarget="technology_and_internet"
				/>
			</div>
			<TextArea
				rows={4}
				required
				value={formData.professional_summary}
				name="professional_summary"
				placeholder="Professional Summary"
				onChange={(e) => onChange(e)}
				maxLength={500}
			/>
			<h2>{PROFESSIONAL_PROFILE.GOALS_AND_EXPECTATIONS[language]}</h2>
			<TextArea
				rows={4}
				value={formData.career_goals}
				name="career_goals"
				placeholder="My career goals"
				onChange={(e) => onChange(e)}
				maxLength={500}
			/>
			<TextArea
				rows={4}
				required
				value={formData.offer}
				name="offer"
				placeholder="What I can offer"
				onChange={(e) => onChange(e)}
				maxLength={500}
			/>
			<TextArea
				required
				rows={4}
				value={formData.expectation}
				name="expectation"
				placeholder="My work expectation"
				onChange={(e) => onChange(e)}
				maxLength={500}
			/>
			<Select
				value={formData.availability}
				required
				showSearch
				placeholder="How much time do you commit to your startup per week?*"
				optionFilterProp="label"
				onChange={(value) => onChange(value, "availability")}
				size="large"
				style={{ width: "100%" }}
				options={listCommitment}
			/>
		</div>
	);
};

export default EditProfilePopup;
