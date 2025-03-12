import React from "react";
import styles from "./styles.module.scss";
import TableCustom from "./../../../../UI/Table/index";
import ButtonMASQ from "./../../../../UI/Button/index";
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
