import React from "react";
import styles from "./styles.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, Col, Row, Typography } from "antd";
const { Title, Text, Paragraph } = Typography;
import {
	DollarCircleOutlined,
	TeamOutlined,
	AimOutlined,
} from "@ant-design/icons";

const ProjectInfoSkeleton = () => {
	return (
		<div className={styles.projectCardSkeletonWrap}>
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
										<Skeleton count={3} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Target Audience</Text>
									<Paragraph>
										<Skeleton count={3} />
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Solution</Text>
									<Paragraph>
										<Skeleton count={3} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Statistics</Text>
									<Paragraph>
										<Skeleton count={3} />
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
						<Skeleton height={"10rem"} />
						<Skeleton />
					</Card>
				</Col>

				<Col span={24}>
					<Card className={styles.section}>
						<Title level={4} icon={<DollarCircleOutlined />}>
							Funding Information
						</Title>
						<Row gutter={[16, 16]}>
							{Array(5)
								.fill(0)
								.map((_, i) => (
									<Col span={8} key={i}>
										<Card className={styles.fundingCard}>
											<Text strong>
												<Skeleton height={"1.5rem"} />
											</Text>
											<Text className={styles.amount}>
												<Skeleton height={"2rem"} />
											</Text>
										</Card>
									</Col>
								))}
							<Col span={24}>
								<div className={styles.infoItem}>
									<Text strong>Target Money</Text>
									<Paragraph>
										<Skeleton />
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
										<Skeleton count={3} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Strategy</Text>
									<Paragraph>
										<Skeleton count={3} />
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Competitive Advantage</Text>
									<Paragraph>
										<Skeleton count={3} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Why Now</Text>
									<Paragraph>
										<Skeleton count={3} />
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

export default ProjectInfoSkeleton;
