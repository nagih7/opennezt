import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import { setOpenModalMatchingProjects } from "states/modules/artificialIntelligence";
import ProjectDetailsModal from "components/pages/SeekProjects/ProjectDetailsModal";
import LazyLoading from "components/UI/LazyLoading";
import { getProjectDetails } from "api/project";
import { getRequestAddFriend } from "api/notification";
import BoxProjectMatching from "components/pages/Project/BoxProjectMatching";
import TransformAI from "components/UI/TransformAI";

const MatchingProjectsModal = () => {
	const dispatch = useDispatch();

	const { projectDetails } = useSelector((state) => state.project);
	const { openModalMatchingProjects, projects, loadingMatchingProjects } =
		useSelector((state) => state.artificialIntelligence);

	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleViewDetails = (projectId, userId) => {
		setIsModalVisible(true);
		dispatch(getProjectDetails(projectId));
		dispatch(getRequestAddFriend(userId));
	};
	return (
		<>
			<Modal
				width={560}
				open={loadingMatchingProjects}
				footer={null}
				style={{ textAlign: "center" }}>
				<TransformAI />
			</Modal>
			<Modal
				open={openModalMatchingProjects}
				footer={null}
				width={1300}
				onCancel={() => dispatch(setOpenModalMatchingProjects(false))}>
				<div className={styles.matchingProjectsWrap}>
					{projects.length > 0 &&
						projects.map((project, index) => (
							<BoxProjectMatching
								key={index}
								project={project}
								openModalDetails={handleViewDetails}
								matchScore={project.matchScore}
							/>
						))}
				</div>
			</Modal>
			{projectDetails && projectDetails.name && (
				<LazyLoading>
					<ProjectDetailsModal
						isVisible={isModalVisible}
						onClose={() => setIsModalVisible(false)}
						projectDetails={projectDetails}
					/>
				</LazyLoading>
			)}
		</>
	);
};

export default MatchingProjectsModal;
