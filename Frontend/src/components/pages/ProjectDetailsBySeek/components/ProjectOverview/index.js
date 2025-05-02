import { Avatar } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Tabs } from "@chakra-ui/react";
const ProjectOverview = () => {
	const [changetab, setChangetab] = useState("Overview");
	const [dropdown, setDropsown] = useState(true);
	const [modal, setModal] = useState(false);

	const { projectDetails } = useSelector((state) => state.project);

	return (
		<div className="col-span-2  p-6 w-[46rem] ml-[0.75rem] 2xl:w-[52rem] 2xl:relative 2xl:left-[9rem] ">
			<div className="bg-[#E3F1F6] pl-4 py-3 border-l-2 border-[#0098CB]">
				<p className="relative top-[0.6rem] text-[#1599CC]   ">
					You finished this project. This project has been blocked
				</p>
			</div>
			<Tabs.Root defaultValue="Overview">
				<Tabs.List>
					<div className="bg-white mt-[1rem] p-4 font-bold flex w-[43rem] 2xl:w-[49rem]">
						<Tabs.Trigger value="Overview" className="text-black ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-[1.2rem] mr-2"
								width="24px"
								height="24px"
								viewBox="0 0 576 512">
								<path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" />
							</svg>
							Overview
						</Tabs.Trigger>
						<Tabs.Trigger value="Project" className="text-black ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-[1.2rem] mr-2"
								version="1.1"
								id="mdi-school"
								width="24"
								height="24"
								viewBox="0 0 24 24">
								<path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
							</svg>
							Project
						</Tabs.Trigger>
						<Tabs.Trigger value="Creator" className="text-black">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-[1.2rem] mr-2"
								width="24"
								height="24"
								viewBox="0 0 448 512">
								<path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z" />
							</svg>
							Creator
						</Tabs.Trigger>
						<Tabs.Trigger value="Reviews" className="text-black">
							<svg
								fill="#000000"
								xmlns="http://www.w3.org/2000/svg"
								className="w-[1.2rem] mr-2"
								viewBox="0 0 24 24"
								width="24px"
								height="24px">
								{" "}
								<path d="M 4 3 C 2.9 3 2 3.9 2 5 L 2 17 L 5 14 L 14 14 C 15.1 14 16 13.1 16 12 L 16 5 C 16 3.9 15.1 3 14 3 L 4 3 z M 18 8 L 18 12 C 18 14.206 16.206 16 14 16 L 8 16 L 8 17 C 8 18.1 8.9 19 10 19 L 19 19 L 22 22 L 22 10 C 22 8.9 21.1 8 20 8 L 18 8 z" />
							</svg>
							Reviews
						</Tabs.Trigger>
					</div>
				</Tabs.List>
				<div className=" mt-[2.5rem]">
					<Tabs.Content value="Overview">
						<div className="p-4 bg-white">
							<h2 className="mb-4 text-2xl font-semibold">
								Description
							</h2>
							<p className="text-[#9DA4A4] mb-4">
								{projectDetails?.description || "No description"}
							</p>
							{projectDetails?.additional_infos?.map((info, index) => (
								<>
									<h2 className="mb-4 text-2xl font-semibold">
										{info.name}
									</h2>
									<p className="text-[#9DA4A4] mb-2">{info.content}</p>
								</>
							))}
						</div>
					</Tabs.Content>
					<Tabs.Content value="Project">
						<>
							<div className="bg-white">
								<button
									onClick={() => setDropsown(!dropdown)}
									className="flex justify-between w-full p-3">
									<h4 className="mb-0">Project Structure</h4>
									<span className="mb-0 mr-4 right-[-26.5rem] 2xl:right-[-35.5rem] text-[#6F7F92]">
										{dropdown ? "▲" : "▼"}
									</span>
								</button>
							</div>
							<div>
								{dropdown == true && (
									<div className="mt-3">
										<div className="bg-white p-3 mt-3 font-bold cursor-pointer hover:text-[#2F65C9] flex justify-between">
											<p className="flex mb-0">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													className="mr-3 mt-1 !text-[#2F65C9]"
													width="18"
													height="18"
													viewBox="0 0 24 24">
													<path d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z" />
												</svg>
												Introduction to the project
											</p>
											<p className="mb-0 text-[#2F65C9] flex">
												20 minutes
												<svg
													className="mr-3 ml-7 text-[#00C792]"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="currentColor"
													xmlns="http://www.w3.org/2000/svg">
													<path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
												</svg>
											</p>
										</div>
										<div className="bg-white p-3 mt-3 font-bold cursor-pointer hover:text-[#2F65C9] flex justify-between">
											<p className="flex mb-0">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													className="mr-3 mt-1 !text-[#2F65C9]"
													width="18"
													height="18"
													viewBox="0 0 24 24">
													<path d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z" />
												</svg>
												Project Structure
											</p>
											<p className="mb-0 text-[#2F65C9] flex">
												20 minutes
												<svg
													className="mr-3 ml-7 text-[#00C792]"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="currentColor"
													xmlns="http://www.w3.org/2000/svg">
													<path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
												</svg>
											</p>
										</div>
										<div className="bg-white p-3 mt-3 font-bold cursor-pointer hover:text-[#2F65C9] flex justify-between">
											<p className="flex mb-0">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													className="mr-3 mt-1 !text-[#2F65C9]"
													version="1.1"
													id="mdi-help-circle-outline"
													width="18"
													height="18"
													viewBox="0 0 24 24">
													<path d="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z" />
												</svg>
												Ice Cream Quiz Questions
											</p>
											<p className="mb-0 text-[#2F65C9] flex">
												<p className="mb-0">10 minutes</p>
												<p className="mb-0 text-black font-thin mr-[2.5rem] ml-[1.5rem]">
													5 questions
												</p>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="mr-3 mt-1 text-[#00C792]"
													fill="currentColor"
													height="18"
													viewBox="0 0 24 24"
													width="18">
													<g>
														<rect
															fill="none"
															height="24"
															width="24"
															x="0"
														/>
													</g>
													<g>
														<g>
															<g>
																<path d="M12,17c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S10.9,17,12,17z M18,8h-1V6c0-2.76-2.24-5-5-5S7,3.24,7,6v2H6 c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V10C20,8.9,19.1,8,18,8z M8.9,6c0-1.71,1.39-3.1,3.1-3.1 s3.1,1.39,3.1,3.1v2H8.9V6z M18,20H6V10h12V20z" />
															</g>
														</g>
													</g>
												</svg>
											</p>
										</div>
									</div>
								)}
							</div>
						</>
					</Tabs.Content>
					<Tabs.Content value="Creator">
						<div className="bg-white">
							<div className="flex p-5">
								<Avatar.Root
									shape="square"
									size="lg"
									className="w-[6rem] h-[6rem] rounded-[0.5rem]">
									<Avatar.Fallback name={projectDetails?.user?.name} />
									<Avatar.Image src={projectDetails?.user?.avatar} />
								</Avatar.Root>
								<div>
									<ul className="flex mt-[0.75rem] pl-3">
										<li className="mr-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 448 512"
												fill="currentColor"
												width="35px"
												height="35px"
												className="text-[#1877F2]">
												<path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
											</svg>
										</li>
										<li className="mr-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 448 512"
												fill="currentColor"
												width="35px"
												height="35px"
												className="text-[#C9216C]">
												<path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z" />
											</svg>
										</li>
									</ul>
									<span className="pl-3 font-bold">
										{projectDetails?.user?.name}
									</span>
								</div>
							</div>
						</div>
					</Tabs.Content>
					<Tabs.Content value="Reviews">
						<>
							<div className="grid grid-cols-2 gap-6">
								<div className="flex flex-col items-center bg-white w-[14.25rem] h-[16.25rem]">
									<div className="flex flex-col items-center mt-5 ">
										<h2 className="!text-[4.75rem] ">4.5</h2>
										<div className="flex text-yellow-400 text-[1.2rem] !mb-2 !mt-[-0.75rem]">
											<span>⭐</span>
											<span>⭐</span>
											<span>⭐</span>
											<span>⭐</span>
											<span className="text-gray-300">⭐</span>
										</div>
										<p className="text-sm text-gray-600">2 ratings</p>
									</div>
								</div>

								<div className="relative right-[6rem] space-y-2 bg-white w-[26.5rem] 2xl:w-[29.5rem]">
									{[5, 4, 3, 2, 1].map((star) => (
										<div
											key={star}
											className="flex items-center relative right-[-4rem] top-[3rem] ">
											<span className="ml-1 text-gray-700">
												{star}
											</span>
											<span className="text-lg text-yellow-400">
												⭐
											</span>
											<div className="w-[17rem] h-2 bg-gray-200 rounded-lg mx-2 2xl:w-[19rem] ">
												<div
													className={`h-2 ${
														star === 5
															? "bg-yellow-400 w-3/6"
															: star === 4
															? "bg-yellow-400 w-2/6"
															: "bg-gray-200"
													} rounded-lg`}></div>
											</div>
											<span className="text-sm text-gray-600">
												{star === 5 ? "1" : star === 4 ? "1" : "0"}
											</span>
										</div>
									))}
								</div>
							</div>
							<div className="py-4">
								<button
									onClick={() => setModal(!modal)}
									className="bg-[#2F65B9] text-white w-[10.6rem] py-2 rounded-[0.25rem]">
									WRITE A REVIEW
								</button>
							</div>
							{modal == true && (
								<>
									<div className="fixed inset-0 bg-opacity-50 flex items-center justify-center  bg-[#777778] z-[9999]">
										<div className="bg-white p-6 rounded-lg w-[38rem] shadow-lg">
											<h2 className="mb-4 text-xl font-bold">
												Write A Review
											</h2>

											<label className="block font-semibold">
												Title *
											</label>
											<input
												type="text"
												className="w-full border border-gray-300 p-2 rounded mt-1 bg-[#F8F9FA]"
												placeholder="Enter review title"
											/>

											<label className="block mt-3 font-semibold">
												Content *
											</label>
											<textarea
												className="w-full border border-gray-300 p-2 rounded mt-1 h-24 bg-[#F8F9FA]"
												placeholder="Write your review here..."></textarea>

											<label className="block mt-3 font-semibold">
												Rating *
											</label>
											<div className="flex space-x-1 text-yellow-400">
												{[...Array(5)].map((_, i) => (
													<span
														key={i}
														className="text-2xl cursor-pointer">
														⭐
													</span>
												))}
											</div>

											<div className="flex justify-end mt-4 space-x-2">
												<button
													className="px-4 py-2 bg-gray-300 rounded-lg"
													onClick={() => setModal(false)}>
													Cancel
												</button>
												<button className="px-4 py-2 text-white bg-blue-600 rounded-lg">
													Add Review
												</button>
											</div>
										</div>
									</div>
								</>
							)}
							<div>
								<h3>Reviews</h3>
								<div className="bg-white h-[12.5rem] flex">
									<img
										className="w-[8.5rem] h-[8.5rem] p-6 rounded-[1.9rem]"
										src="https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/avatars/33/1656654204-bpfull.jpg"></img>
									<div className="mt-[1rem]">
										<h3>Robert Fox</h3>
										<div className="flex text-yellow-400 text-[1.2rem] !mb-2 !mt-[-0.75rem]">
											<span>⭐</span>
											<span>⭐</span>
											<span>⭐</span>
											<span>⭐</span>
											<span className="text-gray-300">⭐</span>
										</div>
										<i className="font-bold text-[#6F7F9C]">
											The best cooking course ever!
										</i>
										<p className="text-[#6F7F92] mt-[1.2rem]">
											It was a fantastic course with lots of hands on
											training and fun! Absolutely recommended to all
											food lovers !
										</p>
									</div>
								</div>
							</div>
						</>
					</Tabs.Content>
				</div>
			</Tabs.Root>
		</div>
	);
};

export default ProjectOverview;
