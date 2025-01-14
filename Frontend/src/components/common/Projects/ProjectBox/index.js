import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import BackgroundDefault from "assets/images/default/BackgroundDefault.png";
import { sendProjectInvitation } from "api/notification";
import { Button, message, Modal, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { getProjectInvitations } from "api/project";
import store from "states/configureStore";
import { listTeamRole, listRole } from "components/common/ListSelected";

const ProjectBox = ({ project, inviteeId }) => {
	const dispatch = useDispatch();

	const [modalConfirm, setModalConfirm] = useState(false);
	const [modalRole, setModalRole] = useState(false);
	const [invitationStatus, setInvitationStatus] = useState(true);
	const [invitations, setInvitations] = useState([]);
	const [formProjectInvitation, setFormProjectInvitation] = useState({
		project_id: "",
		project_name: "",
		team_role: "",
		role: "",
	});

	const { loadingProjectInvitation } = useSelector(
		(state) => state.notification
	);
	const { projectInvitations } = useSelector((state) => state.project);

	useEffect(() => {
		setInvitations(projectInvitations);
		const projectInvitation = invitations.find(
			(item) => item.metadata.project._id === project._id
		);
		if (projectInvitation) {
			setInvitationStatus(true);
		} else {
			setInvitationStatus(false);
		}
	}, [projectInvitations, project._id, invitations]);

	const handleProjectInvitation = (project) => {
		setModalRole(true);
		setFormProjectInvitation({
			project_id: project._id,
			project_name: project.name,
		});
	};

	const confirmRole = async () => {
		if (!formProjectInvitation.team_role || !formProjectInvitation.role) {
			message.error("Please fill in all fields.");
			return;
		}
		setModalConfirm(true);
	};

	const confirmInvite = async () => {
		console.log("formProjectInvitation", formProjectInvitation);
		await store.dispatch(
			sendProjectInvitation({ ...formProjectInvitation, user_id: inviteeId })
		);
		setModalConfirm(false);
		store.dispatch(getProjectInvitations(inviteeId));
	};

	const onChange = (value, key) => {
		setFormProjectInvitation({
			...formProjectInvitation,
			[key]: value,
		});
	};

	return (
		<div className={styles.projectBoxWrap}>
			<div className={styles.projectBackground}>
				<img
					src={project.background || BackgroundDefault}
					alt={project.title}
					onError={(e) => {
						e.target.onerror = null;
						e.target.src = BackgroundDefault;
					}}
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
				title="Please select a role."
				okText="Confirm"
				onOk={confirmRole}
				open={modalRole}
				width={800}
				// confirmLoading={false}
				centered
				onCancel={() => setModalRole(false)}>
				<div className={styles.modalRoleWrap}>
					<Select
						value={formProjectInvitation.team_role}
						required
						showSearch
						placeholder="Team Role"
						optionFilterProp="label"
						onChange={(value) => onChange(value, "team_role")}
						size="large"
						style={{ width: "100%" }}
						options={listTeamRole}
					/>
					<Select
						value={formProjectInvitation.role}
						required
						showSearch
						placeholder="Role"
						optionFilterProp="label"
						onChange={(value) => onChange(value, "role")}
						size="large"
						style={{ width: "100%" }}
						options={listRole}
					/>
				</div>
			</Modal>
			<Modal
				title="Are you sure you want to invite?"
				okText="Confirm"
				onOk={confirmInvite}
				open={modalConfirm}
				confirmLoading={loadingProjectInvitation}
				centered
				onCancel={() => setModalConfirm(false)}
			/>
		</div>
	);
};

export default ProjectBox;
