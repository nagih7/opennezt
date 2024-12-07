import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import store from "states/configureStore";
import { getProjects, createNewProject } from "api/project";
import { useSelector } from "react-redux";
import CreateProjectForm from "./CreateProjectForm";
import ProjectDetails from "components/common/ProjectDetails";
import { Button, message, Modal } from "antd";

function Project() {
	useEffect(() => {
		store.dispatch(getProjects());
	}, []);

	const [formProject, setFormData] = useState({
		name: "",
		lading_page_url: "",
		related_industries: [],
		stage: null,
		problem: "",
		solution: "",
		product_demo_url: "",
		team_intro_url: "",
		pitch_deck: {},
		statistics: "",
		revenues: [],
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

	const setDefaultForm = async () => {
		await setFormData({
			name: "",
			lading_page_url: "",
			related_industries: [],
			stage: null,
			problem: "",
			solution: "",
			product_demo_url: "",
			team_intro_url: "",
			pitch_deck: {},
			statistics: "",
			revenues: [],
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
	};

	const { projects, loadingCreateNewProject, resultCreateProject } =
		useSelector((state) => state.project);
	const [projectDetails, setProjectDetails] = useState(null);

	const handleProjectClick = (project) => {
		setProjectDetails(project);
		setOpenModalProjectDetails(true);
	};

	const [openModalProjectDetails, setOpenModalProjectDetails] =
		React.useState(false);
	const [loading, setLoading] = React.useState(true);
	const showLoading = () => {
		setOpenModalProjectDetails(false);
	};

	const [openModalCreateProject, setOpenModalCreateProject] = useState(false);
	const showModalCreateProject = () => {
		setOpenModalCreateProject(true);
	};
	const handleCreateProject = async () => {
		console.log(formProject);
		await store.dispatch(createNewProject(formProject));
		if (resultCreateProject) {
			setOpenModalCreateProject(false);
			message.success("Create project successfully");
			await setDefaultForm();
			await store.dispatch(getProjects());
		} else {
			message.error("Create project failed");
		}
	};

	const handleCancel = () => {
		setOpenModalCreateProject(false);
		setDefaultForm();
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
				<CreateProjectForm
					formProject={formProject}
					setFormData={setFormData}
				/>
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
