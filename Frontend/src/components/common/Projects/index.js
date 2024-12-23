import React from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import ProjectBox from "./ProjectBox";
import ProjectInvitationsSkeleton from "../ProjectInvitationsSkeleton";

const Projects = ({ inviteeId }) => {
	const { projects, loadingGetProjectInvitations } = useSelector(
		(state) => state.project
	);

	return (
		<div className={styles.projectsWrap}>
			{loadingGetProjectInvitations ? (
				<ProjectInvitationsSkeleton count={projects.length} />
			) : (
				projects.map((project, index) => (
					<ProjectBox
						key={index}
						project={project}
						inviteeId={inviteeId}
					/>
				))
			)}
		</div>
	);
};

export default Projects;
