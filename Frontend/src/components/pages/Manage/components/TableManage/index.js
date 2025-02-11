import React, { useState } from "react";
import styles from "./styles.module.scss";
import TableCustom from "./../../../../UI/Table/index";
import InputMASQ from "./../../../../UI/Input/index";
import ButtonMASQ from "./../../../../UI/Button/index";
import IconDeleteTable from "../../../../../assets/images/icon/table/delete_14x14.svg";
import IconEditTable from "../../../../../assets/images/icon/table/edit_12x12.svg";
import SwitchMASQ from "./../../../../UI/Switch/index";
import ModalConfirm from "./../../../../UI/Modal/ModalConfirm/index";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import CreateOrUpdate from "components/pages/UserManagement/components/CreateOrUpdate";
// import Filter from "./components/Filter";
// import BtnFilter from "../../UI/ButtonFilter";

function TableManage({
	columns,
	dataSource,
	pagination,
	loading,
	visibleModalCreateOrUpdate,
	visibleModalDelete,
	setVisibleModalCreateOrUpdate,
	setVisibleModalDelete,
}) {
	const [data, setData] = useState({});
	const [configModal, setConfigModal] = useState({
		title: "Create user",
		type: "CREATE",
	});

	const handleCreate = () => {
		dispatch(setVisibleModalCreateOrUpdateEmployee(true));
		setConfigModal({
			title: "Create user",
			type: "CREATE",
		});
	};

	const handleEdit = (data) => {
		let dataSelect = _.cloneDeep(data);
		setData(dataSelect);
		dispatch(setVisibleModalCreateOrUpdate(true));
		setConfigModal({
			title: "Update user",
			type: "UPDATE",
		});
	};

	const handleShowConfirmDelete = (data) => {
		let dataSelect = _.cloneDeep(data);
		setData(dataSelect);
		dispatch(setVisibleModalDelete(true));
	};

	const handleConfirmDelete = () => {
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

	const columnsData = [
		...columns,
		{
			title: "Actions",
			key: "action",
			fixed: "right",
			align: "center",
			width: "10rem",
			render: (text, record) => (
				<>
					<div className={styles.btnAction}>
						<div
							onClick={() => handleEdit(record)}
							className={styles.btnWrap}>
							<img src={IconEditTable} alt="" />
						</div>
						<div
							onClick={() => handleShowConfirmDelete(record)}
							className={styles.btnWrap}>
							<img src={IconDeleteTable} alt="" />
						</div>

						{/* <div
							className={`switch-table-style-custom ${styles.btnWrap}`}>
							<SwitchMASQ disabled={true} status={record.status} />
						</div> */}
					</div>
				</>
			),
		},
	];

	return (
		<div className={styles.tableManageWrap}>
			<div className={styles.mainWrap}>
				<div className={styles.headerMainWrap}>
					<span className={styles.title}>
						Total records ({pagination.totalRecord})
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
							textBtn={"+ Create"}
						/>
					</div>
				</div>
				<div className={styles.boxFilterWrap}>
					{/* <div className={styles.inputWrap}>
						<InputMASQ
							placeholder="Search by name, email or phone"
							// value={dataFilter.keySearch}
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
					</div> */}
					{/* <BtnFilter
						content={
							<Filter
								statusUser={dataFilter.status}
								onChangeStatus={handleChangeStatus}
							/>
						}
					/> */}
				</div>
				<TableCustom
					columns={columnsData}
					loading={loading}
					dataSource={dataSource}
					rowKey={"lens_color_id"}
					pagination={pagination}
					onChangeCurrentPage={changeCurrentPage}
					onChange={onChange}
				/>
			</div>

			<CreateOrUpdate employee={data} configModal={configModal} />

			<ModalConfirm
				isModalOpen={visibleModalDelete}
				title={`Delete ${data.name}?`}
				description={`Are you sure you want to delete ${data.name}? Your action can not be undone.`}
				onClose={() => dispatch(setVisibleModalCreateOrUpdate(true))}
				onConfirm={() => handleConfirmDelete()}
			/>
		</div>
	);
}

export default TableManage;
