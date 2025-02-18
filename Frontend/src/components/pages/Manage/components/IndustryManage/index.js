import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import TableManage from "../TableManage";
import {
	// CONFIG
	createOrUpdateIndustry,
	deleteIndustry,
	getListIndustry,
} from "api/manage";
import {
	// CONFIG
	setVisibleModalCreateOrUpdateIndustry,
	setVisibleModalDeleteIndustry,
} from "states/modules/manage";
import ModalCreateOrUpdate from "../ModalCreateOrUpdate";
import InputMASQ from "components/UI/Input";
import ButtonMASQ from "components/UI/Button";

function IndustryManage() {
	const dispatch = useDispatch();

	const {
		// CONFIG
		industries,
		paginationListIndustry,
		isLoadingGetListIndustry,
		visibleModalCreateOrUpdateIndustry,
		visibleModalDeleteIndustry,
		isLoadingBtnCreateOrUpdateIndustry,
	} = useSelector((state) => state.manage);

	const [data, setData] = useState({});
	const [dataFilter, setDataFilter] = useState({
		keySearch: "",
		status: "",
		perPage: 10,
		page: 1,
		order: null,
		column: null,
	});
	const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({
		// CONFIG
		name: "",
		description: "",
	});
	const [configModal, setConfigModal] = useState({
		// CONFIG
		title: "Create industry",
		type: "CREATE",
	});

	// useEffect(() => {
	// 	setDataCreateOrUpdate({
	// 		name: data.name,
	// 		description: data.description,
	// 	});
	// }, [data]);

	useEffect(() => {
		// CONFIG
		dispatch(getListIndustry(dataFilter));
	}, [dataFilter, dispatch]);

	// CREATE
	const handleCreate = () => {
		// CONFIG
		dispatch(setVisibleModalCreateOrUpdateIndustry(true));
		setConfigModal({
			title: "Create industry",
			type: "CREATE",
		});
	};

	// UPDATE
	const handleUpdate = (data) => {
		let dataSelect = _.cloneDeep(data);
		setData(dataSelect);
		// CONFIG
		dispatch(setVisibleModalCreateOrUpdateIndustry(true));
		setConfigModal({
			title: "Update industry",
			type: "UPDATE",
		});
	};

	// DELETE
	const handleShowConfirmDelete = (data) => {
		let dataSelect = _.cloneDeep(data);
		setData(dataSelect);
		dispatch(setVisibleModalDeleteIndustry(true));
	};
	const handleConfirmDelete = () => {
		dispatch(deleteIndustry(data._id));
	};

	useEffect(() => {
		// CONFIG
		setDataCreateOrUpdate({
			name: data.name,
			description: data.description,
		});
	}, [data]);

	const handleReloadData = useCallback(() => {
		setDataCreateOrUpdate({
			// CONFIG
			name: "",
			description: "",
		});
	}, []);

	const handleConfirmCreateOrUpdate = () => {
		// let data = new FormData();
		// data.append(`name`, dataCreateOrUpdate.name);
		// data.append(`description`, dataCreateOrUpdate.description);

		if (configModal.type === "CREATE") {
			dispatch(createOrUpdateIndustry(dataCreateOrUpdate, "CREATE"));
		} else {
			dispatch(
				createOrUpdateIndustry(dataCreateOrUpdate, "UPDATE", data._id)
			);
		}
		// }
	};

	const columns = [
		// CONFIG
		{
			title: "Industry",
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

	const handleChangeInput = (valueInput, type) => {
		let value = valueInput.target.value;
		let data = _.cloneDeep(dataCreateOrUpdate);
		data[type] = value;
		setDataCreateOrUpdate(data);
	};

	const CreateOrUpdateElement = () => {
		// CONFIG
		return (
			<div className={styles.mainModalWrap}>
				<div className={styles.inputWrapper}>
					<div className={styles.label}>Name *</div>
					<InputMASQ
						type={"text"}
						placeholder={"Enter name..."}
						onChange={(e) => handleChangeInput(e, "name")}
						// onBlur={() => validateBlur("name")}
						value={dataCreateOrUpdate.name}
						// error={errorCreateOrUpdateEmployee.name}
					/>
				</div>
				<div className={styles.inputWrapper}>
					<div className={styles.label}>Description *</div>
					<InputMASQ
						type={"text"}
						placeholder={"Enter description..."}
						onChange={(e) => handleChangeInput(e, "description")}
						// onBlur={() => validateBlur("email")}
						value={dataCreateOrUpdate.description}
						// error={errorCreateOrUpdateEmployee.email}
					/>
				</div>
				<div className={styles.btnWrap}>
					<ButtonMASQ
						textBtn={"Save"}
						loading={isLoadingBtnCreateOrUpdateIndustry}
						onClick={() => handleConfirmCreateOrUpdate()}
						disable={false}
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					/>
				</div>
			</div>
		);
	};

	return (
		<>
			<h1>Industry management</h1>
			<TableManage
				data={data}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleShowConfirmDelete={handleShowConfirmDelete}
				handleConfirmDelete={handleConfirmDelete}
				columns={columns}
				dataSource={industries}
				pagination={paginationListIndustry}
				dataFilter={dataFilter}
				setDataFilter={setDataFilter}
				loading={isLoadingGetListIndustry}
				visibleModalDelete={visibleModalDeleteIndustry}
				setVisibleModalDelete={setVisibleModalDeleteIndustry}
			/>
			<ModalCreateOrUpdate
				CreateOrUpdateElement={CreateOrUpdateElement}
				configModal={configModal}
				handleReloadData={handleReloadData}
				visibleModalCreateOrUpdate={visibleModalCreateOrUpdateIndustry}
				setVisibleModalCreateOrUpdate={
					setVisibleModalCreateOrUpdateIndustry
				}
			/>
		</>
	);
}

export default IndustryManage;
