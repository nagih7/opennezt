import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import InputMASQ from "../../../../components/UI/Input";
import _ from "lodash";
import ButtonMASQ from "../../../../components/UI/Button";
import { isValidate } from "../../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../../utils/helper";

function ForgotPassword() {
	const [dataForgotPassword, setDataForgotPassword] = useState({ email: "" });
	const [errorDataForgotPassword, setErrorDataForgotPassword] = useState({
		email: "",
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		handleResetError();
	}, [dataForgotPassword]);

	const handleResetError = () => {
		setErrorDataForgotPassword({ email: "" });
	};

	const handleChangeInput = (valueInput, type) => {
		let value = valueInput.target.value;
		let data = _.cloneDeep(dataForgotPassword);
		data[type] = value;
		setDataForgotPassword(data);
	};

	const validateBlur = (type) => {
		let validate = isValidate(
			dataForgotPassword,
			type,
			errorDataForgotPassword
		);
		setErrorDataForgotPassword(validate.error);
		return validate.isError;
	};

	const handleForgotPassword = async () => {
		let validate = handleCheckValidateConfirm(
			dataForgotPassword,
			errorDataForgotPassword
		);
		setErrorDataForgotPassword(validate.dataError);

		if (!validate.isError) {
			setLoading(true);
			try {
				const response = await fetch(
					"http://localhost:3456/auth/forgot-password",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email: dataForgotPassword.email }),
					}
				);

				if (response.ok) {
					const data = await response.json();
					alert(`${data.message}`);
				} else {
					const error = await response.json();
					alert(`Failed to send email: ${error.message}`);
				}
			} catch (error) {
				alert("Something went wrong. Please try again.");
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<div className={styles.forgotPasswordWrap}>
			<div className={styles.inputWrapper}>
				<div className={styles.label}>Email *</div>
				<InputMASQ
					type={"text"}
					placeholder={"Enter email..."}
					onChange={(e) => handleChangeInput(e, "email")}
					onBlur={() => validateBlur("email")}
					value={dataForgotPassword.email}
					error={errorDataForgotPassword.email}
				/>
			</div>

			<div className={styles.btnWrap}>
				<ButtonMASQ
					textBtn={"Send email"}
					loading={loading}
					onClick={() => handleForgotPassword()}
					disable={loading}
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				/>
			</div>
		</div>
	);
}

export default ForgotPassword;
