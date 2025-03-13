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
import { Button, Modal, Tooltip } from "antd";
import LazyLoading from "components/UI/LazyLoading";
import BoxProject from "./BoxProject";
import ProjectDetails from "../../common/ProjectDetails";
import ProjectsSkeleton from "components/skeleton/ProjectsSkeleton";
import NotFound from "components/UI/NotFound";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { SearchOutlined } from "@mui/icons-material";
import { matchingTalents } from "api/artificialIntelligence";
import store from "states/configureStore";
import { setOpenModalMatchingTalents } from "states/modules/artificialIntelligence";
import {
  PROJECT_MANAGEMENT,
  VIEW_MATCHING_TALENTS,
  MATCHING_TALENT_WITH_AI,
  CREATE_NEW_PROJECT,
  UPDATE,
  DELETE,
  TOOLTIP,
} from "utils/constains";
import RightSidebar from "components/common/RightSidebar";
import { IconlySearch } from "components/UI/Iconly";
import img_background_group from "assets/images/background/62beb9f3ab302-bp-cover-image.jpg";
import img_avatar_group from "assets/images/background/1656677703-bpfull.jpg";
import { IconlyDocument, IconlyUser, IconlyPlus } from "components/UI/Iconly";
import img_avatar from "assets/images/background/avt.jpg";
import {PlusOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";

const CreateProjectForm = React.lazy(() => import("./CreateProjectForm"));
const UpdateProjectForm = React.lazy(() => import("./UpdateProjectForm"));

function Project() {
  const dispatch = useDispatch();

  const { talents, loadingMatchingTalents } = useSelector(
    (state) => state.artificialIntelligence
  );
  const { language } = useSelector((state) => state.app);

  const [openModalUpdateProject, setOpenModalUpdateProject] = useState(false);
  const [openModalCreateProject, setOpenModalCreateProject] = useState(false);
  const [openModalProjectDetails, setOpenModalProjectDetails] = useState(false);

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
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

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
    await store.dispatch(deleteProject(project_id));
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
    setOpenModalConfirm(false);
    dispatch(matchingTalents());
  }, [dispatch]);

  return (
    // <div className={styles.projectContainer}>
    // 	<div className={styles.projectHeader}>
    // 		<h2>{PROJECT_MANAGEMENT[language]}</h2>
    // 		<div className={styles.userActions}>
    // 			{talents && talents.length > 0 ? (
    // 				<Button
    // 					color="cyan"
    // 					variant="solid"
    // 					style={{
    // 						borderRadius: "0.5rem",
    // 					}}
    // 					icon={<VisibilityIcon />}
    // 					loading={false}
    // 					onClick={() =>
    // 						dispatch(setOpenModalMatchingTalents(true))
    // 					}>
    // 					{VIEW_MATCHING_TALENTS[language]}
    // 				</Button>
    // 			) : projects && projects.length > 0 ? (
    // 				<Button
    // 					style={{
    // 						borderRadius: "0.5rem",
    // 					}}
    // 					icon={<SearchOutlined />}
    // 					type="primary"
    // 					loading={loadingMatchingTalents}
    // 					onClick={() => setOpenModalConfirm(true)}>
    // 					{MATCHING_TALENT_WITH_AI[language]}
    // 				</Button>
    // 			) : (
    // 				<Tooltip
    // 					title={
    // 						TOOLTIP.YOU_NEED_TO_CREATE_A_PROJECT_FIRST[language]
    // 					}
    // 					placement="top">
    // 					<Button
    // 						disabled
    // 						style={{
    // 							borderRadius: "0.5rem",
    // 						}}
    // 						icon={<SearchOutlined />}
    // 						type="primary">
    // 						{MATCHING_TALENT_WITH_AI[language]}
    // 					</Button>
    // 				</Tooltip>
    // 			)}

    // 			<Button
    // 				type="primary"
    // 				className={styles.btnCreate}
    // 				onClick={() => setOpenModalCreateProject(true)}>
    // 				<CreateNewFolderIcon />
    // 				{CREATE_NEW_PROJECT[language]}
    // 			</Button>
    // 		</div>
    // 	</div>

    // 	{projects && projects.length === 0 && !loadingGetProjects ? (
    // 		<NotFound
    // 			content={"You do not have any project yet"}
    // 			size={"10rem"}
    // 		/>
    // 	) : (
    // 		<div className={styles.projectsListWrap}>
    // 			<div className={styles.projectsList}>
    // 				{loadingGetProjects ? (
    // 					<ProjectsSkeleton boxs={6} />
    // 				) : (
    // 					projects &&
    // 					projects.length > 0 &&
    // 					projects.map((project, index) => (
    // 						<BoxProject
    // 							project={project}
    // 							key={index}
    // 							openModalDetails={handleOpenModalDetails}
    // 							usedTo="my-projects"
    // 						/>
    // 					))
    // 				)}
    // 			</div>
    // 		</div>
    // 	)}

    // 	<Modal
    // 		title=""
    // 		okText="Create"
    // 		open={openModalCreateProject}
    // 		onOk={handleCreateProject}
    // 		confirmLoading={loadingCreateNewProject}
    // 		onCancel={handleCancel}
    // 		width={1000}>
    // 		<LazyLoading>
    // 			<CreateProjectForm
    // 				formProject={formProject}
    // 				setFormData={setFormData}
    // 			/>
    // 		</LazyLoading>
    // 	</Modal>
    // 	<Modal
    // 		title=""
    // 		open={openModalProjectDetails}
    // 		onCancel={() => setOpenModalProjectDetails(false)}
    // 		width={1280}
    // 		footer={
    // 			<>
    // 				<Button
    // 					type="primary"
    // 					onClick={handleOpenModalUpdateProject}
    // 					loading={false}>
    // 					{UPDATE[language]}
    // 				</Button>
    // 				<Button
    // 					type="primary"
    // 					danger
    // 					onClick={() => handleDeleteProject(projectDetails._id)}
    // 					loading={loadingDeleteProject}>
    // 					{DELETE[language]}
    // 				</Button>
    // 			</>
    // 		}>
    // 		<ProjectDetails />
    // 	</Modal>
    // 	<Modal
    // 		title=""
    // 		okText="Update now"
    // 		open={openModalUpdateProject}
    // 		onOk={handleUpdateProject}
    // 		confirmLoading={loadingUpdateProject}
    // 		onCancel={handleCloseModalUpdateProject}
    // 		width={1000}>
    // 		<LazyLoading>
    // 			<UpdateProjectForm
    // 				formProject={formProject}
    // 				setFormData={setFormData}
    // 			/>
    // 		</LazyLoading>
    // 	</Modal>
    // 	<Modal
    // 		onCancel={() => setOpenModalConfirm(false)}
    // 		onOk={handleMatchingWithAI}
    // 		title=""
    // 		open={openModalConfirm}
    // 		width={1000}>
    // 		<div className={styles.modalConfirm}>
    // 			<h2>{MATCHING_TALENT_WITH_AI[language]}</h2>
    // 			<p style={{ fontSize: "1rem", marginTop: "1rem" }}>
    // 				<b>
    // 					To provide you with the most accurate and relevant matches,
    // 					our AI system needs to analyze the following:
    // 				</b>
    // 				<br />
    // 				<br />
    // 				<b>(1)</b> Your project profile, including its description,
    // 				goals, tractions and requirements.
    // 				<br />
    // 				<b>(2)</b> Profiles of your founding team and core team,
    // 				including skills, roles, and expertise.
    // 				<br />
    // 				<br />
    // 				This information will only be used to enhance the matching
    // 				process and recommend talents who best align with your needs.
    // 				Your data will remain confidential and protected under our
    // 				Privacy Policy.
    // 				<br />
    // 				<br />
    // 				<b>
    // 					Do you consent to allowing our AI system to access this
    // 					information for the purpose of generating matches?
    // 				</b>
    // 			</p>
    // 		</div>
    // 	</Modal>
    // </div>
    <div className="w-full py-8 px-[16px]">
      <div
        className="h-[300px] text-[#ffffff] pl-8 py-32 rounded-md bg-local bg-center "
        style={{
          backgroundImage:
            "url(https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/buddypress/groups/14/cover-image/62be922d671b9-bp-cover-image.jpg)",
          objectFit: "cover",
        }}
      >
        <span className="text-4xl font-medium">Project Directory</span>
        <p className="mt-1">
          Good Communication is the key to cop-up with good ideas
        </p>
      </div>
      <div className="flex gap-8 mt-8">
        <div className="w-10/12">
          <div className="p-8 bg-[#ffffff] rounded-md">
            <div className="flex justify-between items-center border-[1px] rounded-md caret-[#2f65b9] bg-[#f8f9fa] pl-[15px]">
              <input
                type="text"
                placeholder="Search Projects..."
                className="bg-[#f8f9fa] outline-none h-8 w-full rounded-md text-xs font-medium text-black"
              />
              <button className="flex items-center justify-center bg-[#2f65b9] rounded-md w-11 h-10">
                <IconlySearch
                  size={14}
                  color={"#ffffff"}
                  className="text-gray-400"
                />
              </button>
            </div>
          </div>
          <div>
            <div className="pb-8 px-8 bg-[#fbfbfb] rounded-md mt-8">
              <div>
                <div className="mx-[-16px] px-[16px] mb-8">
                  <div className="flex items-center justify-between border-b-[1px] border-[#f3f4f5]">
                    <div className="flex border-r-[1px] border-[#f3f4f5] ">
                      <ul className="flex mb-0 p-0 max-w-[600px] overflow-x-scroll scrollbar-hide">
                        <li className="flex items-center gap-2 py-[26px] mr-6">
                          <a
                            href=""
                            className="no-underline text-black font-medium border-b-2 border-black"
                          >
                            All Projects
                          </a>
                          <span className="bg-[#f07a3a] py-[2px] px-[6px] text-xs rounded-lg text-white font-medium">
                            10
                          </span>
                        </li>
                        <li className="flex items-center gap-2 py-[26px] mr-6">
                          <a
                            href=""
                            className="no-underline text-[#6f7f92] font-medium"
                          >
                            My Projects
                          </a>
                          {/* <span className="bg-[#f07a3a] py-[2px] px-[6px] text-xs rounded-lg text-white font-medium">10</span> */}
                        </li>
                        <li className="flex items-center gap-2 py-[26px] mr-6">
                          <Link
                            to={'/project/details'}
                            className="no-underline text-[#6f7f92] font-medium"
                          >
                            Create a Project
                          </Link>
                          {/* <span className="bg-[#f07a3a] py-[2px] px-[6px] text-xs rounded-lg text-white font-medium">10</span> */}
                        </li>
                      </ul>
                    </div>
                    <div className="px-[16px]">
                      <ul className="mb-0 p-0">
                        <li className="py-4 pl-8 ">
                          <label htmlFor="" className=" outline-none">
                            Sort By:
                          </label>
                          <select
                            name=""
                            id=""
                            className="ml-4 outline-none border-[1px] py-[10px] rounded-md pl-3 border-[#f3f4f5]"
                          >
                            <option value="">Last Active</option>
                            <option value="">Most Members</option>
                            <option value="">Newly Created</option>
                            <option value="">Alphabetical</option>
                          </select>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="mx-[-16px] px-[16px]">
                      <div className="bg-[#ffffff] border-[1px] rounded-md">
                        <div>
                          <img
                            src={img_background_group}
                            alt=""
                            className="rounded-t-md"
                          />
                        </div>
                        <div className="p-8 flex flex-col items-center">
                          <div className="flex flex-col items-center mt-[-80px]">
                            <div className="mb-7">
                              <a href="#">
                                <img
                                  src={img_avatar_group}
                                  alt=""
                                  className="w-20 h-20 border-[4px] border-[#f2f3f4]"
                                />
                              </a>
                            </div>
                            <div>
                              <h5>
                                <a href="#" className="no-underline text-black">
                                  Animal Crackers
                                </a>
                              </h5>
                            </div>
                          </div>
                          <div>
                            <ul className="flex items-center gap-1 mb-0 pl-0 pb-[24px]">
                              <li className="mr-2">
                                <a
                                  href="#"
                                  className="no-underline text-[#6f7f92] text-sm font-medium flex items-center gap-1"
                                >
                                  <span>
                                    <IconlyDocument
                                      size={20}
                                      color={"#6f7f92"}
                                    />
                                  </span>
                                  <span>0</span>
                                  <span>Posts</span>
                                </a>
                              </li>
                              <li className="mr-2">
                                <a
                                  href="#"
                                  className="no-underline text-[#6f7f92] text-sm font-medium flex items-center gap-1"
                                >
                                  <span>
                                    <IconlyUser size={20} color={"#6f7f92"} />
                                  </span>
                                  <span>Members</span>
                                  <span>6</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                          <ul className="mb-0 pl-0 border-t-[1px] w-full pt-[24px] relative flex items-center justify-center">
                            <li>  
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li className="ml-[-15px]">
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li  className="ml-[-15px]">
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li  className="ml-[-15px]">
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li  className="ml-[-15px] bg-[#2f65b9] w-9 h-9 rounded-full flex items-center justify-center border-2 border-[#ffffff]">
                              <a href="#" className="z-50">
                                <PlusOutlined  className="text-white"/>
                              </a>
                            </li>
                          </ul>
                          <div className="mt-7 mx-[-16px] w-full h-[47px] flex justify-center items-center">
                            <a href="#" className="bg-[#eaeff8] text-[#2f65b9] hover:bg-[#2f65b9] hover:text-[#ffffff] transition duration- text-sm rounded-md font-semibold px-[28px] py-[15px] mx-[14px] no-underline">
                              MANAGE PROJECT
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mx-[-16px] px-[16px]">
                      <div className="bg-[#ffffff] border-[1px] rounded-md">
                        <div>
                          <img
                            src={img_background_group}
                            alt=""
                            className="rounded-t-md"
                          />
                        </div>
                        <div className="p-8 flex flex-col items-center">
                          <div className="flex flex-col items-center mt-[-80px]">
                            <div className="mb-7">
                              <a href="#">
                                <img
                                  src={img_avatar_group}
                                  alt=""
                                  className="w-20 h-20 border-[4px] border-[#f2f3f4]"
                                />
                              </a>
                            </div>
                            <div>
                              <h5>
                                <a href="#" className="no-underline text-black">
                                  Animal Crackers
                                </a>
                              </h5>
                            </div>
                          </div>
                          <div>
                            <ul className="flex items-center gap-1 mb-0 pl-0 pb-[24px]">
                              <li className="mr-2">
                                <a
                                  href="#"
                                  className="no-underline text-[#6f7f92] text-sm font-medium flex items-center gap-1"
                                >
                                  <span>
                                    <IconlyDocument
                                      size={20}
                                      color={"#6f7f92"}
                                    />
                                  </span>
                                  <span>0</span>
                                  <span>Posts</span>
                                </a>
                              </li>
                              <li className="mr-2">
                                <a
                                  href="#"
                                  className="no-underline text-[#6f7f92] text-sm font-medium flex items-center gap-1"
                                >
                                  <span>
                                    <IconlyUser size={20} color={"#6f7f92"} />
                                  </span>
                                  <span>Members</span>
                                  <span>6</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                          <ul className="mb-0 pl-0 border-t-[1px] w-full pt-[24px] relative flex items-center justify-center">
                            <li>  
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li className="ml-[-15px]">
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li  className="ml-[-15px]">
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li  className="ml-[-15px]">
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li  className="ml-[-15px] bg-[#2f65b9] w-9 h-9 rounded-full flex items-center justify-center border-2 border-[#ffffff]">
                              <a href="#" className="z-50">
                                <PlusOutlined  className="text-white"/>
                              </a>
                            </li>
                          </ul>
                          <div className="mt-7 mx-[-16px] w-full h-[47px] flex justify-center items-center">
                            <a href="#" className="bg-[#f8eaea] text-[#f14646] hover:bg-[#f14646] hover:text-[#ffffff] transition duration- text-sm rounded-md font-semibold px-[28px] py-[15px] mx-[14px] no-underline">
                              LEAVE PROJECT
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mx-[-16px] px-[16px]">
                      <div className="bg-[#ffffff] border-[1px] rounded-md">
                        <div>
                          <img
                            src={img_background_group}
                            alt=""
                            className="rounded-t-md"
                          />
                        </div>
                        <div className="p-8 flex flex-col items-center">
                          <div className="flex flex-col items-center mt-[-80px]">
                            <div className="mb-7">
                              <a href="#">
                                <img
                                  src={img_avatar_group}
                                  alt=""
                                  className="w-20 h-20 border-[4px] border-[#f2f3f4]"
                                />
                              </a>
                            </div>
                            <div>
                              <h5>
                                <a href="#" className="no-underline text-black">
                                  Animal Crackers
                                </a>
                              </h5>
                            </div>
                          </div>
                          <div>
                            <ul className="flex items-center gap-1 mb-0 pl-0 pb-[24px]">
                              <li className="mr-2">
                                <a
                                  href="#"
                                  className="no-underline text-[#6f7f92] text-sm font-medium flex items-center gap-1"
                                >
                                  <span>
                                    <IconlyDocument
                                      size={20}
                                      color={"#6f7f92"}
                                    />
                                  </span>
                                  <span>0</span>
                                  <span>Posts</span>
                                </a>
                              </li>
                              <li className="mr-2">
                                <a
                                  href="#"
                                  className="no-underline text-[#6f7f92] text-sm font-medium flex items-center gap-1"
                                >
                                  <span>
                                    <IconlyUser size={20} color={"#6f7f92"} />
                                  </span>
                                  <span>Members</span>
                                  <span>6</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                          <ul className="mb-0 pl-0 border-t-[1px] w-full pt-[24px] relative flex items-center justify-center">
                            <li>  
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li className="ml-[-15px]">
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li  className="ml-[-15px]">
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li  className="ml-[-15px]">
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li  className="ml-[-15px] bg-[#2f65b9] w-9 h-9 rounded-full flex items-center justify-center border-2 border-[#ffffff]">
                              <a href="#" className="z-50">
                                <PlusOutlined  className="text-white"/>
                              </a>
                            </li>
                          </ul>
                          <div className="mt-7 mx-[-16px] w-full h-[47px] flex justify-center items-center">
                            <a href="#" className="bg-[#eaeff8] text-[#2f65b9] hover:bg-[#2f65b9] hover:text-[#ffffff] transition duration- text-sm rounded-md font-semibold px-[28px] py-[15px] mx-[14px] no-underline">
                              MANAGE PROJECT
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mx-[-16px] px-[16px]">
                      <div className="bg-[#ffffff] border-[1px] rounded-md">
                        <div>
                          <img
                            src={img_background_group}
                            alt=""
                            className="rounded-t-md"
                          />
                        </div>
                        <div className="p-8 flex flex-col items-center">
                          <div className="flex flex-col items-center mt-[-80px]">
                            <div className="mb-7">
                              <a href="#">
                                <img
                                  src={img_avatar_group}
                                  alt=""
                                  className="w-20 h-20 border-[4px] border-[#f2f3f4]"
                                />
                              </a>
                            </div>
                            <div>
                              <h5>
                                <a href="#" className="no-underline text-black">
                                  Animal Crackers
                                </a>
                              </h5>
                            </div>
                          </div>
                          <div>
                            <ul className="flex items-center gap-1 mb-0 pl-0 pb-[24px]">
                              <li className="mr-2">
                                <a
                                  href="#"
                                  className="no-underline text-[#6f7f92] text-sm font-medium flex items-center gap-1"
                                >
                                  <span>
                                    <IconlyDocument
                                      size={20}
                                      color={"#6f7f92"}
                                    />
                                  </span>
                                  <span>0</span>
                                  <span>Posts</span>
                                </a>
                              </li>
                              <li className="mr-2">
                                <a
                                  href="#"
                                  className="no-underline text-[#6f7f92] text-sm font-medium flex items-center gap-1"
                                >
                                  <span>
                                    <IconlyUser size={20} color={"#6f7f92"} />
                                  </span>
                                  <span>Members</span>
                                  <span>6</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                          <ul className="mb-0 pl-0 border-t-[1px] w-full pt-[24px] relative flex items-center justify-center">
                            <li>  
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li className="ml-[-15px]">
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li  className="ml-[-15px]">
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li  className="ml-[-15px]">
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li  className="ml-[-15px] bg-[#2f65b9] w-9 h-9 rounded-full flex items-center justify-center border-2 border-[#ffffff]">
                              <a href="#" className="z-50">
                                <PlusOutlined  className="text-white"/>
                              </a>
                            </li>
                          </ul>
                          <div className="mt-7 mx-[-16px] w-full h-[47px] flex justify-center items-center">
                            <a href="#" className="bg-[#eaeff8] text-[#2f65b9] hover:bg-[#2f65b9] hover:text-[#ffffff] transition duration- text-sm rounded-md font-semibold px-[28px] py-[15px] mx-[14px] no-underline">
                              MANAGE PROJECT
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mx-[-16px] px-[16px]">
                      <div className="bg-[#ffffff] border-[1px] rounded-md">
                        <div>
                          <img
                            src={img_background_group}
                            alt=""
                            className="rounded-t-md"
                          />
                        </div>
                        <div className="p-8 flex flex-col items-center">
                          <div className="flex flex-col items-center mt-[-80px]">
                            <div className="mb-7">
                              <a href="#">
                                <img
                                  src={img_avatar_group}
                                  alt=""
                                  className="w-20 h-20 border-[4px] border-[#f2f3f4]"
                                />
                              </a>
                            </div>
                            <div>
                              <h5>
                                <a href="#" className="no-underline text-black">
                                  Animal Crackers
                                </a>
                              </h5>
                            </div>
                          </div>
                          <div>
                            <ul className="flex items-center gap-1 mb-0 pl-0 pb-[24px]">
                              <li className="mr-2">
                                <a
                                  href="#"
                                  className="no-underline text-[#6f7f92] text-sm font-medium flex items-center gap-1"
                                >
                                  <span>
                                    <IconlyDocument
                                      size={20}
                                      color={"#6f7f92"}
                                    />
                                  </span>
                                  <span>0</span>
                                  <span>Posts</span>
                                </a>
                              </li>
                              <li className="mr-2">
                                <a
                                  href="#"
                                  className="no-underline text-[#6f7f92] text-sm font-medium flex items-center gap-1"
                                >
                                  <span>
                                    <IconlyUser size={20} color={"#6f7f92"} />
                                  </span>
                                  <span>Members</span>
                                  <span>6</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                          <ul className="mb-0 pl-0 border-t-[1px] w-full pt-[24px] relative flex items-center justify-center">
                            <li>  
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li className="ml-[-15px]">
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li  className="ml-[-15px]">
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li  className="ml-[-15px]">
                              <a href="#">
                                <img src={img_avatar} alt="" className="h-9 w-9 rounded-full border-2 border-[#ffffff]" />
                              </a>
                            </li>
                            <li  className="ml-[-15px] bg-[#2f65b9] w-9 h-9 rounded-full flex items-center justify-center border-2 border-[#ffffff]">
                              <a href="#" className="z-50">
                                <PlusOutlined  className="text-white"/>
                              </a>
                            </li>
                          </ul>
                          <div className="mt-7 mx-[-16px] w-full h-[47px] flex justify-center items-center">
                            <a href="#" className="bg-[#eaeff8] text-[#2f65b9] hover:bg-[#2f65b9] hover:text-[#ffffff] transition duration- text-sm rounded-md font-semibold px-[28px] py-[15px] mx-[14px] no-underline">
                              MANAGE PROJECT
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}

export default Project;
