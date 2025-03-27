import React from "react";
import RecruitTalentActiveBanner from "./components/ActiveBanner";
import FilterSidebar from "./components/FilterSidebar";
import RecruitTalentsHeader from "./components/Header";
import ListTalents from "./components/ListTalents";

function RecruitTalents() {
	return (
		<div className="w-full">
			<RecruitTalentActiveBanner />
			<div className="py-8 px-[16px] flex w-full gap-8">
				<div className="w-3/12 ">
					<FilterSidebar />
				</div>
				<div className="w-9/12">
					<RecruitTalentsHeader />
					<ListTalents />
				</div>
			</div>
		</div>
	);
}

export default RecruitTalents;
