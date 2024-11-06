import React from "react";
import AppLayout from "components/layouts/AppLayout";
import styles from "./styles.module.scss";

function Home() {
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
							<div className={styles.homeStepHeader}>
								Your next steps
							</div>
							<div className={styles.homeStepContentWrap}></div>
						</div>
					</div>
				</div>
			</AppLayout>
		</>
	);
}

export default Home;
