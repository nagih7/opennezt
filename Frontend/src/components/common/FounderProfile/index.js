import React from "react";
import styles from "./styles.module.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Card, Col, Row, Typography } from "antd";
const { Title, Text, Paragraph } = Typography;
import { DollarCircleOutlined, AimOutlined } from "@ant-design/icons";
import { PROFESSIONAL_PROFILE } from "../../../utils/constains/appConstains";
import { useSelector } from "react-redux";

const FounderProfile = ({ founderProfile }) => {
	const { language } = useSelector((state) => state.app);
	return (
		<div className={styles.founderProfileWrap}>
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
										{founderProfile.professional_summary
											? founderProfile.professional_summary
											: "..."}
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.EXPERIENCE_LEVEL[language]}
									</Text>
									<Paragraph>
										{founderProfile.experience_level
											? founderProfile.experience_level
											: "..."}
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
										{founderProfile.degree
											? founderProfile.degree
											: "..."}
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.CERTIFICATIONS[language]}
									</Text>
									<Paragraph>
										{founderProfile.certification &&
										founderProfile.certification.length > 0
											? founderProfile.certification.join(", ")
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
										{founderProfile.areas_of_expertise
											.accounting_and_finance &&
										founderProfile.areas_of_expertise
											.accounting_and_finance.length > 0
											? founderProfile.areas_of_expertise.accounting_and_finance.join(
													", "
											  )
											: "..."}
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.HUMAN_RESOURCES[language]}
									</Text>
									<Paragraph>
										{founderProfile.areas_of_expertise
											.human_resource &&
										founderProfile.areas_of_expertise.human_resource
											.length > 0
											? founderProfile.areas_of_expertise.human_resource.join(
													", "
											  )
											: "..."}
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
										{founderProfile.areas_of_expertise
											.international &&
										founderProfile.areas_of_expertise.international
											.length > 0
											? founderProfile.areas_of_expertise.international.join(
													", "
											  )
											: "..."}
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.LAW_AND_LEGAL[language]}
									</Text>
									<Paragraph>
										{founderProfile.areas_of_expertise
											.law_and_legal &&
										founderProfile.areas_of_expertise.law_and_legal
											.length > 0
											? founderProfile.areas_of_expertise.law_and_legal.join(
													", "
											  )
											: "..."}
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
										{founderProfile.areas_of_expertise.management &&
										founderProfile.areas_of_expertise.management
											.length > 0
											? founderProfile.areas_of_expertise.management.join(
													", "
											  )
											: "..."}
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.OPERATION[language]}
									</Text>
									<Paragraph>
										{founderProfile.areas_of_expertise.operations &&
										founderProfile.areas_of_expertise.operations
											.length > 0
											? founderProfile.areas_of_expertise.operations.join(
													", "
											  )
											: "..."}
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
										{founderProfile.areas_of_expertise.sales &&
										founderProfile.areas_of_expertise.sales.length > 0
											? founderProfile.areas_of_expertise.sales.join(
													", "
											  )
											: "..."}
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.STARTING_UP[language]}
									</Text>
									<Paragraph>
										{founderProfile.areas_of_expertise.starting_up &&
										founderProfile.areas_of_expertise.starting_up
											.length > 0
											? founderProfile.areas_of_expertise.starting_up.join(
													", "
											  )
											: "..."}
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
										{founderProfile.areas_of_expertise
											.sustainability &&
										founderProfile.areas_of_expertise.sustainability
											.length > 0
											? founderProfile.areas_of_expertise.sustainability.join(
													", "
											  )
											: "..."}
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
										{founderProfile.areas_of_expertise
											.technology_and_internet &&
										founderProfile.areas_of_expertise
											.technology_and_internet.length > 0
											? founderProfile.areas_of_expertise.technology_and_internet.join(
													", "
											  )
											: "..."}
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.MARKETING[language]}
									</Text>
									<Paragraph>
										{founderProfile.areas_of_expertise.marketing &&
										founderProfile.areas_of_expertise.marketing
											.length > 0
											? founderProfile.areas_of_expertise.marketing.join(
													", "
											  )
											: "..."}
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
										{founderProfile.career_goals
											? founderProfile.career_goals
											: "..."}
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.AVAILABILITY[language]}
									</Text>
									<Paragraph>
										{founderProfile.avalability
											? founderProfile.avalability
											: "..."}
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
										{founderProfile.offer
											? founderProfile.offer
											: "..."}
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>
										{PROFESSIONAL_PROFILE.EXPECTATIONS[language]}
									</Text>
									<Paragraph>
										{founderProfile.expectation
											? founderProfile.expectation
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

export default FounderProfile;
