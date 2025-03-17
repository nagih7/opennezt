import React, { useEffect, useRef, useState } from "react";
import RightSidebar from "components/common/RightSidebar";
import ActiveBanner from "./components/ActiveBanner";
import SearchProjectHeader from "./components/SearchProjectHeader";
import ActivateHeader from "./components/ActivateHeader";
import MyProjects from "./components/MyProjects";

function Projects() {
	// ========== STATE ========== //
	const [isBottom, setIsBottom] = useState(false);
	// Ref cho container scroll
	const scrollContainerRef = useRef(null);

	// Hàm kiểm tra cuộn khi người dùng cuộn xuống dưới cùng
	const checkScroll = () => {
		if (!scrollContainerRef.current) return;

		const { scrollTop, scrollHeight, clientHeight } =
			scrollContainerRef.current;
		if (scrollTop + clientHeight >= scrollHeight - 50) {
			setIsBottom(true);
		} else {
			setIsBottom(false);
		}
	};

	// Theo dõi sự kiện scroll khi cuộn
	useEffect(() => {
		const container = scrollContainerRef.current;
		if (container) {
			container.addEventListener("scroll", checkScroll);
		}

		// Cleanup khi component unmount
		return () => {
			if (container) {
				container.removeEventListener("scroll", checkScroll);
			}
		};
	}, []);

	return (
		<div
			className="w-full py-8 px-[16px] overflow-y-scroll overflow-x-hidden"
			ref={scrollContainerRef}>
			<ActiveBanner />
			<div className="flex gap-8 mt-8">
				<div className="w-10/12">
					<SearchProjectHeader />
					<div className="pb-8 px-8 bg-[#fbfbfb] rounded-md mt-8">
						<ActivateHeader />
						<MyProjects isBottom={isBottom} />
					</div>
				</div>
				<RightSidebar />
			</div>
		</div>
	);
}

export default Projects;
