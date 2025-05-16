import React from "react";
import TransformAIGif from "../../../assets/images/GIF/transformAI.mp4";

const TransformAI = () => {
	return (
		<div style={{ width: "30rem", margin: "0 auto" }}>
			<video
				autoPlay
				loop
				muted
				style={{ width: "100%", height: "14rem", objectFit: "cover" }}>
				<source src={TransformAIGif} type="video/mp4" />
			</video>
			{/* <img
				src={
					"https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/New__revised_0312_Keyword_blog-header-animated-final_YCPcPYO.gif"
				}
				alt="Transform AI"
				style={{ width: "100%" }}
			/> */}
		</div>
	);
};

export default TransformAI;
