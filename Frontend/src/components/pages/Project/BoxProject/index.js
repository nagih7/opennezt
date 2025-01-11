import React from "react";
import styles from "./styles.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BackgroundDefault from "assets/images/default/BackgroundDefault.png";

const BoxProject = ({ project, openModalDetails, usedTo }) => {
	return (
		<div
			className={styles.boxProjectWrap}
			onClick={() => openModalDetails(project._id)}>
			<LazyLoadImage
				src={project.background || BackgroundDefault}
				alt={project.name}
				className={styles.backgroundProject}
			/>
			<div className={styles.projectInfo}>
				<h3>{project.name}</h3>
				<p
					style={{
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
						width: "100%",
					}}>
					<strong>[Industry Field]</strong>{" "}
					{project.related_industries.join(" / ")}
				</p>
				<p
					style={{
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
						width: "300px",
					}}>
					<strong>[Stage of Development]</strong> {project.stage}
				</p>
			</div>
		</div>
	);
};

export default BoxProject;
