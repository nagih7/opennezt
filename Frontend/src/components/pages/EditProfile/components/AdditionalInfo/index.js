import { Button, createListCollection, Dialog, Portal, Stack, Table } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileCard from '../ProfileCard'
import ProfileEditMenu from '../ProfileEditMenu'
import ActionBar from '../ActionBar'
import { IconlyDelete, IconlyEdit } from 'components/UI/Iconly'
import {
    createProfileAdditionalInfo,
    updateProfileAdditionalInfo,
    deleteProfileAdditionalInfo,
    getProfile,
} from 'api/profile'
import { setIsOpenModalCreateOrUpdateProfileAdditionalInfo } from 'states/modules/profile'
import { PROFILE_ADDITIONAL } from 'utils/constants'
import SelectCustom from 'components/UI/SelectCustom'
import TextAreaCustom from 'components/UI/TextAreaCustom'

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
    // ========== STATE MANAGEMENT ========== //
    const [action, setAction] = useState('')
    const [formData, setFormData] = useState({})
    const [targetDelete, setTargetDelete] = useState(null)
    const [isOpenModalDeleteAdditionalInfo, setIsOpenModalDeleteAdditionalInfo] = useState(false)
    // ========== USE EFFECT ========== //
    useEffect(() => {
        if (!profile) dispatch(getProfile())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])
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

    const handleOpenModalDelete = (info) => {
        setIsOpenModalDeleteAdditionalInfo(true)
        setTargetDelete(info)
    }

    const handleDeleteCertification = () => {
        dispatch(deleteProfileAdditionalInfo(targetDelete._id))
        setIsOpenModalDeleteAdditionalInfo(false)
    }

    const handleSaveChanges = () => {
        switch (action) {
            case 'create':
                dispatch(createProfileAdditionalInfo(formData, action))
                break
            case 'update':
                dispatch(updateProfileAdditionalInfo(formData))
                break
            default:
                break
        }
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


                            <Table.Root size="lg" striped  >
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeader>Name</Table.ColumnHeader>
                                        <Table.ColumnHeader>Content</Table.ColumnHeader>
                                        <Table.ColumnHeader >Action</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {additional_infos?.map((info, index) => (
                                        <Table.Row key={index}>
                                            <Table.Cell>{info.name}</Table.Cell>
                                            <Table.Cell>{info.content}</Table.Cell>
                                            <Table.Cell textAlign="end" className='flex ' >
                                                <span className='cursor-pointer' onClick={() => handleUpdateProfileAdditionalInfo(info)}><IconlyEdit size={24} color={"#000"} /></span>
                                                <span className="cursor-pointer"
                                                    onClick={() => handleOpenModalDelete(info)}><IconlyDelete size={24} color={"#000"} /></span></Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Root>


                        </div>
                    </div>
                </div>
            </div>

            {/* CREATE/UPDATE */}
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
                                <Stack direction="row">
                                    <TextAreaCustom
                                        resize="none"
                                        required
                                        label="Content"
                                        placeholder="Ex: I can offer you a lot of things"
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
            {/* DELETE */}
            <Dialog.Root
                size={'md'}
                open={isOpenModalDeleteAdditionalInfo}
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
                                Do you want to delete this additional info? This action cannot be undone.
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Button
                                    className="border-[#F4F5F6] bg-[#2F65B9] text-white"
                                    onClick={handleDeleteCertification}
                                    borderRadius={4}
                                    loading={isLoadingCreateOrUpdateProfileAdditionalInfo}
                                >
                                    CONFIRM
                                </Button>
                                <Dialog.ActionTrigger asChild>
                                    <Button
                                        className="border-[#F4F5F6] text-black hover:bg-[#F4F5F6]"
                                        variant="outline"
                                        onClick={() => setIsOpenModalDeleteAdditionalInfo(false)}
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
