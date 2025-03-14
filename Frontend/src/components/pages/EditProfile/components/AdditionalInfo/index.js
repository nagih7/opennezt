import { Button, CloseButton, Dialog, Portal, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../ProfileCard";
import ProfileEditMenu from "../ProfileEditMenu";
import ActionBar from "../ActionBar";
import InputCustom from "components/UI/InputCustom";
import moment from "moment";
import { IconlyEdit } from "components/UI/Iconly";
import { createOrUpdateEducation } from "api/profile";
import { setIsOpenModalCreateOrUpdateEducation } from "states/modules/profile";

const AdditionalInfo = () => {
	const dispatch = useDispatch();
	// // ========== STATE FROM REDUX STORE ========== //
	const { addtiadditional_infosonal } = useSelector(
		(state) => state.profile.profile
	);
	const {
		isOpenModalCreateOrUpdateEducation,
		isLoadingCreateOrUpdateEducation,
	} = useSelector((state) => state.profile);
	// // ========== STATE MANAGEMENT ========== //
	const [action, setAction] = useState("");
	const [formData, setFormData] = useState({
		name: "",
		content: "",
	});
	// ========== HANDLE CHANGE FUNCTION ========== //
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

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
			activities: "",
			description: "",
		});
	};

	const handleUpdateEducation = (education) => {
		dispatch(setIsOpenModalCreateOrUpdateEducation(true));
		setAction("update");
		setFormData({
			...education,
			start_date: moment(education.start_date).format("YYYY-MM"),
			end_date: moment(education.end_date).format("YYYY-MM"),
		});
	};

	const handleSaveChanges = () => {
		dispatch(createOrUpdateEducation(formData, action));
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
							<h4 className="">More</h4>
						</div>
						<Button
							disabled={isLoadingCreateOrUpdateEducation}
							onClick={handleAddEducation}
							height={50}
							className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
							borderRadius={4}
							loading={false}
							loadingText="Loading..."
							spinnerPlacement="start">
							Add Additional Info
						</Button>
					</div>
					<div>
						<div>
							{addtiadditional_infosonal?.map((info, index) => (
								<div key={index}>
									<div className="bg-[#F4F2EE] rounded-[0.6rem]">
										<div className="relative p-4 ">
											<span
												className="cursor-pointer absolute left-[56.25rem]"
												onClick={() => handleUpdateEducation(info)}>
												<IconlyEdit size={24} color={"#000"} />
											</span>
											<h4 className="flex font-bold">
												{info?.name}
											</h4>
											{info?.content && (
												<p className="flex "> {info?.content}</p>
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
				key={formData.profile_id}
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
							<Dialog.Body>
								<Stack direction="row" h="20">
									<InputCustom
										label="Name"
										required
										placeholder="Ex: What I can offer"
										height="40px"
										name="name"
										onChange={handleChange}
										value={formData.name}
									/>
								</Stack>
								<Stack direction="row" h="20">
									<InputCustom
										label="Content"
										placeholder="Ex: I can offer you a lot of things"
										height="40px"
										name="content"
										onChange={handleChange}
										value={formData.content}
									/>
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

export default AdditionalInfo;
