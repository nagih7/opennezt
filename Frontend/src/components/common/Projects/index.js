import React from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import LazyLoadingMedium from "components/UI/LazyLoadingMedium";

const ProjectBox = React.lazy(() => import("./ProjectBox"));

const Projects = ({ inviteeId }) => {
	const { projects } = useSelector((state) => state.project);

	return (
		<div className={styles.projectsWrap}>
			{projects.map((project, index) => (
				<LazyLoadingMedium key={index}>
					<ProjectBox project={project} inviteeId={inviteeId} />
				</LazyLoadingMedium>
			))}
		</div>
	);
};

export default Projects;
