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
      configModal={configModal}
    >
      <div className={styles.mainModalWrap}>
        <div className="relative mb-8">
          <InputMASQ
            type={"text"}
            placeholder={"Enter name..."}
            onChange={(e) => handleChangeInput(e, "name")}
            onBlur={() => validateBlur("name")}
            value={dataCreateOrUpdate.name}
            className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
            error={errorCreateOrUpdateEmployee.name}
          />
          <label
            htmlFor=""
            className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
          >
            Name *
          </label>
        </div>

        <div className="relative mb-8">
          <InputMASQ
            type={"text"}
            placeholder={"Enter email..."}
            onChange={(e) => handleChangeInput(e, "email")}
            onBlur={() => validateBlur("email")}
            value={dataCreateOrUpdate.email}
            className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
            error={errorCreateOrUpdateEmployee.email}
          />
          <label
            htmlFor=""
            className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
          >
            Email *
          </label>
        </div>

        <div className="relative mb-8">
          <InputMASQ
            type={"text"}
            placeholder={"Enter phone..."}
            onChange={(e) => handleChangeInput(e, "phone")}
            onBlur={() => validateBlur("phone")}
            value={dataCreateOrUpdate.phone}
            className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
            error={errorCreateOrUpdateEmployee.phone}
          />
          <label
            htmlFor=""
            className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
          >
            Phone *
          </label>
        </div>

        {configModal.type === "CREATE" ? (

          <div className="relative mb-8">
            <InputMASQ
              type={"password"}
              placeholder={"Enter password..."}
              onChange={(e) => handleChangeInput(e, "password")}
              onBlur={() => validateBlur("password")}
              value={dataCreateOrUpdate.password}
              className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
              error={errorCreateOrUpdateEmployee.password}
            />
            <label
              htmlFor=""
              className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
            >
              Password *
            </label>
          </div>
        ) : (
          ""
        )}

        {configModal.type === "CREATE" ? (

          <div className="relative mb-8">
            <InputMASQ
              type={"password"}
              placeholder={"Enter password..."}
              onChange={(e) => handleChangeInput(e, "confirmPassword")}
              onBlur={() => validateBlur("confirmPassword")}
              value={dataCreateOrUpdate.confirmPassword}
              className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
              error={errorCreateOrUpdateEmployee.confirmPassword}
            />
            <label
              htmlFor=""
              className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
            >
              ConfirmPassword *
            </label>
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
