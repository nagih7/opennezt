import { Button, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileCard from "../ProfileCard";
import ProfileEditMenu from "../ProfileEditMenu";
import ActionBar from "../ActionBar";

const Certifications = () => {
	// ========== STATE FROM REDUX STORE ========== //
	const { profile } = useSelector((state) => state.profile);
	// ========== STATE MANAGEMENT ========== //
	// const [formData, setFormData] = useState({
	// 	certifications: [],
	// });

	useEffect(() => {
		if (profile) {
			setFormData({
				...formData,
				industries: profile?.industries?.map((industry) => industry._id),
				experience_level: [profile?.experience_level?._id],
			});
		}
		// eslint-disable-next-line
	}, [profile]);

	// ========== HANDLE CHANGE FUNCTION ========== //
	// const handleChange = async (event, nameSelect) => {
	// 	setFormData({
	// 		...formData,
	// 		[nameSelect]: event.value,
	// 	});
	// };
	const handleSaveChanges = () => {
		console.log(formData);
	};
	const [certifications, setCertifications] = useState([
		{
			organization_id: "org-12345",
			name: "Certified React Developer",
			description: "Chứng chỉ xác nhận kỹ năng phát triển ứng dụng với React.",
			issue_date: "2024-03-01",
			expiration_date: "2026-03-01",
			is_lifetime: "no",
			verification_url: "https://certificates.example.com/verify/abc123",
			metadata: { level: 'Advanced', score: '90%' },
			profile_id: "1"
		},
	]);


	const [formData, setFormData] = useState({
		organization_id: null,
		name: "",
		description: "",
		issue_date: "",
		expiration_date: "",
		is_lifetime: false,
		verification_url: "",
		metadata: {},
		profile_id: null,
	});

	const handleCreateNew = () => {
		setFormData({
			organization_id: null,
			name: "",
			description: "",
			issue_date: "",
			expiration_date: "",
			is_lifetime: false,
			verification_url: "",
			metadata: {},
			profile_id: (certifications.length + 1).toString(),
		});

		setIsEditing(false);
		setModalOpen(true);
	};

	const handleEdit = (certification) => {
		setFormData(certification);
		setIsEditing(true);
		setModalOpen(true);
	};

	const handleSave = () => {
		if (isEditing) {
			setCertifications((prev) =>
				prev.map((cert) => (cert.profile_id === formData.profile_id ? formData : cert))
			);
		} else {
			setCertifications([...certifications, formData]);
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

	const [isEditing, setIsEditing] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
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
							<h4 className="">Certifications</h4>
						</div>
						<button onClick={handleCreateNew}><div className="bg-[#2F65B9] text-white w-[6.75rem] h-[2.75rem] rounded-[0.25rem] pt-[0.5rem]">Create new</div></button>
					</div>
					<div>
						<div className="px-[16px]">
							{/* <div className="relative mb-8">
								<Input
									height={50}
									type="url"
									placeholder="Professional Certifications, Bootcamps"
									className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
								/>
								<label
									htmlFor=""
									className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
									Certifications
								</label>
								<p className="mt-[11px] mb-0 flex justify-end">
									<button className="bg-[#f07a3a] text-xs font-medium py-1 px-[6px] text-[#ffffff] rounded-sm">
										CHANGE
									</button>
								</p>
							</div> */}
							<div>
								{certifications.map((ceitification, index) => (
									<div key={index}>
										<div className="bg-[#F4F2EE] rounded-[0.6rem]">
											<div className="p-4 ">
												<svg onClick={handleEdit} className="cursor-pointer relative left-[56.25rem]" xmlns="http://www.w3.org/2000/svg" version="1.1" id="mdi-pencil-outline" width="24" height="24" viewBox="0 0 24 24"><path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" /></svg>
												<h4 className="flex font-bold">{ceitification.name}</h4>
												<p className="relative text-[#9B9B9B] top-[-1rem] left-[-0.1rem] text-[1rem]">{ceitification.issue_date} - {ceitification.expiration_date}</p>

												<p className="flex "> Desciption: {ceitification.description}</p>

												<p className="flex "> Life time :{ceitification.is_lifetime}</p>

												<p className="flex "><a>Website :{ceitification.verification_url}</a></p>
												<div className="flex">
													<p>Information of certificates : </p>
													<p className="flex ml-2">{ceitification.metadata.level}</p>
													<p className="flex ml-3">{ceitification.metadata.score}</p>
												</div>

											</div>
										</div>
									</div>
								))

								}
							</div>
						</div>
						{/* <div className="px-[16px] flex justify-end">
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
					</div>
				</div>
			</div>
			{modalOpen && (
				<div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 bg-[#777778] z-[9999]">
					<div className="bg-white p-6 rounded-lg shadow-lg w-[32rem] z-20">
						<h3 className="text-lg font-semibold mb-4">
							{isEditing ? "Edit Certification" : "Create New Certification"}
						</h3>

						<div className="flex">
							<div>
								<div>
									<label className="block text-sm font-medium">Certification Name</label>
									<input
										type="text"
										name="name"
										value={formData.name}
										onChange={handleChange}
										className="w-full border rounded px-2 py-1 mb-3 bg-white"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium">Issuing Organization</label>
									<input
										type="text"
										name="organization_id"
										value={formData.organization_id}
										onChange={handleChange}
										className="w-full border rounded px-2 py-1 mb-3 bg-white"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium">Issue Date</label>
									<input
										type="date"
										name="issue_date"
										value={formData.issue_date}
										onChange={handleChange}
										className="w-full border rounded px-2 py-1 mb-3 bg-white"
									/>
								</div>
							</div>

							<div className="relative left-[4.75rem]">
								<label className="block text-sm font-medium">Expiration Date</label>
								<input
									type="date"
									name="expiration_date"
									value={formData.expiration_date}
									onChange={handleChange}
									disabled={formData.is_lifetime} // Disable nếu chứng chỉ vĩnh viễn
									className="w-full border rounded px-2 py-1 mb-3 bg-white"
								/>

								<div className="flex items-center space-x-2">
									<input
										type="checkbox"
										name="is_lifetime"
										checked={formData.is_lifetime}
										onChange={(e) =>
											setFormData({ ...formData, is_lifetime: e.target.checked, expiration_date: "" })
										}
									/>
									<label className="text-sm font-medium">Lifetime Certification</label>
								</div>

								<label className="block text-sm font-medium">Verification URL</label>
								<input
									type="text"
									name="verification_url"
									value={formData.verification_url}
									onChange={handleChange}
									className="w-full border rounded px-2 py-1 mb-3 bg-white"
								/>
							</div>
						</div>

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
		// 					placeholder="Professional Certifications, Bootcamps"
		// 					className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
		// 				/>
		// 				<label
		// 					htmlFor=""
		// 					className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
		// 					Certifications
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

export default Certifications;
