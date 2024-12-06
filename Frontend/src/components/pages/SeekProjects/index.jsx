import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from "./styles.module.scss";
import { getMatchingProjects, seekProjects } from "api/project";

function SeekProjects() {
    const dispatch = useDispatch();
    const authUser = useSelector((state) => state.auth.authUser);
    console.log("authUser", authUser);
    const { projectsBySeek } = useSelector((state) => {
        console.log("State project:", state.project);
        return state.project;
    });
    const loading = useSelector((state) => state.project.loadingSeekProjects);

    useEffect(() => {}, [projectsBySeek, loading]);

    const handleGetMatchingProjects = useCallback(() => {
        dispatch(getMatchingProjects());
    }, [dispatch]);

    useEffect(() => {
        handleGetMatchingProjects();
    }, [handleGetMatchingProjects]);

    const handleRequestToJoin = async (projectId) => {
        const requestProjectData = {
            email: authUser.email,
            project_id: projectId,
            role_project: "talent"
        };
        try {
            const response = await dispatch(seekProjects(requestProjectData));
            if (response.payload && response.payload.status === 200) {
                toast.success(response.payload.message);
            } else if (response.payload && response.payload.status === 400) {
                toast.error(response.payload.message);
            }
        } catch (error) {
            toast.error("Request to join failed.");
        }
    };

    return (
        <div className={styles.searchContainer}>
            <ToastContainer />
            <h1>Seek Projects</h1>
            <div>
                <h2>Matching Projects</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className={styles.projectsList}>
                        {projectsBySeek &&
                            projectsBySeek.map((project) => (
                                <div key={project._id} className={styles.projectCard}>
                                    <div className={styles.projectImage}>
                                        <img src={project.background} alt={project.name} />
                                    </div>
                                    <div className={styles.projectContent}>
                                        <h3 className={styles.projectName}>{project.name}</h3>
                                        <p className={styles.projectProblem}>
                                            <strong>Problem:</strong> {project.problem}
                                        </p>
                                        <p className={styles.projectSolution}>
                                            <strong>Solution:</strong> {project.solution}
                                        </p>
                                        <p className={styles.projectUpdatedAt}>
                                            <strong>Updated At:</strong> {new Date(project.updated_at).toLocaleDateString()}
                                        </p>
                                        <button
                                            className={styles.requestButton}
                                            onClick={() => handleRequestToJoin(project._id)}
                                        >
                                            Request to Join
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SeekProjects;