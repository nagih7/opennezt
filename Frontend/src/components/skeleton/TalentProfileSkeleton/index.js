import React from "react";
import styles from "./styles.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, Col, Row, Typography } from "antd";
const { Title, Text, Paragraph } = Typography;
import { DollarCircleOutlined, AimOutlined } from "@ant-design/icons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { PROFESSIONAL_PROFILE } from "../../../utils/constains";
import { useSelector } from "react-redux";

const TalentProfileSkeleton = () => {
	const { language } = useSelector((state) => state.app);
	return (
		<div className={styles.talentProfileSkeletonWrap}>
			<Row gutter={[24, 24]}>
				<Col span={24}>
					<Card className={styles.section}>
						<Title level={4} icon={<AimOutlined />}>
							{PROFESSIONAL_PROFILE.PROFESSIONAL_BACKGROUND[language]}
							<ArrowDropDownIcon className={styles.dropDown} />
						</Title>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{
											PROFESSIONAL_PROFILE.PROFESSIONAL_SUMMARY[
												language
											]
										}
									</Text>
									<Paragraph>
										<Skeleton count={3} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.EXPERIENCE_LEVEL[language]}
									</Text>
									<Paragraph>
										<Skeleton count={3} />
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.EDUCATION_LEVEL[language]}
									</Text>
									<Paragraph>
										<Skeleton count={3} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.CERTIFICATIONS[language]}
									</Text>
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
							{PROFESSIONAL_PROFILE.EXPERTISE[language]}
							<ArrowDropDownIcon className={styles.dropDown} />
						</Title>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{
											PROFESSIONAL_PROFILE.ACCOUNTING_AND_FINANCE[
												language
											]
										}
									</Text>
									<Paragraph>
										<Skeleton count={2} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.HUMAN_RESOURCES[language]}
									</Text>
									<Paragraph>
										<Skeleton count={2} />
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.INTERNATIONAL[language]}
									</Text>
									<Paragraph>
										<Skeleton count={2} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.LAW_AND_LEGAL[language]}
									</Text>
									<Paragraph>
										<Skeleton count={2} />
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.MANAGEMENT[language]}
									</Text>
									<Paragraph>
										<Skeleton count={2} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.OPERATION[language]}
									</Text>
									<Paragraph>
										<Skeleton count={2} />
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.SALE[language]}
									</Text>
									<Paragraph>
										<Skeleton count={2} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.STARTING_UP[language]}
									</Text>
									<Paragraph>
										<Skeleton count={2} />
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.SUSTAINABILITY[language]}
									</Text>
									<Paragraph>
										<Skeleton count={2} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{
											PROFESSIONAL_PROFILE.TECHNOLOGY_AND_INTERNET[
												language
											]
										}
									</Text>
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
							{PROFESSIONAL_PROFILE.WORK_WITH_ME[language]}
							<ArrowDropDownIcon className={styles.dropDown} />
						</Title>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.MY_CAREER_GOALS[language]}
									</Text>
									<Paragraph>
										<Skeleton count={3} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.AVAILABILITY[language]}
									</Text>
									<Paragraph>
										<Skeleton count={3} />
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.WHAT_I_CAN_OFFER[language]}
									</Text>
									<Paragraph>
										<Skeleton count={3} />
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{
											PROFESSIONAL_PROFILE.MY_WORK_EXPECTATIONS[
												language
											]
										}
									</Text>
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
