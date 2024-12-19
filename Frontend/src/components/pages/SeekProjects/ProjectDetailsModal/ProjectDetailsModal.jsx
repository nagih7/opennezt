import React from "react";
import { Modal, Typography, Tag, Space, Row, Col, Card } from "antd";
import {
	DollarCircleOutlined,
	TeamOutlined,
	RocketOutlined,
	AimOutlined,
} from "@ant-design/icons";
import styles from "./styles.module.scss";
import LazyLoadingMedium from "components/UI/LazyLoadingMedium";

const { Title, Text, Paragraph } = Typography;
const MemberBox = React.lazy(() =>
	import("../../../common/ProjectDetails/ProjectInfo/MemberBox")
);

const ProjectDetailsModal = ({ isVisible, onClose, projectDetails }) => {
	const {
		name,
		background,
		related_industries,
		stage,
		problem,
		solution,
		statistics,
		funding_sources,
		target_money,
		target_audience,
		competitors,
		competitive_advantage,
		why_now,
		strategy,
		owner,
		members,
	} = projectDetails;

	return (
		<Modal
			open={isVisible}
			onCancel={onClose}
			width={1200}
			footer={null}
			className={styles.projectModal}>
			<div className={styles.modalContent}>
				<div className={styles.projectHeader}>
					<img
						src={background}
						alt={name}
						className={styles.headerImage}
					/>
					<div className={styles.headerOverlay}>
						<Title level={2}>{name}</Title>
						<Space size={8} wrap>
							{related_industries?.map((industry) => (
								<Tag key={industry} color="blue">
									{industry}
								</Tag>
							))}
						</Space>
						<Tag color="green" icon={<RocketOutlined />}>
							{stage}
						</Tag>
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
											<Paragraph>{problem}</Paragraph>
										</div>
									</Col>
									<Col span={12}>
										<div className={styles.infoItem}>
											<Text strong>Target Audience</Text>
											<Paragraph>{target_audience}</Paragraph>
										</div>
									</Col>
								</Row>
								<Row gutter={[24, 24]}>
									<Col span={12}>
										<div className={styles.infoItem}>
											<Text strong>Solution</Text>
											<Paragraph>{solution}</Paragraph>
										</div>
									</Col>
									<Col span={12}>
										<div className={styles.infoItem}>
											<Text strong>Statistics</Text>
											<Paragraph>{statistics}</Paragraph>
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
										<MemberBox member={owner} />
									</LazyLoadingMedium>
									{members &&
										members.length > 0 &&
										members.map((member, index) => (
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
									{Object.entries(funding_sources).map(
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
											<Paragraph>{target_money}</Paragraph>
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
											<Paragraph>{competitors}</Paragraph>
										</div>
									</Col>
									<Col span={12}>
										<div className={styles.infoItem}>
											<Text strong>Strategy</Text>
											<Paragraph>{strategy}</Paragraph>
										</div>
									</Col>
								</Row>
								<Row gutter={[24, 24]}>
									<Col span={12}>
										<div className={styles.infoItem}>
											<Text strong>Competitive Advantage</Text>
											<Paragraph>{competitive_advantage}</Paragraph>
										</div>
									</Col>
									<Col span={12}>
										<div className={styles.infoItem}>
											<Text strong>Why Now</Text>
											<Paragraph>{why_now}</Paragraph>
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
