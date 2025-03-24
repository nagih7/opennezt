import {
	Alert,
	Blockquote,
	Button,
	CloseButton,
	Dialog,
	Image,
	Portal,
	Stack,
} from "@chakra-ui/react";
import { applyToJoinProject } from "api/project";
import { getProjectRoleFramework } from "api/user";
import { IconlyInfoSquare, IconlyTickSquare } from "components/UI/Iconly";
import SelectCustom from "components/UI/SelectCustom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalConfirmApply } from "states/modules/project";

const ProjectMoreInfo = () => {
	const dispatch = useDispatch();
	// ========== STATE FROM REDUX STORE ========== //
	const {
		projectDetails,
		isOpenModalConfirmApply,
		isLoadingGetProjectDetails,
	} = useSelector((state) => state.project);
	const { projectRoleFramework, projectTeamRoleFramework } = useSelector(
		(state) => state.user
	);

	// ========== STATE ========== //
	const [formRequest, setFormRequest] = useState({
		teamRole: "",
		role: "",
	});

	// ========== HANDLE FUNCTION ========== //
	const handleOpenModalConfirmApply = () => {
		dispatch(getProjectRoleFramework());
		dispatch(setOpenModalConfirmApply(true));
	};

	const handleCloseModalConfirmApply = () => {
		dispatch(setOpenModalConfirmApply(false));
	};

	const handleConfirmApply = () => {
		dispatch(applyToJoinProject(projectDetails._id, formRequest));
	};

	const handleChangeFormRequest = (e, name) => {
		setFormRequest((prev) => ({
			...prev,
			[name]: e.value[0],
		}));
	};

	// ========== RENDER ========== //
	return (
		<div className="bg-white relative left-[-5.5rem] top-[-14.75rem] h-[41.5rem] 2xl:w-[24rem]">
			<Image
				src={projectDetails?.background}
				alt={projectDetails?.name}
				onError={(e) => {
					e.target.src = "https://wallpapercave.com/uwp/uwp4261619.png";
				}}
				aspectRatio={5 / 3}
				width="100%"
			/>
			<div className="bg-[#EAEFF8] h-[7.5rem]">
				{projectDetails?.applied ? (
					<p className="bg-[#E3F5F1] flex relative top-[1.75rem] p-6 w-[21rem] right-[-1.5rem] border-l-[3px] border-[#00C792] text-[#00C792] items-center gap-1">
						<IconlyTickSquare size={20} color={"#00C792"} />
						Applied
					</p>
				) : (
					<p className="bg-[#ffffff] flex relative top-[1.75rem] p-6 w-[21rem] right-[-1.5rem] border-l-[3px] border-[#ffe41b] text-[#ffe41b] items-center gap-1">
						<IconlyInfoSquare size={20} color={"#ffe41b"} />
						Not Applied
					</p>
				)}
			</div>
			<div className="p-[2rem]">
				<h4 className="font-bold">The Project Includes:</h4>
				<p className="mt-7 text-[#6F7F92] flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="mr-3 text-[#2F65B9]"
						fill="currentColor"
						version="1.1"
						id="mdi-book-open-page-variant-outline"
						width="24"
						height="24"
						viewBox="0 0 24 24">
						<path d="M19 1L14 6V17L19 12.5V1M21 5V18.5C19.9 18.15 18.7 18 17.5 18C15.8 18 13.35 18.65 12 19.5V6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20 6.5 20C8.45 20 10.55 20.4 12 21.5C13.35 20.65 15.8 20 17.5 20C19.15 20 20.85 20.3 22.25 21.05C22.35 21.1 22.4 21.1 22.5 21.1C22.75 21.1 23 20.85 23 20.6V6C22.4 5.55 21.75 5.25 21 5M10 18.41C8.75 18.09 7.5 18 6.5 18C5.44 18 4.18 18.19 3 18.5V7.13C3.91 6.73 5.14 6.5 6.5 6.5C7.86 6.5 9.09 6.73 10 7.13V18.41Z" />
					</svg>
					{projectDetails?.industries?.length} Main Industries
				</p>
				<p className="text-[#6F7F92] flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="mr-3 text-[#2F65B9]"
						fill="currentColor"
						width="24"
						height="24"
						viewBox="0 0 576 512">
						<path d="M519.442 288.651c-41.519 0-59.5 31.593-82.058 31.593C377.409 320.244 432 144 432 144s-196.288 80-196.288-3.297c0-35.827 36.288-46.25 36.288-85.985C272 19.216 243.885 0 210.539 0c-34.654 0-66.366 18.891-66.366 56.346 0 41.364 31.711 59.277 31.711 81.75C175.885 207.719 0 166.758 0 166.758v333.237s178.635 41.047 178.635-28.662c0-22.473-40-40.107-40-81.471 0-37.456 29.25-56.346 63.577-56.346 33.673 0 61.788 19.216 61.788 54.717 0 39.735-36.288 50.158-36.288 85.985 0 60.803 129.675 25.73 181.23 25.73 0 0-34.725-120.101 25.827-120.101 35.962 0 46.423 36.152 86.308 36.152C556.712 416 576 387.99 576 354.443c0-34.199-18.962-65.792-56.558-65.792z" />
					</svg>
					{projectDetails?.stage?.name}
				</p>
				<p className="text-[#6F7F92] flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="mr-3 text-[#2F65B9] bi bi-calendar-week-fill"
						viewBox="0 0 16 16">
						{" "}
						<path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM9.5 7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm3 0h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zM2 10.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
					</svg>
					{projectDetails?.funding_sources?.length} Funding Sources
				</p>
				<p className="text-[#6F7F92] flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="mr-3 text-[#2F65B9]"
						fill="currentColor"
						width="24"
						height="24"
						viewBox="0 0 448 512">
						<path d="M319.4 320.6L224 416l-95.4-95.4C57.1 323.7 0 382.2 0 454.4v9.6c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-9.6c0-72.2-57.1-130.7-128.6-133.8zM13.6 79.8l6.4 1.5v58.4c-7 4.2-12 11.5-12 20.3 0 8.4 4.6 15.4 11.1 19.7L3.5 242c-1.7 6.9 2.1 14 7.6 14h41.8c5.5 0 9.3-7.1 7.6-14l-15.6-62.3C51.4 175.4 56 168.4 56 160c0-8.8-5-16.1-12-20.3V87.1l66 15.9c-8.6 17.2-14 36.4-14 57 0 70.7 57.3 128 128 128s128-57.3 128-128c0-20.6-5.3-39.8-14-57l96.3-23.2c18.2-4.4 18.2-27.1 0-31.5l-190.4-46c-13-3.1-26.7-3.1-39.7 0L13.6 48.2c-18.1 4.4-18.1 27.2 0 31.6z" />
					</svg>
					{/* 26 Participants in the Project */}
					{projectDetails?.members?.length} Participants in the Project
				</p>
				{projectDetails?.revenues?.length > 0 && (
					<p className="text-[#6F7F92] flex">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							className="mr-3 text-[#2F65B9]"
							height="24"
							viewBox="0 0 24 24"
							width="24">
							<path d="M0 0h24v24H0z" fill="none" />
							<path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
						</svg>
						Revenue {projectDetails?.revenues?.slice(-1)[0]?.amount} (
						{projectDetails?.revenues?.slice(-1)[0]?.currency})
					</p>
				)}
			</div>
			{projectDetails &&
				projectDetails?.applied === false &&
				isLoadingGetProjectDetails === false && (
					<Button
						className="px-4 py-2 mt-4 text-white rounded-sm"
						// loading={isLoadingSeekProjects}
						onClick={handleOpenModalConfirmApply}
						width={"100%"}
						height={"3rem"}
						borderRadius={4}
						loadingText="Loading..."
						spinnerPlacement="start">
						Apply
					</Button>
				)}
			<Dialog.Root
				size={"lg"}
				open={isOpenModalConfirmApply}
				placement={"center"}
				onClose={handleCloseModalConfirmApply}
				motionPreset="slide-in-bottom">
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>Confirm</Dialog.Title>
							</Dialog.Header>
							<Dialog.Body>
								<Stack>
									<Alert.Root status="info">
										<Alert.Indicator />
										<Alert.Title>
											Would you like to request to join this project?
										</Alert.Title>
									</Alert.Root>
									<Stack
										spacing={4}
										className="flex flex-col gap-4 my-4">
										<SelectCustom
											height="40px"
											label="Team Role"
											required
											collection={projectTeamRoleFramework}
											onChange={(e) =>
												handleChangeFormRequest(e, "teamRole")
											}
											value={formRequest.teamRole}
										/>
										<SelectCustom
											height="40px"
											label="Role"
											required
											collection={projectRoleFramework}
											onChange={(e) =>
												handleChangeFormRequest(e, "role")
											}
											value={formRequest.role}
										/>
									</Stack>

									<Blockquote.Root
										colorPalette="yellow"
										style={{
											borderInlineStartWidth: "4px",
											borderInlineStartColor: "#fef08a",
										}}>
										<Blockquote.Content cite="OpenNezt">
											If you would like to request to participate in
											this project, please let me know what position
											you would like to participate in.
										</Blockquote.Content>
										<Blockquote.Caption>
											— <cite>OpenNezt</cite>
										</Blockquote.Caption>
									</Blockquote.Root>
								</Stack>
							</Dialog.Body>
							<Dialog.Footer>
								<Dialog.ActionTrigger asChild>
									<Button
										variant="outline"
										onClick={handleCloseModalConfirmApply}>
										Cancel
									</Button>
								</Dialog.ActionTrigger>
								<Button
									onClick={handleConfirmApply}
									borderRadius={4}
									// loading={
									// 	isLoadingCreateOrUpdateProfileAdditionalInfo
									// }
									loadingText="Loading..."
									spinnerPlacement="start">
									CONFIRM
								</Button>
							</Dialog.Footer>
							<Dialog.CloseTrigger asChild>
								<CloseButton
									size="sm"
									onClick={handleCloseModalConfirmApply}
								/>
							</Dialog.CloseTrigger>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>
		</div>
	);
};

export default ProjectMoreInfo;
