import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { seekProjects, getProjectDetails } from "api/project";
import { Select, Button, Input } from "antd";
import LazyLoading from "components/UI/LazyLoading";
import { getRequestAddFriend } from "api/notification";
import BoxProject from "../Project/BoxProject";
import { DeleteOutlined, SearchOutlined } from "@mui/icons-material";
import ProjectsSkeleton from "components/skeleton/ProjectsSkeleton";
import {
	resetFormSeekProjects,
	setFormSeekProjects,
} from "states/modules/project";
import NotFound from "components/UI/NotFound";
import {
	SECTOR,
	STAGE,
	SEARCH,
	RESET,
	INPUT_PLACEHOLDER,
} from "utils/constains";

const ProjectDetailsModal = React.lazy(() => import("./ProjectDetailsModal"));

const SeekProjects = () => {
	const dispatch = useDispatch();
	const {
		projectsBySeek,
		projectDetails,
		loadingSeekProjects,
		formSeekProjects,
	} = useSelector((state) => state.project);
	const { language } = useSelector((state) => state.app);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [canDeleteForm, setCanDeleteForm] = useState(false);

	useEffect(() => {
		if (
			formSeekProjects.industry ||
			formSeekProjects.stage ||
			formSeekProjects.name
		) {
			setCanDeleteForm(true);
		}
	}, [formSeekProjects]);

	const handleOnChange = (event, nameSelect) => {
		dispatch(setFormSeekProjects({ event, nameSelect }));
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleSeekProjects();
		}
	};

	const handleSeekProjects = () => {
		dispatch(
			seekProjects({
				...formSeekProjects,
				industry: formSeekProjects.industry ?? "",
				stage: formSeekProjects.stage ?? "",
				name: formSeekProjects.name ?? "",
			})
		);
	};

	const handleResetForm = () => {
		// setCanDeleteForm(false);
		dispatch(
			seekProjects({
				industry: "",
				stage: "",
				name: "",
				page: 0,
			})
		);
		dispatch(resetFormSeekProjects());
	};

	const handleViewDetails = (projectId, userId) => {
		setIsModalVisible(true);
		dispatch(getProjectDetails(projectId));
		dispatch(getRequestAddFriend(userId));
	};

	return (
		<div className={styles.searchContainer}>
			<div className={styles.searchForm}>
				<Button
					// disabled={!canDeleteForm || loadingSeekProjects}
					disabled={
						formSeekProjects.page <= 1 &&
						formSeekProjects.name === null &&
						formSeekProjects.industry === null &&
						formSeekProjects.stage === null
					}
					className={styles.deleteButton}
					type="dashed"
					danger
					icon={<DeleteOutlined />}
					onClick={() => handleResetForm()}>
					{RESET[language]}
				</Button>
				<div className={styles.searchContent}>
					<Input
						type="text"
						placeholder={INPUT_PLACEHOLDER.PROJECT_NAME[language]}
						value={formSeekProjects.name}
						onChange={(e) => handleOnChange(e.target, "name")}
						className={styles.searchInput}
						style={{ width: "100%" }}
						name="name"
					/>
					<Select
						value={formSeekProjects.industry}
						name="industry"
						onChange={(value, option) =>
							handleOnChange(option.value, "industry")
						}
						className={styles.searchSelect}
						placeholder={INPUT_PLACEHOLDER.INDUSTRY[language]}
						style={{ width: "13rem" }}
						options={SECTOR[language]}
					/>
					<Select
						value={formSeekProjects.stage}
						onChange={(value, option) =>
							handleOnChange(option.value, "stage")
						}
						className={styles.searchSelect}
						placeholder={INPUT_PLACEHOLDER.STAGE[language]}
						style={{ width: "13rem" }}
						options={STAGE[language]}
					/>
				</div>
				<Button
					className={styles.searchButton}
					type="primary"
					icon={<SearchOutlined />}
					loading={loadingSeekProjects}
					onClick={handleSeekProjects}
					onKeyDown={(e) => handleKeyDown(e)}>
					{SEARCH[language]}
				</Button>
			</div>

			<div className={styles.projectsWrap}>
				{projectsBySeek.length === 0 && !loadingSeekProjects && (
					<NotFound content={"No suitable project found"} size={"10rem"} />
				)}
				<div className={styles.projectsList}>
					{loadingSeekProjects ? (
						<ProjectsSkeleton boxs={6} />
					) : (
						projectsBySeek.map((project, index) => (
							<BoxProject
								project={project}
								key={index}
								openModalDetails={handleViewDetails}
								usedTo="projects-by-seek"
							/>
						))
					)}
				</div>
			</div>
			{projectDetails && projectDetails.name && (
				<LazyLoading>
					<ProjectDetailsModal
						isVisible={isModalVisible}
						onClose={() => setIsModalVisible(false)}
						projectDetails={projectDetails}
					/>
				</LazyLoading>
			)}
		</div>
	);
};

export default SeekProjects;
