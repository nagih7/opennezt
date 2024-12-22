import React from "react";
import styles from "./styles.module.scss";
import { Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
	listSector,
	listExperienceLevel,
	listEducationLevel,
	listCommitment,
	listLocation,
	listLanguage,
} from "components/common/ListSelected";

const RecruitWrap = ({
	handleOnChange,
	handleConfirmRecruitTalents,
	loadingRecruitTalents,
}) => {
	return (
		<div className={styles.recruitWrap}>
			<div className={styles.recruitSelectWrap}>
				<Select
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
