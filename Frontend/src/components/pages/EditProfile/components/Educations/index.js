import { Button, Dialog, Portal, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileCard from '../ProfileCard'
import ProfileEditMenu from '../ProfileEditMenu'
import ActionBar from '../ActionBar'
import InputCustom from 'components/UI/InputCustom'
import { setIsOpenModalCreateOrUpdateEducation } from 'states/modules/profile'
import moment from 'moment'
import { IconlyEdit } from 'components/UI/Iconly'
import { IconlyDelete } from 'components/UI/Iconly'
import { createEducation, updateEducation, deleteEducation, getProfile } from 'api/profile'
import { DataList } from '@chakra-ui/react'
const Educations = () => {
    const dispatch = useDispatch()
    // ========== STATE FROM REDUX STORE ========== //
    const { profile } = useSelector((state) => state.profile)
    const { educations } = profile || []
    const { isOpenModalCreateOrUpdateEducation, isLoadingCreateOrUpdateEducation } = useSelector(
        (state) => state.profile
    )

    // ========== STATE MANAGEMENT ========== //
    const [action, setAction] = useState('')
    const [formData, setFormData] = useState({})
    const [targetDelete, setTargetDelete] = useState(null)
    const [isOpenModalDeleteEducation, setIsOpenModalDeleteEducation] = useState(false)

    // ========== USE EFFECT ========== //
    useEffect(() => {
        if (!profile) dispatch(getProfile())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    // ========== HANDLE CHANGE FUNCTION ========== //
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleAddCertification = () => {
        dispatch(setIsOpenModalCreateOrUpdateEducation(true))
        setAction('create')
        setFormData({
            school: '',
            degree: '',
            field_of_study: '',
            start_date: '',
            end_date: '',
            grade: '',
            activities: '',
        })
    }

    const handleUpdateEducation = (education) => {
        dispatch(setIsOpenModalCreateOrUpdateEducation(true))
        setAction('update')
        setFormData({
            ...education,
            start_date: moment(education.start_date).format('YYYY-MM'),
            end_date: education.end_date ? moment(education.end_date).format('YYYY-MM') : '',
        })
    }

    const handleOpenModalDelete = (education) => {
        setIsOpenModalDeleteEducation(true)
        setTargetDelete(education)
    }

    const handleDeleteEducation = () => {
        dispatch(deleteEducation(targetDelete._id))
        setIsOpenModalDeleteEducation(false)
    }
    const handleSaveChanges = () => {
        if (formData.is_lifetime) {
            const { organization_id, expiration_date, ...rest } = formData
            switch (action) {
                case 'create':
                    dispatch(
                        createEducation({
                            ...rest,
                            expiration_date: null,
                            organization_id:
                                typeof organization_id === 'object' ? organization_id[0] : Array(organization_id)[0],
                        })
                    )
                    break
                case 'update':
                    dispatch(
                        updateEducation({
                            ...rest,
                            expiration_date: null,
                            organization_id:
                                typeof organization_id === 'object' ? organization_id[0] : Array(organization_id)[0],
                        })
                    )
                    break
                default:
                    break
            }
        } else {
            const { organization_id, ...rest } = formData
            switch (action) {
                case 'create':
                    dispatch(
                        createEducation({
                            ...rest,
                            organization_id:
                                typeof organization_id === 'object' ? organization_id[0] : Array(organization_id)[0],
                        })
                    )
                    break
                case 'update':
                    dispatch(
                        updateEducation({
                            ...rest,
                            organization_id:
                                typeof organization_id === 'object' ? organization_id[0] : Array(organization_id)[0],
                        })
                    )
                    break
                default:
                    break
            }
        }
    }

    const handleClose = () => {
        dispatch(setIsOpenModalCreateOrUpdateEducation(false))
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
                            <h4 className="">Educations</h4>
                        </div>
                        <Button
                            onClick={handleAddCertification}
                            height={50}
                            className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                            borderRadius={4}
                            loading={false}
                            loadingText="Loading..."
                            spinnerPlacement="start"
                        >
                            Add Education
                        </Button>
                    </div>
                    <div>
                        <div className="px-[16px]">
                            {educations?.map((education, index) => (
                                <DataList.Root orientation="horizontal" key={index}>
                                    <div key={index}>
                                        <div className=" shadow rounded-[0.6rem]">
                                            <div className="relative p-4 mt-[2rem]">
                                                <Stack
                                                    className="flex gap-2 md:float-right 2xl:float-right"
                                                    direction={'row'}
                                                >
                                                    <span
                                                        className="cursor-pointer"
                                                        onClick={() => handleUpdateEducation(education)}
                                                    >
                                                        <IconlyEdit size={24} color={'#000'} />
                                                    </span>
                                                    <span
                                                        className="cursor-pointer"
                                                        onClick={() => handleOpenModalDelete(education)}
                                                    >
                                                        <IconlyDelete size={24} color={'#000'} />
                                                    </span>
                                                </Stack>

                                                {education.school && (
                                                    <h4 className="flex font-bold mb-[0.75rem]">{education.school}</h4>
                                                )}
                                                {education.start_date && education.end_date && (
                                                    <p className="relative text-[#9B9B9B] top-[-1rem] left-[-0.1rem] text-[1rem]">
                                                        {`${moment(education.start_date).format('MMM YYYY')} ${
                                                            education.end_date
                                                                ? `- ${moment(education.end_date).format('MMM YYYY')}`
                                                                : ''
                                                        }`}
                                                    </p>
                                                )}
                                                {education.field_of_study && (
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <DataList.ItemLabel> Field of study</DataList.ItemLabel>
                                                        <DataList.ItemValue className="mb-0">
                                                            {education.field_of_study}
                                                        </DataList.ItemValue>
                                                    </div>
                                                )}
                                                {education.degree && (
                                                    <div className="flex items-center gap-2 mb-2">
                                                        {' '}
                                                        <DataList.ItemLabel> Degree</DataList.ItemLabel>
                                                        <DataList.ItemValue className="mb-0">
                                                            {education.degree}
                                                        </DataList.ItemValue>
                                                    </div>
                                                )}
                                                {education.grade && (
                                                    <div className="flex items-center gap-2 mb-2">
                                                        {' '}
                                                        <DataList.ItemLabel> Grade</DataList.ItemLabel>
                                                        <DataList.ItemValue className="mb-0">
                                                            {education.grade}
                                                        </DataList.ItemValue>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </DataList.Root>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* CREATE/UPDATE */}
            <Dialog.Root
                size={'lg'}
                open={isOpenModalCreateOrUpdateEducation}
                placement={'center'}
                motionPreset="slide-in-bottom"
            >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content className="bg-white">
                            <Dialog.Header>
                                <Dialog.Title>
                                    {action === 'create' ? 'Add education' : 'Update education'}
                                </Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body gap={6}>
                                <Stack gap="6">
                                    <Stack direction="row">
                                        <InputCustom
                                            label="School"
                                            required
                                            placeholder="Ex: Harvard University"
                                            height="40px"
                                            name="school"
                                            onChange={handleChange}
                                            value={formData.school}
                                        />
                                    </Stack>
                                    <Stack direction="row">
                                        <InputCustom
                                            label="Degree"
                                            required
                                            placeholder="Ex: Bachelor"
                                            height="40px"
                                            name="degree"
                                            onChange={handleChange}
                                            value={formData.degree}
                                        />
                                        <InputCustom
                                            label="Field of Study"
                                            required
                                            placeholder="Ex: Computer Science"
                                            height="40px"
                                            name="field_of_study"
                                            onChange={handleChange}
                                            value={formData.field_of_study}
                                        />
                                    </Stack>
                                    <Stack direction="row">
                                        <InputCustom
                                            type="month"
                                            label="Start Date"
                                            required
                                            height="40px"
                                            name="start_date"
                                            onChange={handleChange}
                                            value={formData.start_date}
                                        />
                                        <InputCustom
                                            type="month"
                                            label="End Date"
                                            height="40px"
                                            name="end_date"
                                            onChange={handleChange}
                                            value={formData.end_date}
                                        />
                                    </Stack>
                                    <Stack direction="row">
                                        <InputCustom
                                            label="Grade"
                                            placeholder="Ex: 3.5"
                                            height="40px"
                                            name="grade"
                                            onChange={handleChange}
                                            value={formData.grade}
                                        />
                                    </Stack>
                                    <Stack direction="row">
                                        <InputCustom
                                            label="Activities"
                                            placeholder="Ex: Student Council"
                                            height="40px"
                                            name="activities"
                                            onChange={handleChange}
                                            value={formData.activities}
                                        />
                                    </Stack>
                                </Stack>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Button
                                    className="border-[#F4F5F6] bg-[#2F65B9] text-white"
                                    onClick={handleSaveChanges}
                                    borderRadius={4}
                                    loading={isLoadingCreateOrUpdateEducation}
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
                open={isOpenModalDeleteEducation}
                placement={'center'}
                motionPreset="slide-in-bottom"
            >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content className="bg-white">
                            <Dialog.Header>
                                <Dialog.Title>Delete education</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body gap={6}>
                                <Stack gap="6">Do you want to delete this education?</Stack>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Button
                                    className="border-[#F4F5F6] bg-[#2F65B9] text-white"
                                    onClick={handleDeleteEducation}
                                    borderRadius={4}
                                    loading={isLoadingCreateOrUpdateEducation}
                                    loadingText="Loading..."
                                    spinnerPlacement="start"
                                >
                                    CONFIRM
                                </Button>
                                <Dialog.ActionTrigger asChild>
                                    <Button
                                        className="border-[#F4F5F6] text-black hover:bg-[#F4F5F6]"
                                        variant="outline"
                                        onClick={() => setIsOpenModalDeleteEducation(false)}
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

export default Educations
