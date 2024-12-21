import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import store from "states/configureStore";
import { listSector, listStage } from "components/common/ListSelected";
import { seekProjects, getProjectDetails } from "api/project";
import { Select, Button, Input } from "antd";

import LazyLoadingMedium from "components/UI/LazyLoadingMedium";
import { getRequestAddFriend } from "api/notification";

const SeekProjectBox = React.lazy(() => import("./SeekProjectBox"));
const ProjectDetailsModal = React.lazy(() => import("./ProjectDetailsModal"));

const SeekProjects = () => {
	const { projectsBySeek, projectDetails } = useSelector(
		(state) => state.project
	);

	const [formSeekProjects, setFormSeekProjects] = useState({
		industry: null,
		stage: null,
		name: null,
	});

	const [isModalVisible, setIsModalVisible] = useState(false);

	useEffect(() => {
		store.dispatch(seekProjects());
	}, []);

	const handleSeekProjects = async (e) => {
		await store.dispatch(seekProjects(formSeekProjects));
	};

	const onChange = (event, nameSelect) => {
		if (nameSelect) {
			setFormSeekProjects((prevState) => ({
				...prevState,
				[nameSelect]: event,
			}));
		} else {
			const { name, value } = event.target;
			setFormSeekProjects((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleSeekProjects();
		}
	};

	const handleViewDetails = async (projectId, userId) => {
		setIsModalVisible(true);
		await store.dispatch(getProjectDetails(projectId));
		await store.dispatch(getRequestAddFriend(userId));
	};

	return (
		<div className={styles.searchContainer}>
			<div className={styles.searchForm}>
				<Select
					name="industry"
					value={formSeekProjects.industry}
					onChange={(e) => onChange(e, "industry")}
					className={styles.searchSelect}
					placeholder="Select Industry"
					style={{ width: "100%", marginRight: "2rem" }}
					options={listSector}
				/>
				<Select
					value={formSeekProjects.stage}
					onChange={(e) => onChange(e, "stage")}
					className={styles.searchSelect}
					placeholder="Select Stage"
					style={{ width: "100%", marginRight: "2rem" }}
					options={listStage}
				/>
				<Input
					type="text"
					placeholder="Project Name"
					value={formSeekProjects.name}
					onChange={onChange}
					className={styles.searchInput}
					style={{ flex: 1 }}
					name="name"
				/>
				<Button
					onClick={handleSeekProjects}
					onKeyDown={(e) => handleKeyDown(e)}
					type="primary"
					htmlType="submit"
					className={styles.searchButton}>
					Search
				</Button>
			</div>

			<div className={styles.projectsList}>
				{projectsBySeek &&
					projectsBySeek.length > 0 &&
					projectsBySeek.map((project, index) => (
						<LazyLoadingMedium key={index}>
							<SeekProjectBox
								project={project}
								handleViewDetails={handleViewDetails}
							/>
						</LazyLoadingMedium>
					))}
			</div>
			{projectDetails && projectDetails.name && (
				<LazyLoadingMedium>
					<ProjectDetailsModal
						isVisible={isModalVisible}
						onClose={() => setIsModalVisible(false)}
						projectDetails={projectDetails}
					/>
				</LazyLoadingMedium>
			)}
		</div>
	);
};

export default SeekProjects;
