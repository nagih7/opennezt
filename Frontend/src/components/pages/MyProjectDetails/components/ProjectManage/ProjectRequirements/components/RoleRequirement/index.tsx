import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { updateRoleRequirement } from 'api/project'
import SelectCustom from 'components/UI/SelectCustom'
import { getProjectRoleFramework } from 'api/user'
import { postProjectDetailsActivitiesProjectRequirement } from 'api/activity'
import { RootState } from 'store/types'
import { AppDispatch } from '~/store'

interface FormData {
   teamRoles: string[]
   roles: string[]
}

interface SelectEvent {
   value: string[]
   items?: any[]
}

const RoleRequirement: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   // ========== STATE FROM REDUX STORE  ========== //
   const { myProjectDetails, isLoadingUpdateRoleRequirement } = useSelector((state: RootState) => state.project)
   const { projectTeamRoleFramework, projectRoleFramework } = useSelector((state: RootState) => state.user)

   // ========== STATE  ========== //
   const [formData, setFormData] = useState<FormData>({
      teamRoles: [],
      roles: [],
   })

   // ========== EFFECTS  ========== //
   useEffect(() => {
      if (myProjectDetails?.requirements?.team_role_ids?.length > 0) {
         setFormData((prev) => ({
            ...prev,
            teamRoles: myProjectDetails?.requirements?.team_role_ids,
         }))
      }
      if (myProjectDetails?.requirements?.role_ids?.length > 0) {
         setFormData((prev) => ({
            ...prev,
            roles: myProjectDetails?.requirements?.role_ids,
         }))
      }
   }, [myProjectDetails])

   useEffect(() => {
      // Kiểm tra nếu frameworks chưa có data thì fetch
      if (!projectTeamRoleFramework?.items?.length || !projectRoleFramework?.items?.length) {
         dispatch(getProjectRoleFramework())
      }
   }, [dispatch, projectTeamRoleFramework?.items?.length, projectRoleFramework?.items?.length])

   // ========== HANDLE CHANGE  ========== //
   const handleChange = (event: SelectEvent, nameSelect: string): void => {
      if (nameSelect) {
         setFormData({ ...formData, [nameSelect]: event.value })
      }
   }

   const handleSaveProjectRequirement = async (): Promise<void> => {
      try {
         dispatch(updateRoleRequirement(myProjectDetails._id, formData))
         await postProjectDetailsActivitiesProjectRequirement(myProjectDetails._id)
      } catch (error) {
         console.error('Error updating role requirement:', error)
      }
   }

   // ========= RENDER  ========== //
   return (
      <div className="flex flex-col gap-4 mb-4">
         <h5>What positions are missing in your project?</h5>
         <div className="relative">
            {projectTeamRoleFramework && (
               <SelectCustom
                  multiple
                  label="Team Role"
                  collection={projectTeamRoleFramework}
                  onChange={(e: SelectEvent) => handleChange(e, 'teamRoles')}
                  value={formData.teamRoles}
                  name="teamRoles"
               />
            )}
         </div>
         <div className="relative">
            {projectRoleFramework && (
               <SelectCustom
                  multiple
                  label="Role"
                  collection={projectRoleFramework}
                  onChange={(e: SelectEvent) => handleChange(e, 'roles')}
                  value={formData.roles}
                  name="roles"
               />
            )}
         </div>
         <div className="flex justify-end">
            <Button
               height={50}
               className=" text-sm px-[28px] bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
               borderRadius={4}
               loading={isLoadingUpdateRoleRequirement}
               loadingText="Loading..."
               spinnerPlacement="start"
               onClick={handleSaveProjectRequirement}
            >
               SAVE CHANGES
            </Button>
         </div>
      </div>
   )
}

export default RoleRequirement
