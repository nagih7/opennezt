import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import BannerActive from "./components/BannerActive";
import ProjectOverview from "./components/ProjectOverview";
import ProjectMoreInfo from "./components/ProjectMoreInfo";
import { getProjectDetails } from "api/project";

const ProjectDetailsBySeek = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(getProjectDetails(id));
	}, [dispatch, id]);

	return (
		<>
			<div className="w-full">
				<BannerActive />
				<div className="flex w-full gap-6 mt-8">
					<ProjectOverview />
					<ProjectMoreInfo />
				</div>
			</div>
		</>
	);
};
export default ProjectDetailsBySeek;
