import React from "react";
import RecruitTalentActiveBanner from "./components/ActiveBanner";
import FilterSidebar from "./components/FilterSidebar";
import RecruitTalentsHeader from "./components/Header";
import ListTalents from "./components/ListTalents";

function RecruitTalents() {
	return (
		<div className="w-full">
			<RecruitTalentActiveBanner />
			<div className="py-8 px-[16px] flex md:flex-row flex-col w-full gap-8">
				<div className="md:w-3/12 w-full">
					<FilterSidebar />
				</div>
				<div className="md:w-9/12 w-full">
					<RecruitTalentsHeader />
					<ListTalents />
				</div>
			</div>
		</div>
	);
}

export default RecruitTalents;
