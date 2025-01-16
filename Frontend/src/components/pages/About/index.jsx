import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import { updateFounderProfile } from "api/founder";
import ProfileCard from "components/common/ProfileCard";
import FounderProfile from "components/common/FounderProfile";
import LazyLoading from "components/UI/LazyLoading";
import TalentProfileSkeleton from "components/skeleton/TalentProfileSkeleton";
import BoxProject from "../Project/BoxProject";
import { setOpenModalMatchingProjects } from "states/modules/artificialIntelligence";

const EditProfilePopup = React.lazy(() =>
	import("components/common/EditProfilePopup")
);

const About = () => {
	const dispatch = useDispatch();

	const { projects, openModalMatchingProjects, loadingMatchingProjects } =
		useSelector((state) => state.artificialIntelligence);

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
	const {
		founderProfile,
		resultUpdateFounderProfile,
		loadingGetFounderProfile,
	} = useSelector((state) => state.founder);

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

	return (
		<div className={styles.aboutContainer}>
			<ProfileCard handleOpenModal={handleOpenModal} />
			{loadingGetFounderProfile ? (
				<TalentProfileSkeleton />
			) : (
				founderProfile && <FounderProfile founderProfile={founderProfile} />
			)}
			<Modal
				title=""
				okText="Save"
				open={modalUpdateFounderProfile}
				onOk={handleUpdateProfile}
				confirmLoading={false}
				onCancel={handleClosePopup}
				width={1000}>
				<LazyLoading>
					<EditProfilePopup
						formData={infoUpdateProfile}
						onChange={onChange}
					/>
				</LazyLoading>
			</Modal>
			<Modal
				open={openModalMatchingProjects}
				footer={null}
				width={1200}
				onCancel={() => dispatch(setOpenModalMatchingProjects(false))}>
				<div className={styles.matchingProjectsWrap}>
					{projects.length > 0 &&
						projects.map((datum, index) => (
							<BoxProject
								key={index}
								project={datum._doc}
								matchScore={datum.matchScore}
							/>
						))}
				</div>
			</Modal>
		</div>
	);
};

export default About;
