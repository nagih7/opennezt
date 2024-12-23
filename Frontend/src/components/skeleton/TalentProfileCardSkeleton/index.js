import React from "react";
import styles from "./styles.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TalentProfileCardSkeleton = () => {
	return (
		<div className={styles.talentProfileCardSkeleton}>
			<div className={styles.bannerContainer}>
				<div className={styles.banner}>
					<div className={styles.background}>
						<Skeleton height={300} />
					</div>
				</div>

				<div className={styles.userInfoWrap}>
					<div className={styles.userInfo}>
						<div className={styles.avatar}>
							<Skeleton width={"100%"} height={"100%"} />
						</div>
						<h1>
							<Skeleton />
						</h1>
						<p>
							<Skeleton />
						</p>
						<p>
							<Skeleton />
						</p>
						<Skeleton />
					</div>
					<div className={styles.userActions}></div>
				</div>
			</div>
		</div>
	);
};

export default TalentProfileCardSkeleton;
