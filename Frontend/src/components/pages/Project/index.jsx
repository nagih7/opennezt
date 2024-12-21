import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import store from "states/configureStore";
import {
	getProjects,
	createNewProject,
	getProjectDetails,
	updateProject,
	deleteProject,
} from "api/project";
import { useSelector } from "react-redux";
import { Button, message, Modal } from "antd";
import LazyLoadingMedium from "components/UI/LazyLoadingMedium";

const CreateProjectForm = React.lazy(() => import("./CreateProjectForm"));
const BoxProject = React.lazy(() => import("./BoxProject"));
const ProjectDetails = React.lazy(() => import("../../common/ProjectDetails"));
const UpdateProjectForm = React.lazy(() => import("./UpdateProjectForm"));

function Project() {
	useEffect(() => {
		store.dispatch(getProjects());
	}, []);

	const [openModalUpdateProject, setOpenModalUpdateProject] = useState(false);
	const [openModalCreateProject, setOpenModalCreateProject] = useState(false);
	const [formProject, setFormData] = useState({
		name: "",
		landing_page_url: "",
		related_industries: [],
		stage: null,
		problem: "",
		solution: "",
		project_demo_url: "",
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
		background: {},
	});

	const setDefaultForm = () => {
		setFormData({
			name: "",
			landing_page_url: "",
			related_industries: [],
			stage: null,
			problem: "",
			solution: "",
			project_demo_url: "",
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
			background: {},
		});
	};

	const {
		projects,
		loadingCreateNewProject,
		resultCreateProject,
		projectDetails,
		// loadingGetProjectDetails,
		loadingUpdateProject,
		resultUpdateProject,
		loadingDeleteProject,
	} = useSelector((state) => state.project);

	const handleOpenModalDetails = async (project_id) => {
		await store.dispatch(getProjectDetails(project_id));
		setOpenModalProjectDetails(true);
	};

	const [openModalProjectDetails, setOpenModalProjectDetails] =
		useState(false);

	const showLoading = () => {
		setOpenModalProjectDetails(false);
	};

	const handleCreateProject = async () => {
		await store.dispatch(createNewProject(formProject));
	};

	useEffect(() => {
		if (resultCreateProject === true) {
			setDefaultForm();
			store.dispatch(getProjects());
			setOpenModalCreateProject(false);
			setDefaultForm();
		}
	}, [resultCreateProject]);

	const handleCancel = () => {
		setOpenModalCreateProject(false);
		setDefaultForm();
	};

	const handleOpenModalUpdateProject = async () => {
		setFormData(projectDetails);
		setOpenModalUpdateProject(true);
	};

	const handleCloseModalUpdateProject = () => {
		setDefaultForm();
		setOpenModalUpdateProject(false);
	};

	const handleDeleteProject = async (project_id) => {
		await store.dispatch(deleteProject(project_id));
		await store.dispatch(getProjects());
		setOpenModalProjectDetails(false);
	};

	const handleUpdateProject = async () => {
		await store.dispatch(updateProject(formProject));
		await store.dispatch(getProjectDetails(projectDetails._id));
		await store.dispatch(getProjects());
	};

	useEffect(() => {
		if (resultUpdateProject === true) {
			setOpenModalUpdateProject(false);
			setDefaultForm();
		}
	}, [resultUpdateProject]);

	const confirmLoading = false;

	return (
		<div className={styles.projectContainer}>
			<div className={styles.projectHeader}>
				<h2>Project Management</h2>
				<Button
					type="primary"
					className={styles.btnCreate}
					onClick={() => setOpenModalCreateProject(true)}>
					Create new project
				</Button>
			</div>
			<div className={styles.projectsList}>
				<LazyLoadingMedium>
					{projects &&
						projects.length > 0 &&
						projects.map((project, index) => (
							<BoxProject
								project={project}
								key={index}
								openModalDetails={handleOpenModalDetails}
							/>
						))}
				</LazyLoadingMedium>
			</div>

			<Modal
				title=""
				okText="Create"
				open={openModalCreateProject}
				onOk={handleCreateProject}
				confirmLoading={loadingCreateNewProject}
				onCancel={handleCancel}
				width={1000}>
				<LazyLoadingMedium>
					<CreateProjectForm
						formProject={formProject}
						setFormData={setFormData}
					/>
				</LazyLoadingMedium>
			</Modal>

			<Modal
				title=""
				open={openModalProjectDetails}
				onCancel={() => setOpenModalProjectDetails(false)}
				width={1280}
				footer={
					<>
						<Button
							type="primary"
							onClick={handleOpenModalUpdateProject}
							loading={confirmLoading}>
							Update
						</Button>
						<Button
							type="primary"
							danger
							onClick={() => handleDeleteProject(projectDetails._id)}
							loading={loadingDeleteProject}>
							Delete
						</Button>
					</>
				}>
				<LazyLoadingMedium>
					<ProjectDetails projectDetails={projectDetails} />
				</LazyLoadingMedium>
			</Modal>

			<Modal
				title=""
				okText="Update now"
				open={openModalUpdateProject}
				onOk={handleUpdateProject}
				confirmLoading={loadingUpdateProject}
				onCancel={handleCloseModalUpdateProject}
				width={1000}>
				<LazyLoadingMedium>
					<UpdateProjectForm
						formProject={formProject}
						setFormData={setFormData}
					/>
				</LazyLoadingMedium>
			</Modal>
		</div>
	);
}

export default Project;
