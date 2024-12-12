import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Tag, Button, message, Modal } from "antd";
import { CheckOutlined, CloseOutlined, StopOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import store from "states/configureStore";
import {
	getPendingProjects,
	responseRequestToJoinProject,
	getProjectDetails,
} from "api/project";
import { getTalentDetails } from "api/talent";
import moment from "moment";
const TalentProfile = React.lazy(() =>
	import("components/common/TalentProfile")
);

const ProjectDetails = React.lazy(() => import("../../common/ProjectDetails"));

function NotificationProject() {
	const [openModalTalentDetails, setOpenModalTalentDetails] = useState(false);
	const [openModalProjectDetails, setOpenModalProjectDetails] =
		useState(false);

	const { pendingRequests, projectDetails } = useSelector(
		(state) => state.project
	);

	const { talentDetails, loadingGetTalentDetails } = useSelector(
		(state) => state.talent
	);

	useEffect(() => {
		store.dispatch(getPendingProjects());
	}, []);

	const handleOpenModalDetails = async (project_id) => {
		await store.dispatch(getProjectDetails(project_id));
		setOpenModalProjectDetails(true);
	};

	const handleUpdateStatus = async (record, status) => {
		await store.dispatch(
			responseRequestToJoinProject({
				request_id: record._id,
				status,
			})
		);
		await store.dispatch(getPendingProjects());
	};

	const handleOpenTalentDetails = async (email) => {
		await store.dispatch(getTalentDetails(email));
	};

	const columns = [
		{
			title: "Project Name",
			dataIndex: "project_name",
			key: "project_name",
			render: (text, record) => (
				<Button
					type="link"
					onClick={() => handleOpenModalDetails(record.project_id)}
					style={{ padding: 0, height: "auto" }}>
					{text}
				</Button>
			),
		},
		{
			title: "Requested By",
			dataIndex: "sender_name",
			key: "sender_name",
			render: (name, record) => (
				<Button
					type="link"
					onClick={() => handleOpenTalentDetails(record.sender_id)}
					style={{ padding: 0, height: "auto" }}>
					{name}
				</Button>
			),
		},
		{
			title: "Role",
			dataIndex: "role",
			key: "role",
			render: (role) => <Tag color="blue">{role.toUpperCase()}</Tag>,
		},
		{
			title: "Requested At",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (date) => moment(date).fromNow(),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status) => {
				let color;
				switch (status) {
					case "waiting":
						color = "gold";
						break;
					case "accepted":
						color = "green";
						break;
					case "rejected":
						color = "red";
						break;
					case "blocked":
						color = "red";
						break;
					default:
						color = "gray";
				}
				return <Tag color={color}>{status.toUpperCase()}</Tag>;
			},
		},
		{
			title: "Actions",
			key: "actions",
			render: (_, record) => (
				<div className={styles.actionButtons}>
					<Button
						type="primary"
						icon={<CheckOutlined />}
						onClick={() => handleUpdateStatus(record, "accepted")}
						disabled={record.status !== "waiting"}>
						Accept
					</Button>
					<Button
						type="default"
						danger
						icon={<CloseOutlined />}
						onClick={() => handleUpdateStatus(record, "rejected")}
						disabled={record.status !== "waiting"}>
						Reject
					</Button>
					<Button
						type="default"
						danger
						icon={<StopOutlined />}
						onClick={() => handleUpdateStatus(record, "blocked")}
						disabled={record.status !== "waiting"}>
						Block
					</Button>
				</div>
			),
		},
	];

	return (
		<>
			<div className={styles.notificationContainer}>
				<h2>Project Requests</h2>
				<Table
					columns={columns}
					dataSource={pendingRequests}
					loading={loadingGetTalentDetails}
					rowKey="_id"
					pagination={{ pageSize: 10 }}
				/>
			</div>
			<Modal
				title=""
				open={openModalProjectDetails}
				onCancel={() => setOpenModalProjectDetails(false)}
				width={1280}>
				<React.Suspense fallback={<div>Loading...</div>}>
					<ProjectDetails projectDetails={projectDetails} />
				</React.Suspense>
			</Modal>
			<Modal
				title=""
				open={openModalTalentDetails}
				onCancel={() => setOpenModalTalentDetails(false)}
				width={1000}>
				<React.Suspense fallback={<div>Loading...</div>}>
					<TalentProfile talent={talentDetails} />
				</React.Suspense>
			</Modal>
		</>
	);
}

export default NotificationProject;
