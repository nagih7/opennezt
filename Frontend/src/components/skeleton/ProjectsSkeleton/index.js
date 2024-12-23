import React from "react";
import styles from "./styles.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProjectsSkeleton = ({ boxs }) => {
	return Array(boxs)
		.fill(0)
		.map((_, i) => (
			<div className={styles.boxProjectWrap} key={i}>
				<Skeleton className={styles.backgroundProject} />
				<div className={styles.projectInfo}>
					<h3>
						<Skeleton />
					</h3>
					<p
						style={{
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
							width: "100%",
						}}>
						<Skeleton count={2} style={{ marginBottom: "10px" }} />
					</p>
				</div>
			</div>
		));
};

export default ProjectsSkeleton;
