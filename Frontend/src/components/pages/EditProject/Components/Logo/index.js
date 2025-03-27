import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import ActionBar from "../../../EditProfile/components/ActionBar";
import ProjectEditMenu from "../ProjectEditMenu";
import ProjectCard from "../ProjectCard";
import ContainerLogo from "components/pages/CreateProject/Logo/components/ContainerLogo";

const EditLogo = () => {
	return (
		<div className="flex gap-8 w-full py-8 px-[16px]">
			<ProjectEditMenu />
			<div className="w-8/12">
				<div className="bg-[#ffffff] p-8 rounded-md">
					{/* =========== Profile Card ========== */}
					<ProjectCard />
					{/* =========== Action Bar  ========== */}
					<ActionBar />
				</div>
				<div className="bg-[#ffffff] p-8 rounded-md mt-8">
					<div className="pb-[20px] mb-8 border-b-[1px] border-gray-200">
						<div>
							<h4 className=""> Logo</h4>
						</div>
					</div>
					<div>
						<ContainerLogo />
						<div className="px-[16px] flex justify-end">
							<div className="">
								<Button
									// onClick={handleSaveChanges}
									height={50}
									className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
									borderRadius={4}
									loading={false}
									loadingText="Loading..."
									spinnerPlacement="start">
									SAVE CHANGES
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditLogo;
