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
import LazyLoading from "components/UI/LazyLoading";
import BoxProject from "./BoxProject";
import ProjectDetails from "../../common/ProjectDetails";
import ProjectsSkeleton from "components/skeleton/ProjectsSkeleton";
import NotFound from "components/UI/NotFound";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { SearchOutlined } from "@mui/icons-material";
import { matchingTalents } from "api/artificialIntelligence";
import AvatarDefault from "assets/images/default/AvatarDefault.png";
import TalentProfile from "components/common/TalentProfile";
import { getTalentDetails } from "api/talent";
import { getRequestAddFriend } from "api/notification";

const CreateProjectForm = React.lazy(() => import("./CreateProjectForm"));
const UpdateProjectForm = React.lazy(() => import("./UpdateProjectForm"));

function Project() {
	const dispatch = useDispatch();

	const { talents, loadingMatchingTalents } = useSelector(
		(state) => state.artificialIntelligence
	);

	const [openModalUpdateProject, setOpenModalUpdateProject] = useState(false);
	const [openModalCreateProject, setOpenModalCreateProject] = useState(false);
	const [openModalProjectDetails, setOpenModalProjectDetails] =
		useState(false);
	const [openModalMatchingTalents, setOpenModalMatchingTalents] =
		useState(false);
	const [modalTalentDetails, setModalTalentDetails] = useState(false);
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

	const handleMatchingWithAI = useCallback(() => {
		dispatch(matchingTalents());
	}, [dispatch]);

	const handleViewMatchingTalents = () => {
		setOpenModalMatchingTalents(true);
	};

	const handleGetDetailTalent = useCallback(
		(id) => {
			setModalTalentDetails(true);
			dispatch(getTalentDetails(id));
			dispatch(getRequestAddFriend(id));
		},
		[dispatch]
	);

	return (
		<div className={styles.projectContainer}>
			<div className={styles.projectHeader}>
				<h2>Project Management</h2>
				<div className={styles.userActions}>
					{talents && talents.length > 0 ? (
						<Button
							color="cyan"
							variant="solid"
							style={{
								borderRadius: "0.5rem",
							}}
							icon={<VisibilityIcon />}
							loading={false}
							onClick={handleViewMatchingTalents}>
							View matching talents
						</Button>
					) : (
						<Button
							style={{
								borderRadius: "0.5rem",
							}}
							icon={<SearchOutlined />}
							type="primary"
							loading={loadingMatchingTalents}
							onClick={handleMatchingWithAI}>
							Matching talent with AI
						</Button>
					)}

					<Button
						type="primary"
						className={styles.btnCreate}
						onClick={() => setOpenModalCreateProject(true)}>
						<CreateNewFolderIcon />
						Create new project
					</Button>
				</div>
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
				<LazyLoading>
					<CreateProjectForm
						formProject={formProject}
						setFormData={setFormData}
					/>
				</LazyLoading>
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
				<LazyLoading>
					<UpdateProjectForm
						formProject={formProject}
						setFormData={setFormData}
					/>
				</LazyLoading>
			</Modal>
			<Modal
				title=""
				okText="Update now"
				open={openModalMatchingTalents}
				footer={null}
				onCancel={() => setOpenModalMatchingTalents(false)}
				width={1000}>
				<LazyLoading>
					<div className={styles.modalMatchingTalentsWrap}>
						{talents.map((talent, index) => (
							<div className={styles.talentWrap} key={index}>
								<div className={styles.talentAvatar}>
									<img
										src={talent.avatar || AvatarDefault}
										alt={talent.name}
										onError={(e) => {
											e.target.onerror = null;
											e.target.src = AvatarDefault;
										}}
									/>
								</div>
								<span className={styles.name}>{talent.name}</span>
								<span className={styles.matchScore}>
									Compatibility: {talent.match_score}%
								</span>
								<div className={styles.talentActions}>
									<Button
										type="primary"
										onClick={() => handleGetDetailTalent(talent._id)}>
										View detail
									</Button>
								</div>
							</div>
						))}
					</div>
				</LazyLoading>
			</Modal>
			<Modal
				footer={null}
				title=""
				okText="OK"
				open={modalTalentDetails}
				confirmLoading={false}
				onCancel={() => setModalTalentDetails(false)}
				width={1000}>
				<LazyLoading>
					<TalentProfile />
				</LazyLoading>
			</Modal>
		</div>
	);
}

export default Project;
