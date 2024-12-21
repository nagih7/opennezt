import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./styles.module.scss";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const StepBoxSkeleton = () => {
	return (
		<div className={styles.stepBoxSkeletonWrap}>
			<div className={styles.stepContentLeft}>
				<Skeleton height={32} />
			</div>
			<div className={styles.stepContentRight}>
				<ChevronRightIcon className={styles.chevron} />
			</div>
		</div>
	);
};

export default StepBoxSkeleton;
