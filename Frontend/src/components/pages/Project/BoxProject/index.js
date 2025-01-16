import React from "react";
import styles from "./styles.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BackgroundDefault from "assets/images/default/BackgroundDefault.png";

const BoxProject = ({ project, matchScore, openModalDetails, usedTo }) => {
	return (
		<div
			className={styles.boxProjectWrap}
			onClick={() => openModalDetails(project._id, project.user_id)}>
			<div className={styles.backgroundProject}>
				<LazyLoadImage
					src={project.background || BackgroundDefault}
					onError={(e) => {
						e.target.onerror = null;
						e.target.src = BackgroundDefault;
					}}
					alt={project.name}
					className={styles.backgroundImage}
				/>
			</div>
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
				{matchScore && (
					<p>
						<strong>Compatibility:</strong> {matchScore}%{" "}
					</p>
				)}
			</div>
		</div>
	);
};

export default BoxProject;
