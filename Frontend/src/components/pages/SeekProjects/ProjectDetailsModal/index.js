import React, { useState } from "react";
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
import LazyLoading from "components/UI/LazyLoading";
import { useSelector, useDispatch } from "react-redux";
import { getRequestAddFriend, sendRequestAddFriend } from "api/notification";
import { getTalentDetails } from "api/talent";
const { Title, Text, Paragraph } = Typography;
import MemberBox from "../../../common/ProjectDetails/ProjectInfo/MemberBox";
import store from "states/configureStore";

const TalentProfile = React.lazy(() =>
	import("components/common/TalentProfile")
);

const ProjectDetailsModal = ({ isVisible, onClose, projectDetails }) => {
	const dispatch = useDispatch();

	// Redux
	const { requestAddFriend, loadingSendRequestAddFriend } = useSelector(
		(state) => state.notification
	);
	const { talentDetails } = useSelector((state) => state.talent);

	// State
	const [openModalMemberDetails, setOpenModalMemberDetails] = useState(false);

	const handleRequestAddFriend = async (user_id) => {
		const requestMessageForm = {
			user_id: user_id,
			metadata: {},
		};
		await store.dispatch(sendRequestAddFriend(requestMessageForm));
		dispatch(getRequestAddFriend(user_id));
	};

	// Function handle open modal member details
	const handleOpenModalMemberDetails = (member) => {
		setOpenModalMemberDetails(true);
		dispatch(getTalentDetails(member._id));
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
					Contact
				</div>
			}
			className={styles.projectModal}>
			<div className={styles.modalContent}>
				<div className={styles.projectHeader}>
					<img
						className={styles.headerImage}
						src={projectDetails.background || BackgroundDefault}
						alt={projectDetails.name}
						onError={(e) => {
							e.target.onerror = null;
							e.target.src = Background;
						}}
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
							<Tag
								color="green"
								icon={<RocketOutlined style={{ height: "0.5rem	" }} />}>
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
									<MemberBox
										owner_id={projectDetails.user_id}
										member={projectDetails.owner}
										openModalMemberDetails={
											handleOpenModalMemberDetails
										}
									/>
									{projectDetails.metadata.members &&
										projectDetails.metadata.members.length > 0 &&
										projectDetails.metadata.members.map(
											(member, index) => (
												<MemberBox
													owner_id={projectDetails.user_id}
													member={member}
													key={index}
													openModalMemberDetails={
														handleOpenModalMemberDetails
													}
												/>
											)
										)}
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
				<Modal
					footer={null}
					title=""
					open={openModalMemberDetails}
					onCancel={() => setOpenModalMemberDetails(false)}
					width={1000}>
					<LazyLoading>
						<TalentProfile talent={talentDetails} />
					</LazyLoading>
				</Modal>
			</div>
		</Modal>
	);
};
export default ProjectDetailsModal;
