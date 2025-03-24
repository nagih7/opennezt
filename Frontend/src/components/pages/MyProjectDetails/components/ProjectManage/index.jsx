import React, { useState } from "react";
import ProjectActivity from "../ProjectActivity";
import { Button, Input, Tabs } from "@chakra-ui/react";
import { toaster } from "components/UI/toaster";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteMyProject } from "api/project";

const ProjectManage = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	// ========== STATE FROM REDUX STORE  ========== //
	const { isLoadingDeleteMyProject } = useSelector((state) => state.project);
	// ========== STATE  ========== //
	const [confirmDelete, setConfirmDelete] = useState(false);

	// ========== HANDLE CHANGE ========== //
	const handleConfirmDeleteProject = () => {
		if (confirmDelete) {
			dispatch(deleteMyProject(id));
		} else {
			toaster.create({
				title: "Please confirm that you understand the consequences of deleting this project.",
				type: "error",
			});
		}
	};

	return (
		<div className="px-[16px]">
			<div className="flex w-full gap-8">
				<div className="w-10/12 mt-8">
					<Tabs.Root defaultValue="Project Requirement" variant="plain">
						<div className="p-8 bg-[#ffffff] rounded-md">
							<Tabs.List>
								<Tabs.Trigger value="Project Requirement">
									Project Requirement
								</Tabs.Trigger>
								<Tabs.Trigger value="delete">Delete</Tabs.Trigger>
								<Tabs.Indicator rounded="l2" />
							</Tabs.List>
						</div>
						<div className="p-8 mt-8 bg-[#ffffff] rounded-md">
							<Tabs.Content pt="0" value="Project Requirement">
								<div className="relative mb-8">
									<Input
										height={50}
										type="url"
										placeholder="Ex: OpenNezt"
										className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
									/>
									<label
										htmlFor=""
										className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
										Team Role
									</label>
								</div>
								<div className="relative mb-8">
									<Input
										height={50}
										type="url"
										placeholder="Ex: OpenNezt"
										className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
									/>
									<label
										htmlFor=""
										className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
										Role
									</label>
								</div>
								<div className="relative mb-8">
									<Input
										height={50}
										type="url"
										placeholder="Ex: OpenNezt"
										className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
									/>
									<label
										htmlFor=""
										className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
										Industry
									</label>
								</div>
								<div className="relative mb-8">
									<Input
										height={50}
										type="url"
										placeholder="Ex: OpenNezt"
										className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
									/>
									<label
										htmlFor=""
										className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
										Experience Level
									</label>
								</div>
								<div className="relative mb-8">
									<Input
										height={50}
										type="url"
										placeholder="Ex: OpenNezt"
										className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
									/>
									<label
										htmlFor=""
										className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
										Category
									</label>
								</div>
								<div className="relative mt-8">
									<Input
										height={50}
										type="url"
										placeholder="Ex: OpenNezt"
										className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
									/>
									<label
										htmlFor=""
										className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
										Skill
									</label>
								</div>
								<div className="flex justify-end">
									<div className="">
										<Button
											height={50}
											className="mt-[14px] text-sm px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
											borderRadius={4}
											loading={false}
											loadingText="Loading..."
											spinnerPlacement="start">
											SAVE CHANGES
										</Button>
									</div>
								</div>
							</Tabs.Content>
							<Tabs.Content pt="0" value="delete">
								<div>
									<p className="mb-0 p-[15px] border-l-[3px] text-sm border-[#09c] rounded-r-md bg-[#e3f1f6] text-[#09c]">
										WARNING: Deleting this group will completely
										remove ALL content associated with it. There is no
										way back, please be careful with this option.
									</p>
								</div>
								<label htmlFor="delete-project" className="mt-[16px]">
									<input
										type="checkbox"
										id="delete-project"
										className="w-4 h-4 mr-[10px]"
										value={confirmDelete}
										onChange={() => setConfirmDelete(!confirmDelete)}
									/>
									I understand the consequences of deleting this
									project.
								</label>
								<div className="flex justify-end">
									<div className="">
										<Button
											height={50}
											className="mt-[14px] text-sm px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
											borderRadius={4}
											loading={isLoadingDeleteMyProject}
											loadingText="Deleting..."
											spinnerPlacement="start"
											onClick={handleConfirmDeleteProject}>
											DELETE PROJECT
										</Button>
									</div>
								</div>
							</Tabs.Content>
						</div>
					</Tabs.Root>
				</div>
				<div className="w-4/12 mt-8">
					{/* ProjectActivity */}
					<ProjectActivity />
				</div>
			</div>
		</div>
	);
};

export default ProjectManage;
