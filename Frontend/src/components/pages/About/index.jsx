import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileMenu from "./components/ProfileMenu";
import ProfessionalProfile from "./components/ProfessionalProfile";
import Friends from "./components/Friends";
import { Image } from "@chakra-ui/react";
<<<<<<< HEAD
import Timeline from "./components/Timeline"
import Groups from "./components/Groups";
import Messages from "./components/Messages";
import Badges from "./components/Badges";
import Courses from "./components/Courses";
const EditProfilePopup = React.lazy(() =>
	import("components/common/EditProfilePopup")
);
=======
import ProfileOverview from "./components/ProfileOverview";
>>>>>>> 8648648e8866875da7fac14056d00b7c50c73078

const About = () => {
	const { authUser } = useSelector((state) => state.auth);

	const [changeTab, setChangeTab] = useState("About");
	return (
		<div className="relative bg-[#ffffff] w-full max-h-full mb-8">
			<Image
				className="h-[400px] object-cover"
				src={
					authUser?.background ||
					"https://wallpapercave.com/uwp/uwp4261619.png"
				}
				onError={(e) => {
					e.target.onerror = null;
					e.target.src = "https://wallpapercave.com/uwp/uwp4261619.png";
				}}
				alt="Naruto vs Sasuke"
				aspectRatio={16 / 9}
				width="100%"
			/>
			<div className="absolute w-full top-[275px] px-[16px]">
				<ProfileOverview />
				<ProfileMenu changeTab={changeTab} setChangeTab={setChangeTab} />
<<<<<<< HEAD
				{/* =================  */}
				{changeTab == "About" && (
					<ProfessionalProfile />
				)}
				{changeTab == "Friends" && (
					<Friends />
				)}
				{changeTab == "Timeline" && (
					<Timeline />
				)}
				{changeTab == "Groups" && (
					<Groups />
				)}
				{changeTab == "Messages" && (
					<Messages />
				)}
				{changeTab == "Badges" && (
					<Badges />
				)}
				{changeTab == "Courses" && (
					<Courses />
				)}

=======
				{changeTab == "About" && <ProfessionalProfile />}
				{changeTab == "Friends" && <Friends />}
>>>>>>> 8648648e8866875da7fac14056d00b7c50c73078
			</div>
		</div>
	);
};

export default About;
