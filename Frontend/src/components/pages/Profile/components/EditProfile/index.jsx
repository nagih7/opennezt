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
import { Button } from "@chakra-ui/react";

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
      <div className="bg-[#fff] rounded-md">
        <div className="p-8 border-b-[1px] border-gray-200">
          <div className="text-2xl text-center font-medium">
            Personal Information
          </div>
        </div>
        <div className="p-8">
          <div className=" flex gap-8 items-center w-full">
            <div className="w-full">
              <div className="relative mb-8">
                <input
                  type={"text"}
                  value={dataInfoUser.name}
                  error={errorInfoUser.name}
                  onBlur={() => validateBlur("name")}
                  name="name"
                  placeholder={"Enter name..."}
                  onChange={(e) => handleChangeInput(e, "name")}
                  autoSize
                  required
                  className="p-[14px] border-[1px] w-full outline-none border-gray-200 rounded-lg "
                />
                <label
                  htmlFor=""
                  className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                >
                  Name *
                </label>
              </div>
              <div className="relative mb-8">
                <input
                  type={"text"}
                  placeholder={"Enter email..."}
                  onChange={(e) => handleChangeInput(e, "email")}
                  onBlur={() => validateBlur("email")}
                  value={dataInfoUser.email}
                  error={errorInfoUser.email}
                  autoSize
                  required
                  className="p-[14px] border-[1px] w-full outline-none border-gray-200 rounded-lg "
                />
                <label
                  htmlFor=""
                  className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                >
                  Email *
                </label>
              </div>
              <div className="relative mb-8">
                <input
                  type={"text"}
                  placeholder={"Enter phone..."}
                  onChange={(e) => handleChangeInput(e, "phone")}
                  onBlur={() => validateBlur("phone")}
                  value={dataInfoUser.phone}
                  error={errorInfoUser.phone}
                  autoSize
                  required
                  className="p-[14px] border-[1px] w-full outline-none border-gray-200 rounded-lg "
                />
                <label
                  htmlFor=""
                  className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                >
                  Phone *
                </label>
              </div>
              <div className="relative mb-8">
                <Select
                  value={dataInfoUser.language}
                  mode="multiple"
                  style={{
                    width: "100%",
                    height: "50px",
                  }}
                  required
                  size="large"
                  placeholder="Select language..."
                  onChange={(value) => onChange(value, "language")}
                  options={listLanguage}
                />
                <label
                  htmlFor=""
                  className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                >
                  Category *
                </label>
              </div>
            </div>
            <div className="w-full">
              <div className="relative mb-8">
                <Select
                  style={{
                    width: "100%",
                    height: "50px",
                  }}
                  value={dataInfoUser.region}
                  required
                  showSearch
                  placeholder="Select region..."
                  optionFilterProp="label"
                  onChange={(value) => onChange(value, "region")}
                  size="large"
                  options={listLocation}
                />
                <label
                  htmlFor=""
                  className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                >
                  Region *
                </label>
              </div>

              <div className="relative mb-8">
                <Select
                  value={dataInfoUser.city}
                  required
                  showSearch
                  placeholder="Select city..."
                  optionFilterProp="label"
                  onChange={(value) => onChange(value, "city")}
                  size="large"
                  options={listCity}
                  style={{
                    width: "100%",
                    height: "50px",
                  }}
                />
                <label
                  htmlFor=""
                  className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                >
                  City *
                </label>
              </div>
              <div className="relative mb-8">
                <input
                  type={"text"}
                  placeholder={"Enter link facebook..."}
                  onChange={(e) => handleChangeInput(e, "facebook")}
                  onBlur={() => validateBlur("facebook")}
                  value={dataInfoUser.facebook}
                  error={errorInfoUser.facebook}
                  autoSize
                  required
                  className="p-[14px] border-[1px] w-full outline-none border-gray-200 rounded-lg "
                />
                <label
                  htmlFor=""
                  className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                >
                  Facebook *
                </label>
              </div>
              <div className="relative mb-8">
                <input
                  type={"text"}
                  placeholder={"Enter linkedin..."}
                  onChange={(e) => handleChangeInput(e, "linkedin")}
                  onBlur={() => validateBlur("linkedin")}
                  value={dataInfoUser.linkedin}
                  error={errorInfoUser.linkedin}
                  autoSize
                  required
                  className="p-[14px] border-[1px] w-full outline-none border-gray-200 rounded-lg "
                />
                <label
                  htmlFor=""
                  className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                >
                  LinkedIn *
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => handleConfirmSaveInfoUser()}
              loading={loadingBtnUpdateInfoUser}
              height={50}
              className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
              borderRadius={4}
              loadingText="Loading..."
              spinnerPlacement="start"
              textBtn={" SAVE CHANGES"}
            >
              SAVE CHANGES
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
