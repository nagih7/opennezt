import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../../../../api/profile'
import { Button } from '@chakra-ui/react'

interface DataInfoUser {
   name: string
   email: string
   phone: string
   language: string
   region: string
   city: string
   facebook: string
   linkedin: string
}

function EditProfile() {
   const [dataInfoUser, setDataInfoUser] = useState<DataInfoUser>({
      name: '',
      email: '',
      phone: '',
      language: '',
      region: '',
      city: '',
      facebook: '',
      linkedin: '',
   })
   const loadingBtnUpdateInfoUser = useSelector((state: any) => state.profile.loadingBtnUpdateInfoUser)
   const authUser = useSelector((state: any) => state.auth.authUser)
   const dispatch = useDispatch()

   useEffect(() => {
      if (authUser) {
         setDataInfoUser({
            name: authUser.name,
            email: authUser.email,
            phone: authUser.phone,
            language: authUser.language,
            region: authUser.region,
            city: authUser.city,
            facebook: authUser.facebook,
            linkedin: authUser.linkedin,
         })
      }
   }, [authUser])

   const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>, type: keyof DataInfoUser) => {
      setDataInfoUser((prev) => ({
         ...prev,
         [type]: e.target.value,
      }))
   }

   const handleConfirmSaveInfoUser = async () => {
      dispatch(updateUser(dataInfoUser) as any)
   }

   return (
      <div className="rounded-2xl px-4 my-8">
         <div className="bg-[#fff] rounded-md">
            <div className="p-8 border-b-[1px] border-gray-200">
               <div className="text-xl font-medium text-center sm:text-2xl">Personal Information</div>
            </div>
            <div className="p-8">
               <div className="flex flex-col items-center w-full sm:flex-row sm:gap-8 ">
                  <div className="w-full">
                     <div className="relative mb-8">
                        <input
                           type="text"
                           value={dataInfoUser.name}
                           name="name"
                           placeholder="Enter name..."
                           onChange={(e) => handleChangeInput(e, 'name')}
                           required
                           className="p-[14px] border-[1px] w-full outline-none border-gray-200 rounded-lg"
                        />
                        <label className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
                           Name *
                        </label>
                     </div>
                     <div className="relative mb-8">
                        <input
                           type="text"
                           placeholder="Enter email..."
                           onChange={(e) => handleChangeInput(e, 'email')}
                           value={dataInfoUser.email}
                           required
                           className="p-[14px] border-[1px] w-full outline-none border-gray-200 rounded-lg "
                        />
                        <label className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
                           Email *
                        </label>
                     </div>
                     <div className="relative mb-8">
                        <input
                           type="text"
                           placeholder="Enter phone..."
                           onChange={(e) => handleChangeInput(e, 'phone')}
                           value={dataInfoUser.phone}
                           required
                           className="p-[14px] border-[1px] w-full outline-none border-gray-200 rounded-lg "
                        />
                        <label className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
                           Phone *
                        </label>
                     </div>
                     <div className="relative mb-8">
                        <input
                           type="text"
                           placeholder="Enter link facebook..."
                           onChange={(e) => handleChangeInput(e, 'facebook')}
                           value={dataInfoUser.facebook}
                           required
                           className="p-[14px] border-[1px] w-full outline-none border-gray-200 rounded-lg "
                        />
                        <label className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
                           Facebook *
                        </label>
                     </div>
                  </div>
                  <div className="w-full">
                     <div className="relative mb-8">
                        <input
                           type="text"
                           placeholder="Enter linkedin..."
                           onChange={(e) => handleChangeInput(e, 'linkedin')}
                           value={dataInfoUser.linkedin}
                           required
                           className="p-[14px] border-[1px] w-full outline-none border-gray-200 rounded-lg "
                        />
                        <label className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]">
                           LinkedIn *
                        </label>
                     </div>
                  </div>
               </div>
               <div className="flex justify-end">
                  <Button
                     onClick={handleConfirmSaveInfoUser}
                     loading={loadingBtnUpdateInfoUser}
                     height={50}
                     className="mt-[14px]  text-sm px-[18px] py-2 sm:text-base sm:px-[28px] sm:py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                     borderRadius={4}
                     loadingText="Loading..."
                     spinnerPlacement="start"
                  >
                     SAVE CHANGES
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default EditProfile
