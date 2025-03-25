import React from "react";
import { IconlyHeart, IconlyShow, IconlyStar } from "components/UI/Iconly";
import img_bag from "assets/images/background/bag.jpg";
import { useDispatch, useSelector } from "react-redux";
import PaginationCustom from "components/UI/PaginationCustom";
import { recruitTalents } from "api/talent";

const ListTalents = () => {
	const dispatch = useDispatch();
	const { talents, formRecruitTalents, paginationRecruitTalents } =
		useSelector((state) => state.talent);

	const onPageChange = (pageData) => {
		dispatch(
			recruitTalents({
				...formRecruitTalents,
				page: pageData.page,
				perPage: pageData.pageSize,
			})
		);
	};

	const handleViewTalentDetails = (talent) => {
		console.log(talent);
	};

	return (
		<div className="container flex flex-col items-center justify-center gap-20 py-12 mx-auto">
			<div className="grid w-full grid-cols-3 gap-8">
				{talents?.map((talent) => (
					<div
						onClick={() => handleViewTalentDetails(talent)}
						key={talent.user._id}
						className="relative group h-[380px]"
						onMouseEnter={(e) => {
							const children =
								e.currentTarget.querySelectorAll(".fade-element");
							children.forEach((child) => (child.style.opacity = 1));
						}}
						onMouseLeave={(e) => {
							const children =
								e.currentTarget.querySelectorAll(".fade-element");
							children.forEach((child) => (child.style.opacity = 0));
						}}>
						<div className="relative">
							<span className="absolute top-[12px] left-[12px] z-10 bg-[#2f65b9] text-white text-sm px-[5px] py-[2px] rounded-md">
								Hot!
							</span>
							<div className="relative group">
								<a href="#">
									<div>
										<img
											src={talent.user.avatar || img_bag}
											alt={talent.user.name}
											onError={(e) => {
												e.target.onerror = null;
												e.target.src = img_bag;
											}}
											className="w-[280px] h-[280px] rounded-md"
										/>
									</div>
								</a>
								<div
									className="absolute top-[15px] right-[15px] fade-element"
									style={{
										opacity: 0, // Mặc định opacity là 0
										transition: "opacity 0.7s ease-in-out",
									}}>
									<ul className="flex flex-col gap-2 pl-0 m-0">
										<li>
											<a
												href="#"
												className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center">
												<IconlyShow size={20} color={"#2f65b9"} />
											</a>
										</li>
										<li>
											<a
												href="#"
												className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center">
												<IconlyHeart size={20} color={"#2f65b9"} />
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="absolute bottom-[-61px] group-hover:bottom-[-21px] group-hover:translate-x-0 translate-x-full transition-all duration-700 ease-in-out left-0 w-[280px] p-[16px] bg-[#f6f4f4] flex flex-col justify-center items-center gap-2">
							<span>
								<a
									href="#"
									className="font-semibold text-black no-underline">
									{talent.user.name}
								</a>
							</span>
							<div>
								<span className="text-[#6f7f92] text-sm font-medium">
									<span>$18.00 </span>-<span> $45.00</span>
								</span>
							</div>
							<ul className="flex items-center gap-1 pl-0 m-0">
								<li>
									<IconlyStar size={18} color={"#ffb800"} />
								</li>
								<li>
									<IconlyStar size={18} color={"#ffb800"} />
								</li>
								<li>
									<IconlyStar size={18} color={"#ffb800"} />
								</li>
								<li>
									<IconlyStar size={18} color={"#ffb800"} />
								</li>
								<li>
									<IconlyStar size={18} color={"#ffb800"} />
								</li>
							</ul>
							<div
								className="mt-[16px] fade-element"
								style={{
									opacity: 0, // Mặc định opacity là 0
									transition: "opacity 0.3s ease-in-out",
								}}>
								<span
									href=""
									className="no-underline text-white font-semibold text-xs bg-[#2f65b9] px-[24px] py-[12px] rounded-md">
									VIEW DETAILS
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
			<PaginationCustom
				pagination={paginationRecruitTalents}
				onPageChange={onPageChange}
			/>
		</div>
	);
};

export default ListTalents;
