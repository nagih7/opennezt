import React, { useState } from 'react'
import { Button, Tabs } from '@chakra-ui/react'
import { toaster } from 'components/UI/toaster'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMyProject } from 'api/project'
import { RootState } from 'store/types'
import { AppDispatch } from 'store/configureStore'

const ProjectDelete: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   // ========== STATE FROM REDUX STORE  ========== //
   const { isLoadingDeleteMyProject, myProjectDetails } = useSelector((state: RootState) => state.project)
   // ========== STATE  ========== //
   const [confirmDelete, setConfirmDelete] = useState<boolean>(false)

   // ========== HANDLE CHANGE ========== //
   const handleConfirmDeleteProject = (): void => {
      if (confirmDelete) {
         dispatch(deleteMyProject(myProjectDetails._id))
      } else {
         toaster.create({
            title: 'Please confirm that you understand the consequences of deleting this project.',
            type: 'error',
         })
      }
   }

   // ========== RENDER  ========== //
   return (
      <Tabs.Content pt="0" value="delete">
         <div>
            <p className="mb-0 p-[15px] border-l-[3px] text-sm border-[#09c] rounded-r-md bg-[#e3f1f6] text-[#09c]">
               WARNING: Deleting this group will completely remove ALL content associated with it. There is no way back,
               please be careful with this option.
            </p>
         </div>
         <label htmlFor="delete-project" className="mt-[16px]">
            <input
               type="checkbox"
               id="delete-project"
               className="w-4 h-4 mr-[10px]"
               value={confirmDelete.toString()}
               onChange={() => setConfirmDelete(!confirmDelete)}
            />
            I understand the consequences of deleting this project.
         </label>
         <div className="flex justify-end">
            <div className="">
               <Button
                  height={50}
                  className="mt-[14px] text-sm px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                  borderRadius={4}
                  loading={isLoadingDeleteMyProject}
                  loadingText="Deleting..."
                  spinnerPlacement="start"
                  onClick={handleConfirmDeleteProject}
               >
                  DELETE PROJECT
               </Button>
            </div>
         </div>
      </Tabs.Content>
   )
}

export default ProjectDelete
