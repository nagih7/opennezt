import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import InputMASQ from '../../../../components/UI/Input';
import _ from 'lodash';
import ButtonMASQ from '../../../../components/UI/Button';
import { useNavigate } from 'react-router-dom';
import { isValidate } from '../../../../utils/validate';
import { handleCheckValidateConfirm } from '../../../../utils/helper';
import { register } from '../../../../api/auth';
import { useSelector, useDispatch } from 'react-redux';
import Logo from '../../../../assets/images/logo/opennezt_black.png';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
    const [dataRegister, setDataRegister] = useState({
        name: '',
        email: '',
        // phone: "",
        password: '',
        confirmPassword: '',
    });
    const [errorDataRegister, setErrorDataRegister] = useState({
        name: '',
        email: '',
        // phone: "",
        password: '',
        confirmPassword: '',
    });
    const { isLoadingRegister, authRegister } = useSelector((state) => state.auth);

    useEffect(() => {
        if (authRegister && authRegister.email) {
            setIsRegisterSuccess(true);
        }
    }, [authRegister]);

    useEffect(() => {
        if (isRegisterSuccess === true) {
            navigate('/verify-authentication');
        }
    }, [isRegisterSuccess, navigate]);

    useEffect(() => {
        handleResetError();
    }, [dataRegister]);

    const handleChangeInput = (valueInput, type) => {
        let value = valueInput.target.value;
        let data = _.cloneDeep(dataRegister);
        data[type] = value;
        setDataRegister(data);
    };

    const handleResetError = () => {
        setErrorDataRegister({
            email: '',
            // phone: "",
            password: '',
            confirmPassword: '',
        });
    };

    const validateBlur = (type) => {
        let validate = isValidate(dataRegister, type, errorDataRegister);
        setErrorDataRegister(validate.error);
        return validate.isError;
    };

    const handleConfirmRegister = async () => {
        let validate = handleCheckValidateConfirm(dataRegister, errorDataRegister);
        setErrorDataRegister(validate.dataError);
        if (!validate.isError) {
            dispatch(register(dataRegister));

            // Check register success
            await handleCheckRegisterSuccess();
        }
    };

    return (
        <div className={styles.registerWrap}>
            <div className={styles.registerHeaderWrap}>
                <div className={styles.logo}>
                    <img src={Logo} alt="logo-opennezt" />
                </div>
                <h1 className={styles.title}>Register</h1>
            </div>
            <div className={styles.registerContent}>
                <div className={styles.inputWrapper}>
                    <div className={styles.label}>Full name *</div>
                    <InputMASQ
                        type={'text'}
                        placeholder={'Enter name...'}
                        onChange={(e) => handleChangeInput(e, 'name')}
                        onBlur={() => validateBlur('name')}
                        value={dataRegister.name}
                        error={errorDataRegister.name}
                    />
                </div>

                <div className={styles.inputWrapper}>
                    <div className={styles.label}>Email *</div>
                    <InputMASQ
                        type={'text'}
                        placeholder={'Enter email...'}
                        onChange={(e) => handleChangeInput(e, 'email')}
                        onBlur={() => validateBlur('email')}
                        value={dataRegister.email}
                        error={errorDataRegister.email}
                    />
                </div>

                {/* <div className={styles.inputWrapper}>
					<div className={styles.label}>Phone *</div>
					<InputMASQ
						type={"text"}
						placeholder={"Enter phone..."}
						onChange={(e) => handleChangeInput(e, "phone")}
						onBlur={() => validateBlur("phone")}
						value={dataRegister.phone}
						error={errorDataRegister.phone}
					/>
				</div> */}

                <div className={styles.inputWrapper}>
                    <div className={styles.label}>Password *</div>
                    <InputMASQ
                        type={'password'}
                        placeholder={'******'}
                        value={dataRegister.password}
                        onChange={(e) => handleChangeInput(e, 'password')}
                        onBlur={() => validateBlur('password')}
                        error={errorDataRegister.password}
                    />
                </div>

                <div className={styles.inputWrapper}>
                    <div className={styles.label}>Confirm password *</div>
                    <InputMASQ
                        type={'password'}
                        placeholder={'******'}
                        value={dataRegister.confirmPassword}
                        onChange={(e) => handleChangeInput(e, 'confirmPassword')}
                        onBlur={() => validateBlur('confirmPassword')}
                        error={errorDataRegister.confirmPassword}
                    />
                </div>

                <div className={styles.btnWrap} style={{ marginTop: '1.5rem' }}>
                    <ButtonMASQ
                        textBtn={'Register'}
                        loading={isLoadingRegister}
                        onClick={() => handleConfirmRegister()}
                        disable={false}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    />
                </div>

                <div className={styles.btnSwitchWrap}>
                    <div onClick={() => navigate('/login')} className={styles.btnRegister}>
                        Already have an account, <span className={styles.text}>login</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
