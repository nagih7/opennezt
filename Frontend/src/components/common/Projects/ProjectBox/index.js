import React, { useState } from "react";
import styles from "./styles.module.scss";
import BackgroundDefault from "assets/images/default/BackgroundDefault.png";
import ButtonMASQ from "components/UI/Button";
import store from "states/configureStore";
import { sendProjectInvitation } from "api/notification";
import { getProjectInvitations } from "api/project";
import { Modal } from "antd";
import { useSelector } from "react-redux";

const ProjectBox = ({ project, inviteeId }) => {
	const [projectIdInvitation, setProjectIdInvitation] = useState("");
	const [modalConfirm, setModalConfirm] = useState(false);

	const { loadingProjectInvitation } = useSelector(
		(state) => state.notification
	);

	const handleProjectInvitation = (project_id) => {
		setModalConfirm(true);
		store.dispatch(getProjectInvitations());
		setProjectIdInvitation(project_id);
	};

	const confirmInvite = () => {
		const formRequest = {
			project_id: projectIdInvitation,
			user_id: inviteeId,
		};
		store.dispatch(sendProjectInvitation(formRequest));
		setModalConfirm(false);
	};

	return (
		<div className={styles.projectBoxWrap}>
			<div className={styles.projectBackground}>
				<img
					src={project.background ? project.background : BackgroundDefault}
					alt={project.title}
				/>
			</div>
			<div className={styles.projectInfo}>
				<h3>{project.name}</h3>

				<p>
					<strong>[Industry Field]</strong>{" "}
					{project.related_industries.join(" / ")}
				</p>
				<p
					style={{
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}>
					<strong>[Stage of Development]</strong> {project.stage}
				</p>
			</div>
			<div className={styles.btnInvite}>
				<ButtonMASQ
					onClick={() => handleProjectInvitation(project._id)}
					loading={false}
					style={{
						minWidth: "80px",
						height: "2rem",
						margin: "0",
						border: "none",
						padding: "4px 8px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#1a85f8",
					}}
					textBtn={"Invite"}
				/>
			</div>
			<Modal
				title="Are you sure you want to invite?"
				okText="Confirm"
				onOk={() => confirmInvite(false)}
				open={modalConfirm}
				confirmLoading={loadingProjectInvitation}
				centered
				onCancel={() => setModalConfirm(false)}></Modal>
		</div>
	);
};

export default ProjectBox;
