import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import TableManage from "../TableManage";
import { createOrUpdateType, deleteType, getListType } from "api/manage";
import {
  setVisibleModalCreateOrUpdateType,
  setVisibleModalDeleteType,
} from "states/modules/manage";
import ModalCreateOrUpdate from "../ModalCreateOrUpdate";
import InputMASQ from "components/UI/Input";
import ButtonMASQ from "components/UI/Button";
import {
  IconlyDelete,
  IconlyEdit,
  IconlyEditSquare,
} from "components/UI/Iconly";

function TypeManage() {
  const dispatch = useDispatch();

  const {
    // CONFIG
    types,
    paginationListType,
    isLoadingGetListType,
    visibleModalCreateOrUpdateType,
    visibleModalDeleteType,
    isLoadingBtnCreateOrUpdateType,
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
    title: "Create type",
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
    dispatch(getListType(dataFilter));
  }, [dataFilter, dispatch]);

  // CREATE
  const handleCreate = () => {
    // CONFIG
    dispatch(setVisibleModalCreateOrUpdateType(true));
    setConfigModal({
      title: "Create type",
      type: "CREATE",
    });
  };

  // UPDATE
  const handleUpdate = (data) => {
    let dataSelect = _.cloneDeep(data);
    setData(dataSelect);
    // CONFIG
    dispatch(setVisibleModalCreateOrUpdateType(true));
    setConfigModal({
      title: "Update type",
      type: "UPDATE",
    });
  };

  // DELETE
  const handleShowConfirmDelete = (data) => {
    let dataSelect = _.cloneDeep(data);
    setData(dataSelect);
    dispatch(setVisibleModalDeleteType(true));
  };
  const handleConfirmDelete = () => {
    // CONFIG
    dispatch(deleteType(data._id));
  };

  useEffect(() => {
    // CONFIG
    setDataCreateOrUpdate({
      class: data.class,
      name: data.name,
      description: data.description,
    });
  }, [data]);

  const handleReloadData = useCallback(() => {
    setDataCreateOrUpdate({
      // CONFIG
      class: "",
      name: "",
      description: "",
    });
  }, []);

  const handleConfirmCreateOrUpdate = () => {
    // CONFIG
    // let data = new FormData();
    // data.append(`name`, dataCreateOrUpdate.name);
    // data.append(`description`, dataCreateOrUpdate.description);

    if (configModal.type === "CREATE") {
      dispatch(createOrUpdateType(dataCreateOrUpdate, "CREATE"));
    } else {
      dispatch(createOrUpdateType(dataCreateOrUpdate, "UPDATE", data._id));
    }
    // }
  };

  const columns = [
    // CONFIG
    {
      title: "Type",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => <span>{index + 1}</span>,
      width: "5rem",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      render: (text, record) => (
        <div className={styles.nameWrap}>
          <span>{record.class}</span>
        </div>
      ),
      defaultSortOrder: "",
      sorter: (a, b) => a.age - b.age,
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
      <div className="w-full">
        <div className="relative mb-8">
          <InputMASQ
            type={"text"}
            placeholder={"Enter class..."}
            onChange={(e) => handleChangeInput(e, "class")}
            // onBlur={() => validateBlur("name")}
            value={dataCreateOrUpdate.class}
            className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
          />
          <label
            htmlFor=""
            className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
          >
            Class *
          </label>
        </div>

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
            loading={isLoadingBtnCreateOrUpdateType}
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
    <div>
      <h1>Type management</h1>
      <TableManage
        // CONFIG
        data={data}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleShowConfirmDelete={handleShowConfirmDelete}
        handleConfirmDelete={handleConfirmDelete}
        columns={columns}
        dataSource={types}
        pagination={paginationListType}
        dataFilter={dataFilter}
        setDataFilter={setDataFilter}
        loading={isLoadingGetListType}
        visibleModalDelete={visibleModalDeleteType}
        setVisibleModalDelete={setVisibleModalDeleteType}
      />
      {/* <div className="flex justify-between border-b border-gray-200 p-8 items-center">
        <span className=" text-2xl font-medium">Type management</span>
        <div className={styles.tableActions}>
          <ButtonMASQ textBtn={"Create"} onClick={handleCreate} />
        </div>
      </div>
      <div className="p-8 w-full">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#fafafa] border-[2px] border-gray-200">
              <th className="p-3 text-center border-r-[2px] border-gray-200">
                Role
              </th>
              <th className="p-3 text-left border-r-[2px] border-gray-200">
                Class
              </th>
              <th className="p-3 text-left border-r-[2px] border-gray-200">
                Name
              </th>
              <th className="p-3 text-left border-r-[2px] border-gray-200">
                Description
              </th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type, index) => (
              <tr key={type._id} className="border-b border-gray-200">
                <td className="p-3 text-center"> {index + 1}</td>
                <td className="p-3 text-left"> {type.class}</td>
                <td className="p-3 text-left"> {type.name}</td>
                <td className="p-3 text-left"> {type.description}</td>
                <td className="flex gap-4 justify-center p-3">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleUpdate(type)}
                  >
                    <IconlyEdit color={"#000000"} size={25} />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleShowConfirmDelete(type)}
                  >
                    <IconlyDelete color={"#000000"} size={25} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <ModalCreateOrUpdate
        // CONFIG
        CreateOrUpdateElement={CreateOrUpdateElement}
        configModal={configModal}
        handleReloadData={handleReloadData}
        visibleModalCreateOrUpdate={visibleModalCreateOrUpdateType}
        setVisibleModalCreateOrUpdate={setVisibleModalCreateOrUpdateType}
      />
    </div>
  );
}

export default TypeManage;
