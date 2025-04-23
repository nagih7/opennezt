import { Alert, Avatar, Badge, Button, Image, Input, Stack, Text } from '@chakra-ui/react'
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
import {
    IconlyBookmark,
    IconlyCamera,
    IconlyFolder,
    IconlyLocation,
    IconlySearch,
    IconlyShieldDone,
} from 'components/UI/Iconly'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsOpenAvatarPreview } from 'states/modules/profile'
import Loading from './components/Loading'
import { matchingProjects } from 'api/artificialIntelligence'
import { setOpenModalMatchingProjects } from 'states/modules/artificialIntelligence'
import CrawlLinkedin from 'components/common/CrawlLinkedin'

const ProfileOverview = () => {
    // ========== DISPATCH ========== //
    const dispatch = useDispatch()
    // ========== STATE FROM REDUX STORE ========== //
    const { authUser } = useSelector((state) => state.auth)
    const { isLoadingBtnChangeAvatar, isOpenAvatarPreview } = useSelector((state) => state.profile)
    const { profile } = useSelector((state) => state.profile)
    const { projects, isLoadingMatchingProjects } = useSelector((state) => state.artificialIntelligence)
    // ========== STATE ========== //
    const [avatarFile, setAvatarFile] = useState(null)
    const [avatarFileSrc, setAvatarFileSrc] = useState(null)
    const [isOpenModalConfirmMatchingProjects, setIsOpenModalConfirmMatchingProjects] = useState(false)
    const [isOpenModalCrawlLinkedin, setIsOpenModalCrawlLinkedin] = useState(false)

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

    const handleMatchingProjects = () => {
        dispatch(matchingProjects())
        // setIsOpenModalCrawlLinkedin(true)
        setIsOpenModalConfirmMatchingProjects(false)
    }

    return (
        <div className="p-8 bg-[#ffffff] rounded-md">
            <div className="flex items-center w-full flex-nowrap">
                <div className="w-4/12">
                    <div className="flex items-center justify-center">
                        {isLoadingMatchingProjects && <Loading />}
                        {projects.length === 0 && !isLoadingMatchingProjects && (
                            <div
                                className="flex items-center gap-2 bg-[#2f65b9] cursor-pointer py-2 px-[15px] rounded-md"
                                onClick={() => setIsOpenModalConfirmMatchingProjects(true)}
                            >
                                <IconlySearch color={'#ffffff'} size={15} />
                                <button className="text-[#ffffff] font-medium text-sm">
                                    Matching projects with AI
                                </button>
                            </div>
                        )}
                        {projects.length > 0 && !isLoadingMatchingProjects && (
                            <div
                                className="flex items-center gap-2 bg-[#2f65b9] cursor-pointer py-2 px-[15px] rounded-md"
                                onClick={() => dispatch(setOpenModalMatchingProjects(true))}
                            >
                                <IconlyFolder color={'#ffffff'} size={15} />
                                <button className="text-[#ffffff] font-medium text-xs md:text-sm">
                                    View matching projects
                                </button>
                            </div>
                        )}
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
                    <h5 className="text-[#000000] font-bold text-xs md:text-lg flex gap-1 items-center">
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
            {/* AI MATCHING */}
            <DialogRoot size={'lg'} placement={'center'} lazyMount open={isOpenModalConfirmMatchingProjects}>
                <DialogContent>
                    <DialogHeader className="flex">
                        <Text className="text-lg font-bold from-stone-900">Matching projects with AI</Text>
                    </DialogHeader>
                    <DialogBody>
                        <Stack spacing={4} className="w-full">
                            <div className="text-[#000000] font-[500] text-md flex gap-1 items-center">
                                To provide you with the most accurate and relevant matches, our AI system needs to
                                analyze the following:
                            </div>
                            <div className="text-[#2f65b9] font-[500] text-md flex gap-1 items-center">
                                - Your project profile, including its description, goals, tractions and requirements.
                            </div>
                            <div className="text-[#2f65b9] font-[500] text-md flex gap-1 items-center">
                                - Profiles of your founding team and core team, including skills, roles, and expertise.
                            </div>
                            <div className="italic">
                                This information will only be used to enhance the matching process and recommend talents
                                who best align with your needs. Your data will remain confidential and protected under
                                our Privacy Policy.
                            </div>

                            <Alert.Root status="info">
                                <Alert.Indicator />
                                <Alert.Title>
                                    Do you consent to allowing our AI system to access this information for the purpose
                                    of generating matches?
                                </Alert.Title>
                            </Alert.Root>
                        </Stack>
                    </DialogBody>
                    <DialogFooter className="user-select-none">
                        <DialogActionTrigger asChild>
                            <Button variant="outline" onClick={() => setIsOpenModalConfirmMatchingProjects(false)}>
                                Cancel
                            </Button>
                        </DialogActionTrigger>
                        <Button variant="solid" onClick={handleMatchingProjects}>
                            Confirm
                        </Button>
                    </DialogFooter>
                    <DialogCloseTrigger onClick={() => setIsOpenModalConfirmMatchingProjects(false)} />
                </DialogContent>
            </DialogRoot>
            <CrawlLinkedin status={isOpenModalCrawlLinkedin} setStatus={setIsOpenModalCrawlLinkedin} />
        </div>
    )
}

export default ProfileOverview
