import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import store from "states/configureStore";
import { getFounderProfile } from "api/founder";
import FounderProfile from "components/common/FounderProfile";
import ProfileCard from "components/common/ProfileCard";
import LazyLoading from "components/UI/LazyLoading";

function About() {
	const authUser = useSelector((state) => state.auth.authUser);
	const founderProfile = useSelector((state) => state.founder.founderProfile);

	useEffect(() => {
		store.dispatch(getFounderProfile());
	}, []);

	return (
		<div className={styles.aboutContainer}>
			<LazyLoading>
				<ProfileCard
					background={authUser.background}
					avatar={authUser.avatar}
					name={authUser.name}
					city={authUser.city}
					region={authUser.region}
					language={authUser.language}
					linkedIn={authUser.linkedIn}
				/>
			</LazyLoading>
			<LazyLoading>
				<FounderProfile founderProfile={founderProfile} />
			</LazyLoading>
		</div>
	);
}

export default About;
