import { Avatar, Button } from "@chakra-ui/react";
import { sendFriendRequest } from "api/user";
import {
	IconlyAddUser,
	IconlyBookmark,
	IconlyLocation,
	IconlyShieldDone,
} from "components/UI/Iconly";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfileOverview = ({ user, isFriendRequested }) => {
	const dispatch = useDispatch();

	// ========== STATE FROM REDUX ========== //
	const { isLoadingSendFriendRequest } = useSelector((state) => state.user);

	// ========== HANDLE FUNCTION ========== //
	const handleSendFriendRequest = () => {
		dispatch(sendFriendRequest(user._id));
	};

	return (
		<div className="p-8 bg-[#ffffff] rounded-md">
			<div className="flex items-center w-full">
				<div className="w-4/12">
					<ul className="flex flex-wrap items-center justify-center gap-5 p-0 m-0">
						<li className="flex flex-col items-center  after:border-l-2 after:border-[#e0e6ec]">
							<h5>0</h5>
							Posts
						</li>
						<li>
							<h5>0</h5>
							Posts
						</li>
						<li>
							<h5>0</h5>
							Posts
						</li>
					</ul>
				</div>
				<div className="flex flex-col items-center w-4/12">
					<div className="relative flex flex-col items-center bg-[#ffffff] mb-10 p-1 rounded-md">
						<div className="absolute top-[-137px]">
							<Avatar.Root
								shape="rounded"
								width="150px"
								className=" bg-[#ffffff] p-1 object-cover max-w-[150px] h-[150px] rounded-md">
								<Avatar.Fallback name={user?.name} />
								<Avatar.Image src={user?.avatar} />
							</Avatar.Root>
						</div>
						{/* <Badge
							className="absolute top-[-2px] z-50 rounded-md flex justify-center items-center w-[68px] h-[22px]"
							colorPalette="green">
							Online
						</Badge> */}
					</div>
					<h5 className="text-[#000000] font-bold text-lg flex gap-1 items-center">
						{user?.name}
						<IconlyShieldDone
							size={24}
							color="#3897f0"
							className="text-[#3897f0] mx-[6px]"
						/>
					</h5>
					<div className="flex items-center mt-[8px] gap-4">
						{user?.region && (
							<div className="flex items-center gap-1 text-[#6f7f92] font-medium">
								<IconlyLocation size={15} color={"#000000"} />
								<span className="text-sm">{user?.region}</span>
							</div>
						)}
						{user?.linkedin && (
							<div className="flex items-center gap-1 text-[#6f7f92] font-medium">
								<IconlyBookmark size={15} color={"#000000"} />
								<span className="text-sm">
									<a
										href={user?.linkedin}
										target="_blank"
										rel="noreferrer"
										className="no-underline text-[#6f7f92]">
										{user?.linkedin}
									</a>
								</span>
							</div>
						)}
					</div>
					<div className="mt-[16px]"></div>
				</div>
				<div className="w-4/12">
					<ul className="flex flex-wrap items-center justify-center gap-5 p-0 m-0">
						<li className="flex flex-col items-center  after:border-l-2 after:border-[#e0e6ec]">
							{isFriendRequested ? (
								<>Requested</>
							) : (
								<Button
									onClick={handleSendFriendRequest}
									loading={isLoadingSendFriendRequest}
									loadingText="Sending..."
									spinnerPlacement="start"
									variant="solid">
									<IconlyAddUser size={24} color={"#fff"} />
									Add friend
								</Button>
							)}
						</li>
						<li>
							<h5>0</h5>
							Posts
						</li>
						<li>
							<h5>0</h5>
							Posts
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ProfileOverview;
