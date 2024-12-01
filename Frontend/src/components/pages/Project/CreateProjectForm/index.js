import React, { useState } from "react";
import styles from "./styles.module.scss";

const CreateProjectForm = () => {
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
		setIsCreateFormVisible(false);
	};
	return (
		<form className={styles.createProjectForm} onSubmit={handleFormSubmit}>
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
				placeholder="Describe the problem"></textarea>
			<label htmlFor="solution">Solution</label>
			<textarea
				id="solution"
				required
				placeholder="Describe the solution"></textarea>
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
				placeholder="Enter key statistics"></textarea>
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
				placeholder="Describe the strategy"></textarea>
			<label htmlFor="milestones">Milestones</label>
			<textarea
				id="milestones"
				required
				placeholder="Enter key milestones"></textarea>
			<label htmlFor="aboutOpennezt">About Opennezt</label>
			<textarea
				id="aboutOpennezt"
				required
				placeholder="Enter description of Opennezt"></textarea>
			<div className={styles.backgroundImageU}>
				<label htmlFor="backgroundImage">Background Image</label>
				<div className={styles["file-upload-wrapper"]}>
					<input
						id="backgroundImage"
						type="file"
						accept="image/*"
						onChange={handleBackgroundImageChange}
						required
					/>
					<button
						className={styles["file-upload-btn"]}
						onClick={() =>
							document.getElementById("backgroundImage").click()
						}>
						Choose File
					</button>
					{backgroundImage && (
						<span className={styles["file-name"]}>File Selected</span>
					)}
				</div>
			</div>
			{backgroundImage && (
				<img
					src={backgroundImage}
					alt="Background Preview"
					className={styles.imagePreview}
				/>
			)}
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
						onChange={(e) =>
							handleRevenueChange(index, "time", e.target.value)
						}
						placeholder="Select Time"
						required
					/>
					<input
						type="number"
						value={revenue.revenue}
						onChange={(e) =>
							handleRevenueChange(index, "revenue", e.target.value)
						}
						placeholder="Enter Revenue"
						required
					/>
					<div
						className={styles.remove_a}
						type="button"
						onClick={() => handleRemoveRevenue(index)}>
						Remove
					</div>
				</div>
			))}
			<div
				className={styles.add_revenue}
				type="button"
				onClick={handleAddRevenue}>
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
							onChange={(e) =>
								handleFundingSourceChange(field, e.target.value)
							}
							placeholder={`Enter amount for ${field.replace(
								/_/g,
								" "
							)}`}
							required
						/>
					</div>
				))}
			</div>
			<button type="submit" className={styles.btnSubmit}>
				Create Project
			</button>
		</form>
	);
};

export default CreateProjectForm;
