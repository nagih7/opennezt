import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import TableManage from "../TableManage";
import { getListType } from "api/manage";
import {
	setVisibleModalCreateOrUpdateType,
	setVisibleModalDeleteType,
} from "states/modules/manage";

function TypeManage() {
	const dispatch = useDispatch();

	const {
		types,
		paginationListType,
		isLoadingGetListType,
		visibleModalCreateOrUpdateType,
		visibleModalDeleteType,
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
		dispatch(getListType(dataFilter));
		console.log("dataFilter", dataFilter);
	}, [dataFilter, dispatch]);

	const columns = [
		{
			title: "Type",
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
			title: "Class",
			dataIndex: "class",
			key: "class",
			render: (text, record) => (
				<div className={styles.nameWrap}>
					<span>{record.class}</span>
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
			dataSource={types}
			pagination={paginationListType}
			loading={isLoadingGetListType}
			visibleModalCreateOrUpdate={visibleModalCreateOrUpdateType}
			visibleModalDelete={visibleModalDeleteType}
			setVisibleModalCreateOrUpdate={setVisibleModalCreateOrUpdateType}
			setVisibleModalDelete={setVisibleModalDeleteType}
		/>
	);
}

export default TypeManage;
