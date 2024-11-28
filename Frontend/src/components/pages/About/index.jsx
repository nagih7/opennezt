import React, { useEffect, useState } from "react";
import AppLayout from "components/layouts/AppLayout";
import styles from "./styles.module.scss";
import verify from "../../../assets/images/icon/verify.png";
import { useSelector } from "react-redux";
import store from "states/configureStore";
import { getFounderProfile } from "api/founder";

function About() {
	const authUser = useSelector((state) => state.auth.authUser);
	const founderProfile = useSelector((state) => state.founder.founderProfile);

	useEffect(() => {
		store.dispatch(getFounderProfile());
	}, []);

	return (
		<AppLayout>
			<div className={styles.aboutContainer}>
				<div className={styles.bannerContainer}>
					<div className={styles.banner}>
						<div className={styles.background}>
							{authUser.background ? (
								<img src={authUser.background} alt="User Background" />
							) : (
								<img
									src="https://www.solidbackgrounds.com/images/1920x1080/1920x1080-gray-solid-color-background.jpg"
									alt="User Background"
								/>
							)}
						</div>
					</div>
					<div className={styles.avatar}>
						{authUser.avatar ? (
							<img src={authUser.avatar}></img>
						) : (
							<img src="https://scontent.fhan5-2.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeFwjzt3TLwRlu7A9A-KfDx0Wt9TLzuBU1Ba31MvO4FTUJ3aTrvrVcopb2NyVQPTTf6BthcdOye-NFjZTDew3OW4&_nc_ohc=DXnAdsnLWisQ7kNvgEJlRtG&_nc_zt=24&_nc_ht=scontent.fhan5-2.fna&_nc_gid=AbNmUcQBb3oSbY8ZuoFoTMp&oh=00_AYD0S418FAm6QCijZBx8fRizD-ohHGG1nhDVdX1fNCUjlw&oe=676EA37A" />
						)}
					</div>
					<div className={styles.userInfo}>
						<h1>
							{authUser.name}
							<img
								src={verify}
								alt="Verify"
								className={styles.verifyIcon}
							/>
						</h1>
						<p>
							{authUser.city}, {authUser.region}
						</p>
						<p>{authUser.language}</p>
						<a
							href={authUser.linkedIn}
							target="_blank"
							rel="noopener noreferrer">
							LinkedIn Profile
						</a>
					</div>
				</div>
				<div className={styles.professionalBackground}>
					<h2>Professional Background</h2>
					<p>
						<strong>Experience Level:</strong>{" "}
						{founderProfile.experience_level}
					</p>
					<p>
						<strong>Industry:</strong> {founderProfile.industry}
					</p>
					<h3>Areas of Expertise</h3>
					<ul>
						{founderProfile &&
							founderProfile.areas_of_expertise &&
							Object.entries(founderProfile.areas_of_expertise).map(
								([key, value]) => (
									<li key={key}>
										<strong>{key.replace(/_/g, " ")}</strong>:{" "}
										{value.join(", ")}
									</li>
								)
							)}
					</ul>
				</div>
			</div>
		</AppLayout>
	);
}

export default About;
