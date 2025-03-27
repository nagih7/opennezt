import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import BackgroundDefault from "assets/images/default/BackgroundDefault.png";
import { sendProjectInvitation } from "api/notification";
import { Button, message, Modal, Select } from "antd";
import { useSelector } from "react-redux";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import store from "states/configureStore";
import {
	INDUSTRY_FIELD,
	STAGE_OF_DEVELOPMENT,
	ACTIONS,
	STATUS,
	NOTIFICATIONS,
	INPUT_PLACEHOLDER,
	TEAM_ROLE,
	ROLE,
} from "utils/constants";

const ProjectBox = ({ project, inviteeId }) => {
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
	const { language } = useSelector((state) => state.app);
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
		await store.dispatch(
			sendProjectInvitation({ ...formProjectInvitation, user_id: inviteeId })
		);
		setModalConfirm(false);
	};

	const onChange = (option, key) => {
		setFormProjectInvitation({
			...formProjectInvitation,
			[key]: option.value,
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
					<strong>[{INDUSTRY_FIELD[language]}]</strong>{" "}
					{project.related_industries.join(" / ")}
				</p>
				<p
					style={{
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}>
					<strong>[{STAGE_OF_DEVELOPMENT[language]}]</strong>{" "}
					{project.stage}
				</p>
			</div>
			{inviteeId && (
				<div className={styles.btnInvite}>
					<Button
						onClick={() => handleProjectInvitation(project)}
						loading={false}
						type="primary"
						disabled={invitationStatus}
						icon=<GroupAddIcon />>
						{invitationStatus
							? ACTIONS.INVITE[language]
							: STATUS.INVITED[language]}
					</Button>
				</div>
			)}
			<Modal
				title={NOTIFICATIONS.PLEASE_SELECT_A_ROLE[language]}
				okText={ACTIONS.CONFIRM[language]}
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
						placeholder={INPUT_PLACEHOLDER.TEAM_ROLE[language]}
						optionFilterProp="label"
						onChange={(value, option) => onChange(option, "team_role")}
						size="large"
						style={{ width: "100%" }}
						options={TEAM_ROLE[language]}
					/>
					<Select
						value={formProjectInvitation.role}
						required
						showSearch
						placeholder={INPUT_PLACEHOLDER.ROLE[language]}
						optionFilterProp="label"
						onChange={(value, option) => onChange(option, "role")}
						size="large"
						style={{ width: "100%" }}
						options={ROLE[language]}
					/>
				</div>
			</Modal>
			<Modal
				title={NOTIFICATIONS.ARE_YOU_SURE_YOU_WANT_TO_INVITE[language]}
				okText={ACTIONS.CONFIRM[language]}
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
