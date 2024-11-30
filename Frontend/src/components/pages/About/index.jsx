import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import store from "states/configureStore";
import { getFounderProfile } from "api/founder";
import FounderProfile from "components/common/FounderProfile";
import ProfileCard from "components/common/ProfileCard";

function About() {
	const authUser = useSelector((state) => state.auth.authUser);
	const founderProfile = useSelector((state) => state.founder.founderProfile);

	useEffect(() => {
		store.dispatch(getFounderProfile());
	}, []);

	return (
		<div className={styles.aboutContainer}>
			{authUser && <ProfileCard authUser={authUser} />}
			{founderProfile && <FounderProfile founderProfile={founderProfile} />}
		</div>
	);
}

export default About;
