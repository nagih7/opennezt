import { Button, Input, Popover, Portal, Text } from "@chakra-ui/react";
import { SearchOutlined } from "@mui/icons-material";
import { seekProjects } from "api/project";
import { IconlyFilter } from "components/UI/Iconly";
import SelectCustom from "components/UI/SelectCustom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Filter from "./../../../UserManagement/components/Filter/index";

const FilterHeader = ({ action, setAction }) => {
	const dispatch = useDispatch();
	// ========== USE EFFECT ========== //
	useEffect(() => {
		dispatch(seekProjects());
	}, [dispatch]);

	return (
		<div className="flex flex-col items-center justify-between gap-4 p-4 ml-0 bg-white border rounded-lg shadow-sm md:flex-row">
			<div className="flex flex-1 text-lg text-gray-600">
				{/* <div className="flex">All Projects</div> */}
				<Popover.Root>
					<Popover.Trigger asChild>
						<Button
							size="sm"
							variant="outline"
							className="bg-[#2F65B9] px-4 py-2 text-white  rounded-sm">
							Filter{" "}
							<span>
								<IconlyFilter size={24} color={"white"} />
							</span>
						</Button>
					</Popover.Trigger>
					<Portal>
						<Popover.Positioner>
							<Popover.Content>
								<Popover.Arrow />
								<Popover.Body>
									<SelectCustom height="40px" />
								</Popover.Body>
							</Popover.Content>
						</Popover.Positioner>
					</Portal>
				</Popover.Root>
			</div>

			<div className="flex gap-2 md:w-auto">
				<div className="flex items-center">
					<input
						height={"100%"}
						type="text"
						placeholder="Search project..."
						className="px-4 py-2 outline-none w-64 bg-white border rounded-sm md:w-[13rem]"
					/>
					<button className="bg-[#2F65B9] px-4 py-2 text-white  rounded-sm">
						<SearchOutlined />
					</button>
				</div>
				<button
					onClick={() => setAction("grid")}
					className={`px-2 py-2 rounded ${
						action === "grid"
							? "bg-blue-500 text-white"
							: "bg-gray-300 text-black"
					}`}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						className="bi bi-grid"
						viewBox="0 0 16 16">
						{" "}
						<path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
					</svg>
				</button>
				<button
					onClick={() => setAction("list")}
					className={`px-2 py-2 rounded ${
						action === "list"
							? "bg-blue-500 text-white"
							: "bg-gray-300 text-black"
					}`}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						viewBox="0 0 24 24"
						width="24">
						<path d="M0 0h24v24H0V0z" fill="none" />
						<path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
					</svg>
				</button>
			</div>
		</div>
	);
};

export default FilterHeader;
