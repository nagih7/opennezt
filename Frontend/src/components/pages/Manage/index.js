import React from "react";
import styles from "./styles.module.scss";
import RoleManage from "./components/RoleManage";
import TypeManage from "./components/TypeManage";
import IndustryManage from "./components/IndustryManage";
import UserManagement from "../UserManagement";
import ExperienceLevelManage from "./components/ExperienceLevelManage";
import CategoryManage from "./components/CategoryManage";
import SkillManage from "./components/SkillManage";
import OrganizationManage from "./components/OrganizationManage";
import ManageHeader from "./components/ManageHeader";

function Manage() {
	return (
		<div className={styles.dashboardWrap}>
			<ManageHeader />
			<UserManagement />
			{/* <RoleManage />
			<TypeManage />
			<IndustryManage />
			<ExperienceLevelManage />
			<CategoryManage />
			<SkillManage />
			<OrganizationManage /> */}
		</div>
	);
}

export default Manage;
