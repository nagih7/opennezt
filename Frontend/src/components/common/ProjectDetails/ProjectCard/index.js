import React from "react";
import styles from "./styles.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BackgroundDefault from "assets/images/default/BackgroundDefault.png";
import { Upload } from "antd";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { updateBackgroundProject } from "api/project";
import store from "states/configureStore";

const ProjectCard = ({ projectDetails }) => {
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
			<div className={styles.backgroundProject}>
				<LazyLoadImage
					src={
						projectDetails.background
							? projectDetails.background
							: BackgroundDefault
					}
					alt="Project"
					className={styles.background}
				/>
				<div className={styles.buttonChangeBackground}>
					<Upload {...propsBackground}>
						<CameraAltIcon fontSize="2rem" />
						<span className={styles.btnWrap}>Update Background</span>
					</Upload>
				</div>
			</div>

			<div className={styles.projectInfo}>
				<h1>{projectDetails.name}</h1>
				<p>
					<strong>[Industry Field]</strong>{" "}
					{projectDetails.related_industries.join(" / ")}
				</p>
				<p>
					<strong>[Stage of Development]</strong> {projectDetails.stage}
				</p>
			</div>
		</div>
	);
};

export default ProjectCard;
