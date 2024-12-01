import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import store from "states/configureStore";
import { getProjects } from "api/project";
import { useSelector } from "react-redux";
import CreateProjectForm from "./CreateProjectForm";
import ProjectDetails from "components/common/ProjectDetails";

function Project() {
	const projects = useSelector((state) => state.project.projects);

	useEffect(() => {
		store.dispatch(getProjects());
	}, []);

	const [projectDetails, setProjectDetails] = useState(null);
	const [isOpenModalCreateProject, setIsOpenModalCreateProject] =
		useState(false);

	const handleCreateProject = () => {
		setIsOpenModalCreateProject(true);
	};

	const handleProjectClick = (project) => {
		setProjectDetails(project);
	};

	return (
		<div className={styles.projectContainer}>
			<div className={styles.projectHeader}>
				<h2>Project Manager</h2>
				<button className={styles.btnCreate} onClick={handleCreateProject}>
					Create New Project
				</button>
			</div>

			{isOpenModalCreateProject ? (
				<CreateProjectForm />
			) : projectDetails ? (
				<ProjectDetails projectDetails={projectDetails} />
			) : (
				<div className={styles.projectsList}>
					{projects &&
						projects.length > 0 &&
						projects.map((project) => (
							<div
								key={project._id}
								className={styles.projectItem}
								style={{
									backgroundImage: `url(${project.background})`,
								}}
								onClick={() => handleProjectClick(project)}>
								<h4>{project.name}</h4>
								<p>{project.problem}</p>
							</div>
						))}
				</div>
			)}
		</div>
	);
}

export default Project;
