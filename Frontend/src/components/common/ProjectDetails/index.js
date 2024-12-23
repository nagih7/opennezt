import React from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";
import ProjectInfo from "./ProjectInfo";
import ProjectCardSkeleton from "components/skeleton/ProjectCardSkeleton";
import ProjectInfoSkeleton from "components/skeleton/ProjectInfoSkeleton";

const ProjectDetails = () => {
	const { loadingGetProjectDetails } = useSelector((state) => state.project);

	return (
		<div className={styles.projectDetailWrap}>
			{loadingGetProjectDetails ? <ProjectCardSkeleton /> : <ProjectCard />}
			{loadingGetProjectDetails ? <ProjectInfoSkeleton /> : <ProjectInfo />}
		</div>
	);
};

export default ProjectDetails;
