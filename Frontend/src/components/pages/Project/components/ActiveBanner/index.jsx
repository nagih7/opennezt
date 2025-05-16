import React from "react";
import background_image from "../../../../../assets/images/logo/OpenNezt_Background.png"

const ActiveBanner = () => {
	return (
		<div
			className="h-[300px] text-[#ffffff] pl-8 py-32 rounded-md bg-local bg-center"
			style={{
				backgroundImage:
					`url(${background_image})`,
				objectFit: "cover",
			}}>
			<span className="text-4xl font-medium">Project Directory</span>
			<p className="mt-1">
				Good Communication is the key to cop-up with good ideas
			</p>
		</div>
	);
};

export default ActiveBanner;
