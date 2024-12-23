import React from "react";
import styles from "./styles.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TalentCardSkeleton = ({ count }) => {
	return Array(count)
		.fill(0)
		.map((_, i) => (
			<div className={styles.talentCardSkeletonWrap} key={i}>
				<Skeleton className={styles.avatarTalent} />
				<div className={styles.boxBasicTalentContent}>
					<Skeleton height={"1.5rem"} />
					<Skeleton height={"3rem"} />
					<Skeleton height={"2rem"} />
				</div>
			</div>
		));
};

export default TalentCardSkeleton;
