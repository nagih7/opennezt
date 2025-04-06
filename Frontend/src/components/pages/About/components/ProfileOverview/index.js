import { Avatar, Badge, Button, Image, Input, Text } from '@chakra-ui/react'
import { changeAvatar } from 'api/profile'
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
} from 'components/UI/dialog'
import { IconlyBookmark, IconlyCamera, IconlyLocation, IconlySearch, IconlyShieldDone } from 'components/UI/Iconly'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsOpenAvatarPreview } from 'states/modules/profile'
import Loading from './components/Loading'

const ProfileOverview = () => {
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = () => {
        setIsLoading(true) // Thay đổi trạng thái để hiển thị Loading và ẩn phần tử ban đầu
    }

    // ========== DISPATCH ========== //
    const dispatch = useDispatch()
    // ========== STATE FROM REDUX STORE ========== //
    const { authUser } = useSelector((state) => state.auth)
    const { isLoadingBtnChangeAvatar, isOpenAvatarPreview } = useSelector((state) => state.profile)
    // ========== STATE ========== //
    const [avatarFile, setAvatarFile] = useState(null)
    const [avatarFileSrc, setAvatarFileSrc] = useState(null)

    // ========== LOGIC ========== //
    const handleUploadAvatar = (event) => {
        const file = event.target.files[0] // Lấy file đầu tiên từ input
        if (file) {
            setAvatarFile(file)
            setAvatarFileSrc(URL.createObjectURL(file))
            dispatch(setIsOpenAvatarPreview(true))
        }
    }

    const handleCloseAvatarPreview = (event) => {
        dispatch(setIsOpenAvatarPreview(event))
        document.getElementById('file-upload').value = ''
    }

    const handleSaveAvatar = async (file) => {
        const formData = new FormData()
        formData.append('avatar', file)
        dispatch(changeAvatar(formData))
    }

    return (
        <div className="p-8 bg-[#ffffff] rounded-md">
            <div className="flex items-center w-full">
                <div className="w-4/12">
                    <div className="flex items-center justify-center">
                        {/* Nếu không đang loading, hiển thị div ban đầu */}
                        {!isLoading && (
                            <div
                                className="flex items-center gap-2 bg-[#2f65b9] cursor-pointer py-2 px-[15px] rounded-md"
                                onClick={handleClick}
                            >
                                <IconlySearch color={'#ffffff'} size={15} />
                                <button className="text-[#ffffff] font-medium text-sm">
                                    Matching projects with AI
                                </button>
                            </div>
                        )}

                        {/* Khi đang loading, hiển thị component Loading */}
                        {isLoading && <Loading />}
                    </div>
                </div>
                <div className="flex flex-col items-center w-4/12">
                    <div
                        className="relative flex flex-col items-center bg-[#ffffff] mb-10 p-1 rounded-md"
                        onClick={() => {
                            console.log('click')
                        }}
                    >
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
                    <DialogRoot
                        size={'xs'}
                        width="auto"
                        lazyMount
                        open={isOpenAvatarPreview}
                        onOpenChange={(e) => handleCloseAvatarPreview(e.open)}
                    >
                        <DialogContent className="flex items-center justify-center">
                            <DialogHeader className="flex">
                                <Text className="text-lg font-bold from-stone-900">Choose profile picture</Text>
                            </DialogHeader>
                            <DialogBody>
                                <Image
                                    src={avatarFileSrc}
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
                                    variant="solid"
                                    onClick={() => handleSaveAvatar(avatarFile)}
                                >
                                    Save
                                </Button>
                            </DialogFooter>
                            <DialogCloseTrigger onClick={() => handleCloseAvatarPreview(false)} />
                        </DialogContent>
                    </DialogRoot>
                    <h5 className="text-[#000000] font-bold text-lg flex gap-1 items-center">
                        {authUser?.name}
                        <IconlyShieldDone size={24} color="#3897f0" className="text-[#3897f0] mx-[6px]" />
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
                                <IconlyBookmark size={15} color={'#000000'} />
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
                    <ul className="flex flex-wrap items-center justify-center gap-5 p-0 m-0">
                        <li className="flex flex-col items-center  after:border-l-2 after:border-[#e0e6ec]">
                            <h5>0</h5>
                            Posts
                        </li>
                        <li>
                            <h5>0</h5>
                            Posts
                        </li>
                        <li>
                            <h5>0</h5>
                            Posts
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProfileOverview
