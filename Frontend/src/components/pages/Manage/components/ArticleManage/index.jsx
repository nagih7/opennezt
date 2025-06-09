import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import TableManage from '../TableManage'
import { getManageArticleList } from '~/api/manage'
import store from '~/store'
import AvatarDefault from '../../../../../assets/images/default/AvatarDefault.png'
import ArticlePreview from './ArticlePreview'
import { setVisibleModalDeleteArticle } from 'store/modules/manage'
import { handleDeleteArticle } from '~/api/newfeeds'
import ModalConfirm from 'components/UI/Modal/ModalConfirm'

function ArticleManage() {
   const dispatch = useDispatch()

   const { articles, paginationListArticle, isLoadingGetListArticle, visibleModalDeleteArticle } = useSelector(
      (state) => state.manage
   )

   const [data, setData] = useState({})

   const [dataFilter, setDataFilter] = useState({ perPage: 10, page: 1 })

   const [selectedArticle, setSelectedArticle] = useState({})
   const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)

   useEffect(() => {
      // CONFIG
      dispatch(getManageArticleList(dataFilter))
   }, [dataFilter, dispatch])

   // DELETE
   const handleShowConfirmDelete = (data) => {
      let dataSelect = _.cloneDeep(data)
      setData(dataSelect)
      dispatch(setVisibleModalDeleteArticle(true))
   }

   const handleConfirmDelete = async () => {
      await store.dispatch(handleDeleteArticle({ id: data._id }))
      await store.dispatch(getManageArticleList(dataFilter))
      await dispatch(setVisibleModalDeleteArticle(false))
   }

   const columns = [
      {
         title: 'Author',
         dataIndex: 'user',
         key: 'user',
         render: (user) => (
            <div className="flex items-center gap-2">
               <div className="w-10 h-10 overflow-hidden rounded-full">
                  <img
                     src={user?.[0]?.avatar || AvatarDefault}
                     alt={user?.[0]?.name}
                     className="object-cover w-full h-full"
                     onError={(e) => {
                        e.target.onerror = null
                        e.target.src = AvatarDefault
                     }}
                  />
               </div>
               <span className="font-medium">{user?.[0]?.name}</span>
            </div>
         ),
      },
      {
         title: 'Content',
         dataIndex: 'content',
         key: 'content',
         render: (content, record) => <div className="max-w-[300px] truncate">{content?.caption || 'No content'}</div>,
      },
      {
         title: 'Project',
         dataIndex: 'project',
         key: 'project',
         render: (project) => <span>{project?.[0]?.name || 'No project'}</span>,
      },
      {
         title: 'Created At',
         dataIndex: 'created_at',
         key: 'created_at',
         render: (date) => <span>{new Date(date).toLocaleDateString()}</span>,
      },
      {
         title: 'Status',
         dataIndex: 'status',
         key: 'status',
         render: (status) => (
            <span
               className={`px-2 py-1 rounded ${
                  status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
               }`}
            >
               {status}
            </span>
         ),
      },
   ]

   const handleRowClick = useCallback((record) => {
      setSelectedArticle(record)
      setIsPreviewModalOpen(true)
   }, [])

   const handleClosePreview = () => {
      setIsPreviewModalOpen(false)
      setSelectedArticle({})
   }

   return (
      <div className="p-6">
         <h1 className="mb-6 text-2xl font-bold">Article Management</h1>
         <TableManage
            columns={columns}
            dataSource={articles || []}
            pagination={paginationListArticle}
            dataFilter={dataFilter}
            setDataFilter={setDataFilter}
            loading={isLoadingGetListArticle}
            onRowClick={handleRowClick}
            rowKey="_id"
            visibleModalDelete={visibleModalDeleteArticle}
            setVisibleModalDelete={setVisibleModalDeleteArticle}
            handleShowConfirmDelete={handleShowConfirmDelete}
            handleConfirmDelete={handleConfirmDelete}
         />

         <ModalConfirm
            isModalOpen={visibleModalDeleteArticle}
            title={`Delete this post?`}
            description={`Are you sure you want to delete this post? Your action can not be undone.`}
            onClose={() => dispatch(setVisibleModalDeleteArticle(false))}
            onConfirm={() => handleConfirmDelete()}
         />

         {/* Modal Preview Article */}
         {isPreviewModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
               <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"></div>
               <div
                  className="bg-white rounded-lg w-[800px] max-h-[90vh] overflow-y-auto relative"
                  style={{ zIndex: 1000 }}
               >
                  <button
                     onClick={handleClosePreview}
                     className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
                  >
                     ×
                  </button>
                  <ArticlePreview feed={selectedArticle} onClose={handleClosePreview} />
               </div>
            </div>
         )}
      </div>
   )
}

export default ArticleManage
