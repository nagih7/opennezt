import { Image } from "@chakra-ui/react";
import React from "react";
import img_logo_project from "../../../../../assets/images/background/1656677876-bpthumb.jpg";

const ProjectCard = ({ project }) => {
	return (
		<>
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

			<div className="p-8 bg-[#ffffff]">
				<div className="flex justify-between w-full px-[16px]">
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
		</>
	);
};

export default ProjectCard;
