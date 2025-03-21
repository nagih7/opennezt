import React from "react";
import { Button } from "@chakra-ui/react";
import ActionBar from "../../../EditProfile/components/ActionBar";
import ProjectEditMenu from "../ProjectEditMenu";
import ProjectCard from "../ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { IconlyEdit } from "components/UI/Iconly";
import { IconlyDelete } from "components/UI/Iconly"
const EditAdditionalInfo = () => {
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
							<h4 className=""> Additional Info</h4>
						</div>
						<Button

							height={50}
							className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
							borderRadius={4}
							loading={false}
							loadingText="Loading..."
							spinnerPlacement="start">
							Add Certification
						</Button>
					</div>
					<div>
						{/* <FormAdditionalInfo /> */}
						<div className="px-[16px]">
							{Array.isArray(project?.additional_infos) ? (
								project.additional_infos.map((pro, index) => (
									<div key={index} className="shadow rounded-[0.6rem] mt-[2rem] p-4">

										<div className="relative flex justify-end space-x-2">
											<span className="cursor-pointer">
												<IconlyEdit size={24} color={"#000"} />
											</span>
											<span className="cursor-pointer">
												<IconlyDelete size={24} color={"#000"} />
											</span>
										</div>


										{pro.name && <h4 className="font-bold mb-[0.75rem]">{pro.name}</h4>}


										{pro.content && (
											<p className="flex"> {pro.content} </p>
										)}



									</div>
								))
							) : (
								<p>Loading funding sources...</p>
							)}
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

export default EditAdditionalInfo;
