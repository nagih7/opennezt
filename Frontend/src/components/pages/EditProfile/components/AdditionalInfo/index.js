import { Button, CloseButton, createListCollection, Dialog, Portal, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileCard from '../ProfileCard'
import ProfileEditMenu from '../ProfileEditMenu'
import ActionBar from '../ActionBar'
import InputCustom from 'components/UI/InputCustom'
import { IconlyEdit } from 'components/UI/Iconly'
import { createOrUpdateProfileAdditionalInfo } from 'api/profile'
import { setIsOpenModalCreateOrUpdateProfileAdditionalInfo } from 'states/modules/profile'
import { PROFILE_ADDITIONAL } from 'utils/constants'
import SelectCustom from 'components/UI/SelectCustom'

const AdditionalInfoFramework = createListCollection({
    items: PROFILE_ADDITIONAL['EN'].map((item) => ({
        label: item.label,
        value: item.value,
    })),
})

const AdditionalInfo = () => {
    const dispatch = useDispatch()
    // // ========== STATE FROM REDUX STORE ========== //
    const { profile } = useSelector((state) => state.profile)
    const { additional_infos } = profile || []
    const { isOpenModalCreateOrUpdateProfileAdditionalInfo, isLoadingCreateOrUpdateProfileAdditionalInfo } =
        useSelector((state) => state.profile)
    // // ========== STATE MANAGEMENT ========== //
    const [action, setAction] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        content: '',
    })
    // ========== HANDLE CHANGE FUNCTION ========== //
    const handleChangeSelect = (event, nameSelect) => {
        setFormData({
            ...formData,
            [nameSelect]: event.value[0],
        })
    }
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleAddProfileAdditionInfo = () => {
        dispatch(setIsOpenModalCreateOrUpdateProfileAdditionalInfo(true))
        setAction('create')
        setFormData({
            name: '',
            content: '',
        })
    }

    const handleUpdateProfileAdditionalInfo = (info) => {
        dispatch(setIsOpenModalCreateOrUpdateProfileAdditionalInfo(true))
        setAction('update')
        setFormData({
            ...info,
        })
    }

    const handleSaveChanges = () => {
        dispatch(createOrUpdateProfileAdditionalInfo(formData, action))
    }

    const handleClose = () => {
        dispatch(setIsOpenModalCreateOrUpdateProfileAdditionalInfo(false))
    }

    // ========== COMPONENT RENDER ========== //
    return (
        <div className="flex gap-8 w-full py-8 px-[16px]">
            <ProfileEditMenu />
            <div className="w-8/12">
                <div className="bg-[#ffffff] p-8 rounded-md">
                    {/* =========== Profile Card ========== */}
                    <ProfileCard />
                    {/* =========== Action Bar  ========== */}
                    <ActionBar />
                </div>
                <div className="bg-[#ffffff] p-8 rounded-md mt-8">
                    <div className="pb-[20px] mb-8 border-b-[1px] border-gray-200 flex justify-between">
                        <div>
                            <h4 className="">More</h4>
                        </div>
                        <Button
                            disabled={isLoadingCreateOrUpdateProfileAdditionalInfo}
                            onClick={handleAddProfileAdditionInfo}
                            height={50}
                            className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                            borderRadius={4}
                            loading={false}
                            loadingText="Loading..."
                            spinnerPlacement="start"
                        >
                            Add Additional Info
                        </Button>
                    </div>
                    <div>
                        <div>
                            {additional_infos?.map((info, index) => (
                                <div key={index}>
                                    <div className="shadow rounded-[0.6rem]">
                                        <div className="relative p-4 mt-[2rem]">
                                            <span
                                                className="cursor-pointer md:float-right 2xl:float-right"
                                                onClick={() => handleUpdateProfileAdditionalInfo(info)}
                                            >
                                                <IconlyEdit size={24} color={'#000'} />
                                            </span>
                                            <h4 className="flex font-bold">{info?.name}</h4>
                                            {info?.content && <p className="flex "> {info?.content}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Dialog.Root
                size={'lg'}
                open={isOpenModalCreateOrUpdateProfileAdditionalInfo}
                key={formData.profile_id}
                placement={'center'}
                motionPreset="slide-in-bottom"
            >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content className="bg-white">
                            <Dialog.Header>
                                <Dialog.Title>
                                    {action === 'create' ? 'Add additional info' : 'Update additional info'}
                                </Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <Stack direction="row" h="20">
                                    <SelectCustom
                                        height="40px"
                                        required
                                        label="Name"
                                        placeholder="Ex: Ex: What I can offer"
                                        collection={AdditionalInfoFramework}
                                        onChange={(e) => handleChangeSelect(e, 'name')}
                                        value={formData.name}
                                        name="name"
                                    />
                                </Stack>
                                <Stack direction="row" h="20">
                                    <InputCustom
                                        label="Content"
                                        placeholder="Ex: I can offer you a lot of things"
                                        height="40px"
                                        name="content"
                                        onChange={handleChange}
                                        value={formData.content}
                                    />
                                </Stack>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Button
                                    className="border-[#F4F5F6] bg-[#2F65B9] text-white"
                                    onClick={handleSaveChanges}
                                    borderRadius={4}
                                    loading={isLoadingCreateOrUpdateProfileAdditionalInfo}
                                    loadingText="Loading..."
                                    spinnerPlacement="start"
                                >
                                    SAVE CHANGES
                                </Button>
                                <Dialog.ActionTrigger asChild>
                                    <Button
                                        className="border-[#F4F5F6] text-black hover:bg-[#F4F5F6]"
                                        variant="outline"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
                                </Dialog.ActionTrigger>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </div>
    )
}

export default AdditionalInfo
