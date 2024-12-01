import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import store from "states/configureStore";
import { checkSteps } from "api/home";
import { useSelector } from "react-redux";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import StepBox from "./StepBox";
import LazyLoading from "components/UI/LazyLoading";

function Home() {
	const navigate = useNavigate();
	const stepState = useSelector((state) => state.home.steps);

	useEffect(() => {
		store.dispatch(checkSteps());
	}, []);

	return (
		<>
			<div className={styles.homeWrap}>
				<div className={styles.homeContentWrap}>
					<div className={styles.homeHeader}>
						<b>Hello!</b> Welcome to <b>OpenNezt</b>, where innovation
						meets opportunity and collaboration sparks success
					</div>
					<div className={styles.homeStepWrap}>
						<div className={styles.homeStepContentWrap}>
							<LazyLoading>
								<StepBox
									step={stepState.founderProfile}
									textTrue="Update your profile"
									textFalse="Update your profile"
									path="/about"
								/>
							</LazyLoading>
							<LazyLoading>
								<StepBox
									step={stepState.project}
									textTrue="Redirect to project"
									textFalse="Create your first project"
									path="/project"
								/>
							</LazyLoading>

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
		</>
	);
}

export default Home;
