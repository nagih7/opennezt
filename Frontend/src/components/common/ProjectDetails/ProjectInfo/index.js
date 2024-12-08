import React from "react";
import styles from "./styles.module.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ProjectInfo = ({ projectDetails }) => {
	return (
		<div className={styles.projectInfoWrap}>
			{(projectDetails.problem || projectDetails.solution) && (
				<>
					<h2>
						Startup Overview
						<ArrowDropDownIcon className={styles.dropDown} />
					</h2>
					<div className={styles.projectInfoBoxWrap}>
						<h3>Problem Statement</h3>
						<p>{projectDetails.problem}</p>
						<h3>Solution</h3>
						<p>{projectDetails.solution}</p>
					</div>
				</>
			)}

			{/* <h2>
				Expertise Request
				<ArrowDropDownIcon className={styles.dropDown} />
			</h2>
			<div className={styles.projectInfoBoxWrap}>
				<p>{projectDetails.expertise_request}</p>
			</div> */}
			{(projectDetails.product_demo_url ||
				projectDetails.team_intro_url ||
				projectDetails.pitch_deck) && (
				<>
					<h2>
						Media
						<ArrowDropDownIcon className={styles.dropDown} />
					</h2>
					<div className={styles.projectInfoBoxWrap}>
						{projectDetails.product_demo_url && (
							<>
								<h3>Product Demo</h3>
								<a
									href={projectDetails.product_demo_url}
									target="_blank"
									rel="noopener noreferrer">
									Watch Demo
								</a>
							</>
						)}
						{projectDetails.team_intro_url && (
							<>
								<h3>Team Introduction</h3>
								<a
									href={projectDetails.team_intro_url}
									target="_blank"
									rel="noopener noreferrer">
									Watch Team Introduction
								</a>
							</>
						)}
						{projectDetails.pitch_deck && (
							<>
								<h3>Pitch Desk</h3>
								<a
									href={projectDetails.pitch_deck}
									target="_blank"
									rel="noopener noreferrer">
									View PDF
								</a>
							</>
						)}
					</div>
				</>
			)}

			{/* <h2>
				Team Infomation
				<ArrowDropDownIcon className={styles.dropDown} />
			</h2>
			<div className={styles.projectInfoBoxWrap}></div> */}
			<h2>
				Startup Progress <ArrowDropDownIcon className={styles.dropDown} />
			</h2>
			<div className={styles.projectInfoBoxWrap}>
				<h3>Tradition Metrics</h3>
				<p>{projectDetails.statistics}</p>
				{projectDetails.revenues && (
					<>
						<h3>Revenue Status</h3>
						<p>
							{projectDetails.revenues.map((item) => {
								return (
									<>
										<p>{item.time}</p>
										<p>{item.revenue}</p>
									</>
								);
							})}
						</p>
					</>
				)}
			</div>
			<h2>Startup Strategy</h2>
			<div className={styles.projectInfoBoxWrap}>
				<h3>Target Money</h3>
				<p>{projectDetails.target_money}$</p>
				<h3>Target Audience</h3>
				<p>{projectDetails.target_audience}</p>
				<h3>Competitors</h3>
				<p>{projectDetails.competitors}</p>
				<h3>Competitive Advantage</h3>
				<p>{projectDetails.competitive_advantage}</p>
				<h3>Market Timing</h3>
				<p>{projectDetails.why_now}</p>
				<h3>Strategy</h3>
				<p>{projectDetails.strategy}</p>
				<h3>Milestones</h3>
				<p>{projectDetails.milestones}</p>
			</div>

			{/* <p>
					<strong>Funding Sources:</strong>{" "}
					{Object.entries(funding_sources)
						.map(([key, value]) => `${key.replace(/_/g, " ")}: ${value}`)
						.join(", ")}
				</p> */}
		</div>
	);
};

export default ProjectInfo;
