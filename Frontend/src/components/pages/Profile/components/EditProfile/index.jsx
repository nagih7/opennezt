import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ButtonMASQ from "../../../../../components/UI/Button";
import { Col, Row } from "antd";
import _ from "lodash";
import store from "states/configureStore";
import { isValidate } from "../../../../../utils/validate";
import { useDispatch, useSelector } from "react-redux";
import { handleCheckValidateConfirm } from "../../../../../utils/helper";
import { updateUser } from "../../../../../api/profile";
import { Select, Space, Input } from "antd";
import { setErrorInfoUser } from "../../../../../states/modules/profile";
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
	}, [authUser]);

	const handleChangeInput = (valueInput, type, typeForm) => {
		let value = valueInput.target.value;
		let dataCloneDeep = dataInfoUser;
		let data = _.cloneDeep(dataCloneDeep);
		data[type] = value;
		setDataInfoUser(data);
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

	const validateBlur = async (type) => {
		let data = dataInfoUser;
		let error = errorInfoUser;
		let validate = isValidate(data, type, error);
		await store.dispatch(setErrorInfoUser(validate.error));
		return validate.isError;
	};

	const handleConfirmSaveInfoUser = async () => {
		let dataValidate = dataInfoUser;
		let validate = handleCheckValidateConfirm(dataValidate, errorInfoUser);
		await store.dispatch(setErrorInfoUser(validate.dataError));
		if (!validate.isError) {
			store.dispatch(updateUser(dataInfoUser));
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
									value={dataInfoUser.region}
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
