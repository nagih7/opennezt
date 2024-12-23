import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { listSector, listStage } from "components/common/ListSelected";
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

const ProjectDetailsModal = React.lazy(() => import("./ProjectDetailsModal"));

const SeekProjects = () => {
	const dispatch = useDispatch();
	const {
		projectsBySeek,
		projectDetails,
		loadingSeekProjects,
		formSeekProjects,
	} = useSelector((state) => state.project);

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

	const onChange = (event, nameSelect) => {
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
		dispatch(resetFormSeekProjects());
		setCanDeleteForm(false);
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
					disabled={!canDeleteForm || loadingSeekProjects}
					className={styles.deleteButton}
					type="dashed"
					danger
					icon={<DeleteOutlined />}
					onClick={() => handleResetForm()}>
					Reset
				</Button>
				<div className={styles.searchContent}>
					<Input
						type="text"
						placeholder="Project Name"
						value={formSeekProjects.name}
						onChange={onChange}
						className={styles.searchInput}
						style={{ width: "100%" }}
						name="name"
					/>
					<Select
						name="industry"
						value={formSeekProjects.industry}
						onChange={(e) => onChange(e, "industry")}
						className={styles.searchSelect}
						placeholder="Select Industry"
						style={{ width: "13rem" }}
						options={listSector}
					/>
					<Select
						value={formSeekProjects.stage}
						onChange={(e) => onChange(e, "stage")}
						className={styles.searchSelect}
						placeholder="Select Stage"
						style={{ width: "13rem" }}
						options={listStage}
					/>
				</div>
				<Button
					className={styles.searchButton}
					type="primary"
					icon={<SearchOutlined />}
					loading={loadingSeekProjects}
					onClick={handleSeekProjects}
					onKeyDown={(e) => handleKeyDown(e)}>
					Search
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
