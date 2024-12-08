import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from "./styles.module.scss";
import { getMatchingProjects, searchProjects, seekProjects } from "api/project";
import {listSector} from "components/common/ListSelected";
import { Select, Button,Input } from 'antd';
const { Option } = Select;

function SeekProjects() {
    const dispatch = useDispatch();
    const authUser = useSelector((state) => state.auth.authUser);
    const { projectsBySeek } = useSelector((state) => state.project);
    const loading = useSelector((state) => state.project.loadingSeekProjects);

    const [industry, setIndustry] = useState("");
    const [name, setName] = useState("");
    const [searchedProjects, setSearchedProjects] = useState([]);
    const [expandedProjectId, setExpandedProjectId] = useState(null);

    const industries = listSector.map(sector => sector.label);
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
            
    
            if (response && response.status === 200) {
                toast.success(response.data.message);
                handleGetMatchingProjects();
            } 
        } catch (error) {
            console.error("Error requesting to join project:", error);
            if (error.status === 400) {
                toast.error(error.data.message);
        }}
    };
    

    const handleSearchProjects = async (e) => {
        e.preventDefault();
        const result = await dispatch(searchProjects(industry, name));
        console.log("result", result);
        setSearchedProjects(result.data); 
    };
    const toggleExpand = (projectId) => {
        setExpandedProjectId(expandedProjectId === projectId ? null : projectId);
    };
    return (
         <div className={styles.searchContainer}>
            <ToastContainer />
            <form onSubmit={handleSearchProjects} className={styles.searchForm}>
                <Select
                    value={industry}
                    onChange={(value) => setIndustry(value)}
                    className={styles.searchSelect}
                    placeholder="Select Industry"
                    style={{ width: '100%', marginRight: '2rem' }}
                >
                    {listSector.map((sector) => (
                        <Option key={sector.value} value={sector.value}>
                            {sector.label}
                        </Option>
                    ))}
                </Select>
                <Input
                    type="text"
                    placeholder="Project Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.searchInput}
                    style={{ flex: 1 }}
                />
                <Button type="primary" htmlType="submit" className={styles.searchButton}>
                    Search
                </Button>
            </form>
        
            <div className={styles.projectsList}>
                {loading ? (
                    <img alt="Loading Search Results" width="732" height="558" data-id="6288970" data-animated-url="https://cdn.dribbble.com/users/220043/screenshots/6288970/dttr_loaderricerca_ac_ver1.gif" skip_resize="true" sizes="(max-width: 919px) 100vw, max(768px, 98vh)" src="https://cdn.dribbble.com/users/220043/screenshots/6288970/dttr_loaderricerca_ac_ver1.gif"></img>
                ) : (
                    (searchedProjects.length > 0 ? searchedProjects : projectsBySeek).map((project) => (
                        project && project.background && (
                            <div key={project._id} className={styles.projectItem}>
                            <div className={styles.projectImage}>
                                <img src={project.background} alt={project.name} />
                            </div>
                            <div className={`${styles.projectContent} ${expandedProjectId === project._id ? styles.expanded : ''}`}>
                                <h3 className={styles.projectName} onClick={() => toggleExpand(project._id)}>{project.name}</h3>
                                <p className={styles.projectProblem} onClick={() => toggleExpand(project._id)}>
                                    <strong>Problem:</strong> {project.problem}
                                </p>
                                <p className={styles.projectSolution} onClick={() => toggleExpand(project._id)}>
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
                        )
                    ))
                )}
            </div>
        </div>
    );
}

export default SeekProjects;