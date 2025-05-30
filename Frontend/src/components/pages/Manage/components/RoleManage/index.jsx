import React, { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import TableManage from '../TableManage'
import { createOrUpdateRole, deleteRole, getAllTypes, getListRole } from 'api/manage'
import { setVisibleModalCreateOrUpdateRole, setVisibleModalDeleteRole } from 'store/modules/manage'
import ModalCreateOrUpdate from '../ModalCreateOrUpdate'
import { Input } from '~/components/UI/input'
import { Button } from 'components/UI/button'
import SelectCustom from 'components/UI/Select/index'
import store from '~/store'

function RoleManage() {
   const dispatch = useDispatch()

   const {
      // CONFIG
      roles,
      types,
      paginationListRole,
      isLoadingGetListRole,
      visibleModalCreateOrUpdateRole,
      visibleModalDeleteRole,
      isLoadingBtnCreateOrUpdateRole,
   } = useSelector((state) => state.manage)

   const [data, setData] = useState({})
   const [dataFilter, setDataFilter] = useState({
      keySearch: '',
      status: '',
      perPage: 10,
      page: 1,
      order: null,
      column: null,
   })
   const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({
      // CONFIG
      name: '',
      description: '',
      type_id: '',
   })
   const [configModal, setConfigModal] = useState({
      title: 'Create role',
      type: 'CREATE',
   })

   useEffect(() => {
      // CONFIG
      dispatch(getListRole(dataFilter))
   }, [dataFilter, dispatch])

   useEffect(() => {
      dispatch(getAllTypes())
   }, [dispatch])

   // CREATE
   const handleCreate = () => {
      dispatch(setVisibleModalCreateOrUpdateRole(true))
      setConfigModal({
         title: 'Create role',
         type: 'CREATE',
      })
   }

   // UPDATE
   const handleUpdate = (data) => {
      let dataSelect = _.cloneDeep(data)
      setData(dataSelect)
      dispatch(setVisibleModalCreateOrUpdateRole(true))
      setConfigModal({
         title: 'Update role',
         type: 'UPDATE',
      })
   }

   // DELETE
   const handleShowConfirmDelete = (data) => {
      let dataSelect = _.cloneDeep(data)
      setData(dataSelect)
      dispatch(setVisibleModalDeleteRole(true))
   }
   const handleConfirmDelete = async () => {
      await store.dispatch(deleteRole(data._id))
      await store.dispatch(getListRole(dataFilter))
   }

   useEffect(() => {
      // CONFIG
      setDataCreateOrUpdate({
         name: data.name,
         description: data.description,
      })
   }, [data])

   const handleReloadData = useCallback(() => {
      setDataCreateOrUpdate({
         // CONFIG
         name: '',
         description: '',
         type_id: '',
      })
   }, [])

   const handleConfirmCreateOrUpdate = async () => {
      if (configModal.type === 'CREATE') {
         await store.dispatch(createOrUpdateRole(dataCreateOrUpdate, 'CREATE'))
         await store.dispatch(getListRole(dataFilter))
      } else {
         await store.dispatch(createOrUpdateRole(dataCreateOrUpdate, 'UPDATE', data._id))
      }
      await store.dispatch(getListRole(dataFilter))
   }

   const columns = [
      // CONFIG
      {
         title: 'Role',
         dataIndex: 'index',
         key: 'index',
         render: (text, record, index) => <span>{index + 1}</span>,
         width: '5rem',
      },
      {
         title: 'Name',
         dataIndex: 'name',
         key: 'name',
         render: (text, record) => (
            <div className={styles.nameWrap}>
               <span>{record.name}</span>
            </div>
         ),
         defaultSortOrder: '',
         sorter: (a, b) => a.age - b.age,
      },
      {
         title: 'Type',
         dataIndex: 'type',
         key: 'type',
         render: (text, record) => <span>{record.type}</span>,
      },
      {
         title: 'Description',
         dataIndex: 'description',
         key: 'description',
         render: (text, record) => <span>{record.description}</span>,
         defaultSortOrder: '',
         sorter: (a, b) => a.age - b.age,
      },
   ]

   const handleChangeInput = (valueInput, type) => {
      if (type === 'type_id') {
         let data = _.cloneDeep(dataCreateOrUpdate)
         data[type] = valueInput.value
         setDataCreateOrUpdate(data)
         return
      }
      let value = valueInput.target.value
      let data = _.cloneDeep(dataCreateOrUpdate)
      data[type] = value
      setDataCreateOrUpdate(data)
   }

   const CreateOrUpdateElement = () => {
      // CONFIG
      return (
         <div className={styles.mainModalWrap}>
            <div className="relative mb-8">
               <SelectCustom
                  style={{ height: '40px' }}
                  value={dataCreateOrUpdate.type_id}
                  onChange={(e, option) => handleChangeInput(option, 'type_id')}
                  options={types?.map((item) => ({
                     value: item._id,
                     label: item.name,
                  }))}
               />
               <label
                  htmlFor=""
                  className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
               >
                  Type *
               </label>
            </div>
            <div className="relative mb-8">
               <Input
                  type={'text'}
                  placeholder={'Enter name...'}
                  onChange={(e) => handleChangeInput(e, 'name')}
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
               <Input
                  type={'text'}
                  placeholder={'Enter description...'}
                  onChange={(e) => handleChangeInput(e, 'description')}
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
               <Button
                  textBtn={'Save'}
                  loading={isLoadingBtnCreateOrUpdateRole}
                  onClick={() => handleConfirmCreateOrUpdate()}
                  disable={false}
                  style={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
               />
            </div>
         </div>
      )
   }

   return (
      <>
         <h1>Role management</h1>
         <TableManage
            // CONFIG
            data={data}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            handleShowConfirmDelete={handleShowConfirmDelete}
            handleConfirmDelete={handleConfirmDelete}
            columns={columns}
            dataSource={roles}
            pagination={paginationListRole}
            dataFilter={dataFilter}
            setDataFilter={setDataFilter}
            loading={isLoadingGetListRole}
            visibleModalDelete={visibleModalDeleteRole}
            setVisibleModalDelete={setVisibleModalDeleteRole}
         />
         <ModalCreateOrUpdate
            // CONFIG
            CreateOrUpdateElement={CreateOrUpdateElement}
            configModal={configModal}
            handleReloadData={handleReloadData}
            visibleModalCreateOrUpdate={visibleModalCreateOrUpdateRole}
            setVisibleModalCreateOrUpdate={setVisibleModalCreateOrUpdateRole}
         />
      </>
   )
}

export default RoleManage
