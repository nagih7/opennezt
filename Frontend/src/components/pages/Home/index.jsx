import React, { useEffect, useState } from "react";
import AppLayout from "components/layouts/AppLayout";
import styles from "./styles.module.scss";
import store from "states/configureStore";
import { checkSteps } from "api/home";
import { useSelector } from "react-redux";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

function Home() {
	const navigate = useNavigate();
	const stepState = useSelector((state) => state.home.steps);

	useEffect(() => {
		store.dispatch(checkSteps());
	}, []);

	return (
		<>
			<AppLayout>
				<div className={styles.homeWrap}>
					<div className={styles.homeContentWrap}>
						<div className={styles.homeHeader}>
							<b>Hello!</b> Welcome to <b>OpenNezt</b>, where innovation
							meets opportunity and collaboration sparks success
						</div>
						<div className={styles.homeStepWrap}>
							{/* <div className={styles.homeStepHeader}>
								Your next steps
							</div> */}
							<div className={styles.homeStepContentWrap}>
								{stepState.founderProfile ? (
									<div
										className={styles.stepWrap}
										onClick={() => navigate("/about")}>
										<div className={styles.stepContent}>
											Update your profile
										</div>
										<ChevronRightIcon className={styles.chevron} />
									</div>
								) : (
									<div
										className={styles.stepWrap}
										onClick={() => navigate("/about")}>
										<div className={styles.stepContent}>
											Update your profile
										</div>
										<ChevronRightIcon className={styles.chevron} />
									</div>
								)}
								{stepState.project ? (
									<div
									className={styles.stepWrap}
									onClick={() => navigate("/project")}>
									<div className={styles.stepContent}>
										Redirect to project
									</div>
									<ChevronRightIcon className={styles.chevron} />
								</div>
								) : (
									<div
										className={styles.stepWrap}
										onClick={() => navigate("/project")}>
										<div className={styles.stepContent}>
											Create your first project
										</div>
										<ChevronRightIcon className={styles.chevron} />
									</div>
								)}
								<div className={styles.stepWrap}>
									<div className={styles.stepContent}>
										Invite your Team
									</div>
									<ChevronRightIcon className={styles.chevron} />
								</div>
								<div className={styles.recruitStepWrap}>
									<div className={styles.recruitStepHeader}>
										99 talents in your queue meet your requirement
									</div>
									<div
										className={styles.recruitStepButton}
										onClick={() => navigate("/recruit-talents")}>
										Recuit now
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</AppLayout>
		</>
	);
}

export default Home;
