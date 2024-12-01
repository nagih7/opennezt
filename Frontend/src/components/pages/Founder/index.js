import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import verify from "../../../assets/images/icon/verify.png";

function Founders() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const startups = [
		{
			id: 1,
			name: "GreenTech Innovations",
			description: "Leading the way in renewable energy solutions.",
			details:
				"GreenTech specializes in advanced solar panel and wind turbine technology. They aim to revolutionize the energy industry by providing sustainable, eco-friendly solutions.",
			logo: "https://possibleworks.com/wp-content/uploads/2020/05/Startup.png",
			contact: {
				email: "info@greentech.com",
				phone: "+1-555-123-4567",
			},
			location: "San Francisco, USA",
			industry: "Renewable Energy",
			experience_level: "High Growth",
			areas_of_expertise: {
				engineering: ["Solar Panel Design", "Wind Turbine Optimization"],
				business: ["Sustainability Strategy", "Market Expansion"],
				medicine: ["Diagnostic AI", "Clinical Trial Optimization"],
				technology: ["Machine Learning", "Big Data Analytics"],
			},
		},
		{
			id: 2,
			name: "Healthify AI",
			description: "Transforming healthcare with artificial intelligence.",
			details:
				"Healthify AI builds AI tools that assist doctors in diagnosing diseases and predicting treatment outcomes. Their solutions are used by top hospitals worldwide.",
			logo: "https://www.human-capital.com/wp-content/uploads/2020/08/Human-Capital-Startup-1.png",
			contact: {
				email: "connect@healthify.ai",
				phone: "+44-555-654-3210",
			},
			location: "London, UK",
			industry: "Healthcare Technology",
			experience_level: "Established",
			areas_of_expertise: {
				medicine: ["Diagnostic AI", "Clinical Trial Optimization"],
				technology: ["Machine Learning", "Big Data Analytics"],
			},
		},
		{
			id: 3,
			name: "Eduverse VR",
			description: "Revolutionizing education through virtual reality.",
			details:
				"Eduverse VR creates immersive virtual reality experiences that enhance student engagement and learning outcomes in schools and universities globally.",
			logo: "https://cdn.prod.website-files.com/64bf33f4a74988fc2b4c6913/64bf33f4a74988fc2b4c69fc_workingatstartup.jpg",
			contact: {
				email: "info@eduverse.com",
				phone: "+81-555-987-6543",
			},
			location: "Tokyo, Japan",
			industry: "Education Technology",
			experience_level: "Emerging",
			areas_of_expertise: {
				education: ["Virtual Reality Curriculum", "Interactive Learning"],
				technology: ["3D Modeling", "VR Software Development"],
			},
		},
	];

	const handleSkip = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % startups.length);
	};

	const handleConnect = () => {
		alert(`Connecting with ${startups[currentIndex].name}`);
	};

	const currentStartup = startups[currentIndex];

	return (
		<div className={styles.aboutContainer}>
			<div className={styles.bannerContainer}>
				<div className={styles.banner}>
					<div className={styles.background}>
						<img src={currentStartup.logo} alt={currentStartup.name} />
					</div>
				</div>
				<div className={styles.avatar}>
					<img src={currentStartup.logo} alt="Startup Logo" />
				</div>
				<div className={styles.userInfo}>
					<h1>
						{currentStartup.name}
						<img
							src={verify}
							alt="Verify"
							className={styles.verifyIcon}
						/>
					</h1>
					<p>{currentStartup.description}</p>
					<p>
						<strong>Location:</strong> {currentStartup.location}
					</p>
					<p>
						<strong>Email:</strong> {currentStartup.contact.email}
					</p>
					<p>
						<strong>Phone:</strong> {currentStartup.contact.phone}
					</p>
					<p>
						<strong>Industry:</strong> {currentStartup.industry}
					</p>
					<p>
						<strong>Experience Level:</strong>{" "}
						{currentStartup.experience_level}
					</p>
					<h3>Areas of Expertise</h3>
					<ul>
						{Object.entries(currentStartup.areas_of_expertise).map(
							([key, value]) => (
								<li key={key}>
									<strong>{key.replace(/_/g, " ")}</strong>:{" "}
									{value.join(", ")}
								</li>
							)
						)}
					</ul>
				</div>
				<div className={styles.startupActions}>
					<button className={styles.connectButton} onClick={handleConnect}>
						Connect with Founder
					</button>
					<button className={styles.skipButton} onClick={handleSkip}>
						Skip
					</button>
				</div>
			</div>
		</div>
	);
}

export default Founders;
