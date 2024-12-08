import React from "react";
import styles from "./styles.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

const BoxProject = ({ project, openModalDetails }) => {
	return (
		<div
			className={styles.boxProjectWrap}
			onClick={() => openModalDetails(project._id)}>
			<LazyLoadImage
				src={project.background}
				alt="Project"
				className={styles.backgroundProject}
			/>
			<div className={styles.projectInfo}>
				<h3>{project.name}</h3>
				<p>
					<strong>[Industry Field]</strong>{" "}
					{project.related_industries.join(" / ")}
				</p>
				<p>
					<strong>[Stage of Development]</strong> {project.stage}
				</p>
			</div>
		</div>
	);
};

export default BoxProject;
