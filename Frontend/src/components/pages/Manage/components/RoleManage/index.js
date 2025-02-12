import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import TableManage from "../TableManage";
import { getListRole } from "api/manage";
import {
	setVisibleModalCreateOrUpdateRole,
	setVisibleModalDeleteRole,
} from "states/modules/manage";

function RoleManage() {
	const dispatch = useDispatch();

	const {
		roles,
		paginationListRole,
		isLoadingGetListRoles,
		visibleModalCreateOrUpdateRole,
		visibleModalDeleteRole,
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
		console.log("dataFilter", dataFilter);
	}, [dataFilter, dispatch]);

	const columns = [
		{
			title: "Role",
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
			dataSource={roles}
			pagination={paginationListRole}
			loading={isLoadingGetListRoles}
			visibleModalCreateOrUpdate={visibleModalCreateOrUpdateRole}
			visibleModalDelete={visibleModalDeleteRole}
			setVisibleModalCreateOrUpdate={setVisibleModalCreateOrUpdateRole}
			setVisibleModalDelete={setVisibleModalDeleteRole}
		/>
	);
}

export default RoleManage;
