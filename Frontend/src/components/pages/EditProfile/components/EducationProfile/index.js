import { Button, HStack, Stack } from "@chakra-ui/react";
import { createOrUpdateEducation } from "api/profile";
import {
	DialogActionTrigger,
	DialogBody,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogRoot,
	DialogTitle,
} from "components/UI/dialog";
import InputCustom from "components/UI/InputCustom";
import { debounce } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenModalCreateOrUpdateEducation } from "states/modules/profile";

const EducationProfile = () => {
	const dispatch = useDispatch();

	// ========== STATE FROM REDUX STORE ========== //
	const {
		isOpenModalCreateOrUpdateEducation,
		isLoadingCreateOrUpdateEducation,
	} = useSelector((state) => state.profile);

	// ========== STATE MANAGEMENT ========== //
	const [action, setAction] = useState("");
	const [formData, setFormData] = useState({
		school: "",
		degree: "",
		field_of_study: "",
		start_date: "",
		end_date: "",
		grade: "",
	});

	// ========== LOGIC ========== //
	const handleAddEducation = () => {
		dispatch(setIsOpenModalCreateOrUpdateEducation(true));
		setAction("create");
		setFormData({
			school: "",
			degree: "",
			field_of_study: "",
			start_date: "",
			end_date: "",
			grade: "",
		});
	};

	const onChange = debounce((event, nameSelect) => {
		setFormData({
			...formData,
			[nameSelect]: event.target.value,
		});
	}, 300);

	const handleConfirm = () => {
		dispatch(createOrUpdateEducation(formData, action));
	};

	// ========== COMPONENT RENDER ========== //
	return (
		<>
			<Button
				onClick={handleAddEducation}
				height={50}
				className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
				borderRadius={4}
				loading={false}
				loadingText="Loading..."
				spinnerPlacement="start">
				Add Education
			</Button>

			<DialogRoot
				size={"lg"}
				placement={"center"}
				open={isOpenModalCreateOrUpdateEducation}
				onOpenChange={(e) =>
					dispatch(setIsOpenModalCreateOrUpdateEducation(e.open))
				}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add Education</DialogTitle>
					</DialogHeader>
					<DialogBody pb="4">
						<Stack gap="6">
							<InputCustom
								onChange={(event) => onChange(event, "school")}
								label="School"
								required
								placeholder="Ex: Boston University"
								height="40px"
							/>
							<InputCustom
								onChange={(event) => onChange(event, "degree")}
								label="Degree"
								required
								placeholder="Ex: Bachelor's"
								height="40px"
							/>
							<InputCustom
								onChange={(event) => onChange(event, "field_of_study")}
								label="Field of Study"
								required
								placeholder="Ex: Business"
								height="40px"
							/>
							<HStack gap="2">
								<InputCustom
									type="month"
									onChange={(event) => onChange(event, "start_date")}
									label="Start Date"
									placeholder="Month"
									height="40px"
								/>
								<InputCustom
									type="month"
									onChange={(event) => onChange(event, "end_date")}
									label="End Date"
									placeholder="Year"
									height="40px"
								/>
							</HStack>
							<InputCustom
								onChange={(event) => onChange(event, "grade")}
								label="Greade"
								height="40px"
							/>
							<InputCustom
								onChange={(event) => onChange(event, "activities")}
								label="Activities"
								placeholder="Ex: Volleyball, Football"
								height="40px"
							/>
						</Stack>
					</DialogBody>
					<DialogFooter>
						<DialogActionTrigger asChild>
							<Button variant="outline">Cancel</Button>
						</DialogActionTrigger>
						<Button
							loadingText="Saving..."
							loading={isLoadingCreateOrUpdateEducation}
							onClick={handleConfirm}
							spinnerPlacement="start">
							Save
						</Button>
					</DialogFooter>
				</DialogContent>
			</DialogRoot>
		</>
	);
};

export default EducationProfile;
