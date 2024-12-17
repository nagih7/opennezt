import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "antd";
import BackgroundDefault from "assets/images/default/BackgroundDefault.png";
import { requestMessage } from "api/notification";
import store from "states/configureStore";
import { useSelector } from "react-redux";

const SeekProjectBox = ({ project, handleViewDetails }) => {
	const [statusRequest, setStatusRequest] = useState(null);

	const { authUser } = useSelector((state) => state.auth);

	useEffect(() => {
		if (project.project_request) {
			setStatusRequest(project.project_request.status);
		}
	}, [project.project_request]);

	const handleSendRequestMessage = async (
		project_id,
		project_name,
		user_id
	) => {
		if (statusRequest === "waiting") {
			return;
		}
		const requestMessageForm = {
			user_id: user_id,
			source_name: authUser.name,
			metadata: {
				project_id: project_id,
				project_name,
			},
		};

		await store.dispatch(requestMessage(requestMessageForm));
		setStatusRequest("waiting");
	};

	const getButtonProps = (status, projectId) => {
		switch (status) {
			case "waiting":
				return {
					children: "Requested",
					disabled: true,
					type: "default",
					style: {
						backgroundColor: "#52c41a",
						color: "white",
						cursor: "not-allowed",
					},
				};
			case "accepted":
				return {
					children: "Accepted",
					disabled: true,
					type: "primary",
					style: {
						backgroundColor: "#1677ff",
						cursor: "not-allowed",
						color: "white",
					},
				};
			case "blocked":
				return {
					children: "Blocked",
					disabled: true,
					type: "primary",
					danger: true,
					style: {
						backgroundColor: "#ff4d4f",
						cursor: "not-allowed",
						color: "white",
					},
				};
			default:
				return {
					children: "Send Request Message",
					type: "primary",
					style: {
						backgroundColor: "#2ccdc6",
						color: "white",
					},
					onClick: () =>
						handleSendRequestMessage(
							projectId,
							project.name,
							project.user_id
						),
				};
		}
	};

	return (
		<div className={styles.seekProjectBoxWrap}>
			<div className={styles.projectImage}>
				<img
					src={project.background ? project.background : BackgroundDefault}
					alt={project.name}
				/>
			</div>
			<div className={styles.projectContent}>
				{/* // expandedProjectId === project._id ? styles.expanded : "" */}
				<h3
					className={styles.projectName}
					onClick={() => toggleExpand(project._id)}>
					{project.name}
				</h3>
				<p
					className={styles.projectProblem}
					onClick={() => toggleExpand(project._id)}>
					<strong>Problem:</strong> {project.problem}
				</p>
				<p
					className={styles.projectSolution}
					onClick={() => toggleExpand(project._id)}>
					<strong>Solution:</strong> {project.solution}
				</p>
				<p className={styles.projectUpdatedAt}>
					<strong>Updated At:</strong>{" "}
					{new Date(project.updated_at).toLocaleDateString()}
				</p>
				<div className={styles.buttonContainer}>
					<button
						className={styles.viewButton}
						onClick={() => handleViewDetails(project._id)}>
						View Detail
					</button>

					<Button {...getButtonProps(statusRequest, project._id)} />
				</div>
			</div>
		</div>
	);
};

export default SeekProjectBox;
