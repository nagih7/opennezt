import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./styles.module.scss";

const ProfileCardSkeleton = () => {
	return (
		<div className={styles.profileCardSkeletonWrap}>
			<div className={styles.banner}>
				<Skeleton height={"100%"} />
			</div>

			<div className={styles.userInfoWrap}>
				<div className={styles.userInfo}>
					<Skeleton className={styles.avatar} />
					<h1>
						<Skeleton />
					</h1>
					<p>
						<Skeleton />
					</p>
				</div>
				<div className={styles.userActions}>
					<Skeleton width={126} height={40} />
				</div>
			</div>
		</div>
	);
};

export default ProfileCardSkeleton;
