import React, { useState } from "react";
import styles from "./styles.module.scss";
import TableCustom from "./../../../../UI/Table/index";
import InputMASQ from "./../../../../UI/Input/index";
import ButtonMASQ from "./../../../../UI/Button/index";
import IconDeleteTable from "../../../../../assets/images/icon/table/delete_14x14.svg";
import IconEditTable from "../../../../../assets/images/icon/table/edit_12x12.svg";
import ModalConfirm from "./../../../../UI/Modal/ModalConfirm/index";
import { useDispatch } from "react-redux";
import { IconlyEdit, IconlyDelete } from "components/UI/Iconly";
import _ from "lodash";
// import Filter from "components/pages/UserManagement/components/Filter";
// import BtnFilter from "components/UI/ButtonFilter";

function TableManage({
	data,
	handleCreate,
	handleUpdate,
	handleShowConfirmDelete,
	handleConfirmDelete,
	columns,
	dataSource,
	pagination,
	dataFilter,
	setDataFilter,
	loading,
	visibleModalDelete,
	setVisibleModalDelete,
}) {
	const dispatch = useDispatch();

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

	const columnsData = [
		...columns,
		{
			title: "Actions",
			key: "action",
			fixed: "right",
			align: "center",
			width: "7rem",
			render: (text, record) => (
				<>
					<div className={styles.btnAction}>
						<div
							onClick={() => handleUpdate(record)}
							className={styles.btnWrap}>
							<IconlyEdit
								size={25}
								color={"#000000"}
								className={styles.iconAction}
							/>
						</div>
						<div
							onClick={() => handleShowConfirmDelete(record)}
							className={styles.btnWrap}>
							<IconlyDelete
								size={25}
								color={"#000000"}
								className={styles.iconAction}
							/>
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
				{/* <div className={styles.boxFilterWrap}>
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
								// statusUser={dataFilter.status}
								onChangeStatus={handleChangeStatus}
							/>
						}
					/>
				</div> */}
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

			{data && (
				<ModalConfirm
					isModalOpen={visibleModalDelete}
					title={`Delete ${data.name}?`}
					description={`Are you sure you want to delete ${data.name}? Your action can not be undone.`}
					onClose={() => dispatch(setVisibleModalDelete(false))}
					onConfirm={() => handleConfirmDelete()}
				/>
			)}
		</div>
	);
}

export default TableManage;
