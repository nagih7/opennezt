import React, { useState, useEffect } from 'react'
import EditProfile from './components/EditProfile'
import ChangePassword from './components/ChangePassword'
import store from '~/store'
import { useSelector } from 'react-redux'
import { changeAvatar, changeBackground } from 'api/profile'
// import CameraAltIcon from '@mui/icons-material/CameraAlt'
import resizeLogo from 'utils/files/resizeLogo'
import resizeBackground from 'utils/files/resizeBackground'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/UI/tabs'

interface AuthAccount {
   name: string
   avatar?: string
   background?: string
}

function Profile() {
   const authUser = useSelector((state: any) => state.auth.authUser) as AuthAccount
   const [avatar, setAvatar] = useState<string>('')
   const [background, setBackground] = useState<string>('')
   const [keyTable, setKeyTable] = useState<string>('1')

   useEffect(() => {
      if (authUser.avatar) {
         setAvatar(authUser.avatar)
      }
      if (authUser.background) {
         setBackground(authUser.background)
      }
   }, [authUser])

   const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
         const avatar = await resizeLogo(file)
         const formData = new FormData()
         formData.append('avatar', avatar)
         await store.dispatch(changeAvatar(formData))
         setAvatar(URL.createObjectURL(avatar))
         // Hiển thị thông báo thành công nếu cần
      }
   }

   const handleBackgroundChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
         const background = await resizeBackground(file)
         const formData = new FormData()
         formData.append('background', background)
         await store.dispatch(changeBackground(formData))
         setBackground(URL.createObjectURL(background))
         // Hiển thị thông báo thành công nếu cần
      }
   }

   return (
      <div className="w-full h-full">
         <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2">
               <div className="flex flex-col h-full transition-transform duration-300 ease-in-out bg-white rounded-md">
                  <div className="relative flex items-center justify-start border-b border-gray-200 bg-gray-100/70">
                     <div className="relative select-none flex justify-center items-center w-full h-[300px] overflow-hidden rounded-t-md">
                        <img
                           src={background}
                           className="w-full h-[300px] bg-contain object-contain brightness-75"
                           alt="background"
                        />
                        <div className="absolute px-3 py-2 transition-colors bg-white rounded-lg shadow-lg cursor-pointer bottom-4 right-6 hover:bg-gray-100">
                           <label className="cursor-pointer">
                              <input type="file" className="hidden" onChange={handleBackgroundChange} />
                              {/* <CameraAltIcon fontSize="inherit" /> */}
                              <span className="ml-2 text-sm">Update Background</span>
                           </label>
                        </div>
                     </div>
                     <div className="absolute bottom-2 left-4">
                        <div className="group ml-4 select-none w-20 h-20 rounded-full overflow-hidden cursor-pointer relative text-black mb-2.5 shadow-lg">
                           <div className="absolute bottom-0 flex items-center justify-center w-full h-5 transition-opacity duration-300 opacity-0 bg-gray-100/90 group-hover:opacity-100">
                              <label className="cursor-pointer">
                                 <input type="file" className="hidden" onChange={handleAvatarChange} />
                                 {/* <CameraAltIcon fontSize="inherit" /> */}
                              </label>
                           </div>
                           <img src={avatar} alt={authUser.name} />
                        </div>
                        <div className="ml-4 drop-shadow-lg">
                           <div className="mb-1 text-lg font-bold text-white">{authUser.name}</div>
                           <div className="mt-2.5"></div>
                        </div>
                     </div>
                  </div>
                  <div className="flex w-full justify-between border-t border-gray-200 bg-[#ffffff] rounded-b-lg pt-3">
                     <Tabs value={keyTable} onValueChange={setKeyTable} className="flex flex-col w-full h-full">
                        <TabsList className="flex justify-start w-full mb-3">
                           <TabsTrigger value="1">Edit profile</TabsTrigger>
                           <TabsTrigger value="2">Change password</TabsTrigger>
                        </TabsList>
                        <TabsContent value="1" className="w-full bg-[#f4f5f6]">
                           <EditProfile />
                        </TabsContent>
                        <TabsContent value="2" className="w-full bg-[#f4f5f6]">
                           <ChangePassword />
                        </TabsContent>
                     </Tabs>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Profile
