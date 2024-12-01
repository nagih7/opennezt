import React, { Suspense } from "react";

const LazyLoading = ({ children }) => {
	return (
		<Suspense
			fallback={
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100vh",
						backgroundColor: "#f6f6f9",
						opacity: "0.8",
					}}>
					<img
						src="https://i.pinimg.com/originals/71/3a/32/713a3272124cc57ba9e9fb7f59e9ab3b.gif"
						alt="Loading..."
						style={{ width: "150px", height: "150px" }}
					/>
				</div>
			}>
			{children}
		</Suspense>
	);
};

export default LazyLoading;
