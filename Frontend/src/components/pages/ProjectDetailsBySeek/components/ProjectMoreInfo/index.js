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
import { IconlyIndustry, IconlyInfoSquare, IconlyTickSquare, IconlyEarlyStage, IconlyFundingSource, IconlyParticipants, IconlyRevenue } from "components/UI/Iconly";
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
					<IconlyIndustry color={"#2F65B9"} />
					{projectDetails?.industries?.length} Main Industries
				</p>
				<p className="text-[#6F7F92] flex">
					<IconlyEarlyStage color={"#2F65B9"} />
					{projectDetails?.stage?.name}
				</p>
				<p className="text-[#6F7F92] flex">
					<IconlyFundingSource color={"#2F65B9"} />
					{projectDetails?.funding_sources?.length} Funding Sources
				</p>
				<p className="text-[#6F7F92] flex">
					<IconlyParticipants color={"#2F65B9"} />
					{/* 26 Participants in the Project */}
					{projectDetails?.members?.length} Participants in the Project
				</p>
<<<<<<< HEAD
				<p className="text-[#6F7F92] flex">
					<IconlyRevenue color={"#2F65B9"} />
					Revenue {projectDetails?.revenues?.slice(-1)[0].amount} (
					{projectDetails?.revenues?.slice(-1)[0].currency})
				</p>
=======
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
>>>>>>> 8648648e8866875da7fac14056d00b7c50c73078
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
