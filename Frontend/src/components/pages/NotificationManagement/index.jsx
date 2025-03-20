import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tag, Button, Modal, Row, Col } from "antd";
import TableCustom from "components/UI/Table";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import store from "states/configureStore";
import { getTalentDetails } from "api/talent";
import moment from "moment";
import {
	getNotifications,
	getTotalFriends,
	readRoot,
	replyNotification,
} from "api/notification";
import {
	FRIENDS,
	ACTIONS,
	STATUS,
	TYPE,
	REQUEST_BY,
	REQUEST_AT,
} from "utils/constains";

const TalentProfile = React.lazy(() =>
	import("components/common/TalentProfile")
);

function NotificationProject() {
	const [openModalTalentDetails, setOpenModalTalentDetails] = useState(false);
	const { language } = useSelector((state) => state.app);
	const [dataFilter, setDataFilter] = useState({
		page: 1,
		perPage: 10,
		order: null,
	});
	const { talentDetails, isLoadingGetTalentDetails } = useSelector(
		(state) => state.talent
	);
	const { notifications, totalFriends, paginationListNotification } =
		useSelector((state) => state.notification);

	useEffect(() => {
		store.dispatch(readRoot(dataFilter));
		store.dispatch(getTotalFriends());
	}, [dataFilter]);

	const handleOpenTalentDetails = async (user_id) => {
		setOpenModalTalentDetails(true);
		await store.dispatch(getTalentDetails(user_id));
	};

	const handleReplyNotification = async (notification_id, type_id, status) => {
		await store.dispatch(
			replyNotification({ notification_id, type_id, status })
		);
		await store.dispatch(getNotifications());
		if (status === "accepted") {
			await store.dispatch(getChatList());
		}
	};

	const columns = [
		{
		  title: REQUEST_BY[language],
		  dataIndex: "source_name",
		  key: "source_name",
		  render: (source_name, record) => {
			if (!source_name) return null; // Kiểm tra nếu user_name không tồn tại
			return (
			  <Button
				type="link"
				onClick={() => handleOpenTalentDetails(record.source_id)}
				style={{ padding: 0, height: "auto" }}>
				{source_name}
			  </Button>
			);
		  },
		},
		{
			title: TYPE.TYPE[language],
			dataIndex: "type_name",
			key: "type_name",
			render: (type_name) => {
				return (
					<div>{type_name ? type_name.toUpperCase() : "Unknown Type"}</div>
				);
			},
		},
		{
			title: REQUEST_AT[language],
			dataIndex: "created_at",
			key: "created_at",
			render: (date) => moment(date).fromNow(),
		},
		{
			title: STATUS.STATUS[language],
			dataIndex: "metadata",
			key: "status",
			render: (metadata = {}) => {
				const status = metadata.status ?? "unknown";

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
			title: ACTIONS.ACTIONS[language],
			key: "actions",
			fixed: "right",
			align: "center",
			width: "15rem",
			render: (_, record) => {
				// Kiểm tra nếu metadata hoặc status không hợp lệ
				if (!record.metadata || !record.metadata.status) {
					return <div>Status is invalid or missing</div>;
				}
				return (
					<div className={styles.actionButtons}>
						<Button
							type="primary"
							icon={<CheckOutlined />}
							onClick={() =>
								handleReplyNotification(
									record._id,
									record.type_id,
									STATUS.ACCEPTED[language].toLowerCase()
								)
							}
							disabled={record.metadata?.status !== "waiting"}>
							{ACTIONS.ACCEPT[language]}
						</Button>
						<Button
							type="default"
							danger
							icon={<CloseOutlined />}
							onClick={() =>
								handleReplyNotification(
									record._id,
									record.type_id,
									STATUS.REJECTED[language].toLowerCase()
								)
							}
							disabled={record.metadata?.status !== "waiting"}>
							{ACTIONS.REJECT[language]}
						</Button>
					</div>
				);
			},
		},
	];

	const changeCurrentPage = (page) => {
		setDataFilter({ ...dataFilter, page: page });
	};

	const onChange = (pagination, filters, sorter) => {
		if (sorter.order && sorter.field) {
			setDataFilter({
				...dataFilter,
				order: sorter.order === "descend" ? -1 : 1,
				column: sorter.field,
			});
		} else {
			setDataFilter({ ...dataFilter, order: null, column: null });
		}
	};

	return (
		<div className={styles.notificationsWrap}>
			<div className={styles.overviewWrap}>
				<Row gutter={20}>
					<Col xs={6} sm={6} md={6} lg={6} xl={6}>
						<div className={styles.itemWrap}>
							<Row>
								<Col xs={12} sm={12} md={12} lg={12} xl={12}>
									<div className={styles.friendsWrap}>
										<div className={styles.labelWrap}>
											{FRIENDS[language]}
										</div>
										<div className={styles.numberWrap}>
											{totalFriends}
										</div>
										{/* <div className={styles.dateUpdate}>last week</div> */}
									</div>
								</Col>
								<Col xs={12} sm={12} md={12} lg={12} xl={12}>
									<div
										className={`${styles.iconWrap} ${styles.iconUser}`}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 60 48"
											width="60"
											height="48">
											<path
												fill="currentColor"
												d="M29.99 30c5.382 0 9.666-4.366 9.666-9.75s-4.364-9.75-9.666-9.75c-5.382 0-9.666 4.366-9.666 9.75C20.24 25.632 24.608 30 29.99 30zm0-15c2.892 0 5.246 2.354 5.246 5.25s-2.358 5.25-5.246 5.25-5.25-2.354-5.25-5.25S27.094 15 29.99 15zM48 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM34.678 33h-9.356C17.962 33 12 38.596 12 45.496 12 46.884 13.19 48 14.662 48h30.674c1.472 0 2.662-1.116 2.662-2.504 0-6.9-5.962-12.496-13.322-12.496zM16.696 43.5c.982-3.446 4.44-6 8.544-6h9.438c4.104 0 7.562 2.554 8.544 6H16.696zM51.74 18h-5.798c-1.2 0-2.332.284-3.362.772.056.494.15.972.15 1.478 0 3.16-1.198 6.02-3.108 8.25h18.722c.916 0 1.656-.788 1.656-1.754C60 21.918 56.306 18 51.74 18zm-34.5 2.25c0-.51.092-.996.15-1.492-1.022-.562-2.146-.758-3.336-.758H8.258C3.698 18 0 21.918 0 26.746c0 .966.74 1.754 1.652 1.754h18.704c-1.914-2.232-3.114-5.09-3.114-8.25zM12 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z"
											/>
										</svg>
									</div>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
			</div>
			<div className={styles.notificationsTableWrap}>
				<TableCustom
					loading={isLoadingGetTalentDetails}
					columns={columns}
					dataSource={notifications}
					rowKey="_id"
					pagination={paginationListNotification}
					onChangeCurrentPage={changeCurrentPage}
					onChange={onChange}
				/>
			</div>
			<Modal
				footer={null}
				title=""
				open={openModalTalentDetails}
				onCancel={() => setOpenModalTalentDetails(false)}
				width={1000}>
				<React.Suspense fallback={<div>{ACTIONS.LOADING[language]}</div>}>
					<TalentProfile talent={talentDetails} />
				</React.Suspense>
			</Modal>
		</div>
	);
}

export default NotificationProject;
