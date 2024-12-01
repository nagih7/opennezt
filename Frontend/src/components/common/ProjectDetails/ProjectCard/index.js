import React from "react";
import styles from "./styles.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProjectCard = ({ background, name, related_industries, stage }) => {
	return (
		<div className={styles.projectCardWrap}>
			<LazyLoadImage
				src={background}
				alt="Project"
				className={styles.backgroundProject}
			/>
			<div className={styles.projectInfo}>
				<h1>{name}</h1>
				<p>
					<strong>[Industry Field]</strong>{" "}
					{related_industries.join(" / ")}
				</p>
				<p>
					<strong>[Stage of Development]</strong> {stage}
				</p>
			</div>
		</div>
	);
};

export default ProjectCard;
