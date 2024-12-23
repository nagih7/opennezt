import React from "react";
import styles from "./styles.module.scss";
import BackgroundDefault from "assets/images/default/BackgroundDefault.png";
import { Space, Tag, Typography, Upload } from "antd";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { updateBackgroundProject } from "api/project";
import store from "states/configureStore";
import { useSelector } from "react-redux";
import { RocketOutlined } from "@ant-design/icons";
const { Title } = Typography;

const ProjectCard = () => {
	const { projectDetails } = useSelector((state) => state.project);
	console.log(projectDetails);

	const propsBackground = {
		name: "file",
		customRequest: async ({ file }) => {
			const formData = new FormData();
			formData.append("background", file);
			formData.append("project_id", projectDetails._id);
			await store.dispatch(updateBackgroundProject(formData));
			setBackground(URL.createObjectURL(file));
			message.success("Change background success");
		},
		multiple: false,
		maxCount: 1,
		showUploadList: false,
	};

	return (
		<div className={styles.projectCardWrap}>
			<img
				src={
					projectDetails.background
						? projectDetails.background
						: BackgroundDefault
				}
				alt={projectDetails.name}
				className={styles.headerImage}
			/>
			<div className={styles.buttonChangeBackground}>
				<Upload {...propsBackground}>
					<CameraAltIcon fontSize="2rem" />
					<span className={styles.btnWrap}>Update Background</span>
				</Upload>
			</div>
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
	);
};

export default ProjectCard;
