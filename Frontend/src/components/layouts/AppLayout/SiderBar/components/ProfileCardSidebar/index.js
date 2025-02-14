import React from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import AvatarDefault from "../../../../../../assets/images/default/AvatarDefault.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileCardSidebar = () => {
	const navigate = useNavigate();
	const { authUser } = useSelector((state) => state.auth);
	console.log("authUser", authUser);

	return (
		<div
			style={{ cursor: "pointer" }}
			className="flex items-center gap-3 pb-4 mb-6 border-b-[1px] border-gray-200"
			onClick={() => navigate("/about")}>
			<img
				src={authUser.avatar || AvatarDefault}
				className="w-[50px] h-[50px] rounded-full"
			/>
			<div>
				<div
					href="#"
					className="flex items-center gap-2 text-black no-underline">
					<span className="font-semibold text-nowrap">
						{authUser.name}
					</span>
					<CheckCircleFilled className="text-blue-500" />
				</div>
				<span className="text-xs text-gray-500">@{authUser.email}</span>
			</div>
		</div>
	);
};

export default ProfileCardSidebar;
