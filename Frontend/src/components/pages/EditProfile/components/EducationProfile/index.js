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
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setIsOpenModalCreateOrUpdateEducation,
	setFormDataEducation,
} from "states/modules/profile";

const EducationProfile = () => {
	const dispatch = useDispatch();

	// ========== STATE FROM REDUX STORE ========== //
	const {
		isOpenModalCreateOrUpdateEducation,
		isLoadingCreateOrUpdateEducation,
		formDataEducation,
	} = useSelector((state) => state.profile);

	// ========== STATE MANAGEMENT ========== //
	const [action, setAction] = useState("");

	// ========== LOGIC ========== //
	const handleAddEducation = () => {
		setAction("create");
		dispatch(setIsOpenModalCreateOrUpdateEducation(true));
	};

	const onChange = (event, nameSelect) => {
		dispatch(
			setFormDataEducation({
				...formDataEducation,
				[nameSelect]: event.target.value,
			})
		);
	};

	const handleConfirm = () => {
		dispatch(createOrUpdateEducation(formDataEducation, action));
	};

	// ========== COMPONENT RENDER ========== //
	return (
		<>
			<div className="px-[16px]">
				<div className="relative mb-8">
					<InputCustom label="Educations" />
					<p className="mt-[11px] mb-0 flex justify-end">
						<button className="bg-[#f07a3a] text-xs font-medium py-1 px-[6px] text-[#ffffff] rounded-sm">
							CHANGE
						</button>
					</p>
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
				</div>
			</div>
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
								value={formDataEducation.school}
								label="School"
								required
								placeholder="Ex: Boston University"
								height="40px"
							/>
							<InputCustom
								onChange={(event) => onChange(event, "degree")}
								value={formDataEducation.degree}
								label="Degree"
								required
								placeholder="Ex: Bachelor's"
								height="40px"
							/>
							<InputCustom
								onChange={(event) => onChange(event, "field_of_study")}
								value={formDataEducation.field_of_study}
								label="Field of Study"
								required
								placeholder="Ex: Business"
								height="40px"
							/>
							<HStack gap="2">
								<InputCustom
									type="month"
									onChange={(event) => onChange(event, "start_date")}
									value={formDataEducation.start_date}
									label="Start Date"
									placeholder="Month"
									height="40px"
								/>
								<InputCustom
									type="month"
									onChange={(event) => onChange(event, "end_date")}
									value={formDataEducation.end_date}
									label="End Date"
									placeholder="Year"
									height="40px"
								/>
							</HStack>
							<InputCustom
								onChange={(event) => onChange(event, "grade")}
								value={formDataEducation.grade}
								label="Greade"
								height="40px"
							/>
							<InputCustom
								onChange={(event) => onChange(event, "activities")}
								value={formDataEducation.activities}
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
