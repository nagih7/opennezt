import React from "react";
import styles from "./styles.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProjectCardSkeleton = () => {
	return (
		<div className={styles.projectCardSkeletonWrap}>
			<div className={styles.headerOverlay}>
				<h2>
					<Skeleton height={40} />
				</h2>
				<Skeleton height={20} />
				<Skeleton height={20} />
			</div>
		</div>
	);
};

export default ProjectCardSkeleton;
