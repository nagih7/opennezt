import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Modal } from "antd";
import { updateFounderProfile } from "api/founder";
// import ProfileCard from "components/common/ProfileCard";
// import FounderProfile from "components/common/FounderProfile";
// import LazyLoading from "components/UI/LazyLoading";
// import TalentProfileSkeleton from "components/skeleton/TalentProfileSkeleton";
import ProfileOverview from "./components/ProfileOverview";
import ProfileMenu from "./components/ProfileMenu";
import ProfessionalProfile from "./components/ProfessionalProfile";
import Friends from "./components/Friends";
import { Image } from "@chakra-ui/react";
import Timeline from "./components/Timeline"
import Groups from "./components/Groups";
import Messages from "./components/Messages";
import Badges from "./components/Badges";
import Courses from "./components/Courses";
const EditProfilePopup = React.lazy(() =>
	import("components/common/EditProfilePopup")
);

const About = () => {
	const dispatch = useDispatch();

	const [infoUpdateProfile, setInfoUpdateProfile] = useState({
		experience_level: null,
		industry: [],
		degree: null,
		certification: [],
		professional_summary: "",
		career_goals: "",
		offer: "",
		expectation: "",
		availability: null,
		areas_of_expertise: {
			accounting_and_finance: [],
			human_resource: [],
			international: [],
			law_and_legal: [],
			management: [],
			marketing: [],
			operations: [],
			sales: [],
			starting_up: [],
			sustainability: [],
			technology_and_internet: [],
		},
	});

	const { founderProfile, resultUpdateFounderProfile } = useSelector(
		(state) => state.founder
	);

	const { authUser } = useSelector((state) => state.auth);

	const [modalUpdateFounderProfile, setModalUpdateFounderProfile] =
		useState(false);
	const [updatedFounderProfile, setUpdatedFounderProfile] = useState(false);

	useEffect(() => {
		if (resultUpdateFounderProfile) {
			setModalUpdateFounderProfile(false);
		}
	}, [resultUpdateFounderProfile]);

	const handleOpenModal = () => {
		setModalUpdateFounderProfile(true);
		if (founderProfile && !updatedFounderProfile) {
			setInfoUpdateProfile(founderProfile);
			setUpdatedFounderProfile(true);
		}
	};

	const handleClosePopup = () => {
		setModalUpdateFounderProfile(false);
	};

	const onChange = (event, nameSelect) => {
		if (nameSelect && nameSelect.ExpertiseTarget) {
			setInfoUpdateProfile((prevState) => ({
				...prevState,
				areas_of_expertise: {
					...prevState.areas_of_expertise,
					[nameSelect.ExpertiseTarget]: event,
				},
			}));
		} else if (nameSelect) {
			setInfoUpdateProfile((prevState) => ({
				...prevState,
				[nameSelect]: event,
			}));
		} else {
			const { name, value } = event.target;
			setInfoUpdateProfile((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	const handleUpdateProfile = async () => {
		dispatch(
			updateFounderProfile(
				infoUpdateProfile,
				updatedFounderProfile ? "put" : "post"
			)
		);
	};
	const [changeTab, setChangeTab] = useState("About")
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
				{/* =================  */}
				<ProfileMenu changeTab={changeTab} setChangeTab={setChangeTab} />
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

			</div>
		</div>
	);
};

export default About;
