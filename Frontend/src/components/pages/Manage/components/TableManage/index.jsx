import React from 'react'
import styles from './styles.module.scss'
import TableCustom from './../../../../UI/Table/index'
import ModalConfirm from './../../../../UI/Modal/ModalConfirm/index'
import { useDispatch } from 'react-redux'
import { IconlyEdit, IconlyDelete } from 'components/UI/Iconly'
import _ from 'lodash'
import { Button } from '~/components/UI/button'
// import Filter from "components/pages/UserManagement/components/Filter";

function TableManage({
   data,
   handleCreate,
   handleUpdate,
   handleShowConfirmDelete,
   handleConfirmDelete,
   columns,
   dataSource,
   pagination,
   dataFilter,
   setDataFilter,
   loading,
   visibleModalDelete,
   setVisibleModalDelete,
   onRowClick,
   rowKey = '_id', // Add default rowKey
}) {
   const dispatch = useDispatch()

   const changeCurrentPage = (page) => {
      setDataFilter({ ...dataFilter, page: page })
   }

   const handleSearch = (e) => {
      setDataFilter({ ...dataFilter, keySearch: e.target.value })
   }

   const onChange = (pagination, filters, sorter) => {
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

   const columnsData = [
      ...columns,
      {
         title: 'Actions',
         key: 'action',
         fixed: 'right',
         align: 'center',
         width: '7rem',
         render: (text, record) => (
            <>
               <div className={styles.btnAction}>
                  <div onClick={() => handleUpdate(record)} className={styles.btnWrap}>
                     <IconlyEdit size={25} color={'#000000'} className={styles.iconAction} />
                  </div>
                  <div onClick={() => handleShowConfirmDelete(record)} className={styles.btnWrap}>
                     <IconlyDelete size={25} color={'#000000'} className={styles.iconAction} />
                  </div>

                  {/* <div
							className={`switch-table-style-custom ${styles.btnWrap}`}>
							<SwitchMASQ disabled={true} status={record.status} />
						</div> */}
               </div>
            </>
         ),
      },
   ]

   return (
      <div className="bg-[#ffffff] rounded-md my-8">
         <div className="flex items-center justify-between p-8 border-b border-gray-200">
            <span className="text-2xl font-medium">Total records ({pagination.totalRecord})</span>
            <div className={styles.btnWrap}>
               <Button
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
               />
            </div>
         </div>
         <TableCustom
            columns={columnsData}
            loading={loading}
            dataSource={dataSource}
            rowKey={rowKey} // Pass rowKey here
            pagination={pagination}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
            onRow={(record) => {
               // Pass the click event up
               if (onRowClick) {
                  onRowClick(record)
               }
            }}
         />

         {data && (
            <ModalConfirm
               isModalOpen={visibleModalDelete}
               title={`Delete ${data.name}?`}
               description={`Are you sure you want to delete ${data.name}? Your action can not be undone.`}
               onClose={() => dispatch(setVisibleModalDelete(false))}
               onConfirm={() => handleConfirmDelete()}
            />
         )}
      </div>
   )
}

export default TableManage
