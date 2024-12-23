import React from "react";
import styles from "./styles.module.scss";
import LazyLoadingMedium from "components/UI/LazyLoadingMedium";
import { useSelector } from "react-redux";
import { Card, Col, Row, Typography } from "antd";
const { Title, Text, Paragraph } = Typography;
import {
	DollarCircleOutlined,
	TeamOutlined,
	AimOutlined,
} from "@ant-design/icons";

const MemberBox = React.lazy(() => import("./MemberBox"));

const ProjectInfo = () => {
	const { projectDetails } = useSelector((state) => state.project);

	return (
		<div className={styles.projectInfoWrap}>
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
									<Paragraph>
										{projectDetails.problem
											? projectDetails.problem
											: "..."}
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Target Audience</Text>
									<Paragraph>
										{projectDetails.target_audience
											? projectDetails.target_audience
											: "..."}
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Solution</Text>
									<Paragraph>
										{projectDetails.solution
											? projectDetails.solution
											: "..."}
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Statistics</Text>
									<Paragraph>
										{projectDetails.statistics
											? projectDetails.statistics
											: "..."}
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
							{projectDetails.metadata &&
								projectDetails.metadata.members &&
								projectDetails.metadata.members.length > 0 &&
								projectDetails.metadata.members.map((member, index) => (
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
												{source.replace(/_/g, " ").toUpperCase()}
											</Text>
											<Text className={styles.amount}>
												${amount ? amount : "0"}
											</Text>
										</Card>
									</Col>
								)
							)}
							<Col span={24}>
								<div className={styles.infoItem}>
									<Text strong>Target Money</Text>
									<Paragraph>
										{projectDetails.target_money
											? projectDetails.target_money
											: "..."}
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
										{projectDetails.competitors
											? projectDetails.competitors
											: "..."}
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Strategy</Text>
									<Paragraph>
										{projectDetails.strategy
											? projectDetails.strategy
											: "..."}
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Competitive Advantage</Text>
									<Paragraph>
										{projectDetails.competitive_advantage
											? projectDetails.competitive_advantage
											: "..."}
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Why Now</Text>
									<Paragraph>
										{projectDetails.why_now
											? projectDetails.why_now
											: "..."}
									</Paragraph>
								</div>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default ProjectInfo;
