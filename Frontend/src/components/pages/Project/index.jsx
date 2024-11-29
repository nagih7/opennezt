import React, { useState } from "react";
import AppLayout from "components/layouts/AppLayout";
import styles from "./styles.module.scss";

function Project() {
	const [projects, setProjects] = useState([
		{
			_id: "6749e42fc1aa2813a0c6228d",
			name: "My Startup Project",
			related_industries: ["Technology", "Healthcare"],
			background: "https://example.com/background-image.jpg",
			stage: "Seed",
			problem: "Lack of access to affordable healthcare",
			solution: "An online platform that connects patients with doctors remotely.",
			product_demo_url: "https://example.com/demo",
			team_intro_url: "https://example.com/team",
			pitch_deck: "uploads/pitch_decks/sample.pdf", 
			statistics: "More than 10,000 users within the first year",
			target_money: "50000",
			target_audience: "Young adults seeking affordable healthcare",
			competitors: "Other telemedicine platforms",
			competitive_advantage: "Lower costs and better accessibility",
			why_now: "Rising demand for telemedicine solutions",
			strategy: "Aggressive marketing and partnerships",
			milestones: "Reaching 100,000 users by the end of the year",
			about_opennezt: "A company dedicated to improving healthcare access.",
			revenues: [
				{ time: "2023-01-01T00:00:00.000Z", revenue: "10000" },
				{ time: "2023-02-01T00:00:00.000Z", revenue: "20000" }
			],
			funding_sources: {
				friend_and_family: "5000",
				grant: "10000",
				angel: "15000",
				venture_capital: "20000",
				other: "0"
			},
			user_id: "6749ae2c2d4b0cf4c0c8a268",
			created_at: "2024-11-29T15:56:31.347Z",
			updated_at: "2024-11-29T15:56:31.347Z",
		},
	]);
	
	const [selectedProject, setSelectedProject] = useState(null);
	const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
	const [revenues, setRevenues] = useState([{ time: "", revenue: "" }]);
	const [fundingSources, setFundingSources] = useState({
		friend_and_family: "",
		grant: "",
		angel: "",
		venture_capital: "",
		other: "",
	});

	const [pitchDeck, setPitchDeck] = useState(null); 
	const [backgroundImage, setBackgroundImage] = useState(null); 

	const handleCreateProject = () => {
		setIsCreateFormVisible(true);
	};

	const handleProjectClick = (project) => {
		setSelectedProject(project);
	};

	const handleRevenueChange = (index, field, value) => {
		const updatedRevenues = [...revenues];
		updatedRevenues[index][field] = value;
		setRevenues(updatedRevenues);
	};

	const handleFundingSourceChange = (field, value) => {
		setFundingSources({ ...fundingSources, [field]: value });
	};

	const handleAddRevenue = () => {
		setRevenues([...revenues, { time: "", revenue: "" }]);
	};

	const handleRemoveRevenue = (index) => {
		const updatedRevenues = revenues.filter((_, i) => i !== index);
		setRevenues(updatedRevenues);
	};

	const handlePitchDeckChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type === "application/pdf") {
			setPitchDeck(file);
		} else {
			alert("Please upload a PDF file.");
		}
	};

	const handleBackgroundImageChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith("image/")) {
			setBackgroundImage(URL.createObjectURL(file));
		} else {
			alert("Please upload a valid image file.");
		}
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
			pitch_deck: pitchDeck ? pitchDeck.name : null, 
			background: backgroundImage ? backgroundImage : null, 
			statistics: event.target.statistics.value,
			target_money: event.target.targetMoney.value,
			target_audience: event.target.targetAudience.value,
			competitors: event.target.competitors.value,
			competitive_advantage: event.target.competitiveAdvantage.value,
			why_now: event.target.whyNow.value,
			strategy: event.target.strategy.value,
			milestones: event.target.milestones.value,
			about_opennezt: event.target.aboutOpennezt.value,
			revenues,
			funding_sources: fundingSources,
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
					<div className={styles.backgroundImageU}>
						<label htmlFor="backgroundImage">Background Image</label>
						<div className={styles['file-upload-wrapper']}>
							<input
							id="backgroundImage"
							type="file"
							accept="image/*"
							onChange={handleBackgroundImageChange} 
							required
							/>
							<button
							className={styles['file-upload-btn']}
							onClick={() => document.getElementById('backgroundImage').click()} 
							>
							Choose File
							</button>
							{backgroundImage && (
							<span className={styles['file-name']}>File Selected</span> 
							)}
						</div>
						</div>

						{backgroundImage && <img src={backgroundImage} alt="Background Preview" className={styles.imagePreview} />}

						{}
						<div className={styles.pitchDeckP}>
						<label htmlFor="pitchDeck">Pitch Deck (PDF)</label>
						<input
							id="pitchDeck"
							type="file"
							accept="application/pdf"
							onChange={handlePitchDeckChange}
							required
						/>
						</div>
						{pitchDeck && <p>{pitchDeck.name}</p>} {}

						{}
						<label htmlFor="revenues">Revenues</label>
						{revenues.map((revenue, index) => (
							<div key={index} className={styles.revenueField}>
								<input
									type="month"
									value={revenue.time}
									onChange={(e) => handleRevenueChange(index, "time", e.target.value)}
									placeholder="Select Time"
									required
								/>
								<input
									type="number"
									value={revenue.revenue}
									onChange={(e) => handleRevenueChange(index, "revenue", e.target.value)}
									placeholder="Enter Revenue"
									required
								/>
								<div className={styles.remove_a} type="button" onClick={() => handleRemoveRevenue(index)}>
									Remove
								</div>
							</div>
						))}
						<div className={styles.add_revenue} type="button" onClick={handleAddRevenue}>
							Add Revenue
						</div>

						<label htmlFor="fundingSources">Funding Sources</label>
						<div className={styles.fundingFields}>
							{Object.keys(fundingSources).map((field) => (
								<div key={field} className={styles.fundingField}>
									<label htmlFor={field}>{field.replace(/_/g, " ")}</label>
									<input
										id={field}
										type="number"
										value={fundingSources[field]}
										onChange={(e) => handleFundingSourceChange(field, e.target.value)}
										placeholder={`Enter amount for ${field.replace(/_/g, " ")}`}
										required
									/>
								</div>
							))}
						</div>
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
							
							{}
							<p><strong>Revenues:</strong> {selectedProject.revenues.map(r => `${r.time}: ${r.revenue}`).join(", ")}</p>
							<p><strong>Funding Sources:</strong> {Object.entries(selectedProject.funding_sources).map(([key, value]) => `${key.replace(/_/g, " ")}: ${value}`).join(", ")}</p>
							<p><strong>Pitch Deck:</strong> <a href={selectedProject.pitch_deck} target="_blank" rel="noopener noreferrer">View PDF</a></p>
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
								style={{ backgroundImage: `url(${project.background})` }}
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
