import React from "react";
import styles from "./styles.module.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const FounderProfile = (props) => {
	const { founderProfile } = props;

	return (
		<div className={styles.founderProfileWrap}>
			<h2>
				Professional Background
				<ArrowDropDownIcon className={styles.dropDown} />
			</h2>
			<div className={styles.founderProfileBoxWrap}>
				{founderProfile.industry && (
					<>
						<h3>Professional Summary</h3>
						<p>{founderProfile.professional_summary}</p>
					</>
				)}
				{founderProfile.industry && (
					<>
						<h3>Primary Industries</h3>
						{founderProfile.industry.map((industry) => {
							return <p key={industry}>{industry}</p>;
						})}
					</>
				)}
				{founderProfile.experience_level && (
					<>
						<h3>Experience Level</h3>
						<p>{founderProfile.experience_level}</p>
					</>
				)}
				{founderProfile.degree && (
					<>
						<h3>Education Level</h3>
						<p>{founderProfile.degree}</p>
					</>
				)}
				{founderProfile.certification &&
					founderProfile.certification.length > 0 && (
						<>
							<h3>Certifications</h3>
							{founderProfile.certification.map((certification) => {
								return <p key={certification}>{certification}</p>;
							})}
						</>
					)}
			</div>
			<h2>
				Expertise
				<ArrowDropDownIcon className={styles.dropDown} />
			</h2>
			<div className={styles.founderProfileBoxWrap}>
				{founderProfile.areas_of_expertise &&
					founderProfile.areas_of_expertise.accounting_and_finance &&
					founderProfile.areas_of_expertise.accounting_and_finance.length >
						0 && (
						<>
							<h3>Accounting and Finance</h3>
							{founderProfile.areas_of_expertise.accounting_and_finance.map(
								(area) => {
									return <p key={area}>{area}</p>;
								}
							)}
						</>
					)}
				{founderProfile.areas_of_expertise &&
					founderProfile.areas_of_expertise.accounting_and_finance &&
					founderProfile.areas_of_expertise.accounting_and_finance.length >
						0 && (
						<>
							<h3>Human Resources</h3>
							{founderProfile.areas_of_expertise.human_resource.map(
								(area) => {
									return <p key={area}>{area}</p>;
								}
							)}
						</>
					)}
				{founderProfile.areas_of_expertise &&
					founderProfile.areas_of_expertise.international &&
					founderProfile.areas_of_expertise.international.length > 0 && (
						<>
							<h3>International</h3>
							{founderProfile.areas_of_expertise.international.map(
								(area) => {
									return <p key={area}>{area}</p>;
								}
							)}
						</>
					)}
				{founderProfile.areas_of_expertise &&
					founderProfile.areas_of_expertise.law_and_legal &&
					founderProfile.areas_of_expertise.law_and_legal.length > 0 && (
						<>
							<h3>Law and Legal</h3>
							{founderProfile.areas_of_expertise.law_and_legal.map(
								(area) => {
									return <p key={area}>{area}</p>;
								}
							)}
						</>
					)}
				{founderProfile.areas_of_expertise &&
					founderProfile.areas_of_expertise.management &&
					founderProfile.areas_of_expertise.management.length > 0 && (
						<>
							<h3>Management</h3>
							{founderProfile.areas_of_expertise.management.map(
								(area) => {
									return <p key={area}>{area}</p>;
								}
							)}
						</>
					)}
				{founderProfile.areas_of_expertise &&
					founderProfile.areas_of_expertise.operations &&
					founderProfile.areas_of_expertise.operations.length > 0 && (
						<>
							<h3>Operations</h3>
							{founderProfile.areas_of_expertise.operations.map(
								(area) => {
									return <p key={area}>{area}</p>;
								}
							)}
						</>
					)}
				{founderProfile.areas_of_expertise &&
					founderProfile.areas_of_expertise.sales &&
					founderProfile.areas_of_expertise.sales.length > 0 && (
						<>
							<h3>Sales</h3>
							{founderProfile.areas_of_expertise.sales.map((area) => {
								return <p key={area}>{area}</p>;
							})}
						</>
					)}
				{founderProfile.areas_of_expertise &&
					founderProfile.areas_of_expertise.starting_up &&
					founderProfile.areas_of_expertise.starting_up.length > 0 && (
						<>
							<h3>Starting up</h3>
							{founderProfile.areas_of_expertise.starting_up.map(
								(area) => {
									return <p key={area}>{area}</p>;
								}
							)}
						</>
					)}
				{founderProfile.areas_of_expertise &&
					founderProfile.areas_of_expertise.sustainability &&
					founderProfile.areas_of_expertise.sustainability.length > 0 && (
						<>
							<h3>Sustainability</h3>
							{founderProfile.areas_of_expertise.sustainability.map(
								(area) => {
									return <p key={area}>{area}</p>;
								}
							)}
						</>
					)}
				{founderProfile.areas_of_expertise &&
					founderProfile.areas_of_expertise.technology_and_internet &&
					founderProfile.areas_of_expertise.technology_and_internet
						.length > 0 && (
						<>
							<h3>Technology and Internet</h3>
							{founderProfile.areas_of_expertise.technology_and_internet.map(
								(area) => {
									return <p key={area}>{area}</p>;
								}
							)}
						</>
					)}
			</div>
			<h2>
				How to Work with Me
				<ArrowDropDownIcon className={styles.dropDown} />
			</h2>
			<div className={styles.founderProfileBoxWrap}>
				{founderProfile.avalability && (
					<>
						<h3>Avalability</h3>
						<p>{founderProfile.avalability}</p>
					</>
				)}
				{founderProfile.career_goals && (
					<>
						<h3>My career goals</h3>
						<p>{founderProfile.career_goals}</p>
					</>
				)}
				{founderProfile.offer && (
					<>
						<h3>What I can offer</h3>
						<p>{founderProfile.offer}</p>
					</>
				)}
				{founderProfile.expectation && (
					<>
						<h3>My work expectation</h3>
						<p>{founderProfile.expectation}</p>
					</>
				)}
			</div>
		</div>
	);
};

export default FounderProfile;
