import React from "react";
import styles from "./styles.module.scss";
import ProjectCard from "./ProjectCard";
import ProjectInfo from "./ProjectInfo";
import LazyLoading from "components/UI/LazyLoading";

const ProjectDetails = ({ projectDetails }) => {
	return (
		<div className={styles.projectDetailWrap}>
			<LazyLoading>
				<ProjectCard projectDetails={projectDetails} />
			</LazyLoading>
			<LazyLoading>
				<ProjectInfo projectDetails={projectDetails} />
			</LazyLoading>
		</div>
	);
};

export default ProjectDetails;
