import React, { useState, useEffect } from "react";
import AppLayout from "components/layouts/AppLayout";
import styles from "./styles.module.scss";
import store from "states/configureStore";
import { getDetailTalent, recruitTalents } from "api/talent";
import { useSelector } from "react-redux";

const detailedMockData = {
	"hoang03072005@gmail.com": {
		name: "Nguyễn Huy Hoàng",
		email: "hoang03072005@gmail.com",
		phone: "0992929943",
		avatar: "http://localhost:3456/static/nhhoang.png",
		linkedIn: "",
		region: "",
		city: "",
		language: "vi",
		background: "",
		talent_profile: [
			{
				experience_level: "Senior",
				industry: "Technology",
				areas_of_expertise: {
					accounting_and_finance: ["Financial Analysis", "Budgeting"],
					human_resource: ["Recruitment", "Employee Relations"],
					international: ["Export", "Global Market"],
					law_and_legal: ["Corporate Law", "IP Law"],
					management: ["Project Management", "Operations"],
					marketing: ["Digital Marketing", "Content Strategy"],
					operations: ["Logistics", "Supply Chain"],
					sales: ["Lead Generation", "B2B Sales"],
					starting_up: ["Startup Strategy", "Fundraising"],
					sustainability: ["Green Practices", "CSR"],
					technology_and_internet: [
						"Software Development",
						"Cloud Computing",
					],
				},
			},
		],
	},
	"vuongmanhnghia@gmail.com": {
		name: "Vuong Manh Nghia",
		email: "vuongmanhnghia@gmail.com",
		phone: "0992929944",
		avatar:
			"http://localhost:3456/uploads/avatars/6UkzKU51FTGwWsKu9rqhwd.jpeg",
		linkedIn: "https://www.linkedin.com/in/vuongmanhnghia",
		region: "Viet Nam",
		city: "Hanoi",
		language: "vi",
		background: "Background info here",
		talent_profile: [
			{
				experience_level: "Senior",
				industry: "Technology",
				areas_of_expertise: {
					technology_and_internet: ["JavaScript", "React", "Node.js"],
				},
			},
		],
	},
	"vmnghia@gmail.com": {
		name: "Nghia",
		email: "vmnghia@gmail.com",
		phone: "0992929945",
		avatar: "http://localhost:3456/uploads/avatars/default-avatar.png",
		linkedIn: "https://www.linkedin.com/in/nghia",
		region: "Viet Nam",
		city: "HCMC",
		language: "vi",
		background: "More background info",
		talent_profile: [
			{
				experience_level: "Junior",
				industry: "Technology",
				areas_of_expertise: {
					technology_and_internet: ["React", "Web Development"],
				},
			},
		],
	},
};

function RecruitTalents() {
	const [requestRecruitTalents, setRequestRecruitTalents] = useState({
		expertise_area: "",
		experience_level: "",
		location: "",
		language: "",
		page: 1,
	});

	const talents = useSelector((state) => state.talent.talents);
	const talentDetails = useSelector((state) => state.talent.talentDetails);

	const [dropdowns, setDropdowns] = useState({
		expertise_area: false,
		experience_level: false,
		location: false,
		language: false,
	});

	const handleDropdownToggle = (field) => {
		setDropdowns((prev) => ({ ...prev, [field]: !prev[field] }));
	};

	const handleSelect = (field, value) => {
		setRequestRecruitTalents((prev) => ({ ...prev, [field]: value }));
		setDropdowns((prev) => ({ ...prev, [field]: false }));
	};

	const [popupActive, setPopupActive] = useState(false);

	const handleViewDetails = (email) => {
		store.dispatch(getDetailTalent(email));
		setPopupActive(true);
	};

	const closePopup = () => {
		setPopupActive(false);
	};

	const handleConfirmSearch = async (requestRecruitTalents) => {
		console.log(requestRecruitTalents);
		await store.dispatch(recruitTalents(requestRecruitTalents));
	};

	return (
		<AppLayout>
			<div className={styles.searchContainer}>
				<h2>Search for Talents</h2>
				<div className={styles.searchInputs}>
					<div className={styles.inputWrapper}>
						<input
							type="text"
							name="expertise_area"
							placeholder="Expertise Area"
							value={requestRecruitTalents.expertise_area}
							onFocus={() => handleDropdownToggle("expertise_area")}
						/>
						{dropdowns.expertise_area && (
							<ul className={styles.dropdown}>
								<li
									onClick={() =>
										handleSelect("expertise_area", "Marketing")
									}>
									Marketing
								</li>
								<li
									onClick={() =>
										handleSelect("expertise_area", "Technology")
									}>
									Technology
								</li>
								<li
									onClick={() =>
										handleSelect("expertise_area", "Operations")
									}>
									Operations
								</li>
							</ul>
						)}
					</div>
					<div className={styles.inputWrapper}>
						<input
							type="text"
							name="experience_level"
							placeholder="Experience Level"
							value={requestRecruitTalents.experience_level}
							onFocus={() => handleDropdownToggle("experience_level")}
						/>
						{dropdowns.experience_level && (
							<ul className={styles.dropdown}>
								<li
									onClick={() =>
										handleSelect("experience_level", "Senior")
									}>
									Senior
								</li>
								<li
									onClick={() =>
										handleSelect("experience_level", "Junior")
									}>
									Junior
								</li>
							</ul>
						)}
					</div>
					<div className={styles.inputWrapper}>
						<input
							type="text"
							name="location"
							placeholder="Location"
							value={requestRecruitTalents.location}
							onFocus={() => handleDropdownToggle("location")}
						/>
						{dropdowns.location && (
							<ul className={styles.dropdown}>
								<li
									onClick={() => handleSelect("location", "Viet Nam")}>
									Viet Nam
								</li>
								<li onClick={() => handleSelect("location", "USA")}>
									USA
								</li>
							</ul>
						)}
					</div>
					<div className={styles.inputWrapper}>
						<input
							type="text"
							name="language"
							placeholder="Language"
							value={requestRecruitTalents.language}
							onFocus={() => handleDropdownToggle("language")}
						/>
						{dropdowns.language && (
							<ul className={styles.dropdown}>
								<li
									onClick={() =>
										handleSelect("language", "Vietnamese")
									}>
									Vietnamese
								</li>
								<li onClick={() => handleSelect("language", "English")}>
									English
								</li>
							</ul>
						)}
					</div>
				</div>
				<button
					className={styles.searchButton}
					onClick={() => handleConfirmSearch(requestRecruitTalents)}>
					Search
				</button>

				<div className={styles.results}>
					{talents && talents.length > 0 ? (
						<div className={styles.talentCardsContainer}>
							{talents.map((talent) => (
								<div
									key={talent.user_data.email}
									className={styles.talentCard}>
									<img
										src={
											talent.user_data.avatar || "default-avatar.png"
										}
										alt="Avatar"
										className={styles.talentAvatar}
									/>
									<h3>{talent.user_data.name}</h3>
									<p>{talent.user_data.email}</p>
									<p>
										{talent.experience_level} | {talent.industry}
									</p>
									<button
										className={styles.viewDetailsButton}
										onClick={() =>
											handleViewDetails(talent.user_data.email)
										}>
										View Details
									</button>
								</div>
							))}
						</div>
					) : (
						<p>No talents found.</p>
					)}
				</div>

				{popupActive && talentDetails && (
					<div className={`${styles.popup} ${styles.popupActive}`}>
						<div className={styles.popupContent}>
							<button
								onClick={closePopup}
								className={styles.closePopupButton}>
								Close
							</button>
							<h3>{talentDetails.name}</h3>
							<img
								src={talentDetails.avatar || "default-avatar.png"}
								alt="Avatar"
								className={styles.popupAvatar}
							/>
							<p>
								<strong>Email:</strong> {talentDetails.email}
							</p>
							<p>
								<strong>Phone:</strong> {talentDetails.phone}
							</p>
							<p>
								<strong>LinkedIn:</strong>{" "}
								<a
									href={talentDetails.linkedIn}
									target="_blank"
									rel="noopener noreferrer">
									View LinkedIn
								</a>
							</p>
							<p>
								<strong>Region:</strong> {talentDetails.region}
							</p>
							<p>
								<strong>Background:</strong> {talentDetails.background}
							</p>
							<p>
								<strong>Areas of Expertise:</strong>
							</p>
							<ul>
								{talentDetails.talent_profile.areas_of_expertise &&
									Object.entries(
										talentDetails.talent_profile.areas_of_expertise
									).map(([category, skills]) => (
										<li key={category}>
											<strong>{category}:</strong>{" "}
											{skills.join(", ")}
										</li>
									))}
							</ul>
						</div>
					</div>
				)}
			</div>
		</AppLayout>
	);
}

export default RecruitTalents;
