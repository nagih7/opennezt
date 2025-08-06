import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const PaginationCustom = ({ pagination, onPageChange }) => {
	return (
		<Pagination.Root
			page={pagination.currentPage}
			count={pagination.totalRecord}
			pageSize={pagination.perPage}
			defaultPage={pagination.currentPage}
			onPageChange={onPageChange}>
			<ButtonGroup variant="outline" size="sm">
				<Pagination.PrevTrigger asChild>
					<IconButton className="hover:bg-white text-black">
						<LuChevronLeft />
					</IconButton>
				</Pagination.PrevTrigger>

				<Pagination.Items
					render={(page) => (
						<IconButton className="text-black hover:bg-white" variant={{ base: "outline", _selected: "solid" }}>
							{page.value}
						</IconButton>
					)}
				/>

				<Pagination.NextTrigger asChild>
					<IconButton className="hover:bg-white text-black">
						<LuChevronRight />
					</IconButton>
				</Pagination.NextTrigger>
			</ButtonGroup>
		</Pagination.Root>
	);
};

export default PaginationCustom;
