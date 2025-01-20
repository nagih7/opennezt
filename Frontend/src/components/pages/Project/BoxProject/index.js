import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BackgroundDefault from "assets/images/default/BackgroundDefault.png";
import {
	INDUSTRY_FIELD,
	STAGE_OF_DEVELOPMENT,
	COMPATIBILITY,
} from "utils/constains";

const BoxProject = ({ project, matchScore, openModalDetails, usedTo }) => {
	const { language } = useSelector((state) => state.app);
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
					<strong>[{INDUSTRY_FIELD[language]}]</strong>{" "}
					{project.related_industries.join(" / ")}
				</p>
				<p
					style={{
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
						width: "300px",
					}}>
					<strong>[{STAGE_OF_DEVELOPMENT[language]}]</strong>{" "}
					{project.stage}
				</p>
				{matchScore && (
					<p>
						<strong>{COMPATIBILITY[language]}:</strong> {matchScore}%{" "}
					</p>
				)}
			</div>
		</div>
	);
};

export default BoxProject;
