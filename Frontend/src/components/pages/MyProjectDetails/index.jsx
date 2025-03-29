import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProjectDetails } from 'api/project';
import ProjectMenu from './components/ProjectMenu';
import ProjectCard from './components/ProjectCard';
import ProjectOverview from './components/ProjectOverview';
import ProjectManage from './components/ProjectManage';

const MyProjectDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    // ========== STATE FROM REDUX ========== //
    const project = useSelector((state) => state.project.myProjectDetails);
    // ========== STATE ========== //
    const [tab, setTab] = useState('overview');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(getMyProjectDetails(id));
    }, [id, dispatch]);

    return (
        <div className="w-full h-full">
            <ProjectCard project={project} />
            <ProjectMenu setTab={setTab} />
            {tab === 'overview' && <ProjectOverview project={project} />}
            {tab === 'manage' && <ProjectManage />}
            {tab === 'forum' && <ProjectOverview project={project} />}
            {tab === 'members' && <ProjectOverview project={project} />}
            {tab === 'media' && <ProjectOverview project={project} />}
            {tab === 'invite' && <ProjectOverview project={project} />}
        </div>
    );
};

export default MyProjectDetails;
