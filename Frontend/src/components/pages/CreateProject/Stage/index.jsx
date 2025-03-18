import React, { useEffect, useState } from "react";
import StepHeader from "../StepHeader";
import { useNavigate } from "react-router-dom";
import SelectCustom from "components/UI/SelectCustom";
import { onChangeFormCreateProject } from "states/modules/project";
import { getIndustryFramework, getStageFramework } from "api/user";
import { useDispatch, useSelector } from "react-redux";
import { toaster } from "components/UI/toaster";

const Stage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// ========== STATE FROM REDUX ========== //
	const { formCreateProject } = useSelector((state) => state.project);
	const { industryFramework, stageFramework } = useSelector(
		(state) => state.user
	);
	// ========== STATE ========== //
	const [formData, setFormData] = useState({
		industries: [],
		stage: "",
	});
	// ========== USEEFFECT ========== //
	useEffect(() => {
		if (formCreateProject.name === "") {
			navigate("/project/details");
		}
		// ========== CLEANUP FUNCTION ========== //
	}, [navigate, formCreateProject.name]);

	useEffect(() => {
		dispatch(getIndustryFramework());
		dispatch(getStageFramework());
	}, [dispatch]);

	useEffect(() => {
		setFormData({
			industries: formCreateProject.industries,
			stage: formCreateProject.stage,
		});
	}, [formCreateProject]);

	// ========== ONCHANGE FUNCTION ========== //
	const handleChange = (event, nameSelect) => {
		console.log(event);
		if (nameSelect) {
			setFormData({ ...formData, [nameSelect]: event.value });
		}
	};

	const handlePreviousStep = () => {
		dispatch(onChangeFormCreateProject(formData));
		navigate("/project/details");
	};

	const handleNextStep = () => {
		// VERIFY
		if (!formData.industries.length) {
			toaster.create({
				title: `Industry is required.`,
				type: "error",
			});
			return;
		}
		if (!formData.stage) {
			toaster.create({
				title: `Stage is required.`,
				type: "error",
			});
			return;
		}
		dispatch(onChangeFormCreateProject(formData));
		navigate("/project/revenue");
	};

	return (
		<div className="w-full h-full">
			<div className="px-[16px] ">
				<div>
					<div className="mt-8 bg-[#ffffff] rounded-md">
						<StepHeader />
					</div>
					<div className="mt-8 bg-[#ffffff] rounded-md p-8">
						<div className="flex flex-col w-full">
							<div className="relative flex flex-col gap-12 mb-8">
								<SelectCustom
									multiple
									required
									label="Industries"
									collection={industryFramework}
									placeholder="Ex: Business"
									onChange={(e) => handleChange(e, "industries")}
									value={formData.industries}
									name="industries"
								/>
								<SelectCustom
									required
									label="Stage"
									collection={stageFramework}
									placeholder="Ex: Idea Stage"
									onChange={(e) => handleChange(e, "stage")}
									value={formData.stage}
									name="stage"
								/>
							</div>
							<div className="flex justify-end gap-6">
								<button
									onClick={handlePreviousStep}
									height={50}
									className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold ">
									BACK TO PREVIOUS STEP
								</button>
								<button
									onClick={handleNextStep}
									height={50}
									className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold">
									NEXT STEP
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Stage;
