import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import img_logo_project from "../../../assets/images/background/1656677703-bpfull.jpg";
import fb_img from "../../../assets/images/background/left-banner.webp";
import Logo from "../../../assets/images/logo/OpenNezt_logo_black.png";
import {
	CheckCircleFilled,
	CloseOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { IconlyEditSquare } from "components/UI/Iconly";
import { useDispatch, useSelector } from "react-redux";
import { getMyProjectDetails } from "api/project";
import { Image } from "@chakra-ui/react";

const ProjectDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	// ========== STATE FROM REDUX ========== //
	const project = useSelector((state) => state.project.myProjectDetails);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		dispatch(getMyProjectDetails(id));
	}, [id, dispatch]);

	return (
		<div className="w-full h-full">
			<div className="w-full">
				<Image
					src={
						project.background ||
						"https://wordpress.iqonic.design/product/wp/socialv/wp-content/themes/socialv-themes/assets/images/redux/default-cover.jpg"
					}
					alt={project.name}
					aspectRatio={10 / 3}
					width="100%"
					objectFit="cover"
					onError={(e) => {
						e.target.src =
							"https://wordpress.iqonic.design/product/wp/socialv/wp-content/themes/socialv-themes/assets/images/redux/default-cover.jpg";
					}}
				/>
			</div>

			<div>
				<div className="bg-[#ffffff]">
					<div className="p-8">
						<div className="px-[16px]">
							<div>
								<div className="flex justify-between w-full">
									<div className="item-left">
										<div className="flex justify-between gap-3">
											<div className="p-[4px] mt-[-60px] rounded-md bg-[#ffffff]">
												<a href="#">
													<Image
														src={project.logo || img_logo_project}
														className="w-[150px] h-[150px] rounded-md"
														alt={project.name}
														aspectRatio={4 / 4}
														width="100%"
														objectFit="cover"
														onError={(e) => {
															e.target.src = img_logo_project;
														}}
													/>
												</a>
											</div>
											<div>
												<h5>{project.name}</h5>
												{project.description && (
													<div>
														<p>{project.description}</p>
													</div>
												)}
											</div>
										</div>
									</div>
									<div className="item-right">
										<ul className="flex flex-wrap items-center justify-center gap-5 p-0 m-0">
											<li className="flex flex-col items-center">
												<h5>0</h5>
												Public
											</li>
											<li className="flex flex-col items-center">
												<h5>0</h5>
												Posts
											</li>
											<li className="flex flex-col items-center">
												<h5>1</h5>
												Member
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="px-[16px]">
				<div className="flex w-full gap-8">
					<div className="w-8/12 mt-8">
						<div className="bg-[#ffffff] rounded-md">
							<div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
								<h5 className="text-2xl font-normal">STAGE</h5>
								<Link
									to={"/project/edit-project/stage"}
									className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer">
									<IconlyEditSquare size={20} color={"#ffffff"} />
								</Link>
							</div>
							<div className="p-8">
								<ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
									<li className="px-[16px] mb-10">
										<div className="mb-2 text-sm font-medium uppercase">
											Hiển thị industry
										</div>
										<div>
											<p className="mb-2 text-base font-medium text-black">
												...
											</p>
										</div>
									</li>
									<li className="px-[16px] mb-10">
										<div className="mb-2 text-sm font-medium uppercase">
											INDUSYTIES
										</div>
										<div>
											<p className="mb-2 text-base font-medium text-black">
												...
											</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div className="bg-[#ffffff] rounded-md mt-8">
							<div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
								<h5 className="text-2xl font-normal">Revenue</h5>
								<Link
									to={"/project/edit-project/revenue"}
									className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer">
									<IconlyEditSquare size={20} color={"#ffffff"} />
								</Link>
							</div>
							<div className="p-8">
								<ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
									<li className="px-[16px] mb-10">
										<div className="mb-2 text-sm font-medium uppercase">
											MONTH / YEAR
										</div>
										<div>
											<p className="mb-2 text-base font-medium text-black">
												12 / 2025
											</p>
										</div>
									</li>
									<li className="px-[16px] mb-10">
										<div className="mb-2 text-sm font-medium uppercase">
											AMOUNT
										</div>
										<div>
											<p className="mb-2 text-base font-medium text-black">
												...
											</p>
										</div>
									</li>
									<li className="px-[16px] mb-10">
										<div className="mb-2 text-sm font-medium uppercase">
											CURRENCY
										</div>
										<div>
											<p className="mb-2 text-base font-medium text-black">
												...
											</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div className="bg-[#ffffff] rounded-md mt-8">
							<div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
								<h5 className="text-2xl font-normal">
									Funding Sources
								</h5>
								<Link
									to={"/project/edit-project/funding-sources"}
									className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer">
									<IconlyEditSquare size={20} color={"#ffffff"} />
								</Link>
							</div>
							<div className="p-8">
								<ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
									<li className="px-[16px] mb-10">
										<div className="mb-2 text-sm font-medium uppercase">
											NAME
										</div>
										<div>
											<p className="mb-2 text-base font-medium text-black">
												OpenNezt
											</p>
										</div>
									</li>
									<li className="px-[16px] mb-10">
										<div className="mb-2 text-sm font-medium uppercase">
											AMOUNT
										</div>
										<div>
											<p className="mb-2 text-base font-medium text-black">
												...
											</p>
										</div>
									</li>
									<li className="px-[16px] mb-10">
										<div className="mb-2 text-sm font-medium uppercase">
											CURRENCY
										</div>
										<div>
											<p className="mb-2 text-base font-medium text-black">
												...
											</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div className="bg-[#ffffff] rounded-md mt-8">
							<div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
								<h5 className="text-2xl font-normal">
									Additional Info
								</h5>
								<Link
									to={"/project/edit-project/additional-info"}
									className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer">
									<IconlyEditSquare size={20} color={"#ffffff"} />
								</Link>
							</div>
							<div className="p-8">
								<ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
									<li className="px-[16px] mb-10">
										<div className="mb-2 text-sm font-medium uppercase">
											NAME
										</div>
										<div>
											<p className="mb-2 text-base font-medium text-black">
												OpenNezt
											</p>
										</div>
									</li>
									<li className="px-[16px] mb-10">
										<div className="mb-2 text-sm font-medium uppercase">
											DESCRIPTION
										</div>
										<div>
											<p className="mb-2 text-base font-medium text-black">
												...
											</p>
										</div>
									</li>
									<li className="px-[16px] mb-10">
										<div className="mb-2 text-sm font-medium uppercase">
											CONTENT
										</div>
										<div>
											<p className="mb-2 text-base font-medium text-black">
												...
											</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
						{/* <div className="bg-[#ffffff] rounded-md mt-8">
                  <div className="flex items-center justify-between ">
                    <h5 className="text-2xl font-normal">Logo</h5>
                    <Link
                      to={"/project/edit-project/logo"}
                      className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
                    >
                      <IconlyEditSquare size={20} color={"#ffffff"} />
                    </Link>
                  </div>
                  <div className="text-[#6f7f92]">
                    <p className="my-[16px]">
                      Upload an image to use as a profile logo for this project.
                      The image will be shown on the main group page, and in
                      search results.
                    </p>
                  </div>
                  <ContainerLogo />
               
                  <div className="flex items-center justify-between">
                    <h5 className="text-2xl font-normal">Cover Image</h5>
                    <Link
                      to={"/project/edit-project/cover-image"}
                      className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
                    >
                      <IconlyEditSquare size={20} color={"#ffffff"} />
                    </Link>
                  </div>
                  <FormCoverImage />
               
              </div> */}
					</div>
					<div className="w-4/12 mt-8">
						<div className="p-8 mb-8 bg-[#ffffff] rounded-md">
							<h5 className="pb-[20px] border-b border-gray-200 mb-[20px] ">
								<span>Project Administrators</span>
							</h5>
							<div>
								<ul className="flex flex-col pl-0 mb-0">
									<li className="flex items-center gap-3">
										<div>
											<a href="#">
												<img
													src={img_logo_project}
													alt=""
													className="w-[60px] h-[60px] rounded-full"
												/>
											</a>
										</div>
										<div>
											<div
												href="#"
												className="flex items-center gap-2 text-black no-underline text-nowrap">
												<span className="font-semibold">
													Vuong Manh Nghia
												</span>
												<CheckCircleFilled className="text-blue-500" />
											</div>
											<div className="text-xs text-gray-500">
												vuongmanhnghia@gmail.com
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div className="p-8 mb-8 bg-[#ffffff] rounded-md">
							<h5 className="pb-[20px] border-b border-gray-200 mb-[20px] ">
								<span>Project Administrators</span>
							</h5>
							<div>
								<div className="flex items-center w-full gap-3">
									<div className="w-3/12">
										<div>
											<a href="#">
												<img
													src={img_logo_project}
													alt=""
													className="w-[60px] h-[60px] rounded-full"
												/>
											</a>
										</div>
									</div>
									<div className="flex items-center justify-between w-full">
										<div>
											<h6>
												<a
													href="#"
													className="text-black no-underline">
													Game Of Phones
												</a>
											</h6>
											<p className="mb-0 text-xs">Public</p>
										</div>
										<div className="flex items-center gap-2">
											<div className="flex items-center justify-center rounded-md w-7 h-7 ml-[6px] bg-[#eaeff8]">
												<a href="#">
													<PlusOutlined className="text-[#2f65b9] w-4 h-4" />
												</a>
											</div>
											<div className="ml-[6px] flex items-center justify-center rounded-md w-7 h-7 bg-[#f8eaea]">
												<a href="#">
													<CloseOutlined className="text-[#f14646] h-4 w-4" />
												</a>
											</div>
										</div>
									</div>
								</div>
								<div className="flex items-center w-full gap-3 mt-[16px]">
									<div className="w-3/12">
										<div>
											<a href="#">
												<img
													src={img_logo_project}
													alt=""
													className="w-[60px] h-[60px] rounded-full"
												/>
											</a>
										</div>
									</div>
									<div className="flex items-center justify-between w-full">
										<div>
											<h6>
												<a
													href="#"
													className="text-black no-underline">
													Game Of Phones
												</a>
											</h6>
											<p className="mb-0 text-xs">Public</p>
										</div>
										<div className="flex items-center gap-2">
											<div className="flex items-center justify-center rounded-md w-7 h-7 ml-[6px] bg-[#eaeff8]">
												<a href="#">
													<PlusOutlined className="text-[#2f65b9] w-4 h-4" />
												</a>
											</div>
											<div className="ml-[6px] flex items-center justify-center rounded-md w-7 h-7 bg-[#f8eaea]">
												<a href="#">
													<CloseOutlined className="text-[#f14646] h-4 w-4" />
												</a>
											</div>
										</div>
									</div>
								</div>
								<div className="flex items-center w-full gap-3 mt-[16px]">
									<div className="w-3/12">
										<div>
											<a href="#">
												<img
													src={img_logo_project}
													alt=""
													className="w-[60px] h-[60px] rounded-full"
												/>
											</a>
										</div>
									</div>
									<div className="flex items-center justify-between w-full">
										<div>
											<h6>
												<a
													href="#"
													className="text-black no-underline">
													Game Of Phones
												</a>
											</h6>
											<p className="mb-0 text-xs">Public</p>
										</div>
										<div className="flex items-center gap-2">
											<div className="flex items-center justify-center rounded-md w-7 h-7 ml-[6px] bg-[#eaeff8]">
												<a href="#">
													<PlusOutlined className="text-[#2f65b9] w-4 h-4" />
												</a>
											</div>
											<div className="ml-[6px] flex items-center justify-center rounded-md w-7 h-7 bg-[#f8eaea]">
												<a href="#">
													<CloseOutlined className="text-[#f14646] h-4 w-4" />
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="relative w-full">
							<img
								src={fb_img}
								alt="logo-fb_img"
								className="w-[375px] h-[450px] rounded-md mt-4"
							/>
							<img
								src={Logo}
								alt="logo-opennezt"
								className={`$styles.logo, absolute top-0 py-14 px-12 left-0`}
							/>
							<div className="absolute left-0 flex flex-col items-center gap-3 px-12 text-white top-32">
								Feel free to reach us anytime. we are avaliable 24 hours
								<button className="bg-[#ffffff] px-3 py-3 text-black font-medium rounded-md">
									CONTACT US
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetails;
