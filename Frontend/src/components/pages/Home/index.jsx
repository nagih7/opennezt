import React from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StepBoxSkeleton from "components/skeleton/StepBoxSkeleton";
import StepBox from "./StepBox";

function Home() {
	const navigate = useNavigate();
	const { steps, loadingCheckSteps } = useSelector((state) => state.home);

	return (
		<>
			<div className={styles.homeWrap}>
				<div className={styles.homeContentWrap}>
					<div className={styles.homeHeader}>
						<b>Hello!</b> Welcome to <b>OpenNezt</b>, where innovation
						meets opportunity and collaboration sparks success
					</div>{" "}
					<div className={styles.homeStepWrap}>
						<div className={styles.homeStepContentWrap}>
							{loadingCheckSteps ? (
								<StepBoxSkeleton />
							) : (
								<StepBox
									step={steps.founderProfile}
									textTrue="Update your profile"
									textFalse="Update your profile"
									path="/about"
								/>
							)}
							{loadingCheckSteps ? (
								<StepBoxSkeleton />
							) : (
								<StepBox
									step={steps.project}
									textTrue="Redirect to project"
									textFalse="Create your first project"
									path="/project"
								/>
							)}
							{loadingCheckSteps ? (
								<StepBoxSkeleton />
							) : (
								<StepBox
									step={true}
									textTrue="Invite your Team"
									textFalse="Invite your Team"
									path="/recruit-talents"
								/>
							)}
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
