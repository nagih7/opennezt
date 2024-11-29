import React, { useState } from "react";
import AppLayout from "components/layouts/AppLayout";
import styles from "./styles.module.scss";

function Project() {
	const [projects, setProjects] = useState([
		{
			_id: "6749e42fc1aa2813a0c6228d",
			name: "My Startup Project",
			related_industries: ["Technology", "Healthcare"],
			background: "http://localhost:3456/background_projects/t11RRSyr5Dj61ZDuAuzcgK.jpeg",
			stage: "Seed",
			problem: "Lack of access to affordable healthcare",
			solution: "An online platform that connects patients with doctors remotely.",
			product_demo_url: "https://example.com/demo",
			team_intro_url: "https://example.com/team",
			pitch_deck: "uploads/pitch_decks/c4MWfQ7qMhRJb9jg8daQNw.pdf",
			statistics: "More than 10,000 users within the first year",
			target_money: "50000",
			target_audience: "Young adults seeking affordable healthcare",
			competitors: "Other telemedicine platforms",
			competitive_advantage: "Lower costs and better accessibility",
			why_now: "Rising demand for telemedicine solutions",
			strategy: "Aggressive marketing and partnerships",
			milestones: "Reaching 100,000 users by the end of the year",
			about_opennezt: "A company dedicated to improving healthcare access.",
			user_id: "6749ae2c2d4b0cf4c0c8a268",
			created_at: "2024-11-29T15:56:31.347Z",
			updated_at: "2024-11-29T15:56:31.347Z",
		},
	]);

	const [selectedProject, setSelectedProject] = useState(null);
	const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);

	const handleCreateProject = () => {
		setIsCreateFormVisible(true);
	};

	const handleProjectClick = (project) => {
		setSelectedProject(project);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		const newProject = {
			_id: "newId",
			name: event.target.projectName.value,
			related_industries: event.target.relatedIndustries.value.split(","),
			stage: event.target.stage.value,
			problem: event.target.problem.value,
			solution: event.target.solution.value,
			product_demo_url: event.target.productDemoURL.value,
			team_intro_url: event.target.teamIntroURL.value,
			pitch_deck: event.target.pitchDeck.value,
			statistics: event.target.statistics.value,
			target_money: event.target.targetMoney.value,
			target_audience: event.target.targetAudience.value,
			competitors: event.target.competitors.value,
			competitive_advantage: event.target.competitiveAdvantage.value,
			why_now: event.target.whyNow.value,
			strategy: event.target.strategy.value,
			milestones: event.target.milestones.value,
			about_opennezt: event.target.aboutOpennezt.value,
		};
		setProjects([...projects, newProject]);
		setIsCreateFormVisible(false);
	};

	return (
		<AppLayout>
			<div className={styles.projectContainer}>
				<div className={styles.projectHeader}>
					<h2>Project Manager</h2>
					<button className={styles.btnCreate} onClick={handleCreateProject}>
						Create New Project
					</button>
				</div>

				{isCreateFormVisible ? (
					<form
						className={styles.createProjectForm}
						onSubmit={handleFormSubmit}>
						<label htmlFor="projectName">Project Name</label>
						<input
							id="projectName"
							type="text"
							required
							placeholder="Enter project name"
						/>

						<label htmlFor="relatedIndustries">Related Industries</label>
						<input
							id="relatedIndustries"
							type="text"
							required
							placeholder="Enter related industries, separated by commas"
						/>

						<label htmlFor="stage">Stage</label>
						<input
							id="stage"
							type="text"
							required
							placeholder="Enter project stage (e.g., Seed)"
						/>

						<label htmlFor="problem">Problem</label>
						<textarea
							id="problem"
							required
							placeholder="Describe the problem"
						></textarea>

						<label htmlFor="solution">Solution</label>
						<textarea
							id="solution"
							required
							placeholder="Describe the solution"
						></textarea>

						<label htmlFor="productDemoURL">Product Demo URL</label>
						<input
							id="productDemoURL"
							type="text"
							required
							placeholder="Enter product demo URL"
						/>

						<label htmlFor="teamIntroURL">Team Introduction URL</label>
						<input
							id="teamIntroURL"
							type="text"
							required
							placeholder="Enter team introduction URL"
						/>

						<label htmlFor="pitchDeck">Pitch Deck</label>
						<input
							id="pitchDeck"
							type="text"
							required
							placeholder="Enter pitch deck URL"
						/>

						<label htmlFor="statistics">Statistics</label>
						<textarea
							id="statistics"
							required
							placeholder="Enter key statistics"
						></textarea>

						<label htmlFor="targetMoney">Target Money</label>
						<input
							id="targetMoney"
							type="number"
							required
							placeholder="Enter target amount of money"
						/>

						<label htmlFor="targetAudience">Target Audience</label>
						<input
							id="targetAudience"
							type="text"
							required
							placeholder="Enter target audience"
						/>

						<label htmlFor="competitors">Competitors</label>
						<input
							id="competitors"
							type="text"
							required
							placeholder="Enter competitors"
						/>

						<label htmlFor="competitiveAdvantage">Competitive Advantage</label>
						<input
							id="competitiveAdvantage"
							type="text"
							required
							placeholder="Enter competitive advantage"
						/>

						<label htmlFor="whyNow">Why Now</label>
						<input
							id="whyNow"
							type="text"
							required
							placeholder="Why is this the right time for this project?"
						/>

						<label htmlFor="strategy">Strategy</label>
						<textarea
							id="strategy"
							required
							placeholder="Describe the strategy"
						></textarea>

						<label htmlFor="milestones">Milestones</label>
						<textarea
							id="milestones"
							required
							placeholder="Enter key milestones"
						></textarea>

						<label htmlFor="aboutOpennezt">About Opennezt</label>
						<textarea
							id="aboutOpennezt"
							required
							placeholder="Enter description of Opennezt"
						></textarea>

						<button type="submit" className={styles.btnSubmit}>
							Create Project
						</button>
					</form>
				) : selectedProject ? (
					<div className={styles.projectDetail}>
						<h3>{selectedProject.name}</h3>
						<img
							src={selectedProject.background}
							alt="Project"
							className={styles.imgAvtDetail}
						/>
						{}
						<div className={styles.projectInfo}>
							<p><strong>Related Industries:</strong> {selectedProject.related_industries.join(", ")}</p>
							<p><strong>Stage:</strong> {selectedProject.stage}</p>
							<p><strong>Problem:</strong> {selectedProject.problem}</p>
							<p><strong>Solution:</strong> {selectedProject.solution}</p>
							<p><strong>Target Money:</strong> {selectedProject.target_money}</p>
							<p><strong>Target Audience:</strong> {selectedProject.target_audience}</p>
							<p><strong>Competitors:</strong> {selectedProject.competitors}</p>
							<p><strong>Competitive Advantage:</strong> {selectedProject.competitive_advantage}</p>
							<p><strong>Why Now:</strong> {selectedProject.why_now}</p>
							<p><strong>Strategy:</strong> {selectedProject.strategy}</p>
							<p><strong>Milestones:</strong> {selectedProject.milestones}</p>
							<p><strong>About Opennezt:</strong> {selectedProject.about_opennezt}</p>
						</div>
						<button
							className={styles.btnClose}
							onClick={() => setSelectedProject(null)}>
							Close
						</button>
					</div>
				) : (
					<div className={styles.projectsList}>
						{projects.map((project) => (
							<div
								key={project._id}
								className={styles.projectItem}
								onClick={() => handleProjectClick(project)}>
								<h4>{project.name}</h4>
								<p>{project.problem}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</AppLayout>
	);
}

export default Project;
