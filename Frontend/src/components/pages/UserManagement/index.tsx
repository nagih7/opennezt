import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import TableCustom from '../../../components/UI/Table'
import ButtonMASQ from '../../../components/UI/Button'
import SwitchMASQ from '../../../components/UI/Switch'
import CreateOrUpdate from './components/CreateOrUpdate'
import ModalConfirm from '../../../components/UI/Modal/ModalConfirm'
import { useDispatch, useSelector } from 'react-redux'
import { getListEmployee, handleDeleteEmployee } from '../../../api/employee'
import { setVisibleModalCreateOrUpdateEmployee, setVisibleModalDeleteEmployee } from '../../../store/modules/employee'
import _ from 'lodash'
import Filter from './components/Filter'
import BtnFilter from '../../UI/ButtonFilter'
import AvatarDefault from '../../../assets/images/default/AvatarDefault.png'
import { IconlyDelete, IconlyEdit } from 'components/UI/Iconly'
import type { Dispatch } from '@reduxjs/toolkit'

interface Employee {
  id: string;
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  is_active: boolean;
  status: boolean;
}

interface DataFilter {
  keySearch: string;
  status: string;
  perPage: number;
  page: number;
  order: number | null;
  column: string | null;
}

interface ConfigModal {
  title: string;
  type: 'CREATE' | 'UPDATE';
}

function UserManagement() {
   const dispatch = useDispatch<Dispatch<any>>()

   const authUser = useSelector((state: any) => state.auth.authUser)
   const { users, isLoadingGetListUser, paginationListUser, visibleModalDeleteUser, isLoadingBtnDeleteEmployee } = useSelector(
      (state: any) => state.employee
   )

   const [employee, setEmployee] = useState<Employee>({} as Employee)
   const [configModal, setConfigModal] = useState<ConfigModal>({
      title: 'Create user',
      type: 'CREATE',
   })
   const [dataFilter, setDataFilter] = useState<DataFilter>({
      keySearch: '',
      status: '',
      perPage: 10,
      page: 1,
      order: null,
      column: null,
   })

   useEffect(() => {
      dispatch(getListEmployee(dataFilter))
   }, [dataFilter, dispatch])

   const handleCreate = (): void => {
      dispatch(setVisibleModalCreateOrUpdateEmployee(true))
      setConfigModal({
         title: 'Create user',
         type: 'CREATE',
      })
   }

   const handleEdit = (employee: Employee): void => {
      let employeeSelect = _.cloneDeep(employee)
      setEmployee(employeeSelect)
      dispatch(setVisibleModalCreateOrUpdateEmployee(true))
      setConfigModal({
         title: 'Update user',
         type: 'UPDATE',
      })
   }

   const handleShowConfirmDelete = (employee: Employee): void => {
      let employeeSelect = _.cloneDeep(employee)
      setEmployee(employeeSelect)
      dispatch(setVisibleModalDeleteEmployee(true))
   }

   const handleConfirmDeleteEmployee = (): void => {
      if (employee?._id) {
         dispatch(handleDeleteEmployee(employee._id))
      }
   }

   const handleCloseDeleteModal = (): void => {
      dispatch(setVisibleModalDeleteEmployee(false))
      setEmployee({} as Employee)
   }

   const changeCurrentPage = (page: number): void => {
      setDataFilter({ ...dataFilter, page: page })
   }

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setDataFilter({ ...dataFilter, keySearch: e.target.value })
   }

   const onChange = (_pagination: any, _filters: any, sorter: any): void => {
      if (sorter.order && sorter.field) {
         setDataFilter({
            ...dataFilter,
            order: sorter.order === 'descend' ? -1 : 1,
            column: sorter.field,
         })
      } else {
         setDataFilter({ ...dataFilter, order: null, column: null })
      }
   }

   const handleChangeStatus = (value: string): void => {
      setDataFilter({ ...dataFilter, status: value.toString() })
   }

   // Columns for table
   const columns = [
      {
         title: 'Name',
         dataIndex: 'name',
         key: 'name',
         render: (_text: string, record: Employee) => (
            <div className={styles.nameWrap}>
               <div className={styles.imgWrap}>
                  <img
                     src={record.avatar || AvatarDefault}
                     alt={record.name}
                     onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = AvatarDefault
                     }}
                  />
               </div>
               <span>{record.name}</span>
            </div>
         ),
         defaultSortOrder: '',
         sorter: (a: Employee, b: Employee) => a.name.localeCompare(b.name),
      },
      {
         title: 'Email',
         dataIndex: 'email',
         key: 'email',
         render: (_text: string, record: Employee) => <span>{record.email}</span>,
         defaultSortOrder: '',
         sorter: (a: Employee, b: Employee) => a.email.localeCompare(b.email),
      },
      {
         title: 'Phone',
         dataIndex: 'phone',
         key: 'phone',
         render: (_text: string, record: Employee) => <span>{record.phone}</span>,
         defaultSortOrder: '',
         sorter: (a: Employee, b: Employee) => a.phone.localeCompare(b.phone),
      },
      {
         title: 'Active',
         dataIndex: 'active',
         key: 'active',
         render: (_text: string, record: Employee) => <span>{record.is_active ? 'Active' : 'Inactive'}</span>,
         defaultSortOrder: '',
         sorter: (a: Employee, b: Employee) => Number(a.is_active) - Number(b.is_active),
      },
      {
         title: 'Actions',
         key: 'action',
         fixed: 'right',
         align: 'center',
         width: '10rem',
         render: (_text: string, record: Employee) => (
            <>
               {authUser._id !== record._id ? (
                  <div className="flex justify-center gap-4 p-3">
                     <div onClick={() => handleEdit(record)} className="cursor-pointer">
                        <IconlyEdit color={'#000000'} size={25} backgroundColor={'#000000'} />
                     </div>
                     <div 
                        onClick={(e) => {
                           e.preventDefault();
                           e.stopPropagation();
                           handleShowConfirmDelete(record);
                        }} 
                        className="cursor-pointer"
                     >
                        <IconlyDelete color={'#000000'} size={25} />
                     </div>
                     <div className={`switch-table-style-custom ${styles.btnWrap}`}>
                        <SwitchMASQ disabled={true} status={record.status} />
                     </div>
                  </div>
               ) : (
                  ''
               )}
            </>
         ),
      },
   ]

   return (
      <div>
         <div className="bg-[#ffffff] rounded-md my-8">
            <div className="flex items-center justify-between p-8 border-b border-gray-200">
               <span className="text-2xl font-medium ">Total records ({paginationListUser.totalRecord})</span>
               <div className={styles.btnWrap}>
                  <ButtonMASQ
                     onClick={() => handleCreate()}
                     style={{
                        minWidth: '80px',
                        margin: '0',
                        border: 'none',
                        padding: '8px 12px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}
                     textBtn={'Create'}
                  ></ButtonMASQ>
               </div>
            </div>
            <div className="flex justify-between gap-4 px-8 pt-8">
               <div className="flex items-center justify-between w-full border rounded-md ">
                  <input
                     className="w-full px-3 bg-white rounded-md outline-none"
                     placeholder="Search by name, email or phone"
                     value={dataFilter.keySearch}
                     onChange={(e) => handleSearch(e)}
                  />
                  <svg
                     className="w-10 pr-2 cursor-pointer"
                     width="12"
                     height="12"
                     viewBox="0 0 12 12"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <g>
                        <path
                           d="M11.78 9.97 9.75 7.94c.473-.788.75-1.707.75-2.69A5.256 5.256 0 0 0 5.25 0 5.256 5.256 0 0 0 0 5.25a5.256 5.256 0 0 0 5.25 5.25c.984 0 1.902-.277 2.69-.75l2.03 2.03a.748.748 0 0 0 1.06 0l.75-.75a.749.749 0 0 0 0-1.06ZM5.25 9a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5Z"
                           fill="#3D4667"
                        />
                     </g>
                     <defs>
                        <clipPath id="a">
                           <path fill="#fff" d="M0 0h12v12H0z" />
                        </clipPath>
                     </defs>
                  </svg>
               </div>
               <BtnFilter content={<Filter statusUser={dataFilter.status} onChangeStatus={handleChangeStatus} />} />
            </div>
            <TableCustom
               loading={isLoadingGetListUser}
               columns={columns}
               dataSource={users}
               rowKey={'lens_color_id'}
               pagination={paginationListUser}
               onChangeCurrentPage={changeCurrentPage}
               onChange={onChange}
            />
         </div>

         <CreateOrUpdate employee={employee} configModal={configModal} />

         <ModalConfirm
            isModalOpen={visibleModalDeleteUser}
            title={`Delete ${employee?.name || ''}?`}
            description={`Are you sure you want to delete ${employee?.name || ''}? Your action can not be undone.`}
            onClose={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteEmployee}
            textBtnConfirm="Delete"
            textBtnCancel="Cancel"
            loadingBtnConfirm={isLoadingBtnDeleteEmployee}
            type="DEFAULT"
         />
      </div>
   )
}

export default UserManagement
