import React from "react";
import styles from "./styles.module.scss";
import ExpertiseBox from "./ExpertiseBox";
import {
	listSector,
	listExperienceLevel,
	listEducationLevel,
	listCertification,
	listAreaOfExpertise,
	listCommitment,
} from "../ListSelected";
import { Select, Space, Input } from "antd";
const { TextArea } = Input;

const EditProfilePopup = ({ formData, onChange }) => {
	return (
		<div className={styles.popupOverlay}>
			<h2>Expertise Background</h2>
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
				options={listSector}
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
				options={listExperienceLevel}
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
				options={listEducationLevel}
			/>
			<Select
				value={formData.certification}
				mode="multiple"
				style={{
					width: "100%",
				}}
				required
				size="large"
				placeholder="Which certifications do you hold?*"
				onChange={(value) => onChange(value, "certification")}
				options={listCertification}
			/>
			<div className={styles.areaOfExpertiseWrap}>
				<h4 style={{ margin: "0" }}>
					Which areas of expertise do you contribute?*
				</h4>
				<ExpertiseBox
					value={formData.areas_of_expertise.accounting_and_finance}
					listValue={listAreaOfExpertise.Accounting_and_Finance}
					onChange={onChange}
					ExpertiseName="Accounting and Finance"
					ExpertiseTarget="accounting_and_finance"
				/>
				<ExpertiseBox
					value={formData.areas_of_expertise.human_resource}
					listValue={listAreaOfExpertise.Human_Resources}
					onChange={onChange}
					ExpertiseName="Human Resources"
					ExpertiseTarget="human_resource"
				/>
				<ExpertiseBox
					value={formData.areas_of_expertise.international}
					listValue={listAreaOfExpertise.International}
					onChange={onChange}
					ExpertiseName="International"
					ExpertiseTarget="international"
				/>
				<ExpertiseBox
					value={formData.areas_of_expertise.law_and_legal}
					listValue={listAreaOfExpertise.Law_and_Legal}
					onChange={onChange}
					ExpertiseName="Law and Legal"
					ExpertiseTarget="law_and_legal"
				/>
				<ExpertiseBox
					value={formData.areas_of_expertise.management}
					listValue={listAreaOfExpertise.Management}
					onChange={onChange}
					ExpertiseName="Management"
					ExpertiseTarget="management"
				/>
				<ExpertiseBox
					value={formData.areas_of_expertise.marketing}
					listValue={listAreaOfExpertise.Marketing}
					onChange={onChange}
					ExpertiseName="Marketing"
					ExpertiseTarget="marketing"
				/>
				<ExpertiseBox
					value={formData.areas_of_expertise.operations}
					listValue={listAreaOfExpertise.Operations}
					onChange={onChange}
					ExpertiseName="Operations"
					ExpertiseTarget="operations"
				/>
				<ExpertiseBox
					value={formData.areas_of_expertise.sales}
					listValue={listAreaOfExpertise.Sales}
					onChange={onChange}
					ExpertiseName="Sales"
					ExpertiseTarget="sales"
				/>
				<ExpertiseBox
					value={formData.areas_of_expertise.starting_up}
					listValue={listAreaOfExpertise.Starting_up}
					onChange={onChange}
					ExpertiseName="Starting Up"
					ExpertiseTarget="starting_up"
				/>
				<ExpertiseBox
					value={formData.areas_of_expertise.technology_and_internet}
					listValue={listAreaOfExpertise.Technology_and_Internet}
					onChange={onChange}
					ExpertiseName="Technology and Internet"
					ExpertiseTarget="technology_and_internet"
				/>
			</div>
			<TextArea
				rows={4}
				required
				value={formData.professional_summary}
				name="professional_summary"
				placeholder="Professional Summary*"
				onChange={(e) => onChange(e)}
				maxLength={500}
			/>
			<h2>Goals and Expectations</h2>
			<TextArea
				rows={4}
				value={formData.career_goals}
				name="career_goals"
				placeholder="My career goals*"
				onChange={(e) => onChange(e)}
				maxLength={500}
			/>
			<TextArea
				rows={4}
				required
				value={formData.offer}
				name="offer"
				placeholder="What I can offer*"
				onChange={(e) => onChange(e)}
				maxLength={500}
			/>
			<TextArea
				required
				rows={4}
				value={formData.expectation}
				name="expectation"
				placeholder="My work expectation*"
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
