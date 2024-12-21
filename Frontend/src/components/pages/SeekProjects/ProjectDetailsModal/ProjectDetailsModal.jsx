import React from "react";
import { Modal, Typography, Tag, Space, Row, Col, Card } from "antd";
import {
	DollarCircleOutlined,
	TeamOutlined,
	RocketOutlined,
	AimOutlined,
} from "@ant-design/icons";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import styles from "./styles.module.scss";
import BackgroundDefault from "assets/images/default/BackgroundDefault.png";
import LazyLoadingMedium from "components/UI/LazyLoadingMedium";
import { useSelector } from "react-redux";
import { getRequestAddFriend, sendRequestAddFriend } from "api/notification";
import store from "states/configureStore";

const { Title, Text, Paragraph } = Typography;
const MemberBox = React.lazy(() =>
	import("../../../common/ProjectDetails/ProjectInfo/MemberBox")
);

const ProjectDetailsModal = ({ isVisible, onClose, projectDetails }) => {
	const { requestAddFriend, loadingSendRequestAddFriend } = useSelector(
		(state) => state.notification
	);

	const handleRequestAddFriend = async (user_id) => {
		const requestMessageForm = {
			user_id: user_id,
			metadata: {},
		};
		await store.dispatch(sendRequestAddFriend(requestMessageForm));
		await store.dispatch(getRequestAddFriend(user_id));
	};

	return (
		<Modal
			open={isVisible}
			onCancel={onClose}
			onOk={() => handleRequestAddFriend(projectDetails.user_id)}
			width={1200}
			confirmLoading={loadingSendRequestAddFriend}
			okButtonProps={{
				disabled: requestAddFriend,
			}}
			okText={
				<div
					style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
					<PersonAddIcon />
					Add friend
				</div>
			}
			className={styles.projectModal}>
			<div className={styles.modalContent}>
				<div className={styles.projectHeader}>
					<img
						src={
							projectDetails.background
								? projectDetails.background
								: BackgroundDefault
						}
						alt={projectDetails.name}
						className={styles.headerImage}
					/>
					<div className={styles.headerOverlay}>
						<Title level={2}>{projectDetails.name}</Title>
						<Space size={8} wrap>
							{projectDetails.related_industries?.map((industry) => (
								<Tag key={industry} color="blue">
									{industry}
								</Tag>
							))}
						</Space>
						<Space size={8} wrap>
							<Tag color="green" icon={<RocketOutlined />}>
								{projectDetails.stage}
							</Tag>
						</Space>
					</div>
				</div>

				<div className={styles.sections}>
					<Row gutter={[24, 24]}>
						<Col span={24}>
							<Card className={styles.section}>
								<Title level={4} icon={<AimOutlined />}>
									Project Overview
								</Title>
								<Row gutter={[24, 24]}>
									<Col span={12}>
										<div className={styles.infoItem}>
											<Text strong>Problem</Text>
											<Paragraph>{projectDetails.problem}</Paragraph>
										</div>
									</Col>
									<Col span={12}>
										<div className={styles.infoItem}>
											<Text strong>Target Audience</Text>
											<Paragraph>
												{projectDetails.target_audience}
											</Paragraph>
										</div>
									</Col>
								</Row>
								<Row gutter={[24, 24]}>
									<Col span={12}>
										<div className={styles.infoItem}>
											<Text strong>Solution</Text>
											<Paragraph>
												{projectDetails.solution}
											</Paragraph>
										</div>
									</Col>
									<Col span={12}>
										<div className={styles.infoItem}>
											<Text strong>Statistics</Text>
											<Paragraph>
												{projectDetails.statistics}
											</Paragraph>
										</div>
									</Col>
								</Row>
							</Card>
						</Col>
						<Col span={24}>
							<Card className={styles.section}>
								<Title level={4} icon={<DollarCircleOutlined />}>
									Team Infomation
								</Title>
								<Row gutter={[16, 16]}>
									<LazyLoadingMedium>
										<MemberBox member={projectDetails.owner} />
									</LazyLoadingMedium>
									{projectDetails.members &&
										projectDetails.members.length > 0 &&
										projectDetails.members.map((member, index) => (
											<LazyLoadingMedium key={index}>
												<MemberBox member={member} />
											</LazyLoadingMedium>
										))}
								</Row>
							</Card>
						</Col>

						<Col span={24}>
							<Card className={styles.section}>
								<Title level={4} icon={<DollarCircleOutlined />}>
									Funding Information
								</Title>
								<Row gutter={[16, 16]}>
									{Object.entries(projectDetails.funding_sources).map(
										([source, amount]) => (
											<Col span={8} key={source}>
												<Card className={styles.fundingCard}>
													<Text strong>
														{source
															.replace(/_/g, " ")
															.toUpperCase()}
													</Text>
													<Text className={styles.amount}>
														${amount}
													</Text>
												</Card>
											</Col>
										)
									)}
									<Col span={24}>
										<div className={styles.infoItem}>
											<Text strong>Target Money</Text>
											<Paragraph>
												{projectDetails.target_money}
											</Paragraph>
										</div>
									</Col>
								</Row>
							</Card>
						</Col>

						<Col span={24}>
							<Card className={styles.section}>
								<Title level={4} icon={<TeamOutlined />}>
									Strategy & Competition
								</Title>
								<Row gutter={[24, 24]}>
									<Col span={12}>
										<div className={styles.infoItem}>
											<Text strong>Competitors</Text>
											<Paragraph>
												{projectDetails.competitors}
											</Paragraph>
										</div>
									</Col>
									<Col span={12}>
										<div className={styles.infoItem}>
											<Text strong>Strategy</Text>
											<Paragraph>
												{projectDetails.strategy}
											</Paragraph>
										</div>
									</Col>
								</Row>
								<Row gutter={[24, 24]}>
									<Col span={12}>
										<div className={styles.infoItem}>
											<Text strong>Competitive Advantage</Text>
											<Paragraph>
												{projectDetails.competitive_advantage}
											</Paragraph>
										</div>
									</Col>
									<Col span={12}>
										<div className={styles.infoItem}>
											<Text strong>Why Now</Text>
											<Paragraph>{projectDetails.why_now}</Paragraph>
										</div>
									</Col>
								</Row>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		</Modal>
	);
};
export default ProjectDetailsModal;
