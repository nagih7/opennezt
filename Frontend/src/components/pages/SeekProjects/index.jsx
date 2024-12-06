import React, { useState, useEffect, useCallback } from "react";
import store from "states/configureStore";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { seekProjects } from "api/project";

function SeekProjects() {
	// const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [projectId, setProjectId] = useState("");
	const [roleProject, setRoleProject] = useState("");
	const [founderId, setFounderId] = useState("");
	const { projectsBySeek, loadingSeekProjects } = useSelector(
		(state) => state.project
	);

	const handleRequestProject = async () => {
		await store.dispatch(
			seekProjects({
				email,
				project_id: projectId,
				role_project: roleProject,
			})
		);
	};

	// const handleGetMatchingProjects = useCallback(() => {
	// 	dispatch(getMatchingProjects(founderId));
	// }, [dispatch, founderId]);

	// useEffect(() => {
	// 	if (founderId) {
	// 		handleGetMatchingProjects();
	// 	}
	// }, [founderId, handleGetMatchingProjects]);

	return (
		<div className={styles.searchContainer}>
			<h1>Seek Projects</h1>
			<div>
				<h2>Request Project</h2>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Project ID"
					value={projectId}
					onChange={(e) => setProjectId(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Role Project"
					value={roleProject}
					onChange={(e) => setRoleProject(e.target.value)}
				/>
				<button
					onClick={handleRequestProject}
					disabled={loadingSeekProjects}>
					Request Project
				</button>
			</div>
			<div>
				<h2>Get Matching Projects</h2>
				<input
					type="text"
					placeholder="Founder ID"
					value={founderId}
					onChange={(e) => setFounderId(e.target.value)}
				/>
				<button
					// onClick={handleGetMatchingProjects}
					disabled={loadingSeekProjects}>
					Get Matching Projects
				</button>
				{loadingSeekProjects && <p>Loading...</p>}
				<ul>
					{projectsBySeek &&
						projectsBySeek.map((project) => (
							<li key={project._id}>
								<h3>{project.name}</h3>
								<p>{project.problem}</p>
								<p>{project.solution}</p>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}

export default SeekProjects;
