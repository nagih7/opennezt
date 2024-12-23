import React from "react";
import styles from "./styles.module.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Card, Col, Row, Typography } from "antd";
const { Title, Text, Paragraph } = Typography;
import { DollarCircleOutlined, AimOutlined } from "@ant-design/icons";

const FounderProfile = ({ founderProfile }) => {
	return (
		<div className={styles.founderProfileWrap}>
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
										{founderProfile.professional_summary
											? founderProfile.professional_summary
											: "..."}
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Professional Summary</Text>
									<Paragraph>
										{founderProfile.professional_summary
											? founderProfile.professional_summary
											: "..."}
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Experience Level</Text>
									<Paragraph>
										{founderProfile.experience_level
											? founderProfile.experience_level
											: "..."}
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Education Level</Text>
									<Paragraph>
										{founderProfile.degree
											? founderProfile.degree
											: "..."}
									</Paragraph>
								</div>
							</Col>
						</Row>
						<Row gutter={[24, 24]}>
							<Col span={24}>
								<div className={styles.infoItem}>
									<Text strong>Certifications</Text>
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
							Expertise
							<ArrowDropDownIcon className={styles.dropDown} />
						</Title>
						<Row gutter={[24, 24]}>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Accounting and Finance</Text>
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
									<Text strong>Human Resources</Text>
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
									<Text strong>International</Text>
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
									<Text strong>Law and Legal</Text>
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
									<Text strong>Management</Text>
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
									<Text strong>Operations</Text>
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
									<Text strong>Sales</Text>
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
									<Text strong>Starting up</Text>
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
									<Text strong>Sustainability</Text>
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
									<Text strong>Technology and Internet</Text>
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
										{founderProfile.career_goals
											? founderProfile.career_goals
											: "..."}
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>Avalability</Text>
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
									<Text strong>What I can offer</Text>
									<Paragraph>
										{founderProfile.offer
											? founderProfile.offer
											: "..."}
									</Paragraph>
								</div>
							</Col>
							<Col span={12}>
								<div className={styles.infoItem}>
									<Text strong>My work expectation</Text>
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
