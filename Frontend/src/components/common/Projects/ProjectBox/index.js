import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import BackgroundDefault from "assets/images/default/BackgroundDefault.png";
import { sendProjectInvitation } from "api/notification";
import { Button, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { getProjectInvitations } from "api/project";
import store from "states/configureStore";

const ProjectBox = ({ project, inviteeId }) => {
	const dispatch = useDispatch();

	const [modalConfirm, setModalConfirm] = useState(false);
	const [invitationStatus, setInvitationStatus] = useState(true);
	const [invitations, setInvitations] = useState([]);
	const [formProjectInvitation, setFormProjectInvitation] = useState({
		project_id: "",
		project_name: "",
	});

	const { loadingProjectInvitation } = useSelector(
		(state) => state.notification
	);
	const { projectInvitations } = useSelector((state) => state.project);

	useEffect(() => {
		if (projectInvitations.length > 0) {
			setInvitations(projectInvitations);
			const projectInvitation = invitations.find(
				(item) => item.metadata.project._id === project._id
			);
			if (projectInvitation) {
				setInvitationStatus(true);
			} else {
				setInvitationStatus(false);
			}
		}
	}, [projectInvitations, project._id, invitations]);

	const handleProjectInvitation = (project) => {
		setModalConfirm(true);
		setFormProjectInvitation({
			project_id: project._id,
			project_name: project.name,
		});
	};

	const confirmInvite = async () => {
		await store.dispatch(
			sendProjectInvitation({ ...formProjectInvitation, user_id: inviteeId })
		);
		setModalConfirm(false);
		store.dispatch(getProjectInvitations(inviteeId));
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
					onClick={() => handleProjectInvitation(project)}
					loading={false}
					type="primary"
					disabled={invitationStatus}
					icon=<GroupAddIcon />>
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
