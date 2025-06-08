import React, { forwardRef, useEffect, useState } from 'react'
import { FileUpload, Input, Button, Textarea, Dialog, Portal, InputGroup, CloseButton } from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu'
import { debounce } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { IconlyAddUser, IconlyImage2, IconlyWork } from 'components/UI/Iconly'
import { getProjectsToTag } from '~/api/newfeeds'
import { postActivityUpdateArticle } from '~/api/activity'
import resizeBackground from 'utils/files/resizeBackground'
import { UpdateArticleFormProps, RootState, ArticleFormData } from '~/types'

interface Project {
   _id: string
   name: string
}

interface DataFilter {
   keySearch: string
}

const UpdateArticleForm = forwardRef<HTMLTextAreaElement, UpdateArticleFormProps>(
   ({ onClose, feed, onSubmit, isLoadingUpdateArticle }, ref) => {
      const [formData, setFormData] = useState<ArticleFormData>(feed as ArticleFormData)
      const [fileKey, setFileKey] = useState<number>(0)
      const { authUser } = useSelector((state: RootState) => state.auth)

      // File handling
      const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
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

      // Project logic
      const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
      const dispatch = useDispatch()
      const { projectsToTag } = useSelector((state: RootState) => state.article)
      const [projectNameState, setProjectNameState] = useState<string>(
         projectsToTag?.find((project: Project) => project?._id === formData.project_id)?.name || ''
      )

      const [dataFilter] = useState<DataFilter>({
         keySearch: '',
      })

      useEffect(() => {
         dispatch(getProjectsToTag(dataFilter) as any)
      }, [dataFilter, dispatch])

      useEffect(() => {
         if (formData.project_id && projectsToTag?.length > 0) {
            const projectName = projectsToTag.find((project: Project) => project?._id === formData.project_id)?.name
            if (projectName) setProjectNameState(projectName)
         }
      }, [projectsToTag, formData.project_id])

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
            console.log('Update article success')
            await postActivityUpdateArticle(feed?._id)
            console.log('Post activity update article success')
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
                           {/* <CloseOutlined /> */}
                        </div>
                     </div>
                     <div className="flex justify-start w-full gap-3">
                        {/* <Avatar size={50} src={authUser?.avatar} style={{ cursor: 'pointer' }}></Avatar> */}
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
                        {' '}
                        <Textarea
                           ref={ref}
                           placeholder="Hire Talents For Your Project"
                           style={{
                              background: '#FFFFFF',
                              outline: 'none',
                              height: '100px',
                           }}
                           className="gap-2"
                           maxH="200px"
                           value={formData?.content?.caption}
                           onChange={(e) =>
                              setFormData({
                                 ...formData,
                                 content: {
                                    ...formData?.content,
                                    caption: e.target.value,
                                 },
                              })
                           }
                        />
                        <div>{renderPreviewImages()}</div>
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
                              Post
                           </Button>
                        ) : (
                           <Button
                              onClick={handleSubmit}
                              className="rounded-md bg-[#0866FF] w-full hover:bg-[#3897F0] font-medium text-[#FFFFFF] text-[15px]"
                           >
                              Post
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
