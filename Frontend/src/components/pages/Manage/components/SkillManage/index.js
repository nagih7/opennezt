import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import TableManage from "../TableManage";
import {
	createOrUpdateSkill,
	deleteSkill,
	getListSkill,
	getSkillCategories,
} from "api/manage";
import {
	setVisibleModalCreateOrUpdateSkill,
	setVisibleModalDeleteSkill,
} from "states/modules/manage";
import ModalCreateOrUpdate from "../ModalCreateOrUpdate";
import InputMASQ from "components/UI/Input";
import ButtonMASQ from "components/UI/Button";
import SelectCustom from "components/UI/Select";

function SkillManage() {
	const dispatch = useDispatch();
	const {
		// CONFIG
		skills,
		skillCategories,
		paginationListSkill,
		isLoadingGetListSkill,
		visibleModalCreateOrUpdateSkill,
		visibleModalDeleteSkill,
		isLoadingBtnCreateOrUpdateSkill,
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
		category_id: "",
		name: "",
		description: "",
	});
	const [configModal, setConfigModal] = useState({
		// CONFIG
		title: "Create skill",
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
		dispatch(getListSkill(dataFilter));
	}, [dataFilter, dispatch]);

	// CREATE
	const handleCreate = () => {
		// CONFIG
		dispatch(setVisibleModalCreateOrUpdateSkill(true));
		setConfigModal({
			title: "Create skill",
			type: "CREATE",
		});
		dispatch(getSkillCategories());
	};

	// UPDATE
	const handleUpdate = (data) => {
		let dataSelect = _.cloneDeep(data);
		setData(dataSelect);
		// CONFIG
		dispatch(setVisibleModalCreateOrUpdateSkill(true));
		setConfigModal({
			title: "Update skill",
			type: "UPDATE",
		});
	};

	// DELETE
	const handleShowConfirmDelete = (data) => {
		let dataSelect = _.cloneDeep(data);
		setData(dataSelect);
		dispatch(setVisibleModalDeleteSkill(true));
	};
	const handleConfirmDelete = () => {
		// CONFIG
		dispatch(deleteSkill(data._id));
	};

	useEffect(() => {
		// CONFIG
		setDataCreateOrUpdate({
			category_id: data.category_id,
			name: data.name,
			description: data.description,
		});
	}, [data]);

	const handleReloadData = useCallback(() => {
		setDataCreateOrUpdate({
			// CONFIG
			category_id: "",
			name: "",
			description: "",
		});
	}, []);

	const handleConfirmCreateOrUpdate = () => {
		console.log(dataCreateOrUpdate);
		// CONFIG
		// let data = new FormData();
		// data.append(`name`, dataCreateOrUpdate.name);
		// data.append(`description`, dataCreateOrUpdate.description);

		if (configModal.type === "CREATE") {
			dispatch(createOrUpdateSkill(dataCreateOrUpdate, "CREATE"));
		} else {
			dispatch(createOrUpdateSkill(dataCreateOrUpdate, "UPDATE", data._id));
		}
		// }
	};

	const columns = [
		// CONFIG
		{
			title: "Skill",
			dataIndex: "index",
			key: "index",
			render: (text, record, index) => <span>{index + 1}</span>,
			width: "5rem",
		},
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
			render: (text, record) => <span>{record.category.name}</span>,
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
		if (type === "category_id") {
			let data = _.cloneDeep(dataCreateOrUpdate);
			data[type] = valueInput.value;
			setDataCreateOrUpdate(data);
			return;
		}
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
					<div className={styles.label}>Category *</div>
					<SelectCustom
						style={{ height: "40px" }}
						value={dataCreateOrUpdate.category_id}
						onChange={(e, option) =>
							handleChangeInput(option, "category_id")
						}
						options={skillCategories.map((item) => ({
							value: item._id,
							label: item.name,
						}))}
					/>
				</div>
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
						loading={isLoadingBtnCreateOrUpdateSkill}
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
			<h1>Skill management</h1>
			<TableManage
				// CONFIG
				data={data}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleShowConfirmDelete={handleShowConfirmDelete}
				handleConfirmDelete={handleConfirmDelete}
				columns={columns}
				dataSource={skills}
				pagination={paginationListSkill}
				dataFilter={dataFilter}
				setDataFilter={setDataFilter}
				loading={isLoadingGetListSkill}
				visibleModalDelete={visibleModalDeleteSkill}
				setVisibleModalDelete={setVisibleModalDeleteSkill}
			/>
			<ModalCreateOrUpdate
				// CONFIG
				CreateOrUpdateElement={CreateOrUpdateElement}
				configModal={configModal}
				handleReloadData={handleReloadData}
				visibleModalCreateOrUpdate={visibleModalCreateOrUpdateSkill}
				setVisibleModalCreateOrUpdate={setVisibleModalCreateOrUpdateSkill}
			/>
		</>
	);
}

export default SkillManage;
