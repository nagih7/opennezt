import { Button, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../ProfileCard";
import ProfileEditMenu from "../ProfileEditMenu";
import ActionBar from "../ActionBar";

const Educations = () => {
	// const dispatch = useDispatch();
	// // ========== STATE FROM REDUX STORE ========== //
	// const { profile } = useSelector((state) => state.profile);
	// // ========== STATE MANAGEMENT ========== //
	// const [formData, setFormData] = useState({
	// 	educations: [],
	// });

	// useEffect(() => {
	// 	if (profile) {
	// 		setFormData({
	// 			...formData,
	// 			industries: profile?.industries?.map((industry) => industry._id),
	// 			experience_level: [profile?.experience_level?._id],
	// 		});
	// 	}
	// 	// eslint-disable-next-line
	// }, [profile]);

	// // ========== HANDLE CHANGE FUNCTION ========== //
	// const handleChange = async (event, nameSelect) => {
	// 	setFormData({
	// 		...formData,
	// 		[nameSelect]: event.value,
	// 	});
	// };
	// const handleSaveChanges = () => {
	// 	console.log(formData);
	// };
	const [educations, setEducations] = useState([
		{
			school: "Posts and Telecommunications Institute of Technology",
			degree: "Microsoft Office Specialist - Associate",
			field_of_study: "Institute of Technology",
			start_date: "Sep 2023",
			end_date: "Jul 2027",
			grade: "Student",
			activities: "Google Developer Group - GDC on Campus: PTIT",
			description: "Vuong Manh Nghia is an Information Technology student...",
			profile_id: "1",
		},
	]);


	const [formData, setFormData] = useState({
		school: "",
		degree: "",
		field_of_study: "",
		start_date: "",
		end_date: "",
		grade: "",
		activities: "",
		description: "",
		profile_id: "",
	});

	const [isEditing, setIsEditing] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);


	const handleCreateNew = () => {
		setFormData({
			school: "",
			degree: "",
			field_of_study: "",
			start_date: "",
			end_date: "",
			grade: "",
			activities: "",
			description: "",
			profile_id: (educations.length + 1).toString(),
		});
		setIsEditing(false);
		setModalOpen(true);
	};


	const handleEdit = (education) => {
		setFormData(education);
		setIsEditing(true);
		setModalOpen(true);
	};


	const handleSave = () => {
		if (isEditing) {
			setEducations((prev) =>
				prev.map((edu) => (edu.profile_id === formData.profile_id ? formData : edu))
			);
		} else {
			setEducations([...educations, formData]);
		}
		setModalOpen(false);
	};


	const handleClose = () => {
		setModalOpen(false);
	};


	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	// ========== COMPONENT RENDER ========== //
	return (
		<div className="flex gap-8 w-full py-8 px-[16px]">
			<ProfileEditMenu />
			<div className="w-8/12">
				<div className="bg-[#ffffff] p-8 rounded-md">
					{/* =========== Profile Card ========== */}
					<ProfileCard />
					{/* =========== Action Bar  ========== */}
					<ActionBar />
				</div>
				<div className="bg-[#ffffff] p-8 rounded-md mt-8">
					<div className="pb-[20px] mb-8 border-b-[1px] border-gray-200 flex justify-between">
						<div>
							<h4 className="">Educations</h4>
						</div>
						<button onClick={handleCreateNew}><div className="bg-[#2F65B9] text-white w-[6.75rem] h-[2.75rem] rounded-[0.25rem] pt-[0.5rem]">Create new</div></button>
					</div>
					<div>
						{/* <div className="px-[16px]">
							<div className="relative mb-8">
								<Input
									height={50}
									type="url"
									placeholder="Bachelors"
									className="p-[16px] w-full border-[1px] outline-none border-gray-200 rounded-md "
								/>
								<label
									htmlFor=""
									className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
									Educations
								</label>
								<p className="mt-[11px] mb-0 flex justify-end">
									<button className="bg-[#f07a3a] text-xs font-medium py-1 px-[6px] text-[#ffffff] rounded-sm">
										CHANGE
									</button>
								</p>
							</div>
						</div>
						<div className="px-[16px] flex justify-end">
							<div className="">
								<Button
									onClick={handleSaveChanges}
									height={50}
									className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
									borderRadius={4}
									loading={false}
									loadingText="Loading..."
									spinnerPlacement="start">
									SAVE CHANGES
								</Button>
							</div>
						</div> */}
						<div>
							{educations.map((education, index) => (
								<div key={index}>
									<div className="bg-[#F4F2EE] rounded-[0.6rem] mt-3">
										<div className="p-4 ">
											<svg onClick={() => handleEdit(education)} className="cursor-pointer float-right" xmlns="http://www.w3.org/2000/svg" version="1.1" id="mdi-pencil-outline" width="24" height="24" viewBox="0 0 24 24"><path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" /></svg>
											{/* <img className="w-[34px] h-[40px] mr-3" src="https://ft.ptithcm.edu.vn/wp-content/uploads/2021/08/PTIT-1170x1264.png" /> */}
											<h4 className="flex font-bold">{education.school}</h4>
											<p className="relative text-[#9B9B9B] top-[-1rem] left-[-0.1rem] text-[1rem] mt-3">{education.start_date} - {education.end_date}</p>
											<p className="flex "> Degree: {education.degree}</p>
											<p className="flex "> Major: {education.field_of_study}</p>
											<p className="flex "> Grade: {education.grade}</p>
											<p className="flex ">Activities and social: {education.activities}</p>
											<p className="flex ">About: {education.description}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			{modalOpen && (
				<div className=" fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 bg-[#777778] z-[9999]">
					<div className="bg-white p-6 rounded-lg shadow-lg w-[32rem] z-20">
						<h3 className="text-lg font-semibold mb-4">
							{isEditing ? "Edit Education" : "Create New Education"}
						</h3>
						<div className="flex">
							<div>
								<div >
									<label className="block text-sm font-medium">School</label>
									<input
										type="text"
										name="school"
										value={formData.school}
										onChange={handleChange}
										className="w-full border rounded px-2 py-1 mb-3 bg-white "
									/>
								</div>
								<div>
									<label className="block text-sm font-medium">Degree</label>
									<input
										type="text"
										name="degree"
										value={formData.degree}
										onChange={handleChange}
										className="w-full border rounded px-2 py-1 mb-3 bg-white"
									/>
								</div>
								<div >
									<label className="block text-sm font-medium">Field of Study</label>
									<input
										type="text"
										name="field_of_study"
										value={formData.field_of_study}
										onChange={handleChange}
										className="w-full border rounded px-2 py-1 mb-3 bg-white"
									/>
								</div>
							</div>
							<div className="relative left-[4.75rem]">
								<label className="block text-sm font-medium">Start Date</label>
								<input
									type="text"
									name="start_date"
									value={formData.start_date}
									onChange={handleChange}
									className="w-full border rounded px-2 py-1 mb-3 bg-white"
								/>

								<label className="block text-sm font-medium">End Date</label>
								<input
									type="text"
									name="end_date"
									value={formData.end_date}
									onChange={handleChange}
									className="w-full border rounded px-2 py-1 mb-3 bg-white"
								/>

								<label className="block text-sm font-medium">Grade</label>
								<input
									type="text"
									name="grade"
									value={formData.grade}
									onChange={handleChange}
									className="w-full border rounded px-2 py-1 mb-3 bg-white"
								/>
							</div>
						</div>
						<label className="block text-sm font-medium">Activities</label>
						<textarea
							name="activities"
							value={formData.activities}
							onChange={handleChange}
							className="w-full border rounded px-2 py-1 mb-3 bg-white"
						></textarea>

						<label className="block text-sm font-medium">Description</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							className="w-full border rounded px-2 py-1 mb-3 bg-white"
						></textarea>

						<div className="flex justify-end space-x-3 mt-4">
							<button
								className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
								onClick={handleSave}
							>
								{isEditing ? "Save Changes" : "Create"}
							</button>
							<button
								className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
								onClick={handleClose}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>


		// 		<div className="px-[16px]">
		// 			<div className="relative mb-8">
		// 				<Input
		// 					height={50}
		// 					type="url"
		// 					placeholder="Bachelors"
		// 					className="p-[16px] w-full border-[1px] outline-none border-gray-200 rounded-md "
		// 				/>
		// 				<label
		// 					htmlFor=""
		// 					className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
		// 					Educations
		// 				</label>
		// 				<p className="mt-[11px] mb-0 flex justify-end">
		// 					<button className="bg-[#f07a3a] text-xs font-medium py-1 px-[6px] text-[#ffffff] rounded-sm">
		// 						CHANGE
		// 					</button>
		// 				</p>
		// 			</div>
		// 		</div>

	);
};

export default Educations;
