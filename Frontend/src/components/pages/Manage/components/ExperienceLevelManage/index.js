import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import TableManage from "../TableManage";
import {
  createOrUpdateExperienceLevel,
  deleteExperienceLevel,
  getListExperienceLevel,
} from "api/manage";
import {
  setVisibleModalCreateOrUpdateExperienceLevel,
  setVisibleModalDeleteExperienceLevel,
} from "states/modules/manage";
import ModalCreateOrUpdate from "../ModalCreateOrUpdate";
import InputMASQ from "components/UI/Input";
import ButtonMASQ from "components/UI/Button";

function ExperienceLevelManage() {
  const dispatch = useDispatch();

  const {
    // CONFIG
    experienceLevels,
    paginationListExperienceLevel,
    isLoadingGetListExperienceLevel,
    visibleModalCreateOrUpdateExperienceLevel,
    visibleModalDeleteExperienceLevel,
    isLoadingBtnCreateOrUpdateExperienceLevel,
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
    class: "",
    name: "",
    description: "",
  });
  const [configModal, setConfigModal] = useState({
    // CONFIG
    title: "Create experience level",
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
    dispatch(getListExperienceLevel(dataFilter));
  }, [dataFilter, dispatch]);

  // CREATE
  const handleCreate = () => {
    dispatch(setVisibleModalCreateOrUpdateExperienceLevel(true));
    setConfigModal({
      title: "Create experience level",
      type: "CREATE",
    });
  };

  // UPDATE
  const handleUpdate = (data) => {
    let dataSelect = _.cloneDeep(data);
    setData(dataSelect);
    dispatch(setVisibleModalCreateOrUpdateExperienceLevel(true));
    setConfigModal({
      title: "Update experience level",
      type: "UPDATE",
    });
  };

  // DELETE
  const handleShowConfirmDelete = (data) => {
    let dataSelect = _.cloneDeep(data);
    setData(dataSelect);
    dispatch(setVisibleModalDeleteExperienceLevel(true));
  };
  const handleConfirmDelete = () => {
    // CONFIG
    dispatch(deleteExperienceLevel(data._id));
  };

  useEffect(() => {
    // CONFIG
    setDataCreateOrUpdate({
      name: data.name,
      description: data.description,
    });
  }, [data]);

  const handleReloadData = useCallback(() => {
    setDataCreateOrUpdate({
      // CONFIG
      name: "",
      description: "",
    });
  }, []);

  const handleConfirmCreateOrUpdate = () => {
    // let data = new FormData();
    // data.append(`name`, dataCreateOrUpdate.name);
    // data.append(`description`, dataCreateOrUpdate.description);

    // CONFIG
    if (configModal.type === "CREATE") {
      dispatch(createOrUpdateExperienceLevel(dataCreateOrUpdate, "CREATE"));
    } else {
      dispatch(
        createOrUpdateExperienceLevel(dataCreateOrUpdate, "UPDATE", data._id)
      );
    }
    // }
  };

  const columns = [
    // CONFIG
    {
      title: "Exp Level",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => <span>{index + 1}</span>,
      width: "5rem",
    },
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
        <div className="relative mb-8">
          <InputMASQ
            type={"text"}
            placeholder={"Enter name..."}
            onChange={(e) => handleChangeInput(e, "name")}
            // onBlur={() => validateBlur("name")}
            value={dataCreateOrUpdate.name}
            className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
            // error={errorCreateOrUpdateEmployee.name}
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
            placeholder={"Enter description..."}
            onChange={(e) => handleChangeInput(e, "description")}
            // onBlur={() => validateBlur("email")}
            value={dataCreateOrUpdate.description}
            className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
            // error={errorCreateOrUpdateEmployee.email}
          />
          <label
            htmlFor=""
            className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
          >
            Description *
          </label>
        </div>
        <div className={styles.btnWrap}>
          <ButtonMASQ
            textBtn={"Save"}
            loading={isLoadingBtnCreateOrUpdateExperienceLevel}
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
      <h1>Experience level management</h1>
      <TableManage
        // CONFIG
        data={data}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleShowConfirmDelete={handleShowConfirmDelete}
        handleConfirmDelete={handleConfirmDelete}
        columns={columns}
        dataSource={experienceLevels}
        pagination={paginationListExperienceLevel}
        dataFilter={dataFilter}
        setDataFilter={setDataFilter}
        loading={isLoadingGetListExperienceLevel}
        visibleModalDelete={visibleModalDeleteExperienceLevel}
        setVisibleModalDelete={setVisibleModalDeleteExperienceLevel}
      />
      <ModalCreateOrUpdate
        // CONFIG
        CreateOrUpdateElement={CreateOrUpdateElement}
        configModal={configModal}
        handleReloadData={handleReloadData}
        visibleModalCreateOrUpdate={visibleModalCreateOrUpdateExperienceLevel}
        setVisibleModalCreateOrUpdate={
          setVisibleModalCreateOrUpdateExperienceLevel
        }
      />
    </>
  );
}

export default ExperienceLevelManage;
