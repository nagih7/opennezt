import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import InputMASQ from "../../../../../components/UI/Input";
import ButtonMASQ from "../../../../../components/UI/Button";
import SelectMASQ from "../../../../../components/UI/Select";
import { Col, List, Row } from "antd";
import _ from "lodash";
import { isValidate } from "../../../../../utils/validate";
import { useDispatch, useSelector } from "react-redux";
import { handleCheckValidateConfirm } from "../../../../../utils/helper";
import { handleChangePassword, updateUser } from "../../../../../api/profile";
import { Select, Space, Input } from "antd";
import {
	setErrorChangePassword,
	setErrorInfoUser,
} from "../../../../../states/modules/profile";
import {
	listLanguage,
	listLocation,
	listCity,
} from "../../../../common/ListSelected";

function EditProfile() {
	const [dataInfoUser, setDataInfoUser] = useState({
		name: "",
		email: "",
		phone: "",
		language: "",
		region: "",
		city: "",
		facebook: "",
		linkedin: "",
	});
	const errorInfoUser = useSelector((state) => state.profile.errorInfoUser);
	const loadingBtnUpdateInfoUser = useSelector(
		(state) => state.profile.loadingBtnUpdateInfoUser
	);
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
		setDataInfoUser({
			name: authUser.name,
			email: authUser.email,
			phone: authUser.phone,
			language: authUser.language,
			region: authUser.region,
			city: authUser.city,
			facebook: authUser.facebook,
			linkedin: authUser.linkedin,
		});
		setDataChangePassword({
			currentPassword: "",
			password: "",
			confirmPassword: "",
		});
	}, [authUser]);

	const handleChangeInput = (valueInput, type, typeForm) => {
		let value = valueInput.target.value;
		let dataCloneDeep =
			typeForm === "FORM_CHANGE_PASSWORD"
				? dataChangePassword
				: dataInfoUser;
		let data = _.cloneDeep(dataCloneDeep);
		data[type] = value;
		switch (typeForm) {
			case "FORM_CHANGE_PASSWORD":
				setDataChangePassword(data);
				break;
			default:
				setDataInfoUser(data);
				break;
		}
	};

	const onChange = (event, nameSelect) => {
		if (nameSelect && nameSelect.ExpertiseTarget) {
			setDataInfoUser((prevState) => ({
				...prevState,
				areas_of_expertise: {
					...prevState.areas_of_expertise,
					[nameSelect.ExpertiseTarget]: event,
				},
			}));
		} else if (nameSelect) {
			setDataInfoUser((prevState) => ({
				...prevState,
				[nameSelect]: event,
			}));
		} else {
			const { name, value } = event.target;
			setDataInfoUser((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	const validateBlur = (type, typeForm) => {
		let data =
			typeForm === "FORM_CHANGE_PASSWORD"
				? dataChangePassword
				: dataInfoUser;
		let error =
			typeForm === "FORM_CHANGE_PASSWORD"
				? errorChangePassword
				: errorInfoUser;
		let validate = isValidate(data, type, error);
		switch (typeForm) {
			case "FORM_CHANGE_PASSWORD":
				dispatch(setErrorChangePassword(validate.error));
				break;
			default:
				dispatch(setErrorInfoUser(validate.error));
				break;
		}
		return validate.isError;
	};

	const handleConfirmSaveInfoUser = () => {
		let dataValidate = dataInfoUser;
		let validate = handleCheckValidateConfirm(dataValidate, errorInfoUser);
		dispatch(setErrorInfoUser(validate.dataError));
		if (!validate.isError) {
			dispatch(updateUser(dataInfoUser));
		}
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
				<div className={styles.label}>Personal Information</div>
			</div>
			<Row gutter={20}>
				<Col span={12}>
					<div className={`${styles.personalInformation}`}>
						<div className={styles.mainWrap}>
							<div className={styles.inputWrap}>
								<div className={styles.label}>Name *</div>
								<Input
									type={"text"}
									value={dataInfoUser.name}
									error={errorInfoUser.name}
									onBlur={() => validateBlur("name")}
									name="name"
									placeholder={"Enter name..."}
									onChange={(e) => handleChangeInput(e, "name")}
									autoSize
									required
									style={{ padding: "4px 11px", borderRadius: "8px" }}
								/>
							</div>

							<div className={styles.inputWrap}>
								<div className={styles.label}>Email *</div>
								<Input
									type={"text"}
									placeholder={"Enter email..."}
									onChange={(e) => handleChangeInput(e, "email")}
									onBlur={() => validateBlur("email")}
									value={dataInfoUser.email}
									error={errorInfoUser.email}
									autoSize
									required
									style={{ padding: "4px 11px", borderRadius: "8px" }}
								/>
							</div>

							<div className={styles.inputWrap}>
								<div className={styles.label}>Phone *</div>
								<Input
									type={"text"}
									placeholder={"Enter phone..."}
									onChange={(e) => handleChangeInput(e, "phone")}
									onBlur={() => validateBlur("phone")}
									value={dataInfoUser.phone}
									error={errorInfoUser.phone}
									autoSize
									required
									style={{ padding: "4px 11px", borderRadius: "8px" }}
								/>
							</div>
							<div className={styles.inputWrap}>
								<div className={styles.label}>Language *</div>
								<Select
									value={dataInfoUser.language}
									mode="multiple"
									style={{
										width: "100%",
									}}
									required
									size="large"
									placeholder="Select language..."
									onChange={(value) => onChange(value, "language")}
									options={listLanguage}
									optionRender={(listLanguage) => (
										<Space>
											<span
												role="img"
												aria-label={listLanguage.data.label}>
												{listLanguage.data.emoji}
											</span>
											{listLanguage.data.desc}
										</Space>
									)}
								/>
							</div>
						</div>
					</div>
				</Col>
				<Col span={12}>
					<div className={`${styles.personalInformation}`}>
						<div className={styles.mainWrap}>
							<div className={styles.inputWrap}>
								<div className={styles.label}>Region *</div>
								<Select
									required
									showSearch
									placeholder="Select region..."
									optionFilterProp="label"
									onChange={(value) => onChange(value, "region")}
									size="large"
									options={listLocation}
									style={{ width: "100%" }}
								/>
							</div>
							<div className={styles.inputWrap}>
								<div className={styles.label}>City *</div>
								<Select
									value={dataInfoUser.city}
									required
									showSearch
									placeholder="Select city..."
									optionFilterProp="label"
									onChange={(value) => onChange(value, "city")}
									size="large"
									style={{ width: "100%" }}
									options={listCity}
								/>
							</div>

							<div className={styles.inputWrap}>
								<div className={styles.label}>Facebook *</div>
								<Input
									type={"text"}
									placeholder={"Enter link facebook..."}
									onChange={(e) => handleChangeInput(e, "facebook")}
									onBlur={() => validateBlur("facebook")}
									value={dataInfoUser.facebook}
									error={errorInfoUser.facebook}
									autoSize
									required
									style={{ padding: "4px 11px", borderRadius: "8px" }}
								/>
							</div>
							<div className={styles.inputWrap}>
								<div className={styles.label}>LinkedIn *</div>
								<Input
									type={"text"}
									placeholder={"Enter linkedin..."}
									onChange={(e) => handleChangeInput(e, "linkedin")}
									onBlur={() => validateBlur("linkedin")}
									value={dataInfoUser.linkedin}
									error={errorInfoUser.linkedin}
									autoSize
									required
									style={{ padding: "4px 11px", borderRadius: "8px" }}
								/>
							</div>
						</div>
					</div>
				</Col>

				{/* <Col span={12}>
					<div className={`${styles.personalInformation}`}>
						<div className={styles.headerWrap}>
							<div className={styles.label}>Change Password</div>
						</div>
						<div className={styles.mainWrap}>
							<div className={styles.inputWrapper}>
								<div className={styles.label}>Current password *</div>
								<InputMASQ
									type={"password"}
									placeholder={"Enter current password..."}
									onChange={(e) =>
										handleChangeInput(
											e,
											"currentPassword",
											"FORM_CHANGE_PASSWORD"
										)
									}
									onBlur={() =>
										validateBlur(
											"currentPassword",
											"FORM_CHANGE_PASSWORD"
										)
									}
									value={dataChangePassword.currentPassword}
									error={errorChangePassword.currentPassword}
								/>
							</div>

							<div className={styles.inputWrapper}>
								<div className={styles.label}>New password *</div>
								<InputMASQ
									type={"password"}
									placeholder={"Enter new password..."}
									onChange={(e) =>
										handleChangeInput(
											e,
											"password",
											"FORM_CHANGE_PASSWORD"
										)
									}
									onBlur={() =>
										validateBlur("password", "FORM_CHANGE_PASSWORD")
									}
									value={dataChangePassword.password}
									error={errorChangePassword.password}
								/>
							</div>

							<div className={styles.inputWrapper}>
								<div className={styles.label}>
									Confirm new password *
								</div>
								<InputMASQ
									type={"password"}
									placeholder={"Enter confirm new password..."}
									onChange={(e) =>
										handleChangeInput(
											e,
											"confirmPassword",
											"FORM_CHANGE_PASSWORD"
										)
									}
									onBlur={() =>
										validateBlur(
											"confirmPassword",
											"FORM_CHANGE_PASSWORD"
										)
									}
									value={dataChangePassword.confirmPassword}
									error={errorChangePassword.confirmPassword}
								/>
							</div>
						</div>

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
								textBtn={"Save"}></ButtonMASQ>
						</div>
					</div>
				</Col> */}
			</Row>
			<div className={styles.btnWrap}>
				<ButtonMASQ
					onClick={() => handleConfirmSaveInfoUser()}
					loading={loadingBtnUpdateInfoUser}
					style={{
						minWidth: "80px",
						margin: "0",
						border: "none",
						padding: "8px 12px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
					textBtn={"Save"}></ButtonMASQ>
			</div>
		</div>
	);
}

export default EditProfile;
