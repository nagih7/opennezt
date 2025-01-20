import React from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StepBoxSkeleton from "components/skeleton/StepBoxSkeleton";
import StepBox from "./StepBox";
import HTMLContent from "utils/htmlContent";
import {
	WELCOME_TO_OPENNEZT,
	STEPS,
	RECRUIT_NOW,
} from "utils/constains/appConstains";

function Home() {
	const navigate = useNavigate();
	const { steps, loadingCheckSteps } = useSelector((state) => state.home);
	const { language } = useSelector((state) => state.app);

	return (
		<>
			<div className={styles.homeWrap}>
				<div className={styles.homeContentWrap}>
					<div className={styles.homeHeader}>
						<HTMLContent content={WELCOME_TO_OPENNEZT[language]} />
					</div>{" "}
					<div className={styles.homeStepWrap}>
						<div className={styles.homeStepContentWrap}>
							{loadingCheckSteps ? (
								<StepBoxSkeleton />
							) : (
								<StepBox
									step={steps.founderProfile}
									textTrue={STEPS.STEP_1.TRUE[language]}
									textFalse={STEPS.STEP_1.FALSE[language]}
									path="/about"
								/>
							)}
							{loadingCheckSteps ? (
								<StepBoxSkeleton />
							) : (
								<StepBox
									step={steps.project}
									textTrue={STEPS.STEP_2.TRUE[language]}
									textFalse={STEPS.STEP_2.FALSE[language]}
									path="/project"
								/>
							)}
							{loadingCheckSteps ? (
								<StepBoxSkeleton />
							) : (
								<StepBox
									step={true}
									textTrue={STEPS.STEP_3.TRUE[language]}
									textFalse={STEPS.STEP_3.FALSE[language]}
									path="/recruit-talents"
								/>
							)}
						</div>
					</div>
					<div className={styles.recruitStepWrap}>
						<div className={styles.recruitStepHeader}>
							{STEPS.STEP_4[language]}
						</div>
						<div
							className={styles.recruitStepButton}
							onClick={() => navigate("/recruit-talents")}>
							{RECRUIT_NOW[language]}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
