import React from "react";

const recentCourses = [
	{
		title: "SEO Mastery",
		price: "Free",
		image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
	},
	{
		title: "Docker for Developers",
		price: 29.99,
		image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
	},
	{
		title: "Figma UI/UX",
		price: "Free",
		image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
	},
	{
		title: "Vue.js Crash Course",
		price: 19.99,
		image: "https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/2020/11/1-500x300.jpg",
	},
];

const AccessLog = () => {
	return (
		<div className="w-4/12 2xl:w-[23.25rem] bg-white p-4 rounded-md shadow-sm h-fit">
			<h3 className="text-lg font-semibold mb-4 border-b border-[#DEDEDE] pb-4">
				Recent Project
			</h3>
			<ul className="space-y-4">
				{recentCourses.map((course, index) => (
					<li
						key={index}
						className="flex items-center gap-3 relative left-[-1.75rem]">
						<img
							src={course.image}
							alt={course.title}
							className="relative w-[4.5rem] h-[4.5rem] rounded-md object-cover top-[-1.25rem]"
						/>
						<div>
							<p className="text-sm font-semibold">{course.title}</p>
							<p
								className={`text-xs relative top-[-0.75rem] ${
									course.price === "Free"
										? "text-green-500"
										: "text-blue-500"
								}`}>
								{course.price === "Free" ? "Free" : `$${course.price}`}
							</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AccessLog;
