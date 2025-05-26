import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import EditProfile from './components/EditProfile'
import ChangePassword from './components/ChangePassword'
import store from '~/store'
import { useSelector } from 'react-redux'
import { changeAvatar, changeBackground } from 'api/profile'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
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
      <div className={styles.profileWrap}>
         <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2 mb-4">
               <div className={`${styles.profileItem} rounded-md`}>
                  <div className={styles.informationWrap}>
                     <div className={styles.backgroundWrap}>
                        <img src={background} className="rounded-md" alt="background" />
                        <div className={styles.buttonChangeBackground}>
                           <label className="cursor-pointer">
                              <input type="file" className="hidden" onChange={handleBackgroundChange} />
                              <CameraAltIcon fontSize="large" />
                              <span className={styles.btnWrap}>Update Background</span>
                           </label>
                        </div>
                     </div>
                     <div className={styles.infomationContent}>
                        <div className={styles.avatarWrap}>
                           <div className={styles.btnChangeAvatar}>
                              <label className="cursor-pointer">
                                 <input type="file" className="hidden" onChange={handleAvatarChange} />
                                 <CameraAltIcon fontSize="large" />
                              </label>
                           </div>
                           <img src={avatar} alt={authUser.name} />
                        </div>
                        <div className={styles.infoWrap}>
                           <div className={styles.name}>{authUser.name}</div>
                           <div className={styles.btnWrap}></div>
                        </div>
                     </div>
                  </div>
                  <div className={`${styles.tabWrap} tab-custom`}>
                     <Tabs defaultValue={keyTable} onValueChange={setKeyTable}>
                        <TabsList>
                           <TabsTrigger value="1">Edit profile</TabsTrigger>
                           <TabsTrigger value="2">Change password</TabsTrigger>
                        </TabsList>
                        <TabsContent value="1">
                           <EditProfile />
                        </TabsContent>
                        <TabsContent value="2">
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
