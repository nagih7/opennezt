import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "states/configureStore";
import { logout } from "api/auth";
import { IconlySetting } from "components/UI/Iconly";

function PopoverProfile() {
	const navigate = useNavigate();
	const isAuthSuccess = useSelector((state) => state.auth.isAuthSuccess);
	const authUser = useSelector((state) => state.auth.authUser);

	useEffect(() => {
		if (!isAuthSuccess) {
			navigate("/login");
		}
	}, [isAuthSuccess, navigate]);

	const handleConfirmLogOut = async () => {
		await store.dispatch(logout());
		window.location.reload();
	};

	return (
		<div className={styles.modalInfoWrap}>
			<div className={styles.personalInformationWrap}>
				<div className={styles.name}>{authUser.name}</div>
			</div>
			<div className={styles.mainModalInfoWrap}>
				<ul className={styles.menuInfoWrap}>
					<li
						onClick={() => navigate("/profile")}
						className={`${styles.itemInfoWrap}`}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 12 13.714"
							width="12"
							height="13.714">
							<g fill="currentColor">
								<path d="M6 6.857a3.429 3.429 0 1 0 0-6.86 3.429 3.429 0 0 0 0 6.861zm0-6a2.573 2.573 0 0 1 2.571 2.571c0 1.418-1.153 2.571-2.571 2.571S3.429 4.845 3.429 3.428A2.574 2.574 0 0 1 6 .857zm1.358 7.286H4.642A4.642 4.642 0 0 0 0 12.785c0 .513.416.929.928.929h10.144a.928.928 0 0 0 .928-.929 4.643 4.643 0 0 0-4.642-4.642zm3.712 4.714H.928a.071.071 0 0 1-.071-.072A3.79 3.79 0 0 1 4.642 9h2.713a3.79 3.79 0 0 1 3.788 3.785c0 .04-.032.072-.072.072z" />
							</g>
						</svg>
						<span className={styles.text}>Profile</span>
					</li>
					<li
						onClick={() => navigate("/account-settings")}
						className={`${styles.itemInfoWrap}`}>
						{/* <svg 
							xmlns="http://www.w3.org/2000/svg" 
							height="13.714" 
							viewBox="0 -960 960 960" 
							width="12"
							fill="none"> 	
							<g fill="currentColor">
								<path d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-8 18-13.5 37.5T404-360h-4q-71 0-127.5 18T180-306q-9 5-14.5 14t-5.5 20v32h252q6 21 16 41.5t22 38.5H80Zm560 40-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80Zm40-120q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-560q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Z"/>
							</g>
						</svg>						 */}
						<IconlySetting
							color={"#374151"}
							size={12}
						/>
						<span className={styles.text}>Account Settings</span>

					</li>
					<li
						onClick={() => handleConfirmLogOut()}
						className={styles.itemInfoWrap}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 12 12"
							width="12"
							height="12">
							<g fill="currentColor">
								<path d="M3.938 10.125H2.25A1.128 1.128 0 0 1 1.125 9V3c0-.619.506-1.125 1.125-1.125h1.688a.562.562 0 1 0 0-1.126H2.25A2.251 2.251 0 0 0 0 3v6a2.25 2.25 0 0 0 2.25 2.25h1.688c.312 0 .563-.251.563-.563s-.251-.563-.563-.563zm7.873-4.533L8.238 2.447a.79.79 0 0 0-.846-.128.768.768 0 0 0-.454.697v1.296H4.125a.939.939 0 0 0-.938.938v1.5c0 .517.42.938.938.938h2.813v1.296a.77.77 0 0 0 .455.697.788.788 0 0 0 .845-.128l3.572-3.12c.122-.107.19-.259.19-.421s-.068-.314-.19-.42zM8.063 8.203V6.541h-3.75V5.416h3.75V3.775l2.527 2.216-2.527 2.212z" />
							</g>
						</svg>
						<span className={styles.text}>Log out</span>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default PopoverProfile;
