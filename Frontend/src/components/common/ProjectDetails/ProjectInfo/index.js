import React from "react";
import styles from "./styles.module.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ProjectInfo = ({
	problem,
	solution,
	product_demo_url,
	team_intro_url,
	target_money,
	target_audience,
	competitors,
	competitive_advantage,
	why_now,
	strategy,
	milestones,
	revenues,
	pitch_deck,
	statistics,
}) => {
	return (
		<div className={styles.projectInfoWrap}>
			<h2>
				Startup Overview
				<ArrowDropDownIcon className={styles.dropDown} />
			</h2>
			<div className={styles.projectInfoBoxWrap}>
				<h3>Problem Statement</h3>
				<p>{problem}</p>
				<h3>Solution</h3>
				<p>{solution}</p>
			</div>

			<h2>
				Expertise Request
				<ArrowDropDownIcon className={styles.dropDown} />
			</h2>
			<div className={styles.projectInfoBoxWrap}></div>
			<h2>
				Media
				<ArrowDropDownIcon className={styles.dropDown} />
			</h2>

			<div className={styles.projectInfoBoxWrap}>
				<h3>Product Demo</h3>
				<a
					href={product_demo_url}
					target="_blank"
					rel="noopener noreferrer">
					Watch Demo
				</a>
				<h3>Team Introduction</h3>
				<a href={team_intro_url} target="_blank" rel="noopener noreferrer">
					Watch Team Introduction
				</a>
				<h3>Pitch Desk</h3>
				<a href={pitch_deck} target="_blank" rel="noopener noreferrer">
					View PDF
				</a>
			</div>
			<h2>
				Team Infomation
				<ArrowDropDownIcon className={styles.dropDown} />
			</h2>
			<div className={styles.projectInfoBoxWrap}></div>
			<h2>
				Startup Progress <ArrowDropDownIcon className={styles.dropDown} />
			</h2>
			<div className={styles.projectInfoBoxWrap}>
				<h3>Tradition Metrics</h3>
				<p>{statistics}</p>
				<h3>Revenue Status</h3>
				<p>[]</p>
			</div>
			<h2>Startup Strategy</h2>
			<div className={styles.projectInfoBoxWrap}>
				<h3>Target Money</h3>
				<p>{target_money}$</p>
				<h3>Target Audience</h3>
				<p>{target_audience}</p>
				<h3>Competitors</h3>
				<p>{competitors}</p>
				<h3>Competitive Advantage</h3>
				<p>{competitive_advantage}</p>
				<h3>Market Timing</h3>
				<p>{why_now}</p>
				<h3>Strategy</h3>
				<p>{strategy}</p>
				<h3>Milestones</h3>
				<p>{milestones}</p>
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
