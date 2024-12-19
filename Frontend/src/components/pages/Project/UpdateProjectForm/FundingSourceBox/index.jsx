import React from "react";
import { Input } from "antd";

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
				style={{ padding: "0 0.5rem", width: "auto", color: "#949698" }}
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
