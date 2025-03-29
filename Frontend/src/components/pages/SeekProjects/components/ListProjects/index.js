import { accessToProject } from 'api/activity';
import { seekProjects } from 'api/project';
import PaginationCustom from 'components/UI/PaginationCustom';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GridSort from './GridSort';
import ListSort from './ListSort';

const ListProjects = ({ action }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// ========== STATE FROM REDUX ========== //
	const projects = useSelector((state) => state.project.projectsBySeek);
	const { paginationSeekProjects, filterSeekProjects } = useSelector((state) => state.project);

	// ========== HANDLE FUNCTION ========== //
	const onPageChange = (pageData) => {
		dispatch(
			seekProjects({
				...filterSeekProjects,
				page: pageData.page,
				perPage: pageData.pageSize,
			})
		);
	};

	const handleViewProjectDetails = useCallback(
		(project) => {
			dispatch(accessToProject(project._id));
			navigate(`/projects/${project._id}/details`);
		},
		[dispatch, navigate]
	);


	// ========== RENDER COMPONENT ========== //
	return (
		<div className="flex flex-col items-center gap-4 ">
			{(() => {
				switch (action) {
					case 'grid':
						return (
							<GridSort
								projects={projects}
								handleViewProjectDetails={handleViewProjectDetails}
							/>
						);
					case 'list':
						return (
							<ListSort
								projects={projects}
								handleViewProjectDetails={handleViewProjectDetails}
							/>
						);
					default:
						return null;
				}
			})()}
			<div className="flex justify-center w-full pb-10">
				<PaginationCustom pagination={paginationSeekProjects} onPageChange={onPageChange} />
			</div>
		</div>
	);

};

export default ListProjects;
