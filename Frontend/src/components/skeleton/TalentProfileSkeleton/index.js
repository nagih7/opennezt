import React from "react";
import styles from "./styles.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, Col, Row, Typography } from "antd";
const { Title, Text, Paragraph } = Typography;
import { DollarCircleOutlined, AimOutlined } from "@ant-design/icons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const TalentProfileSkeleton = () => {
	return (
		<div className={styles.talentProfileSkeletonWrap}>
			<Row gutter={[24, 24]}>
				<Col span={24}>
					<Card className={styles.section}>
						<Title level={4} icon={<AimOutlined />}>
							Professional Background
							<ArrowDropDownIcon className={styles.dropDown} />
						</Title>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Professional Summary</Text>
									<Paragraph>
										<Skeleton count={3} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Professional Summary</Text>
									<Paragraph>
										<Skeleton count={3} />
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Experience Level</Text>
									<Paragraph>
										<Skeleton count={3} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Education Level</Text>
									<Paragraph>
										<Skeleton count={3} />
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={24}>
								<div className={styles.infoItem}>
									<Text strong>Certifications</Text>
									<Paragraph>
										<Skeleton count={1} />
									</Paragraph>
								</div>
							</Col>
						</Row>
					</Card>
				</Col>
				<Col span={24}>
					<Card className={styles.section}>
						<Title level={4} icon={<DollarCircleOutlined />}>
							Expertise
							<ArrowDropDownIcon className={styles.dropDown} />
						</Title>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Accounting and Finance</Text>
									<Paragraph>
										<Skeleton count={2} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Human Resources</Text>
									<Paragraph>
										<Skeleton count={2} />
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>International</Text>
									<Paragraph>
										<Skeleton count={2} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Law and Legal</Text>
									<Paragraph>
										<Skeleton count={2} />
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Management</Text>
									<Paragraph>
										<Skeleton count={2} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Operations</Text>
									<Paragraph>
										<Skeleton count={2} />
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Sales</Text>
									<Paragraph>
										<Skeleton count={2} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Starting up</Text>
									<Paragraph>
										<Skeleton count={2} />
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Sustainability</Text>
									<Paragraph>
										<Skeleton count={2} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Technology and Internet</Text>
									<Paragraph>
										<Skeleton count={2} />
									</Paragraph>
								</div>
							</Col>
						</Row>
					</Card>
				</Col>
				<Col span={24}>
					<Card className={styles.section}>
						<Title level={4} icon={<AimOutlined />}>
							How to Work with Me
							<ArrowDropDownIcon className={styles.dropDown} />
						</Title>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>My career goals</Text>
									<Paragraph>
										<Skeleton count={3} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Avalability</Text>
									<Paragraph>
										<Skeleton count={3} />
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>What I can offer</Text>
									<Paragraph>
										<Skeleton count={3} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>My work expectation</Text>
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

export default TalentProfileSkeleton;
