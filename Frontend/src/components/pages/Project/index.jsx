import React, { useState, useEffect, useCallback } from "react";
import styles from "./styles.module.scss";
import {
	getProjects,
	createNewProject,
	getProjectDetails,
	updateProject,
	deleteProject,
} from "api/project";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal } from "antd";
import LazyLoadingMedium from "components/UI/LazyLoadingMedium";
import BoxProject from "./BoxProject";
import ProjectDetails from "../../common/ProjectDetails";
import ProjectsSkeleton from "components/skeleton/ProjectsSkeleton";
import NotFound from "components/UI/NotFound";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

const CreateProjectForm = React.lazy(() => import("./CreateProjectForm"));
const UpdateProjectForm = React.lazy(() => import("./UpdateProjectForm"));

function Project() {
	const dispatch = useDispatch();

	const [openModalUpdateProject, setOpenModalUpdateProject] = useState(false);
	const [openModalCreateProject, setOpenModalCreateProject] = useState(false);
	const [openModalProjectDetails, setOpenModalProjectDetails] =
		useState(false);
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
		loadingUpdateProject,
		resultUpdateProject,
		loadingDeleteProject,
		loadingGetProjects,
	} = useSelector((state) => state.project);

	const handleOpenModalDetails = (project_id) => {
		setOpenModalProjectDetails(true);
		dispatch(getProjectDetails(project_id));
	};

	const handleCreateProject = async () => {
		dispatch(createNewProject(formProject));
	};

	useEffect(() => {
		if (resultCreateProject === true) {
			setOpenModalCreateProject(false);
			setDefaultForm();
			dispatch(getProjects());
		}
	}, [resultCreateProject, dispatch]);

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
		dispatch(deleteProject(project_id));
		dispatch(getProjects());
		setOpenModalProjectDetails(false);
	};

	const handleUpdateProject = async () => {
		dispatch(updateProject(formProject));
		dispatch(getProjectDetails(projectDetails._id));
		dispatch(getProjects());
	};

	useEffect(() => {
		if (resultUpdateProject === true) {
			setOpenModalUpdateProject(false);
			setDefaultForm();
		}
	}, [resultUpdateProject]);

	return (
		<div className={styles.projectContainer}>
			<div className={styles.projectHeader}>
				<h2>Project Management</h2>
				<Button
					type="primary"
					className={styles.btnCreate}
					onClick={() => setOpenModalCreateProject(true)}>
					<CreateNewFolderIcon />
					Create new project
				</Button>
			</div>

			{projects && projects.length === 0 && !loadingGetProjects ? (
				<NotFound
					content={"You do not have any project yet"}
					size={"10rem"}
				/>
			) : (
				<div className={styles.projectsListWrap}>
					<div className={styles.projectsList}>
						{loadingGetProjects ? (
							<ProjectsSkeleton boxs={6} />
						) : (
							projects &&
							projects.length > 0 &&
							projects.map((project, index) => (
								<BoxProject
									project={project}
									key={index}
									openModalDetails={handleOpenModalDetails}
									usedTo="my-projects"
								/>
							))
						)}
					</div>
				</div>
			)}

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
							loading={false}>
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
				<ProjectDetails />
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
