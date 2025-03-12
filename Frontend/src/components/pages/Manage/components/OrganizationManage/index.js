import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import TableManage from "../TableManage";
import {
	createOrUpdateOrganization,
	deleteOrganization,
	getListOrganization,
} from "api/manage";
import {
	setVisibleModalCreateOrUpdateOrganization,
	setVisibleModalDeleteOrganization,
} from "states/modules/manage";
import ModalCreateOrUpdate from "../ModalCreateOrUpdate";
import InputMASQ from "components/UI/Input";
import ButtonMASQ from "components/UI/Button";
import SelectCustom from "components/UI/Select/index";

function OrganizationManage() {
	const dispatch = useDispatch();

	const {
		// CONFIG
		organizations,
		paginationListOrganization,
		isLoadingGetListOrganization,
		visibleModalCreateOrUpdateOrganization,
		visibleModalDeleteOrganization,
		isLoadingBtnCreateOrUpdateOrganization,
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
		website: "",
		contact_email: "",
		description: "",
	});
	const [configModal, setConfigModal] = useState({
		// CONFIG
		title: "Create organization",
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
		dispatch(getListOrganization(dataFilter));
	}, [dataFilter, dispatch]);

	// CREATE
	const handleCreate = () => {
		dispatch(setVisibleModalCreateOrUpdateOrganization(true));
		setConfigModal({
			title: "Create organization",
			type: "CREATE",
		});
	};

	// UPDATE
	const handleUpdate = (data) => {
		let dataSelect = _.cloneDeep(data);
		setData(dataSelect);
		// CONFIG
		dispatch(setVisibleModalCreateOrUpdateOrganization(true));
		setConfigModal({
			title: "Update organization",
			type: "UPDATE",
		});
	};

	// DELETE
	const handleShowConfirmDelete = (data) => {
		let dataSelect = _.cloneDeep(data);
		setData(dataSelect);
		dispatch(setVisibleModalDeleteOrganization(true));
	};
	const handleConfirmDelete = () => {
		dispatch(deleteOrganization(data._id));
	};

	useEffect(() => {
		// CONFIG
		setDataCreateOrUpdate({
			name: data.name,
			website: data.website,
			contact_email: data.contact_email,
			description: data.description,
		});
	}, [data]);

	const handleReloadData = useCallback(() => {
		setDataCreateOrUpdate({
			// CONFIG
			name: "",
			website: "",
			contact_email: "",
			description: "",
		});
	}, []);

	const handleConfirmCreateOrUpdate = () => {
		// CONFIG
		// let data = new FormData();
		// data.append(`name`, dataCreateOrUpdate.name);
		// data.append(`description`, dataCreateOrUpdate.description);

		if (configModal.type === "CREATE") {
			dispatch(createOrUpdateOrganization(dataCreateOrUpdate, "CREATE"));
		} else {
			dispatch(
				createOrUpdateOrganization(dataCreateOrUpdate, "UPDATE", data._id)
			);
		}
		// }
	};

	const columns = [
		// CONFIG
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
			title: "Website",
			dataIndex: "website",
			key: "website",
			render: (text, record) => <span>{record.website}</span>,
			defaultSortOrder: "",
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: "Contact email",
			dataIndex: "contact_email",
			key: "contact_email",
			render: (text, record) => <span>{record.contact_email}</span>,
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
					<div className={styles.label}>Website *</div>
					<InputMASQ
						type={"text"}
						placeholder={"Enter website..."}
						onChange={(e) => handleChangeInput(e, "website")}
						// onBlur={() => validateBlur("name")}
						value={dataCreateOrUpdate.website}
						// error={errorCreateOrUpdateEmployee.name}
					/>
				</div>
				<div className={styles.inputWrapper}>
					<div className={styles.label}>Contact email *</div>
					<InputMASQ
						type={"text"}
						placeholder={"Enter contact email..."}
						onChange={(e) => handleChangeInput(e, "contact_email")}
						// onBlur={() => validateBlur("name")}
						value={dataCreateOrUpdate.contact_email}
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
						loading={isLoadingBtnCreateOrUpdateOrganization}
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
			<h1>Category management</h1>
			<TableManage
				// CONFIG
				data={data}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleShowConfirmDelete={handleShowConfirmDelete}
				handleConfirmDelete={handleConfirmDelete}
				columns={columns}
				dataSource={organizations}
				pagination={paginationListOrganization}
				dataFilter={dataFilter}
				setDataFilter={setDataFilter}
				loading={isLoadingGetListOrganization}
				visibleModalDelete={visibleModalDeleteOrganization}
				setVisibleModalDelete={setVisibleModalDeleteOrganization}
			/>
			<ModalCreateOrUpdate
				// CONFIG
				CreateOrUpdateElement={CreateOrUpdateElement}
				configModal={configModal}
				handleReloadData={handleReloadData}
				visibleModalCreateOrUpdate={visibleModalCreateOrUpdateOrganization}
				setVisibleModalCreateOrUpdate={
					setVisibleModalCreateOrUpdateOrganization
				}
			/>
		</>
	);
}

export default OrganizationManage;
