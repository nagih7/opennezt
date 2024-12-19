import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import InputMASQ from "../../../../../components/UI/Input";
import ButtonMASQ from "../../../../../components/UI/Button";
import _ from "lodash";
import { isValidate } from "../../../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../../../utils/helper";
import ModalGeneral from "../../../../../components/UI/Modal/ModalGeneral";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
	setErrorCreateOrUpdateEmployee,
	setVisibleModalCreateOrUpdateEmployee,
} from "../../../../../states/modules/employee";
import {
	handleCreateEmployee,
	handleUpdateEmployee,
} from "../../../../../api/employee";

CreateOrUpdate.prototype = {
	isModalOpen: PropTypes.bool.isRequired,
	configModal: PropTypes.object.isRequired,
	onClose: PropTypes.func,
	onConfirm: PropTypes.func,
};

CreateOrUpdate.defaultProps = {
	isModalOpen: false,
	textBtnConfirm: "OK",
	configModal: {
		title: "Title",
		type: "CREATE",
	},
};

function CreateOrUpdate(props) {
	let { employee, configModal } = props;
	const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
	});
	const visibleModalCreateOrUpdateEmployee = useSelector(
		(state) => state.employee.visibleModalCreateOrUpdateEmployee
	);
	const isLoadingBtnCreateOrUpdateEmployee = useSelector(
		(state) => state.employee.isLoadingBtnCreateOrUpdateEmployee
	);
	const errorCreateOrUpdateEmployee = useSelector(
		(state) => state.employee.errorCreateOrUpdateEmployee
	);
	const dispatch = useDispatch();

	useEffect(() => {
		handleReloadData();
	}, [visibleModalCreateOrUpdateEmployee]);

	useEffect(() => {
		dispatch(
			setErrorCreateOrUpdateEmployee({
				name: "",
				email: "",
				phone: "",
				password: "",
				confirmPassword: "",
			})
		);
	}, [dataCreateOrUpdate, dispatch]);

	useEffect(() => {
		setDataCreateOrUpdate({
			name: employee.name,
			email: employee.email,
			phone: employee.phone,
		});
	}, [employee]);

	const handleReloadData = () => {
		setDataCreateOrUpdate({
			name: "",
			email: "",
			phone: "",
			password: "",
			confirmPassword: "",
		});
	};

	const handleChangeInput = (valueInput, type) => {
		let value = valueInput.target.value;
		let data = _.cloneDeep(dataCreateOrUpdate);
		data[type] = value;
		setDataCreateOrUpdate(data);
	};

	const validateBlur = (type) => {
		let validate = isValidate(
			dataCreateOrUpdate,
			type,
			errorCreateOrUpdateEmployee
		);
		dispatch(setErrorCreateOrUpdateEmployee(validate.error));
		return validate.isError;
	};

	const handleConfirmCreateOrUpdateUser = () => {
		let dataValidate = dataCreateOrUpdate;
		let data = new FormData();
		data.append(`name`, dataCreateOrUpdate.name);
		data.append(`email`, dataCreateOrUpdate.email);
		data.append(`phone`, dataCreateOrUpdate.phone);
		data.append(`status`, 1);
		if (configModal.type !== "CREATE") {
			dataValidate = {
				name: dataCreateOrUpdate.name,
				email: dataCreateOrUpdate.email,
				phone: dataCreateOrUpdate.phone,
			};
		} else {
			data.append(`password`, dataCreateOrUpdate.password);
		}

		let validate = handleCheckValidateConfirm(
			dataValidate,
			errorCreateOrUpdateEmployee
		);
		dispatch(setErrorCreateOrUpdateEmployee(validate.dataError));
		if (!validate.isError) {
			if (configModal.type === "CREATE") {
				dispatch(handleCreateEmployee(data));
			} else {
				dispatch(handleUpdateEmployee(data, employee.id));
			}
		}
	};

	return (
		<ModalGeneral
			isModalOpen={visibleModalCreateOrUpdateEmployee}
			onClose={() => dispatch(setVisibleModalCreateOrUpdateEmployee(false))}
			configModal={configModal}>
			<div className={styles.mainModalWrap}>
				<div className={styles.inputWrapper}>
					<div className={styles.label}>Name *</div>
					<InputMASQ
						type={"text"}
						placeholder={"Enter email..."}
						onChange={(e) => handleChangeInput(e, "name")}
						onBlur={() => validateBlur("name")}
						value={dataCreateOrUpdate.name}
						error={errorCreateOrUpdateEmployee.name}
					/>
				</div>

				<div className={styles.inputWrapper}>
					<div className={styles.label}>Email *</div>
					<InputMASQ
						type={"text"}
						placeholder={"Enter email..."}
						onChange={(e) => handleChangeInput(e, "email")}
						onBlur={() => validateBlur("email")}
						value={dataCreateOrUpdate.email}
						error={errorCreateOrUpdateEmployee.email}
					/>
				</div>

				<div className={styles.inputWrapper}>
					<div className={styles.label}>Phone *</div>
					<InputMASQ
						type={"text"}
						placeholder={"Enter phone..."}
						onChange={(e) => handleChangeInput(e, "phone")}
						onBlur={() => validateBlur("phone")}
						value={dataCreateOrUpdate.phone}
						error={errorCreateOrUpdateEmployee.phone}
					/>
				</div>

				{configModal.type === "CREATE" ? (
					<div className={styles.inputWrapper}>
						<div className={styles.label}>Password *</div>
						<InputMASQ
							type={"password"}
							placeholder={"Enter password..."}
							onChange={(e) => handleChangeInput(e, "password")}
							onBlur={() => validateBlur("password")}
							value={dataCreateOrUpdate.password}
							error={errorCreateOrUpdateEmployee.password}
						/>
					</div>
				) : (
					""
				)}

				{configModal.type === "CREATE" ? (
					<div className={styles.inputWrapper}>
						<div className={styles.label}>Confirm password *</div>
						<InputMASQ
							type={"password"}
							placeholder={"Enter password..."}
							onChange={(e) => handleChangeInput(e, "confirmPassword")}
							onBlur={() => validateBlur("confirmPassword")}
							value={dataCreateOrUpdate.confirmPassword}
							error={errorCreateOrUpdateEmployee.confirmPassword}
						/>
					</div>
				) : (
					""
				)}

				<div className={styles.btnWrap}>
					<ButtonMASQ
						textBtn={"Save"}
						loading={isLoadingBtnCreateOrUpdateEmployee}
						onClick={() => handleConfirmCreateOrUpdateUser()}
						disable={false}
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					/>
				</div>
			</div>
		</ModalGeneral>
	);
}

export default CreateOrUpdate;
