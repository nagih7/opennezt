import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import store from "states/configureStore";
import { checkSteps } from "api/home";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LazyLoading from "components/UI/LazyLoading";

const StepBox = React.lazy(() => import("./StepBox"));

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

							<LazyLoading>
								<StepBox
									step={true}
									textTrue="Invite your Team"
									textFalse="Invite your Team"
									path="/recruit-talents"
								/>
							</LazyLoading>
						</div>
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
		</>
	);
}

export default Home;
