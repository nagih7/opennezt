import { IconlyArrowRight2 } from "components/UI/Iconly";
import React from "react";

const RecruitTalentActiveBanner = () => {
	return (
		<div
			className="h-[300px] text-[#ffffff] pl-8 py-32 bg-local bg-center "
			style={{
				backgroundImage:
					"url(https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/buddypress/groups/14/cover-image/62be922d671b9-bp-cover-image.jpg)",
				objectFit: "cover",
			}}>
			<div className="flex flex-col items-center justify-center">
				<span className="text-3xl font-semibold mb-[10px]">
					RECRUIT TALENTS
				</span>
				<ul className="flex items-center gap-2 pl-0 m-0">
					<li>
						<a
							href="#"
							className="text-[#ffffff] no-underline font-semibold text-sm">
							HOME
						</a>
					</li>
					<li>
						<span className="flex items-center">
							<IconlyArrowRight2 size={18} color={"#ffffff"} />
							<span className="text-sm font-semibold">PRODUCT</span>
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default RecruitTalentActiveBanner;
