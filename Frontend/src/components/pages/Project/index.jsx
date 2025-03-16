import React, { useState } from "react";
import RightSidebar from "components/common/RightSidebar";
import ActiveBanner from "./components/ActiveBanner";
import SearchProjectHeader from "./components/SearchProjectHeader";
import ActivateHeader from "./components/ActivateHeader";
import MyProjects from "./components/MyProjects";

function Projects() {
	useState(false);

	return (
		<div className="w-full py-8 px-[16px]">
			<ActiveBanner />
			<div className="flex gap-8 mt-8">
				<div className="w-10/12">
					<SearchProjectHeader />
					<div className="pb-8 px-8 bg-[#fbfbfb] rounded-md mt-8">
						<ActivateHeader />
						<MyProjects />
					</div>
				</div>
				<RightSidebar />
			</div>
		</div>
	);
}

export default Projects;
