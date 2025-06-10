import React, { forwardRef, useEffect, useState, useCallback } from 'react'
import { FileUpload, Input, Button, Dialog, Portal, InputGroup, CloseButton } from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu'
import { debounce } from 'lodash'
import { useSelector } from 'react-redux'
import { IconlyAddUser, IconlyImage2, IconlyWork, IconlySwap } from 'components/UI/Iconly'
import { getProjectsToTag } from '~/api/newfeeds'
import { postActivityUpdateArticle } from '~/api/activity'
import resizeBackground from 'utils/files/resizeBackground'
import { handleGetLinkPreview } from '~/api/linkPreview'
import { resetLinkPreview } from 'store/modules/linkPreview'
import { UpdateArticleFormProps, RootState, ArticleFormData } from '~/types'
import CaptionInput from './CreateAricleForm/CaptionInput'
import { useAppDispatch } from '~/store'

interface Project {
   _id: string
   name: string
}

interface DataFilter {
   keySearch: string
}

interface LinkPreviewData {
   url: string
   title: string
   description?: string
   image?: string
   favicon?: string
   message?: string
}

const debouncedLinkPreview = debounce(async (text: string, dispatch: any) => {
   const urlRegex = /(https?:\/\/[^\s]+)/g
   const urls = text.match(urlRegex)

   if (urls && urls.length > 0) {
      const uniqueUrls = [...new Set(urls)].reverse()
      uniqueUrls.forEach((url) => {
         dispatch(handleGetLinkPreview({ data: { url } }))
      })
   }
}, 1000)

const UpdateArticleForm = forwardRef<HTMLTextAreaElement, UpdateArticleFormProps>(
   ({ onClose, feed, onSubmit, isLoadingUpdateArticle }) => {
      const [formData, setFormData] = useState<ArticleFormData>(feed as ArticleFormData)
      const [fileKey, setFileKey] = useState<number>(0)
      const { authUser } = useSelector((state: RootState) => state.auth)

      // Project logic
      const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
      const dispatch = useAppDispatch()
      const { projectsToTag } = useSelector((state: RootState) => state.article)
      const [projectNameState, setProjectNameState] = useState<string>(
         projectsToTag?.find((project: Project) => project?._id === formData.project_id)?.name || ''
      )

      const [dataFilter] = useState<DataFilter>({
         keySearch: '',
      })

      // Link Preview Logic
      const { linkDataArticle, message } = useSelector((state: RootState) => state.linkPreview)
      const [linkPreviews, setLinkPreviews] = useState<LinkPreviewData[]>([])
      const [defaultPreview, setDefaultPreview] = useState<LinkPreviewData | null>(null)
      const [showLinkPreviews, setShowLinkPreviews] = useState<boolean>(false)

      useEffect(() => {
         dispatch(getProjectsToTag(dataFilter) as any)
      }, [dataFilter, dispatch])

      useEffect(() => {
         if (formData.project_id && projectsToTag?.length > 0) {
            const projectName = projectsToTag.find((project: Project) => project?._id === formData.project_id)?.name
            if (projectName) setProjectNameState(projectName)
         }
      }, [projectsToTag, formData.project_id])

      // Load initial link preview if exists
      useEffect(() => {
         // Chỉ tải link preview khi mở form lần đầu và có link preview sẵn có
         if (feed.link_preview && linkPreviews.length === 0) {
            const url = feed.link_preview
            // Tải link preview
            dispatch(handleGetLinkPreview({ data: { url } }))

            // Nếu chưa có dữ liệu từ server, tạo một link preview mặc định
            if (!defaultPreview) {
               const initialPreview: LinkPreviewData = {
                  url: feed.link_preview,
                  title: 'Loading preview...',
               }
               setDefaultPreview(initialPreview)
               setLinkPreviews([initialPreview])
            }
         }
      }, [feed.link_preview, dispatch, linkPreviews.length, defaultPreview])

      // Modify the useEffect for handling link previews to preserve existing data
      useEffect(() => {
         if (linkDataArticle?.url && typeof linkDataArticle.title === 'string') {
            // Ensure all required fields are present
            const safeLinkDataArticle: LinkPreviewData = {
               url: linkDataArticle.url,
               title: linkDataArticle.title || '',
               description: linkDataArticle.description,
               image: linkDataArticle.image,
               favicon: linkDataArticle.favicon,
               message: linkDataArticle.message,
            }

            setLinkPreviews((prev) => {
               // Kiểm tra xem link preview đã tồn tại chưa
               const exists = prev.some((item) => item.url === safeLinkDataArticle.url)
               if (!exists) {
                  // Cập nhật formData với link_preview mới
                  setFormData((prevForm) => ({
                     ...prevForm,
                     link_preview: safeLinkDataArticle.url,
                  }))

                  // Cập nhật defaultPreview nếu link mới trùng với link_preview ban đầu của bài viết
                  // hoặc nếu chưa có defaultPreview
                  if (!defaultPreview || feed.link_preview === safeLinkDataArticle.url) {
                     setDefaultPreview(safeLinkDataArticle)
                  }

                  return [...prev, safeLinkDataArticle]
               }

               // Nếu link preview đã tồn tại và là link ban đầu, cập nhật thông tin của nó
               if (exists && feed.link_preview === safeLinkDataArticle.url) {
                  const updatedPreviews = prev.map((preview) =>
                     preview.url === safeLinkDataArticle.url ? safeLinkDataArticle : preview
                  )
                  setDefaultPreview(safeLinkDataArticle)
                  return updatedPreviews
               }

               return prev
            })
         }
      }, [linkDataArticle, feed.link_preview, defaultPreview])

      // Effect to clear images when link preview is added
      useEffect(() => {
         if (linkDataArticle?.url) {
            setFormData((prev) => ({
               ...prev,
               content: {
                  ...prev.content,
                  attachment: [], // Remove images when link preview is present
               },
            }))
            setFileKey((prev) => prev + 1) // Update key to reset file input
         }
      }, [linkDataArticle])

      const handleSelectProject = (project: Project): void => {
         setFormData({
            ...formData,
            project_id: project?._id,
         })
         setProjectNameState(project?.name)
         setIsModalOpen(false)
      }

      const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
         dispatch(getProjectsToTag({ keySearch: e.target.value }) as any)
      }, 300)

      const handleModalOpen = (): void => {
         setIsModalOpen(true)
      }

      const handleModalClose = (): void => {
         setIsModalOpen(false)
      }

      const handleCaptionChange = useCallback(
         (newCaption: string) => {
            setFormData((prev) => ({
               ...prev,
               content: {
                  ...prev.content,
                  caption: newCaption,
               },
            }))

            debouncedLinkPreview(newCaption, dispatch)
         },
         [dispatch]
      )

      const handleSelectLinkPreview = (url: string): void => {
         setFormData((prev) => ({
            ...prev,
            link_preview: url,
         }))
      }

      const removeLinkPreview = (): void => {
         setFormData({
            ...formData,
            link_preview: '',
         })
         setDefaultPreview(null)
         setLinkPreviews([])
         setShowLinkPreviews(false)
         dispatch(resetLinkPreview())
      }

      const renderDomainWarning = (): React.ReactElement | null => {
         if (!message || (!message.includes('domain') && message !== 'This domain is not allow')) return null

         return (
            <div className="mt-2 px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg">
               <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                     <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                     />
                  </svg>
                  <div>
                     <h4 className="font-medium text-yellow-800">Domain không được phép</h4>
                     <p className="text-sm text-yellow-700">
                        {message || 'Link từ domain này không được phép sử dụng. Vui lòng thử link khác.'}
                     </p>
                  </div>
               </div>
            </div>
         )
      }

      const renderLinkPreview = (): React.ReactElement | null => {
         // Only render when there's a selected link preview
         if (!formData.link_preview || linkPreviews.length === 0) return null

         const selectedPreview = linkPreviews.find((preview) => preview.url === formData.link_preview) || defaultPreview
         if (!selectedPreview) return null

         return (
            <div className="mt-4">
               {selectedPreview && (
                  <div className="relative border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden transition-all duration-200 bg-white shadow-sm">
                     {/* Action buttons */}
                     <div className="absolute top-3 right-3 flex gap-2 z-10">
                        <button
                           onClick={() => setShowLinkPreviews(true)}
                           className="p-1.5 rounded-full bg-white/80 backdrop-blur hover:bg-white transition-all duration-200"
                        >
                           <IconlySwap size={20} color={'#4B5563'} backgroundColor={""} />
                        </button>
                        <button
                           onClick={removeLinkPreview}
                           className="p-1.5 rounded-full bg-white/80 backdrop-blur hover:bg-white transition-all duration-200"
                        >
                           x
                        </button>
                     </div>

                     <div className="flex flex-col sm:flex-row">
                        {/* Image container */}
                        {selectedPreview.image && (
                           <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0">
                              <img
                                 src={selectedPreview.image}
                                 alt={selectedPreview.title}
                                 className="w-full h-full object-cover"
                              />
                           </div>
                        )}

                        {/* Content container */}
                        <div className="flex-1 p-4">
                           <div className="space-y-2">
                              {selectedPreview.message ? (
                                 <h4 className="font-semibold text-gray-900 line-clamp-2">{selectedPreview.message}</h4>
                              ) : (
                                 <h4 className="font-semibold text-gray-900 line-clamp-2">{selectedPreview.title}</h4>
                              )}
                              <p className="text-sm text-gray-600 line-clamp-2">{selectedPreview.description}</p>
                              <div className="flex items-center gap-2 pt-1">
                                 {selectedPreview.favicon && (
                                    <img src={selectedPreview.favicon} alt="" className="w-4 h-4 rounded-full" />
                                 )}
                                 <a
                                    href={selectedPreview.url}
                                    className="text-sm text-gray-500 hover:text-blue-600 truncate"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                 >
                                    {new URL(selectedPreview.url).hostname}
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {/* Modal for link selection */}
               {showLinkPreviews && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center">
                     <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowLinkPreviews(false)}
                     />
                     <div className="relative bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                           <h3 className="text-lg font-semibold text-gray-900">Choose Link Preview</h3>
                           <button
                              onClick={() => setShowLinkPreviews(false)}
                              className="p-1.5 rounded-full hover:bg-gray-100"
                           >
                              x
                           </button>
                        </div>

                        <div className="space-y-3">
                           {linkPreviews.map((preview, index) => (
                              <div
                                 key={index}
                                 className={`border rounded-lg p-3 cursor-pointer transition-all
                                    ${
                                       preview.url === formData.link_preview
                                          ? 'border-blue-500 ring-2 ring-blue-100 bg-blue-50/50'
                                          : 'hover:bg-gray-50 border-gray-200'
                                    }`}
                                 onClick={() => {
                                    handleSelectLinkPreview(preview.url)
                                    setShowLinkPreviews(false)
                                 }}
                              >
                                 <div className="flex gap-4">
                                    {preview.image && (
                                       <img
                                          src={preview.image}
                                          alt={preview.title}
                                          className="w-24 h-24 object-cover rounded-lg"
                                       />
                                    )}
                                    <div className="flex-1 min-w-0">
                                       <h4 className="font-medium text-gray-900 mb-1">{preview.title}</h4>
                                       <p className="text-sm text-gray-600 line-clamp-2 mb-2">{preview.description}</p>
                                       <div className="flex items-center gap-2">
                                          {preview.favicon && (
                                             <img src={preview.favicon} alt="" className="w-4 h-4 rounded-full" />
                                          )}
                                          <span className="text-sm text-gray-500 truncate">
                                             {new URL(preview.url).hostname}
                                          </span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               )}
            </div>
         )
      }

      // File handling
      const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
         removeLinkPreview()
         const newFiles = Array.from(event.target.files || [])
         const resizePromises = newFiles.map((file: File) => resizeBackground(file))
         const resizeFiles = await Promise.all(resizePromises)

         const filteredFiles = resizeFiles.filter((newFile: File) => {
            const isDuplicate = formData.content.attachment.some(
               (existingFiles: File) => existingFiles?.name === newFile?.name
            )
            return !isDuplicate
         })

         setFormData({
            ...formData,
            content: {
               ...formData.content,
               attachment: [...formData.content.attachment, ...filteredFiles],
            },
         })
      }

      const renderPreviewImages = (): React.ReactElement => {
         return (
            <div className="relative">
               {formData.content.attachment.length > 0 && (
                  <button
                     className="absolute top-2 right-2 text-[30px] text-[#6f7f92] rounded-full w-6 h-6 flex items-center justify-center z-[999999]"
                     onClick={() => handleRemoveImage()}
                  >
                     ×
                  </button>
               )}
               <div
                  className="max-h-[36vh] overflow-y-auto scrollbar-thin"
                  style={
                     {
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#CBD5E1 #F1F5F9',
                     } as React.CSSProperties
                  }
               >
                  {formData.content.attachment.map((image: File | string, index: number) => (
                     <div key={index} className="relative">
                        <img
                           src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                           alt={`Preview ${index}`}
                           className="object-cover w-full rounded-md auto"
                        />
                     </div>
                  ))}
               </div>
            </div>
         )
      }

      const handleRemoveImage = (): void => {
         setFileKey((prev: number) => prev + 1)
         setFormData({
            ...formData,
            content: {
               ...formData.content,
               attachment: [],
            },
         })
      }

      const handleSubmit = async (): Promise<void> => {
         try {
            await onSubmit(feed?._id, formData)
            await postActivityUpdateArticle(feed?._id)
            setFileKey((prev: number) => prev + 1)
         } catch (error) {
            console.error('Error updating article:', error)
         }
      }

      const handleClose = (): void => {
         onClose()
      }

      return (
         <>
            <div className="fixed inset-0 flex justify-center items-center z-[999]">
               <div className="fixed inset-0 flex bg-gray-900 bg-opacity-50" onClick={handleClose}></div>
               <div className="bg-[#ffffff] w-[600px] p-8 rounded-md mb-4 z-[10]">
                  <div className="flex flex-col items-center justify-center gap-3">
                     <div className="flex justify-between w-full pb-2 border-b-2 border-gray-200">
                        <span> </span>
                        <span className="text-2xl font-bold text-center">Edit Post</span>
                        <div
                           onClick={handleClose}
                           className="flex items-center justify-center p-2 rounded-full cursor-pointer w-9 h-9"
                        >
                           x
                        </div>
                     </div>
                     <div className="flex justify-start w-full gap-3">
                        {/* Avatar component here */}
                        <div>
                           <div className="flex items-center gap-2 text-black no-underline text-nowrap">
                              <span className="font-semibold ">
                                 {authUser?.name} {projectNameState ? `in project ${projectNameState}` : ''}
                              </span>
                           </div>
                           <div className="text-xs text-gray-500">@{authUser?.email}</div>
                        </div>
                     </div>
                     <div className="w-full p-2 text-wrap ">
                        <CaptionInput
                           placeholder="Hire Talents For Your Project"
                           value={formData?.content?.caption}
                           onChange={handleCaptionChange}
                        />
                        
                        {renderDomainWarning()}
                        {renderLinkPreview()}
                        {!formData.link_preview && renderPreviewImages()}
                        
                        <div>
                           <Dialog.Root open={isModalOpen}>
                              <Portal>
                                 <Dialog.Backdrop />
                                 <Dialog.Positioner>
                                    <Dialog.Content>
                                       <Dialog.Header>
                                          <Dialog.Title>Tag your project</Dialog.Title>
                                       </Dialog.Header>
                                       <Dialog.Header>
                                          <InputGroup flex="1" startElement={<LuSearch />}>
                                             <Input placeholder="Search project" onChange={(e) => handleSearch(e)} />
                                          </InputGroup>
                                       </Dialog.Header>
                                       <div>
                                          <Dialog.Body>
                                             {projectsToTag?.map((project, index) => (
                                                <div className="mx-[-16px] px-[16px]" key={index}>
                                                   <div className=" rounded-md w-full max-w-[600px] p-4">
                                                      <div
                                                         className="bg-[#ffffff] border-[1px] rounded-md w-full max-w-[600px] p-4 cursor-pointer"
                                                         onClick={() => handleSelectProject(project)}
                                                      >
                                                         <div className="flex items-center gap-4">
                                                            <div className="flex flex-col justify-between flex-grow">
                                                               <h5 className="text-lg font-semibold">
                                                                  <a href="#" className="text-black no-underline">
                                                                     {project?.name}
                                                                  </a>
                                                               </h5>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             ))}
                                          </Dialog.Body>
                                       </div>

                                       <Dialog.Footer>
                                          <Dialog.ActionTrigger>
                                             <Button variant="outline" onClick={handleModalClose}>
                                                Cancel
                                             </Button>
                                          </Dialog.ActionTrigger>
                                          <Button>Save</Button>
                                       </Dialog.Footer>
                                       <Dialog.CloseTrigger asChild>
                                          <CloseButton size="sm" onClick={handleModalClose} />
                                       </Dialog.CloseTrigger>
                                    </Dialog.Content>
                                 </Dialog.Positioner>
                              </Portal>
                           </Dialog.Root>
                        </div>
                     </div>

                     <div className="flex items-center justify-between w-full p-3 border border-gray-200 rounded-md ">
                        <span>Add to your post</span>
                        <div className="flex gap-3">
                           <div className="cursor-pointer">
                              <FileUpload.Root
                                 key={fileKey}
                                 alignItems="stretch"
                                 maxFiles={10}
                                 onChange={handleFileChange}
                                 maxW="100%"
                              >
                                 <FileUpload.HiddenInput />
                                 <FileUpload.Trigger asChild>
                                    <div className="flex items-center justify-center p-0 cursor-pointer">
                                       <IconlyImage2 size={30} color={'#000000'} />
                                    </div>
                                 </FileUpload.Trigger>
                              </FileUpload.Root>
                           </div>
                           <div className="cursor-pointer" onClick={handleModalOpen}>
                              <IconlyWork size={30} color={'#000000'} />
                           </div>
                           <div className="cursor-pointer">
                              <IconlyAddUser size={30} color={'#000000'} />
                           </div>
                        </div>
                     </div>

                     <div className="flex w-full gap-3">
                        {isLoadingUpdateArticle ? (
                           <Button
                              loading
                              className="rounded-md bg-[#0866FF] w-full hover:bg-[#3897F0] font-medium text-[#FFFFFF] text-[15px]"
                           >
                              Update
                           </Button>
                        ) : (
                           <Button
                              onClick={handleSubmit}
                              className="rounded-md bg-[#0866FF] w-full hover:bg-[#3897F0] font-medium text-[#FFFFFF] text-[15px]"
                           >
                              Update
                           </Button>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </>
      )
   }
)

export default UpdateArticleForm
