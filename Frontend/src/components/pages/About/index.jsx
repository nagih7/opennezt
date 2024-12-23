import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import store from "states/configureStore";
import { Modal } from "antd";
import { updateFounderProfile } from "api/founder";
import ProfileCard from "components/common/ProfileCard";
import FounderProfile from "components/common/FounderProfile";
import LazyLoading from "components/UI/LazyLoading";
import TalentProfileSkeleton from "components/skeleton/TalentProfileSkeleton";

const EditProfilePopup = React.lazy(() =>
	import("components/common/EditProfilePopup")
);

const About = () => {
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
		await store.dispatch(
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
		</div>
	);
};

export default About;
