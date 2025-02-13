import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import TableManage from "../TableManage";
import { getListRole } from "api/manage";
import {
	setVisibleModalCreateOrUpdateIndustry,
	setVisibleModalDeleteIndustry,
} from "states/modules/manage";

function IndustryManage() {
	const dispatch = useDispatch();

	const {
		industries,
		paginationListIndustry,
		isLoadingGetListIndustries,
		visibleModalCreateOrUpdateIndustry,
		visibleModalDeleteIndustry,
	} = useSelector((state) => state.manage);

	const [dataFilter, setDataFilter] = useState({
		keySearch: "",
		status: "",
		perPage: 10,
		page: 1,
		order: null,
		column: null,
	});

	useEffect(() => {
		dispatch(getListRole(dataFilter));
	}, [dataFilter, dispatch]);

	const columns = [
		{
			title: "Idt",
			dataIndex: "index",
			key: "index",
			render: (text, record, index) => <span>{index + 1}</span>,
			width: "5rem",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (text, record) => (
				<div className={styles.nameWrap}>
					<span>{record.name}</span>
				</div>
			),
			defaultSortOrder: "",
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			render: (text, record) => <span>{record.description}</span>,
			defaultSortOrder: "",
			sorter: (a, b) => a.age - b.age,
		},
	];

	return (
		<TableManage
			columns={columns}
			dataSource={industries}
			pagination={paginationListIndustry}
			loading={isLoadingGetListIndustries}
			visibleModalCreateOrUpdate={visibleModalCreateOrUpdateIndustry}
			visibleModalDelete={visibleModalDeleteIndustry}
			setVisibleModalCreateOrUpdate={setVisibleModalCreateOrUpdateIndustry}
			setVisibleModalDelete={setVisibleModalDeleteIndustry}
		/>
	);
}

export default IndustryManage;
