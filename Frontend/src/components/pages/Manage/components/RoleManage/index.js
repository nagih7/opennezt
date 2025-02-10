import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import TableCustom from "./../../../../UI/Table/index";
import InputMASQ from "./../../../../UI/Input/index";
import ButtonMASQ from "./../../../../UI/Button/index";
import IconDeleteTable from "../../../../../assets/images/icon/table/delete_14x14.svg";
import IconEditTable from "../../../../../assets/images/icon/table/edit_12x12.svg";
import SwitchMASQ from "./../../../../UI/Switch/index";
import ModalConfirm from "./../../../../UI/Modal/ModalConfirm/index";
import { useDispatch, useSelector } from "react-redux";
// import { getListEmployee, handleDeleteEmployee } from "../../../api/employee";
// import {
// 	setVisibleModalCreateOrUpdateEmployee,
// 	setVisibleModalDeleteEmployee,
// } from "../../../states/modules/employee";
import _ from "lodash";
// import Filter from "./components/Filter";
// import BtnFilter from "../../UI/ButtonFilter";
import AvatarDefault from "../../../../../assets/images/default/AvatarDefault.png";
import TableManage from "../TableManage";
import { getListRole } from "api/manage";

function RoleManage() {
	const dispatch = useDispatch();

	const { roles, paginationListRole, isLoadingGetListRoles } = useSelector(
		(state) => state.manage
	);

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
			title: "Index",
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
		// 	{
		// 		title: "Actions",
		// 		key: "action",
		// 		fixed: "right",
		// 		align: "center",
		// 		width: "10rem",
		// 		render: (text, record) => (
		// 			<>
		// 				{authUser.id !== record.id ? (
		// 					<div className={styles.btnAction}>
		// 						<div
		// 							onClick={() => handleEdit(record)}
		// 							className={styles.btnWrap}>
		// 							<img src={IconEditTable} alt="" />
		// 						</div>
		// 						{authUser.id !== record.id ? (
		// 							<div
		// 								onClick={() => handleShowConfirmDelete(record)}
		// 								className={styles.btnWrap}>
		// 								<img src={IconDeleteTable} alt="" />
		// 							</div>
		// 						) : (
		// 							""
		// 						)}
		// 						<div
		// 							className={`switch-table-style-custom ${styles.btnWrap}`}>
		// 							<SwitchMASQ disabled={true} status={record.status} />
		// 						</div>
		// 					</div>
		// 				) : (
		// 					""
		// 				)}
		// 			</>
		// 		),
		// 	},
	];

	// const [employee, setEmployee] = useState({});
	// const [configModal, setConfigModal] = useState({
	// 	title: "Create user",
	// 	type: "CREATE",
	// });

	return (
		<TableManage
			columns={columns}
			dataSource={roles}
			pagination={paginationListRole}
			loading={isLoadingGetListRoles}
		/>
	);
}

export default RoleManage;
