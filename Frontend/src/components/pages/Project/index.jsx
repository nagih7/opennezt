import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import store from "states/configureStore";
import { getProjects, createNewProject } from "api/project";
import { useSelector } from "react-redux";
import CreateProjectForm from "./CreateProjectForm";
import ProjectDetails from "components/common/ProjectDetails";
import { Button, Modal } from "antd";

function Project() {
	useEffect(() => {
		store.dispatch(getProjects());
	}, []);

	const [formData, setFormData] = useState({
		name: "",
		lading_page_url: "",
		related_industries: [],
		stage: "",
		problem: "",
		solution: "",
		product_demo_url: "",
		team_intro_url: "",
		pitch_deck: {},
		statistics: "",
		revenues: [{ time: "", revenue: "" }],
		funding_sources: {
			friend_and_family: "",
			grant: "",
			angel: "",
			venture_capital: "",
			other: "",
		},
		target_money: "",
		target_audience: "",
		competitors: "",
		competitive_advantage: "",
		why_now: "",
		strategy: "",
		milestones: "",
		about_opennezt: "",
		background: {},
	});
	const { projects, loadingCreateNewProject } = useSelector(
		(state) => state.project
	);
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
	};

	// Modal for create project
	const [openModalCreateProject, setOpenModalCreateProject] = useState(false);
	const showModalCreateProject = () => {
		setOpenModalCreateProject(true);
	};
	const handleCreateProject = async () => {
		await store.dispatch(createNewProject(formData));
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
					Create new project
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
				okText="Create"
				open={openModalCreateProject}
				onOk={handleCreateProject}
				confirmLoading={loadingCreateNewProject}
				onCancel={handleCancel}
				width={1000}>
				<CreateProjectForm formData={formData} setFormData={setFormData} />
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
