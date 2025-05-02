import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { Button, Form, Input } from "antd";
import { resetPassword } from "../../../../api/auth";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LockResetIcon from "@mui/icons-material/LockReset";

const ResetPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { isLoadingResetPassword, resetPasswordSuccess } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (resetPasswordSuccess) {
			navigate("/login");
		}
	}, [resetPasswordSuccess, navigate]);

	// Define the function to handle the reset password
	const handleResetPassword = async (values) => {
		const queryParams = new URLSearchParams(location.search);
		const token = queryParams.get("token");

		dispatch(resetPassword(token, values.password));
	};

	return (
		<div className={styles.resetPasswordWrap}>
			<div className={styles.resetPasswordContent}>
				<LockResetIcon className={styles.icon} />

				<div className={styles.Title}>Reset Password</div>
				<Form
					className={styles.form}
					name="basic"
					layout="vertical"
					initialValues={{ remember: true }}
					onFinish={handleResetPassword}
					autoComplete="off">
					<Form.Item
						style={{ width: "25rem" }}
						label="Password"
						name="password"
						rules={[
							{ required: true, message: "Please input your password!" },
							{
								validator: async (_, value) => {
									const passwordRegex =
										/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,}$/;
									if (!passwordRegex.test(value) && value) {
										return Promise.reject(
											new Error(
												"Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
											)
										);
									}
									return Promise.resolve();
								},
							},
						]}>
						<Input.Password />
					</Form.Item>

					<Form.Item
						style={{ width: "100%" }}
						label="Confirm Password"
						name="confirmPassword"
						dependencies={["password"]} // Theo dõi trường 'password'
						rules={[
							{
								required: true,
								message: "Please confirm your password!",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("password") === value) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error("The two passwords do not match!")
									);
								},
							}),
						]}>
						<Input.Password />
					</Form.Item>

					<Button
						type="primary"
						htmlType="submit"
						loading={isLoadingResetPassword}
						style={{ width: "5rem" }}
						className={styles.btn}>
						Submit
					</Button>
				</Form>
			</div>
		</div>
	);
};

export default ResetPassword;
