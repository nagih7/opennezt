import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StepHeader from "../StepHeader";
import InputCustom from "components/UI/InputCustom";
import { onChangeFormCreateProject } from "states/modules/project";
import TextAreaCustom from "components/UI/TextAreaCustom";
import { useDispatch, useSelector } from "react-redux";
import { toaster } from "components/UI/toaster";

const Details = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// ========== STATE FROM REDUX ========== //
	const { formCreateProject } = useSelector((state) => state.project);

	// ========== STATE ========== //
	const [formData, setFormData] = useState({
		name: "",
		description: "",
	});

	// ========== USEEFFECT ========== //
	useEffect(() => {
		setFormData({
			name: formCreateProject.name,
			description: formCreateProject.description,
		});
	}, [formCreateProject]);

	// ========== ONCHANGE FUNCTION ========== //
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleNextStep = () => {
		// VERIFY
		if (!formData.name) {
			toaster.create({
				title: `Name is required.`,
				type: "error",
			});
			return;
		}
		dispatch(onChangeFormCreateProject(formData));
		navigate("/project/stage");
	};

	// ========== COMPONENT RENDER ========== //
	return (
		<div className="w-full h-full">
			<div className="px-[16px] ">
				<div>
					<div className="mt-8 bg-[#ffffff] rounded-md">
						<StepHeader />
					</div>
					<div className="mt-8 bg-[#ffffff] rounded-md p-8">
						<div className="flex flex-col w-full gap-6">
							<InputCustom
								onChange={handleChange}
								value={formData.name}
								name="name"
								required
								label="Name"
								placeholder="Ex: Project Name"
							/>
							<TextAreaCustom
								onChange={handleChange}
								value={formData.description}
								name="description"
								type="areas"
								label="Description"
								placeholder="Ex: Project Description"
							/>

							<div className="flex justify-end">
								<button
									onClick={handleNextStep}
									height={50}
									className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold">
									CREATE PROJECT AND CONTINUE
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Details;
