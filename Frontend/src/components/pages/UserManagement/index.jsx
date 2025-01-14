import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import TableCustom from "../../../components/UI/Table";
import InputMASQ from "../../../components/UI/Input";
import ButtonMASQ from "../../../components/UI/Button";
import IconDeleteTable from "../../../assets/images/icon/table/delete_14x14.svg";
import IconEditTable from "../../../assets/images/icon/table/edit_12x12.svg";
import SwitchMASQ from "../../../components/UI/Switch";
import CreateOrUpdate from "./components/CreateOrUpdate";
import ModalConfirm from "../../../components/UI/Modal/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import { getListEmployee, handleDeleteEmployee } from "../../../api/employee";
import {
	setVisibleModalCreateOrUpdateEmployee,
	setVisibleModalDeleteEmployee,
} from "../../../states/modules/employee";
import _ from "lodash";
import Filter from "./components/Filter";
import BtnFilter from "../../UI/ButtonFilter";
import AvatarDefault from "../../../assets/images/default/AvatarDefault.png";

function UserManagement() {
	const authUser = useSelector((state) => state.auth.authUser);
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (text, record) => (
				<div className={styles.nameWrap}>
					<div className={styles.imgWrap}>
						<img
							src={record.avatar || AvatarDefault}
							alt={record.name}
							onError={(e) => {
								e.target.onerror = null;
								e.target.src = AvatarDefault;
							}}
						/>
					</div>
					<span>{record.name}</span>
				</div>
			),
			defaultSortOrder: "",
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			render: (text, record) => <span>{record.email}</span>,
			defaultSortOrder: "",
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
			render: (text, record) => <span>{record.phone}</span>,
			defaultSortOrder: "",
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: "Actions",
			key: "action",
			fixed: "right",
			align: "center",
			width: "10rem",
			render: (text, record) => (
				<>
					{authUser.id !== record.id ? (
						<div className={styles.btnAction}>
							<div
								onClick={() => handleEdit(record)}
								className={styles.btnWrap}>
								<img src={IconEditTable} alt="" />
							</div>
							{authUser.id !== record.id ? (
								<div
									onClick={() => handleShowConfirmDelete(record)}
									className={styles.btnWrap}>
									<img src={IconDeleteTable} alt="" />
								</div>
							) : (
								""
							)}
							<div
								className={`switch-table-style-custom ${styles.btnWrap}`}>
								<SwitchMASQ disabled={true} status={record.status} />
							</div>
						</div>
					) : (
						""
					)}
				</>
			),
		},
	];
	const employees = useSelector((state) => state.employee.employees);

	const isLoadingTableEmployee = useSelector(
		(state) => state.employee.isLoadingTableEmployee
	);
	const paginationListEmployee = useSelector(
		(state) => state.employee.paginationListEmployee
	);
	const visibleModalDeleteEmployee = useSelector(
		(state) => state.employee.visibleModalDeleteEmployee
	);
	const [employee, setEmployee] = useState({});
	const [configModal, setConfigModal] = useState({
		title: "Create user",
		type: "CREATE",
	});
	const [dataFilter, setDataFilter] = useState({
		keySearch: "",
		status: "",
		perPage: 10,
		page: 1,
		order: null,
		column: null,
	});
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getListEmployee(dataFilter));
	}, [dataFilter, dispatch]);

	const handleCreate = () => {
		dispatch(setVisibleModalCreateOrUpdateEmployee(true));
		setConfigModal({
			title: "Create user",
			type: "CREATE",
		});
	};

	const handleEdit = (employee) => {
		let employeeSelect = _.cloneDeep(employee);
		setEmployee(employeeSelect);
		dispatch(setVisibleModalCreateOrUpdateEmployee(true));
		setConfigModal({
			title: "Update user",
			type: "UPDATE",
		});
	};

	const handleShowConfirmDelete = (employee) => {
		let employeeSelect = _.cloneDeep(employee);
		setEmployee(employeeSelect);
		dispatch(setVisibleModalDeleteEmployee(true));
	};

	const handleConfirmDeleteEmployee = () => {
		dispatch(handleDeleteEmployee(employee.id));
	};

	const changeCurrentPage = (page) => {
		setDataFilter({ ...dataFilter, page: page });
	};

	const handleSearch = (e) => {
		setDataFilter({ ...dataFilter, keySearch: e.target.value });
	};

	const onChange = (pagination, filters, sorter) => {
		if (sorter.order && sorter.field) {
			setDataFilter({
				...dataFilter,
				order: sorter.order === "descend" ? -1 : 1,
				column: sorter.field,
			});
		} else {
			setDataFilter({ ...dataFilter, order: null, column: null });
		}
	};

	const handleChangeStatus = (value) => {
		setDataFilter({ ...dataFilter, status: value.toString() });
	};

	return (
		<div className={styles.userManagementWrap}>
			<div className={styles.mainWrap}>
				<div className={styles.headerMainWrap}>
					<span className={styles.title}>
						Total records ({paginationListEmployee.totalRecord})
					</span>
					<div className={styles.btnWrap}>
						<ButtonMASQ
							onClick={() => handleCreate()}
							style={{
								minWidth: "80px",
								margin: "0",
								border: "none",
								padding: "8px 12px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
							textBtn={"+ Create"}></ButtonMASQ>
					</div>
				</div>
				<div className={styles.boxFilterWrap}>
					<div className={styles.inputWrap}>
						<InputMASQ
							placeholder="Search by name, email or phone"
							value={dataFilter.keySearch}
							onChange={(e) => handleSearch(e)}
						/>
						<svg
							className={styles.iconSearch}
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<g>
								<path
									d="M11.78 9.97 9.75 7.94c.473-.788.75-1.707.75-2.69A5.256 5.256 0 0 0 5.25 0 5.256 5.256 0 0 0 0 5.25a5.256 5.256 0 0 0 5.25 5.25c.984 0 1.902-.277 2.69-.75l2.03 2.03a.748.748 0 0 0 1.06 0l.75-.75a.749.749 0 0 0 0-1.06ZM5.25 9a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5Z"
									fill="#3D4667"
								/>
							</g>
							<defs>
								<clipPath id="a">
									<path fill="#fff" d="M0 0h12v12H0z" />
								</clipPath>
							</defs>
						</svg>
					</div>
					<BtnFilter
						content={
							<Filter
								statusUser={dataFilter.status}
								onChangeStatus={handleChangeStatus}
							/>
						}
					/>
				</div>
				<TableCustom
					loading={isLoadingTableEmployee}
					columns={columns}
					dataSource={employees}
					rowKey={"lens_color_id"}
					pagination={paginationListEmployee}
					onChangeCurrentPage={changeCurrentPage}
					onChange={onChange}
				/>
			</div>

			<CreateOrUpdate employee={employee} configModal={configModal} />

			<ModalConfirm
				isModalOpen={visibleModalDeleteEmployee}
				title={`Delete ${employee.name}?`}
				description={`Are you sure you want to delete ${employee.name}? Your action can not be undone.`}
				onClose={() => dispatch(setVisibleModalDeleteEmployee(true))}
				onConfirm={() => handleConfirmDeleteEmployee()}
			/>
		</div>
	);
}

export default UserManagement;
