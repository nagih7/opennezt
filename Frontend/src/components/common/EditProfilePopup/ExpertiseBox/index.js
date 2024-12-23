import React from "react";
import { Select, Space } from "antd";

const ExpertiseBox = ({
	listValue,
	ExpertiseName,
	ExpertiseTarget,
	onChange,
	value,
}) => {
	return (
		<div style={{ display: "flex", alignItems: "center", width: "100%" }}>
			<span style={{ width: "15rem", display: "flex" }}>
				{ExpertiseName}
			</span>
			<Select
				value={value}
				mode="multiple"
				style={{
					width: "100%",
				}}
				required
				size="large"
				placeholder="Select your expertise*"
				onChange={(value) => onChange(value, { ExpertiseTarget })}
				options={listValue}
			/>
			{/* <Select
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
				
			/> */}
		</div>
	);
};

export default ExpertiseBox;
