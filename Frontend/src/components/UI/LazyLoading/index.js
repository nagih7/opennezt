import { Spin } from "antd";
import React, { Suspense } from "react";

const LazyLoading = ({ children }) => {
	return (
		<Suspense
			fallback={
				<Spin
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(calc(-50% + 100px), -50%)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
					tip="Loading"
					size="large"
				/>
			}>
			{children}
		</Suspense>
	);
};

export default LazyLoading;
