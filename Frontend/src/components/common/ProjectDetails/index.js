import React from "react";
import styles from "./styles.module.scss";
import ProjectCard from "./ProjectCard";
import ProjectInfo from "./ProjectInfo";
import LazyLoading from "components/UI/LazyLoading";

const ProjectDetails = ({ projectDetails }) => {
	return (
		<div className={styles.projectDetailWrap}>
			<LazyLoading>
				<ProjectCard
					background={projectDetails.background}
					name={projectDetails.name}
					related_industries={projectDetails.related_industries}
					stage={projectDetails.stage}
				/>
			</LazyLoading>
			<LazyLoading>
				<ProjectInfo
					problem={projectDetails.problem}
					solution={projectDetails.solution}
					product_demo_url={projectDetails.product_demo_url}
					team_intro_url={projectDetails.team_intro_url}
					target_money={projectDetails.target_money}
					target_audience={projectDetails.target_audience}
					competitors={projectDetails.competitors}
					competitive_advantage={projectDetails.competitive_advantage}
					why_now={projectDetails.why_now}
					strategy={projectDetails.strategy}
					milestones={projectDetails.milestones}
					about_opennezt={projectDetails.about_opennezt}
					revenues={projectDetails.revenues}
					funding_sources={projectDetails.funding_sources}
					pitch_deck={projectDetails.pitch_deck}
					statistics={projectDetails.statistics}
				/>
			</LazyLoading>
			<button
				className={styles.btnClose}
				onClick={() => setSelectedProject(null)}>
				Close
			</button>
		</div>
	);
};

export default ProjectDetails;
