import React, { useState } from "react";
import ProfileCard from "./components/ProfileCard";
import ActiveMenu from "./components/ActiveMenu";
import ProfileEditMenu from "./components/ProfileEditMenu";
import ProfessionalProfile from "./components/ProfessionalProfile";

const EditProfile = () => {
	return (
		<div className="flex gap-8 w-full py-8 px-[16px]">
			<div className="w-4/12">
				{/* ========== Profile Edit Menu ========== */}
				<ProfileEditMenu />
			</div>
			<div className="w-8/12">
				<div className="bg-[#ffffff] p-8 rounded-md">
					{/* =========== Profile Card ========== */}
					<ProfileCard />
					{/* =========== Active Menu  ========== */}
					<ActiveMenu />
				</div>
				<div className="bg-[#ffffff] p-8 rounded-md mt-8">
					<ProfessionalProfile />
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
