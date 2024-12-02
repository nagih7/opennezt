import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import store from "states/configureStore";
import { getProjects } from "api/project";
import { useSelector } from "react-redux";
import CreateProjectForm from "./CreateProjectForm";
import ProjectDetails from "components/common/ProjectDetails";
import { Button, Modal } from "antd";

function Project() {
	const projects = useSelector((state) => state.project.projects);

	useEffect(() => {
		store.dispatch(getProjects());
	}, []);

	const [projectDetails, setProjectDetails] = useState(null);

	const handleProjectClick = (project) => {
		setProjectDetails(project);
		setOpenModalProjectDetails(true);
	};

	// Modal for project details
	const [openModalProjectDetails, setOpenModalProjectDetails] =
		React.useState(false);
	const [loading, setLoading] = React.useState(true);
	const showLoading = () => {
		setOpenModalProjectDetails(false);
		// setLoading(true);

		// setTimeout(() => {
		// 	setLoading(false);
		// }, 2000);
	};

	// Modal for create project
	const [openModalCreateProject, setOpenModalCreateProject] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const showModalCreateProject = () => {
		setOpenModalCreateProject(true);
	};
	const handleOk = () => {
		setConfirmLoading(true);
		setTimeout(() => {
			setOpenModalCreateProject(false);
			setConfirmLoading(false);
		}, 2000);
	};
	const handleCancel = () => {
		setOpenModalCreateProject(false);
	};

	return (
		<div className={styles.projectContainer}>
			<div className={styles.projectHeader}>
				<h2>Project Manager</h2>
				<Button
					type="primary"
					className={styles.btnCreate}
					onClick={showModalCreateProject}>
					Primary
				</Button>
			</div>
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
			<Modal
				title=""
				open={openModalCreateProject}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
				width={1000}>
				<CreateProjectForm />
			</Modal>

			<Modal
				title=""
				loading={loading}
				open={openModalProjectDetails}
				onCancel={() => setOpenModalProjectDetails(false)}
				width={1280}
				footer={
					<Button type="primary" onClick={showLoading}>
						Close
					</Button>
				}>
				<ProjectDetails projectDetails={projectDetails} />
			</Modal>
		</div>
	);
}

export default Project;
