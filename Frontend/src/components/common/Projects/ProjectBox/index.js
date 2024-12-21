import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import BackgroundDefault from "assets/images/default/BackgroundDefault.png";
import store from "states/configureStore";
import { sendProjectInvitation } from "api/notification";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";

const ProjectBox = ({ project, inviteeId }) => {
	const [projectIdInvitation, setProjectIdInvitation] = useState("");
	const [modalConfirm, setModalConfirm] = useState(false);
	const [invitationStatus, setInvitationStatus] = useState(false);
	const [invitations, setInvitations] = useState([]);

	const { loadingProjectInvitation } = useSelector(
		(state) => state.notification
	);
	const { projectInvitations } = useSelector((state) => state.project);

	useEffect(() => {
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		setInvitationStatus(false);
		if (projectInvitations.length > 0) {
			setInvitations(projectInvitations);
			const projectInvitation = invitations.find(
				(item) => item.metadata.project._id === project._id
			);
			if (projectInvitation) {
				setInvitationStatus(true);
			}
		}
	}, [projectInvitations, project._id, invitations]);

	const handleProjectInvitation = (project_id) => {
		setModalConfirm(true);
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
				<Button
					onClick={() => handleProjectInvitation(project._id)}
					loading={false}
					type="primary"
					disabled={invitationStatus}>
					{invitationStatus ? "Invited" : "Invite"}
				</Button>
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
