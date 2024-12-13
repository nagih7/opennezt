import React from "react";
import styles from "./styles.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BackgroundDefault from "assets/images/default/BackgroundDefault.png";

const ProjectCard = ({ projectDetails }) => {
	return (
		<div className={styles.projectCardWrap}>
			<LazyLoadImage
				src={
					projectDetails.background
						? projectDetails.background
						: BackgroundDefault
				}
				alt="Project"
				className={styles.backgroundProject}
			/>
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
