import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { requestsProject, getMatchingProjects } from "api/seekproject";

function SeekProjects() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [projectId, setProjectId] = useState("");
    const [roleProject, setRoleProject] = useState("");
    const [founderId, setFounderId] = useState("");
    const projects = useSelector((state) => state.seekproject.projects);
    const loading = useSelector((state) => state.seekproject.loading);

    const handleRequestProject = () => {
        dispatch(requestsProject({ email, project_id: projectId, role_project: roleProject }));
    };

    const handleGetMatchingProjects = useCallback(() => {
        dispatch(getMatchingProjects(founderId));
    }, [dispatch, founderId]);

    useEffect(() => {
        if (founderId) {
            handleGetMatchingProjects();
        }
    }, [founderId, handleGetMatchingProjects]);

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
                <button onClick={handleRequestProject} disabled={loading}>
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
                <button onClick={handleGetMatchingProjects} disabled={loading}>
                    Get Matching Projects
                </button>
                {loading && <p>Loading...</p>}
                <ul>
                    {projects.map((project) => (
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