import React, { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import TableManage from '../TableManage'
import {
   // CONFIG
   createOrUpdateIndustry,
   deleteIndustry,
   getListIndustry,
} from 'api/manage'
import {
   // CONFIG
   setVisibleModalCreateOrUpdateIndustry,
   setVisibleModalDeleteIndustry,
} from 'store/modules/manage'
import ModalCreateOrUpdate from '../ModalCreateOrUpdate'
import { Input } from '~/components/UI/input'
import { Button } from 'components/UI/button'
import store from '~/store'

function IndustryManage() {
   const dispatch = useDispatch()

   const {
      // CONFIG
      industries,
      paginationListIndustry,
      isLoadingGetListIndustry,
      visibleModalCreateOrUpdateIndustry,
      visibleModalDeleteIndustry,
      isLoadingBtnCreateOrUpdateIndustry,
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
   })
   const [configModal, setConfigModal] = useState({
      // CONFIG
      title: 'Create industry',
      type: 'CREATE',
   })

   useEffect(() => {
      // CONFIG
      dispatch(getListIndustry(dataFilter))
   }, [dataFilter, dispatch])

   // CREATE
   const handleCreate = () => {
      // CONFIG
      dispatch(setVisibleModalCreateOrUpdateIndustry(true))
      setConfigModal({
         title: 'Create industry',
         type: 'CREATE',
      })
   }

   // UPDATE
   const handleUpdate = (data) => {
      let dataSelect = _.cloneDeep(data)
      setData(dataSelect)
      // CONFIG
      dispatch(setVisibleModalCreateOrUpdateIndustry(true))
      setConfigModal({
         title: 'Update industry',
         type: 'UPDATE',
      })
   }

   // DELETE
   const handleShowConfirmDelete = (data) => {
      let dataSelect = _.cloneDeep(data)
      setData(dataSelect)
      dispatch(setVisibleModalDeleteIndustry(true))
   }
   const handleConfirmDelete = async () => {
      await store.dispatch(deleteIndustry(data._id))
      await store.dispatch(getListIndustry(dataFilter))
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
      })
   }, [])

   const handleConfirmCreateOrUpdate = async () => {
      if (configModal.type === 'CREATE') {
         await store.dispatch(createOrUpdateIndustry(dataCreateOrUpdate, 'CREATE'))
         await store.dispatch(getListIndustry(dataFilter))
      } else {
         await store.dispatch(createOrUpdateIndustry(dataCreateOrUpdate, 'UPDATE', data._id))
         await store.dispatch(getListIndustry(dataFilter))
      }
      // }
   }

   const columns = [
      // CONFIG
      {
         title: 'Industry',
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
         title: 'Description',
         dataIndex: 'description',
         key: 'description',
         render: (text, record) => <span>{record.description}</span>,
         defaultSortOrder: '',
         sorter: (a, b) => a.age - b.age,
      },
   ]

   const handleChangeInput = (valueInput, type) => {
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
                  loading={isLoadingBtnCreateOrUpdateIndustry}
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
         <h1>Industry management</h1>
         <TableManage
            data={data}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            handleShowConfirmDelete={handleShowConfirmDelete}
            handleConfirmDelete={handleConfirmDelete}
            columns={columns}
            dataSource={industries}
            pagination={paginationListIndustry}
            dataFilter={dataFilter}
            setDataFilter={setDataFilter}
            loading={isLoadingGetListIndustry}
            visibleModalDelete={visibleModalDeleteIndustry}
            setVisibleModalDelete={setVisibleModalDeleteIndustry}
         />
         <ModalCreateOrUpdate
            CreateOrUpdateElement={CreateOrUpdateElement}
            configModal={configModal}
            handleReloadData={handleReloadData}
            visibleModalCreateOrUpdate={visibleModalCreateOrUpdateIndustry}
            setVisibleModalCreateOrUpdate={setVisibleModalCreateOrUpdateIndustry}
         />
      </>
   )
}

export default IndustryManage
