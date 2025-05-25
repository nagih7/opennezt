import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangePassword } from '../../../../../api/profile'
import { Button } from '@chakra-ui/react'

interface DataChangePassword {
   currentPassword: string
   password: string
   confirmPassword: string
}

function ChangePassword() {
   const authUser = useSelector((state: any) => state.auth.authUser)
   const [dataChangePassword, setDataChangePassword] = useState<DataChangePassword>({
      currentPassword: '',
      password: '',
      confirmPassword: '',
   })
   const loadingBtnChangePassword = useSelector((state: any) => state.profile.loadingBtnChangePassword)
   const dispatch = useDispatch()

   useEffect(() => {
      setDataChangePassword({
         currentPassword: '',
         password: '',
         confirmPassword: '',
      })
   }, [authUser])

   const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>, type: keyof DataChangePassword) => {
      setDataChangePassword((prev) => ({
         ...prev,
         [type]: e.target.value,
      }))
   }

   const handleConfirmChangePassword = () => {
      const data = new FormData()
      data.append('current_password', dataChangePassword.currentPassword)
      data.append('password', dataChangePassword.password)
      data.append('password_confirmation', dataChangePassword.confirmPassword)
      dispatch(handleChangePassword(data) as any)
   }

   return (
      <div className={styles.editProfile}>
         <div className="bg-[#fff] rounded-md">
            <div className="p-8 border-b-[1px] border-gray-200">
               <div className="text-xl font-medium text-center sm:text-2xl">Change Password</div>
            </div>

            <div className="p-8">
               <div className={styles.mainWrap}>
                  <div className="relative mb-8">
                     <input
                        type={'password'}
                        placeholder={'Enter current password...'}
                        onChange={(e) => handleChangeInput(e, 'currentPassword')}
                        value={dataChangePassword.currentPassword}
                        className="p-[14px] border-[1px] w-full outline-none border-gray-200 rounded-lg "
                     />
                     <label
                        htmlFor=""
                        className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                     >
                        Current password *
                     </label>
                  </div>
                  <div className="relative mb-8">
                     <input
                        type={'password'}
                        placeholder={'Enter new password...'}
                        onChange={(e) => handleChangeInput(e, 'password')}
                        value={dataChangePassword.password}
                        className="p-[14px] border-[1px] w-full outline-none border-gray-200 rounded-lg "
                     />
                     <label
                        htmlFor=""
                        className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                     >
                        New password *
                     </label>
                  </div>
                  <div className="relative mb-8">
                     <input
                        type={'password'}
                        placeholder={'Enter confirm new password...'}
                        onChange={(e) => handleChangeInput(e, 'confirmPassword')}
                        value={dataChangePassword.confirmPassword}
                        className="p-[14px] border-[1px] w-full outline-none border-gray-200 rounded-lg "
                     />
                     <label
                        htmlFor=""
                        className="text-xs bg-[#ffffff] px-1 border-x-[1px] border-gray-200 absolute top-[-8px] left-[10px]"
                     >
                        Confirm new password *
                     </label>
                  </div>
               </div>
               <div className="flex justify-end">
                  <Button
                     onClick={handleConfirmChangePassword}
                     loading={loadingBtnChangePassword}
                     height={50}
                     className="mt-[14px] text-sm px-[18px] py-2 sm:text-base sm:px-[28px] sm:py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
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

export default ChangePassword
