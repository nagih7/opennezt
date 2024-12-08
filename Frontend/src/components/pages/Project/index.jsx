import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import store from "states/configureStore";
import { getProjects, createNewProject, getProjectDetails } from "api/project";
import { useSelector } from "react-redux";
import CreateProjectForm from "./CreateProjectForm";
import { Button, message, Modal } from "antd";
import LazyLoadingMedium from "components/UI/LazyLoadingMedium";

const BoxProject = React.lazy(() => import("./BoxProject"));
const ProjectDetails = React.lazy(() => import("../../common/ProjectDetails"));

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

	const setDefaultForm = () => {
		setFormData({
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

	const {
		projects,
		loadingCreateNewProject,
		resultCreateProject,
		projectDetails,
		loadingGetProjectDetails,
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

	const [openModalCreateProject, setOpenModalCreateProject] = useState(false);

	const handleCreateProject = async () => {
		await store.dispatch(createNewProject(formProject));
		if (resultCreateProject) {
			setOpenModalCreateProject(false);
			message.success("Create project successfully");
			setDefaultForm();
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
				<CreateProjectForm
					formProject={formProject}
					setFormData={setFormData}
				/>
			</Modal>

			<LazyLoadingMedium>
				<Modal
					title=""
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
			</LazyLoadingMedium>
		</div>
	);
}

export default Project;
