import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import StepHeader from "../StepHeader";
import { IconlyDelete } from "components/UI/Iconly";
import { useDispatch, useSelector } from "react-redux";
import { onChangeFormCreateProject } from "states/modules/project";
import InputCustom from "components/UI/InputCustom";
import { createListCollection } from "@chakra-ui/react";
import { CURRENCY } from "utils/constants";
import SelectCustom from "components/UI/SelectCustom";
import { toaster } from "components/UI/toaster";
const currencyFramework = createListCollection({
	items: CURRENCY["EN"],
});

const Revenue = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// ========== STATE FROM REDUX ========== //
	const { formCreateProject } = useSelector((state) => state.project);

	// ========== STATE ========== //
	const [formData, setFormData] = useState([
		{ date: "", amount: "", currency: "" },
	]);
	// ========== USEEFFECT ========== //
	useEffect(() => {
		if (formCreateProject.name === "") {
			navigate("/project/details");
		}
		// ========== CLEANUP FUNCTION ========== //
	}, [navigate, formCreateProject.name]);

	useEffect(() => {
		setFormData(formCreateProject.revenues);
	}, [formCreateProject]);

	// ========== ONCHANGE FUNCTION ========== //
	const handleChange = (e, index, nameSelect) => {
		if (nameSelect) {
			const newForm = formData.map((item, i) => {
				if (i === index) {
					return { ...item, [nameSelect]: e.value };
				}
				return item;
			});
			setFormData(newForm);
		} else {
			const { name, value } = e.target;
			const newForm = formData.map((item, i) => {
				if (i === index) {
					return { ...item, [name]: value };
				}
				return item;
			});
			setFormData(newForm);
		}
	};

	const handlePreviousStep = () => {
		dispatch(onChangeFormCreateProject({ revenues: formData }));
		navigate("/project/stage");
	};

	const handleNextStep = async () => {
		dispatch(onChangeFormCreateProject({ revenues: formData }));
		navigate("/project/funding-sources");
	};

	const handleAddRevenue = () => {
		// VERIFY
		if (
			formData.some((item) => !item.date || !item.amount || !item.currency)
		) {
			toaster.create({
				title: `Please fill all fields.`,
				type: "error",
			});
			return;
		}
		setFormData([...formData, { date: "", amount: "", currency: "" }]);
	};

	const handleRemoveForm = (index) => {
		const newForm = formData.filter((_, i) => i !== index);
		setFormData(newForm);
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
						<div className="flex flex-col w-full">
							<div className="flex justify-end">
								<div
									className="flex items-center gap-1 cursor-pointer bg-[#2f65b9] rounded-md text-[#ffffff] px-[20px] py-2 mb-[14px]"
									onClick={handleAddRevenue}>
									<PlusOutlined className="text-[#ffffff]" />
									<button
										height={50}
										className="text-xs bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold">
										ADD REVENUE
									</button>
								</div>
							</div>
							{formData?.map((_, index) => (
								<div
									key={index}
									className="relative flex flex-col gap-6 mb-12 rounded-md ">
									<div className="flex flex-col gap-12">
										<InputCustom
											type="month"
											onChange={(e) => handleChange(e, index)}
											value={formData[index].date}
											name="date"
											required
											label="Date"
											placeholder="Ex: 01/2025"
										/>
										<InputCustom
											type="number"
											onChange={(e) => handleChange(e, index)}
											value={formData[index].amount}
											name="amount"
											required
											label="Amount"
											placeholder="Ex: 1000"
										/>
										<SelectCustom
											onChange={(e) =>
												handleChange(e, index, "currency")
											}
											value={formData[index].currency}
											name="currency"
											required
											label="Currency"
											placeholder="Select Currency"
											collection={currencyFramework}
										/>
									</div>
									{formData.length > 1 && (
										<div className="flex justify-end">
											<span
												onClick={() => handleRemoveForm(index)}
												className="cursor-pointer">
												<IconlyDelete size={24} color={"#000"} />
											</span>
										</div>
									)}
								</div>
							))}
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

export default Revenue;
