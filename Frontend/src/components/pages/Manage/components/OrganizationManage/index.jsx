import React, { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import TableManage from '../TableManage'
import { createOrUpdateOrganization, deleteOrganization, getListOrganization } from 'api/manage'
import { setVisibleModalCreateOrUpdateOrganization, setVisibleModalDeleteOrganization } from 'store/modules/manage'
import ModalCreateOrUpdate from '../ModalCreateOrUpdate'
import { Input } from '~/components/UI/input'
import ButtonMASQ from 'components/UI/Button'
import store from '~/store'

function OrganizationManage() {
   const dispatch = useDispatch()

   const {
      // CONFIG
      organizations,
      paginationListOrganization,
      isLoadingGetListOrganization,
      visibleModalCreateOrUpdateOrganization,
      visibleModalDeleteOrganization,
      isLoadingBtnCreateOrUpdateOrganization,
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
      website: '',
      contact_email: '',
      description: '',
   })
   const [configModal, setConfigModal] = useState({
      // CONFIG
      title: 'Create organization',
      type: 'CREATE',
   })

   // useEffect(() => {
   // 	setDataCreateOrUpdate({
   // 		name: data.name,
   // 		description: data.description,
   // 	});
   // }, [data]);

   useEffect(() => {
      // CONFIG
      dispatch(getListOrganization(dataFilter))
   }, [dataFilter, dispatch])

   // CREATE
   const handleCreate = () => {
      dispatch(setVisibleModalCreateOrUpdateOrganization(true))
      setConfigModal({
         title: 'Create organization',
         type: 'CREATE',
      })
   }

   // UPDATE
   const handleUpdate = (data) => {
      let dataSelect = _.cloneDeep(data)
      setData(dataSelect)
      // CONFIG
      dispatch(setVisibleModalCreateOrUpdateOrganization(true))
      setConfigModal({
         title: 'Update organization',
         type: 'UPDATE',
      })
   }

   // DELETE
   const handleShowConfirmDelete = (data) => {
      let dataSelect = _.cloneDeep(data)
      setData(dataSelect)
      dispatch(setVisibleModalDeleteOrganization(true))
   }
   const handleConfirmDelete = async () => {
      await store.dispatch(deleteOrganization(data._id))
      await store.dispatch(getListOrganization(dataFilter))
   }

   useEffect(() => {
      // CONFIG
      setDataCreateOrUpdate({
         name: data.name,
         website: data.website,
         contact_email: data.contact_email,
         description: data.description,
      })
   }, [data])

   const handleReloadData = useCallback(() => {
      setDataCreateOrUpdate({
         // CONFIG
         name: '',
         website: '',
         contact_email: '',
         description: '',
      })
   }, [])

   const handleConfirmCreateOrUpdate = async () => {
      if (configModal.type === 'CREATE') {
         await store.dispatch(createOrUpdateOrganization(dataCreateOrUpdate, 'CREATE'))
         await store.dispatch(getListOrganization(dataFilter))
      } else {
         dispatch(await store.createOrUpdateOrganization(dataCreateOrUpdate, 'UPDATE', data._id))
         await store.dispatch(getListOrganization(dataFilter))
      }
      // }
   }

   const columns = [
      // CONFIG
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
         title: 'Website',
         dataIndex: 'website',
         key: 'website',
         render: (text, record) => <span>{record.website}</span>,
         defaultSortOrder: '',
         sorter: (a, b) => a.age - b.age,
      },
      {
         title: 'Contact email',
         dataIndex: 'contact_email',
         key: 'contact_email',
         render: (text, record) => <span>{record.contact_email}</span>,
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
                  placeholder={'Enter website...'}
                  onChange={(e) => handleChangeInput(e, 'website')}
                  // onBlur={() => validateBlur("email")}
                  value={dataCreateOrUpdate.website}
                  className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
                  // error={errorCreateOrUpdateEmployee.email}
               />
               <label
                  htmlFor=""
                  className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
               >
                  Website *
               </label>
            </div>
            <div className="relative mb-8">
               <Input
                  type={'text'}
                  placeholder={'Enter contact email...'}
                  onChange={(e) => handleChangeInput(e, 'contact_email')}
                  // onBlur={() => validateBlur("email")}
                  value={dataCreateOrUpdate.contact_email}
                  className="p-[16px] border-[1px] w-full outline-none border-gray-200 rounded-md "
                  // error={errorCreateOrUpdateEmployee.email}
               />
               <label
                  htmlFor=""
                  className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
               >
                  Contact email *
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
               <ButtonMASQ
                  textBtn={'Save'}
                  loading={isLoadingBtnCreateOrUpdateOrganization}
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
         <h1>Category management</h1>
         <TableManage
            // CONFIG
            data={data}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            handleShowConfirmDelete={handleShowConfirmDelete}
            handleConfirmDelete={handleConfirmDelete}
            columns={columns}
            dataSource={organizations}
            pagination={paginationListOrganization}
            dataFilter={dataFilter}
            setDataFilter={setDataFilter}
            loading={isLoadingGetListOrganization}
            visibleModalDelete={visibleModalDeleteOrganization}
            setVisibleModalDelete={setVisibleModalDeleteOrganization}
         />
         <ModalCreateOrUpdate
            // CONFIG
            CreateOrUpdateElement={CreateOrUpdateElement}
            configModal={configModal}
            handleReloadData={handleReloadData}
            visibleModalCreateOrUpdate={visibleModalCreateOrUpdateOrganization}
            setVisibleModalCreateOrUpdate={setVisibleModalCreateOrUpdateOrganization}
         />
      </>
   )
}

export default OrganizationManage
