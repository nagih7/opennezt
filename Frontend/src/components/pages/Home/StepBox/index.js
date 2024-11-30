import React from "react";
import styles from "./styles.module.scss";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

const StepBox = (props) => {
	const navigate = useNavigate();
	const { step, textTrue, textFalse, path } = props;

	return (
		<>
			{step ? (
				<div className={styles.stepWrap} onClick={() => navigate(path)}>
					<div className={styles.stepContent}>{textTrue}</div>
					<ChevronRightIcon className={styles.chevron} />
				</div>
			) : (
				<div className={styles.stepWrap} onClick={() => navigate(path)}>
					<div className={styles.stepContent}>{textFalse}</div>
					<ChevronRightIcon className={styles.chevron} />
				</div>
			)}
		</>
	);
};

export default StepBox;
