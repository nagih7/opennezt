import React, { useState } from "react";
import AppLayout from "components/layouts/AppLayout";
import styles from "./styles.module.scss";

function Project() {
	const [projects, setProjects] = useState([
		{
			_id: "67466f0628229b8ac9d5a737",
			name: "My Startup Project",
			related_industries: ["Technology", "Healthcare"],
			description:
				"An online platform connecting patients with doctors remotely.",
			image: "https://beyondexclamation.com/wp-content/uploads/2019/10/startup-image-01__1506587489_150.242.73.142-1200x600-1200x600.jpg",
		},
		{
			_id: "67466f0628229b8ac9d5a738",
			name: "GreenTech Solutions",
			related_industries: ["Environment", "Technology"],
			description:
				"Innovative solutions for sustainable energy and environmental impact reduction.",
			image: "https://www.pace.edu.vn/uploads/news/2024/10/1-project-management-la-gi.jpg",
		},
		{
			_id: "67466f0628229b8ac9d5a739",
			name: "HealthTech Innovators",
			related_industries: ["Healthcare", "Technology"],
			description:
				"Using cutting-edge technology to advance healthcare and medical research.",
			image: "https://res.cloudinary.com/monday-blogs/fl_lossy,f_auto,q_auto/wp-blog/2024/07/project-management.png",
		},
		{
			_id: "67466f0628229b8ac9d5a740",
			name: "EduFuture",
			related_industries: ["Education", "Technology"],
			description:
				"An online learning platform providing interactive courses and certifications.",
			image: "https://base.vn/wp-content/uploads/2024/05/Project-manager-1-1.webp",
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
			description: event.target.projectDescription.value,
			image: event.target.projectImage.value,
		};
		setProjects([...projects, newProject]);
		setIsCreateFormVisible(false);
	};

	return (
		<AppLayout>
			<div className={styles.projectContainer}>
				<div className={styles.projectHeader}>
					<h2>Project Manager</h2>
					<button
						className={styles.btnCreate}
						onClick={handleCreateProject}>
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

						<label htmlFor="projectDescription">Description</label>
						<textarea
							id="projectDescription"
							required
							placeholder="Enter project description"></textarea>

						<label htmlFor="projectImage">Image URL</label>
						<input
							id="projectImage"
							type="text"
							required
							placeholder="Enter image URL"
						/>

						<button type="submit" className={styles.btnSubmit}>
							Create Project
						</button>
					</form>
				) : selectedProject ? (
					<div className={styles.projectDetail}>
						<h3>{selectedProject.name}</h3>
						<img
							src={selectedProject.image}
							alt="Project"
							className={styles.imgAvtDetail}
						/>
						<p>
							<strong>Description:</strong> {selectedProject.description}
						</p>
						<p>
							<strong>Related Industries:</strong>{" "}
							{selectedProject.related_industries
								? selectedProject.related_industries.join(", ")
								: "N/A"}
						</p>
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
								className={styles.projectCard}
								onClick={() => handleProjectClick(project)}>
								<div className={styles.projectAvt}>
									<img
										className={styles.imgAvt}
										src={project.image}
										alt="Project"
									/>
								</div>
								<div className={styles.projectName}>{project.name}</div>
								<div className={styles.projectDes}>
									{project.description}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</AppLayout>
	);
}

export default Project;
