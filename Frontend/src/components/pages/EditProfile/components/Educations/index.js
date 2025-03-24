import { Button, CloseButton, Dialog, Portal, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../ProfileCard";
import ProfileEditMenu from "../ProfileEditMenu";
import ActionBar from "../ActionBar";
import InputCustom from "components/UI/InputCustom";
import { setIsOpenModalCreateOrUpdateEducation } from "states/modules/profile";
import moment from "moment";
import { IconlyEdit } from "components/UI/Iconly";
import { IconlyDelete } from "components/UI/Iconly";
import { createOrUpdateEducation } from "api/profile";

const Educations = () => {
	const dispatch = useDispatch();
	// ========== STATE FROM REDUX STORE ========== //
	const { educations } = useSelector((state) => state.profile.profile);
	const {
		isOpenModalCreateOrUpdateEducation,
		isLoadingCreateOrUpdateEducation,
	} = useSelector((state) => state.profile);
	// ========== STATE MANAGEMENT ========== //

	const [action, setAction] = useState("");
	const [formData, setFormData] = useState({});

	// ========== HANDLE CHANGE FUNCTION ========== //
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleAddCertification = () => {
		dispatch(setIsOpenModalCreateOrUpdateEducation(true));
		setAction("create");
		setFormData({
			school: "",
			degree: "",
			field_of_study: "",
			start_date: "",
			end_date: "",
			grade: "",
			activities: "",
		});
	};

	const handleUpdateEducation = (education) => {
		dispatch(setIsOpenModalCreateOrUpdateEducation(true));
		setAction("update");
		setFormData({
			...education,
			start_date: moment(education.start_date).format("YYYY-MM"),
			end_date: education.end_date
				? moment(education.end_date).format("YYYY-MM")
				: "",
		});
	};
	const hangdleDeleteEducation = () => {
		setAction("delete");
	};
	const handleSaveChanges = () => {
		if (formData.is_lifetime) {
			const { organization_id, expiration_date, ...rest } = formData;
			dispatch(
				createOrUpdateEducation(
					{
						...rest,
						expiration_date: null,
						organization_id:
							typeof organization_id === "object"
								? organization_id[0]
								: Array(organization_id)[0],
					},
					action
				)
			);
		} else {
			const { organization_id, ...rest } = formData;
			dispatch(
				createOrUpdateEducation(
					{
						...rest,
						organization_id:
							typeof organization_id === "object"
								? organization_id[0]
								: Array(organization_id)[0],
					},
					action
				)
			);
		}
	};

	const handleClose = () => {
		dispatch(setIsOpenModalCreateOrUpdateEducation(false));
	};

	// ========== COMPONENT RENDER ========== //
	return (
		<div className="flex gap-8 w-full py-8 px-[16px]">
			<ProfileEditMenu />
			<div className="w-8/12">
				<div className="bg-[#ffffff] p-8 rounded-md">
					{/* =========== Profile Card ========== */}
					<ProfileCard />
					{/* =========== Action Bar  ========== */}
					<ActionBar />
				</div>
				<div className="bg-[#ffffff] p-8 rounded-md mt-8">
					<div className="pb-[20px] mb-8 border-b-[1px] border-gray-200 flex justify-between">
						<div>
							<h4 className="">Educations</h4>
						</div>
						<Button
							onClick={handleAddCertification}
							height={50}
							className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
							borderRadius={4}
							loading={false}
							loadingText="Loading..."
							spinnerPlacement="start">
							Add Education
						</Button>
					</div>
					<div>
						<div className="px-[16px]">
							{educations?.map((education, index) => (
								<div key={index}>
									<div className=" shadow rounded-[0.6rem]">
										<div className="relative p-4 mt-[2rem]">
											<span className="cursor-pointer md:float-right 2xl:float-right">
												<IconlyDelete size={24} color={"#000"} />
											</span>
											<span
												className="cursor-pointer md:float-right 2xl:float-right"
												onClick={() =>
													handleUpdateEducation(education)
												}>
												<IconlyEdit size={24} color={"#000"} />
											</span>

											{education.school && (
												<h4 className="flex font-bold mb-[0.75rem]">
													{education.school}
												</h4>
											)}
											{education.start_date &&
												education.end_date && (
													<p className="relative text-[#9B9B9B] top-[-1rem] left-[-0.1rem] text-[1rem]">
														{`${moment(
															education.start_date
														).format("MMM YYYY")} ${
															education.end_date
																? `- ${moment(
																		education.end_date
																  ).format("MMM YYYY")}`
																: ""
														}`}
													</p>
												)}
											{education.field_of_study && (
												<p className="flex ">
													{" "}
													Field of study:{" "}
													{education.field_of_study}
												</p>
											)}
											{education.degree && (
												<p className="flex ">
													{" "}
													Degree: {education.degree}
												</p>
											)}
											{education.grade && (
												<p className="flex ">
													{" "}
													Grade: {education.grade}
												</p>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<Dialog.Root
				size={"lg"}
				open={isOpenModalCreateOrUpdateEducation}
				placement={"center"}
				motionPreset="slide-in-bottom">
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>
									{action === "create"
										? "Add education"
										: "Update education"}
								</Dialog.Title>
							</Dialog.Header>
							<Dialog.Body gap={6}>
								<Stack gap="6">
									<Stack direction="row">
										<InputCustom
											label="School"
											required
											placeholder="Ex: Harvard University"
											height="40px"
											name="school"
											onChange={handleChange}
											value={formData.school}
										/>
									</Stack>
									<Stack direction="row">
										<InputCustom
											label="Degree"
											required
											placeholder="Ex: Bachelor"
											height="40px"
											name="degree"
											onChange={handleChange}
											value={formData.degree}
										/>
										<InputCustom
											label="Field of Study"
											required
											placeholder="Ex: Computer Science"
											height="40px"
											name="field_of_study"
											onChange={handleChange}
											value={formData.field_of_study}
										/>
									</Stack>
									<Stack direction="row">
										<InputCustom
											type="month"
											label="Start Date"
											required
											height="40px"
											name="start_date"
											onChange={handleChange}
											value={formData.start_date}
										/>
										<InputCustom
											type="month"
											label="End Date"
											height="40px"
											name="end_date"
											onChange={handleChange}
											value={formData.end_date}
										/>
									</Stack>
									<Stack direction="row">
										<InputCustom
											label="Grade"
											placeholder="Ex: 3.5"
											height="40px"
											name="grade"
											onChange={handleChange}
											value={formData.grade}
										/>
									</Stack>
									<Stack direction="row">
										<InputCustom
											label="Activities"
											placeholder="Ex: Student Council"
											height="40px"
											name="activities"
											onChange={handleChange}
											value={formData.activities}
										/>
									</Stack>
								</Stack>
							</Dialog.Body>
							<Dialog.Footer>
								<Dialog.ActionTrigger asChild>
									<Button variant="outline" onClick={handleClose}>
										Cancel
									</Button>
								</Dialog.ActionTrigger>
								<Button
									onClick={handleSaveChanges}
									borderRadius={4}
									loading={isLoadingCreateOrUpdateEducation}
									loadingText="Loading..."
									spinnerPlacement="start">
									SAVE CHANGES
								</Button>
							</Dialog.Footer>
							<Dialog.CloseTrigger asChild>
								<CloseButton onClick={handleClose} size="sm" />
							</Dialog.CloseTrigger>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>
		</div>
	);
};

export default Educations;
