import React, { useEffect, useState } from "react";
import StepHeader from "../StepHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onChangeFormCreateProject } from "states/modules/project";
import { createNewProject } from "api/project";

const CoverImage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// ========== STATE FROM REDUX ========== //
	const { formCreateProject } = useSelector((state) => state.project);
	// ========== STATE ========== //
	const [selectedImage, setSelectedImage] = useState({});
	// ========== USEEFFECT ========== //
	useEffect(() => {
		if (formCreateProject.name === "") {
			navigate("/project/details");
		}
		// ========== CLEANUP FUNCTION ========== //
	}, [navigate, formCreateProject.name]);

	useEffect(() => {
		if (formCreateProject.background) {
			setSelectedImage(URL.createObjectURL(formCreateProject.background));
		}
	}, [formCreateProject]);

	// ========== ONCHANGE FUNCTION ========== //
	const handleFileChange = (event) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedImage(URL.createObjectURL(file));
			dispatch(onChangeFormCreateProject({ background: file }));
		}
	};

	const handleConfirmCreateProject = () => {
		const formData = new FormData();
		formData.append("name", formCreateProject.name);
		formData.append("description", formCreateProject.description);
		formData.append(
			"industries",
			JSON.stringify(formCreateProject.industries)
		);
		formData.append("stage", formCreateProject.stage[0]);
		formData.append(
			"revenues",
			JSON.stringify(
				// formCreateProject.revenues.map((revenue) => {
				// 	return {
				// 		...revenue,
				// 		currency: revenue.currency[0],
				// 	};
				// })
				formCreateProject.revenues.forEach((revenue, index, array) => {
					Object.keys(revenue).forEach((key) => {
						if (revenue[key] === "") {
							delete array[index];
						}
					});
					return {
						...revenue,
						currency: revenue.currency[0],
					};
				})
			)
		);
		formData.append(
			"funding_sources",
			JSON.stringify(formCreateProject.funding_sources)
		);
		formData.append(
			"additional_infos",
			JSON.stringify(formCreateProject.additional_infos)
		);
		formData.append("logo", formCreateProject.logo);
		formData.append("background", formCreateProject.background);

		dispatch(createNewProject(formData));
	};

	const handleNextStep = () => {};
	return (
		<div className="w-full h-full">
			<div className="px-[16px] ">
				<div>
					<div className="mt-8 bg-[#ffffff] rounded-md">
						<StepHeader />
					</div>
					<div className="mt-8 bg-[#ffffff] rounded-md p-8">
						<div className="flex flex-col w-full">
							<div>
								<p className="my-[16px] text-[#6f7f92]">
									The Cover Image will be used to customize the header
									of your project.
								</p>
								<div className="bg-[#f8f9fa] rounded-md">
									<div className="px-[24px] py-[24px]">
										<div>
											<div className="p-10 border-dashed border-[#6f7f9266] border-3">
												<div className="flex flex-col items-center justify-center py-10">
													{/* Hiển thị ảnh nếu đã chọn, nếu không thì hiển thị text */}
													{!selectedImage ? (
														<>
															<p className="mb-[5px] font-medium">
																Drop your file here
															</p>
															<p className="mb-[5px] text-[#6f7f92] font-medium">
																or
															</p>
														</>
													) : (
														<div className="text-center">
															<img
																src={selectedImage}
																alt="Selected Preview"
																className="mt-2 rounded-md mb-[16px]"
																style={{
																	maxWidth: "100%",
																	maxHeight: "100%",
																	objectFit: "cover",
																}}
															/>
														</div>
													)}
													<div className="text-center">
														{/* Input file */}
														<input
															type="file"
															accept="image/*"
															id="fileInput"
															className="hidden"
															onChange={handleFileChange}
														/>
														<label
															htmlFor="fileInput"
															className="px-[24px] py-[11px] cursor-pointer text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold">
															SELECT YOUR FILE
														</label>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="my-[16px]">
									<p className="border-l-2 border-[#f14646] font-medium text-sm text-[#f14646] rounded-r-md bg-[#f8eaea] p-[15px]">
										For better results, make sure to upload an image
										that is larger than 0px wide, and 225px tall.
									</p>
								</div>
							</div>
							<div className="flex justify-end gap-6">
								<button
									onClick={() => navigate("/project/logo")}
									height={50}
									className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold ">
									BACK TO PREVIOUS STEP
								</button>
								<button
									onClick={handleConfirmCreateProject}
									height={50}
									className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold">
									CREATE PROJECT
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CoverImage;
