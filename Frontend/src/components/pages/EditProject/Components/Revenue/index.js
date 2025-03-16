import React from "react";
import { Button, Input } from "@chakra-ui/react";
import ActionBar from "../../../EditProfile/components/ActionBar";
import ProjectEditMenu from "../ProjectEditMenu";
import ProjectCard from "../ProjectCard";

const EditRevenue = () => {
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
							<h4 className=""> Revenue</h4>
						</div>
					</div>
					<div>
						<div>
							<div className="relative mb-8 ">
								<Input
									height={50}
									type="month"
									placeholder=" "
									className="p-[16px] w-full border-[1px] outline-none border-gray-200 rounded-md "
								/>
								<label
									htmlFor=""
									className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
									Month / Year
								</label>
							</div>
							<div className="flex w-full gap-8">
								<div className="relative w-6/12 mb-8">
									<Input
										height={50}
										type="url"
										placeholder=" "
										className="p-[16px] w-full border-[1px] outline-none border-gray-200 rounded-md "
									/>
									<label
										htmlFor=""
										className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
										Amount
									</label>
								</div>
								<div className="relative w-6/12 mb-8">
									<Input
										height={50}
										type="url"
										placeholder=" "
										className="p-[16px] w-full border-[1px] outline-none border-gray-200 rounded-md "
									/>
									<label
										htmlFor=""
										className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
										Currency
									</label>
								</div>
							</div>
						</div>
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

export default EditRevenue;
