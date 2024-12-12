import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ButtonMASQ from "../../../../../components/UI/Button";
import { Col, Row } from "antd";
import InputMASQ from "../../../../../components/UI/Input";
import _ from "lodash";
import { isValidate } from "../../../../../utils/validate";
import { useDispatch, useSelector } from "react-redux";
import { handleCheckValidateConfirm } from "../../../../../utils/helper";
import { handleChangePassword } from "../../../../../api/profile";
import { setErrorChangePassword } from "../../../../../states/modules/profile";

function ChangePassword() {
	const authUser = useSelector((state) => state.auth.authUser);
	const [dataChangePassword, setDataChangePassword] = useState({
		currentPassword: "",
		password: "",
		confirmPassword: "",
	});
	const errorChangePassword = useSelector(
		(state) => state.profile.errorChangePassword
	);
	const loadingBtnChangePassword = useSelector(
		(state) => state.profile.loadingBtnChangePassword
	);
	const dispatch = useDispatch();

	useEffect(() => {
		setDataChangePassword({
			currentPassword: "",
			password: "",
			confirmPassword: "",
		});
	}, [authUser]);

	const handleChangeInput = (valueInput, type) => {
		let value = valueInput.target.value;
		let dataCloneDeep = dataChangePassword;
		let data = _.cloneDeep(dataCloneDeep);
		data[type] = value;
		setDataChangePassword(data);
	};

	const validateBlur = (type) => {
		let data = dataChangePassword;
		let error = errorChangePassword;
		let validate = isValidate(data, type, error);
		dispatch(setErrorChangePassword(validate.error));
		return validate.isError;
	};

	const handleConfirmChangePassword = () => {
		let dataValidate = dataChangePassword;
		let data = new FormData();
		data.append(`current_password`, dataChangePassword.currentPassword);
		data.append(`password`, dataChangePassword.password);
		data.append(`password_confirmation`, dataChangePassword.confirmPassword);

		let validate = handleCheckValidateConfirm(
			dataValidate,
			errorChangePassword
		);
		dispatch(setErrorChangePassword(validate.dataError));
		if (!validate.isError) {
			dispatch(handleChangePassword(data));
		}
	};

	return (
		<div className={styles.editProfile}>
			<div className={styles.headerWrap}>
				<div className={styles.label}>Change Password</div>
			</div>
			<Row gutter={20}>
				<Col span={6} />
				<Col span={12}>
					<div className={`${styles.personalInformation}`}>
						<div className={styles.mainWrap}>
							<div className={styles.inputWrap}>
								<div className={styles.label}>Current password *</div>
								<InputMASQ
									type={"password"}
									placeholder={"Enter current password..."}
									onChange={(e) =>
										handleChangeInput(e, "currentPassword")
									}
									onBlur={() => validateBlur("currentPassword")}
									value={dataChangePassword.currentPassword}
									error={errorChangePassword.currentPassword}
								/>
							</div>

							<div className={styles.inputWrap}>
								<div className={styles.label}>New password *</div>
								<InputMASQ
									type={"password"}
									placeholder={"Enter new password..."}
									onChange={(e) => handleChangeInput(e, "password")}
									onBlur={() => validateBlur("password")}
									value={dataChangePassword.password}
									error={errorChangePassword.password}
								/>
							</div>

							<div className={styles.inputWrap}>
								<div className={styles.label}>
									Confirm new password *
								</div>
								<InputMASQ
									type={"password"}
									placeholder={"Enter confirm new password..."}
									onChange={(e) =>
										handleChangeInput(e, "confirmPassword")
									}
									onBlur={() => validateBlur("confirmPassword")}
									value={dataChangePassword.confirmPassword}
									error={errorChangePassword.confirmPassword}
								/>
							</div>
						</div>
					</div>
				</Col>
				<Col span={6} />
			</Row>
			<div className={styles.btnWrap}>
				<ButtonMASQ
					onClick={() => handleConfirmChangePassword()}
					loading={loadingBtnChangePassword}
					style={{
						minWidth: "80px",
						margin: "0",
						border: "none",
						padding: "8px 12px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
					textBtn={"Save"}
				/>
			</div>
		</div>
	);
}

export default ChangePassword;
