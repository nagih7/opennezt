import { Avatar, Badge } from '@chakra-ui/react'
import { Button } from '~/components/UI/button'
import { IconlyBookmark, IconlyCamera, IconlyFolder, IconlyLocation, IconlyShieldDone } from 'components/UI/Iconly'
import useProfileOverview from './hooks/useProfileOverview'
import { Input } from '~/components/UI/input'
import MatchingProfile from '../MatchingProfile'

const ProfileOverview = () => {
   const {
      dispatch,
      authUser,
      isLoadingBtnChangeAvatar,
      isOpenAvatarPreview,
      profile,
      avatarFile,
      avatarFileSrc,
      isOpenModalConfirmMatchingProjects,
      setIsOpenModalConfirmMatchingProjects,
      setIsOpenModalCrawlLinkedin,
      handleUploadAvatar,
      handleCloseAvatarPreview,
      handleSaveAvatar,
      isOpenModalCrawlLinkedin,
   } = useProfileOverview()

   return (
      <div className="p-8 bg-[#ffffff] rounded-md">
         <div className="flex items-center w-full flex-nowrap">
            <div className="w-4/12">
               <div className="flex items-center justify-center">
                  <MatchingProfile />
               </div>
            </div>
            <div className="flex flex-col items-center w-4/12">
               <div className="relative flex flex-col items-center bg-[#ffffff] mb-10 p-1 rounded-md">
                  <label
                     htmlFor="file-upload"
                     className="absolute top-[-150px] right-[-80px] z-50 bg-[#2f65b9] w-8 h-8 rounded-full flex items-center justify-center
                     cursor-pointer"
                  >
                     <IconlyCamera size={18} color={'#ffffff'} />
                  </label>
                  <a href="#" className="absolute top-[-137px]">
                     <Avatar.Root
                        shape="rounded"
                        width="150px"
                        className=" bg-[#ffffff] p-1 object-cover max-w-[150px] h-[150px] rounded-md"
                     >
                        <Avatar.Fallback name={authUser?.name} />
                        <Avatar.Image src={authUser?.avatar} />
                     </Avatar.Root>
                  </a>
                  <Input
                     // value={avatarFile}
                     id="file-upload"
                     type="file"
                     accept="image/png, image/jpeg"
                     onChange={handleUploadAvatar}
                     style={{ display: 'none' }}
                  />
                  <Badge
                     className="absolute top-[-2px] z-50 rounded-md flex justify-center items-center w-[68px] h-[22px]"
                     colorPalette="green"
                  >
                     Online
                  </Badge>
               </div>
               {/* <Dialog
                  size={'xs'}
                  width="auto"
                  lazyMount
                  open={isOpenAvatarPreview}
                  onOpenChange={handleCloseAvatarPreview}
               >
                  <DialogContent className="flex items-center justify-center">
                     <DialogHeader className="flex">
                        <Text className="text-lg font-bold from-stone-900">Choose profile picture</Text>
                     </DialogHeader>
                     <DialogBody>
                        <Image
                           src={avatarFileSrc || undefined}
                           boxSize="150px"
                           borderRadius="full"
                           fit="cover"
                           alt="Avatar Preview"
                        />
                     </DialogBody>
                     <DialogFooter className="user-select-none">
                        <DialogActionTrigger asChild>
                           <Button variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                        <Button
                           loading={isLoadingBtnChangeAvatar}
                           loadingText="Saving..."
                           spinnerPlacement="start"
                           // variant="solid"
                           onClick={() => avatarFile && handleSaveAvatar(avatarFile)}
                        >
                           Save
                        </Button>
                     </DialogFooter>
                     <DialogCloseTrigger onClick={handleCloseAvatarPreview} />
                  </DialogContent>
               </Dialog> */}
               <h5 className="text-[#000000] font-bold text-xs md:text-lg flex gap-1 items-center">
                  {authUser?.name}
                  <IconlyShieldDone size={24} color="#3897f0" />
               </h5>
               <div className="flex items-center mt-[8px] gap-4">
                  {authUser?.region && (
                     <div className="flex items-center gap-1 text-[#6f7f92] font-medium">
                        <IconlyLocation size={15} color={'#000000'} />
                        <span className="text-sm">{authUser?.region}</span>
                     </div>
                  )}
                  {authUser?.linkedin && (
                     <div className="flex items-center gap-1 text-[#6f7f92] font-medium">
                        <IconlyBookmark size={15} color={'#000000'} backgroundColor="transparent" />
                        <span className="text-sm">
                           <a
                              href={authUser?.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="no-underline text-[#6f7f92]"
                           >
                              {authUser?.linkedin}
                           </a>
                        </span>
                     </div>
                  )}
               </div>
               <div className="mt-[16px]"></div>
            </div>
            <div className="w-4/12">
               <ul className="flex flex-wrap items-center justify-center gap-5 p-0 m-0 text-xs md:text-base ">
                  {/* <li className="flex flex-col items-center  after:border-l-2 after:border-[#e0e6ec]">
                            <h5>{profile.activities}</h5>
                            Views
                        </li> */}
                  <li className="flex flex-col items-center  after:border-l-2 after:border-[#e0e6ec]">
                     <h5>{profile?.articles?.length || 0}</h5>
                     <span className="text-[#6f7f92] font-medium">Posts</span>
                  </li>
                  <li className="flex flex-col items-center  after:border-l-2 after:border-[#e0e6ec]">
                     <h5>{profile?.activities || 0}</h5>
                     <span className="text-[#6f7f92] font-medium">Views</span>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default ProfileOverview
