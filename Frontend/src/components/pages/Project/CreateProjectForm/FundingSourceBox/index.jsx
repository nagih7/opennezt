import React from "react";
import { Input } from "antd";
import styles from "./styles.module.scss";

const FundingSourceBox = ({
	fundingSourceName,
	foundingSourceTarget,
	fundingSourceCost,
	handleChangeFundingSource,
}) => {
	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			<span style={{ width: "10rem", display: "flex" }}>
				{fundingSourceName}
			</span>
			<Input
				className={styles.inputCreate}
				value={fundingSourceCost}
				onChange={(e) =>
					handleChangeFundingSource(foundingSourceTarget, e.target.value)
				}
				placeholder="Enter amount"
				required
			/>
		</div>
	);
};

export default FundingSourceBox;
