import React from "react";
import { Button } from "@chakra-ui/react";
import ActionBar from "../../../EditProfile/components/ActionBar";
import ProjectEditMenu from "../ProjectEditMenu";
import ProjectCard from "../ProjectCard";
import { IconlyEdit } from "components/UI/Iconly";
import { IconlyDelete } from "components/UI/Iconly"
import { useDispatch, useSelector } from "react-redux";
import SelectCustom from "components/UI/SelectCustom";

const EditStage = () => {

	const dispatch = useDispatch();
	// ========== STATE FROM REDUX ========== //
	const project = useSelector((state) => state.project.myProjectDetails);
	console.log("project", project);
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
					<div className="pb-[20px] mb-8 border-b-[1px] border-gray-200 flex justify-between">
						<div>
							<h4 className=""> Sector</h4>
						</div>
					</div>
					<div className="px-[16px] flex flex-col gap-8">
						{/* <div>
							<div className="relative mb-8">
								<SelectRoot
									height={50}
									width={"100%"}
									className="w-full border-[1px] outline-none border-gray-200 rounded-md flex justify-center "
									multiple
									size="sm">
									<SelectTrigger>
										<SelectValueText
											className="p-[6px]"
											placeholder="Movie"
										/>
									</SelectTrigger>
									<SelectContent width={"100%"} className="w-full">
										<SelectItem className="p-[12px] w-full outline-none  rounded-md"></SelectItem>
									</SelectContent>
								</SelectRoot>
								<label
									htmlFor=""
									className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
									Stage
								</label>
							</div>
							<div className="relative mb-8">
								<SelectRoot
									height={50}
									width={"100%"}
									className="w-full border-[1px] outline-none border-gray-200 rounded-md flex justify-center "
									multiple
									size="sm">
									<SelectTrigger>
										<SelectValueText
											className="p-[6px]"
											placeholder="Movie"
										/>
									</SelectTrigger>
									<SelectContent width={"100%"} className="w-full">
										<SelectItem className="p-[12px] w-full outline-none  rounded-md"></SelectItem>
									</SelectContent>
								</SelectRoot>
								<label
									htmlFor=""
									className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
									Industries
								</label>
							</div>
						</div> */}
						<SelectCustom
							multiple
							required
							label="Industries"
							placeholder="Ex: Software Engineer"
							canChange

						/>
						<SelectCustom
							required
							label="Stage"
							placeholder="Ex:Seed stage"
							canChange

						/>
						<div className="px-[16px] flex justify-end">
							<div className="">
								<Button
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

export default EditStage;
