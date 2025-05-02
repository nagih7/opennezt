import { Button, Dialog, Portal, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../ProfileCard";
import ProfileEditMenu from "../ProfileEditMenu";
import ActionBar from "../ActionBar";
import InputCustom from "components/UI/InputCustom";
import { setIsOpenModalCreateOrUpdateCertification } from "states/modules/profile";
import moment from "moment";
import { IconlyEdit, IconlyDelete } from "components/UI/Iconly";
import SelectCustom from "components/UI/SelectCustom";
import {
	createCertification,
	updateCertification,
	deleteCertification,
	getOrganizationFramework,
	getProfile,
} from "api/profile";
import { Checkbox } from "components/UI/checkbox";
import { Table } from "@chakra-ui/react"
const Certifications = () => {
	const dispatch = useDispatch()
	// ========== STATE FROM REDUX STORE ========== //
	const { profile } = useSelector((state) => state.profile)
	const { certifications } = profile || []
	const { isOpenModalCreateOrUpdateCertification, isLoadingCreateOrUpdateCertification, organizationFramework } =
		useSelector((state) => state.profile)
	// ========== STATE MANAGEMENT ========== //

	const [action, setAction] = useState('')
	const [formData, setFormData] = useState({})
	const [targetDelete, setTargetDelete] = useState(null)
	const [isOpenModalDeleteEducation, setIsOpenModalDeleteCertification] = useState(false)
	// ========== USE EFFECT ========== //
	useEffect(() => {
		if (!profile) dispatch(getProfile())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch])
	useEffect(() => {
		dispatch(getOrganizationFramework())
	}, [dispatch])
	// ========== HANDLE CHANGE FUNCTION ========== //
	const handleChange = (e, nameSelect) => {
		if (nameSelect) {
			setFormData({
				...formData,
				[nameSelect]: e.value,
			})
		} else {
			setFormData({
				...formData,
				[e.target.name]: e.target.value,
			})
		}
	}

	const handleAddCertification = () => {
		dispatch(setIsOpenModalCreateOrUpdateCertification(true))
		setAction('create')
		setFormData({
			organization_id: '',
			name: '',
			description: '',
			issue_date: '',
			expiration_date: '',
			is_lifetime: false,
			verification_url: '',
		})
	}

	const handleUpdateCertification = (certification) => {
		dispatch(setIsOpenModalCreateOrUpdateCertification(true))
		setAction('update')
		setFormData({
			...certification,
			issue_date: moment(certification.issue_date).format('YYYY-MM'),
			expiration_date: moment(certification.expiration_date).format('YYYY-MM'),
		})
	}

	const handleOpenModalDelete = (education) => {
		setIsOpenModalDeleteCertification(true)
		setTargetDelete(education)
	}

	const handleDeleteCertification = () => {
		dispatch(deleteCertification(targetDelete._id))
		setIsOpenModalDeleteCertification(false)
	}

	const handleSaveChanges = () => {
		if (formData.is_lifetime) {
			const { organization_id, expiration_date, ...rest } = formData
			switch (action) {
				case 'create':
					dispatch(
						createCertification(
							{
								...rest,
								expiration_date: null,
								organization_id:
									typeof organization_id === 'object'
										? organization_id[0]
										: Array(organization_id)[0],
							},
							action
						)
					)
					break
				case 'update':
					dispatch(
						updateCertification({
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
						createCertification(
							{
								...rest,
								organization_id:
									typeof organization_id === 'object'
										? organization_id[0]
										: Array(organization_id)[0],
							},
							action
						)
					)
					break
				case 'update':
					dispatch(
						updateCertification({
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

	const onCheckedChange = (event, nameSelect) => {
		if (event.checked === true) {
			setFormData({
				...formData,
				expiration_date: '',
			})
		}
		setFormData({
			...formData,
			[nameSelect]: event.checked,
		})
	}

	const handleClose = () => {
		dispatch(setIsOpenModalCreateOrUpdateCertification(false))
	}

	const formatDate = (dateString) => {
		if (!dateString) return 'N/A'
		const date = new Date(dateString)
		return `${date.getMonth() + 1}/${date.getFullYear()}`
	}

	// ========== COMPONENT RENDER ========== //
	return (
		<div className="flex gap-8 flex-col md:flex-row w-full py-8 px-[16px]">
			<ProfileEditMenu />
			<div className="md:w-8/12 w-full">
				<div className="bg-[#ffffff] md:block hidden p-8 rounded-md">
					{/* =========== Profile Card ========== */}
					<ProfileCard />
					{/* =========== Action Bar  ========== */}
					<ActionBar />
				</div>
				<div className="bg-[#ffffff] p-8 rounded-md md:mt-8">
					<div className="pb-[20px] mb-8 border-b-[1px] border-gray-200 flex justify-between">
						<div>
							<h4 className="">Certifications</h4>
						</div>
						<Button
							onClick={handleAddCertification}
							height={50}
							className="mt-[14px] text-sm sm:text-base px-[18px] sm:px-[28px] py-2 sm:py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
							borderRadius={4}
							loading={false}
							loadingText="Loading..."
							spinnerPlacement="start">
							Add Certification
						</Button>
					</div>
					<div>
						<div className=" max-w-full p-0 m-0 overflow-x-scroll scrollbar-hide px-[16px]">
							<div>

								<Table.Root size="lg" striped>
									<Table.Header>
										<Table.Row >
											<Table.ColumnHeader>Name</Table.ColumnHeader>
											<Table.ColumnHeader>Certificate Expiration</Table.ColumnHeader>
											<Table.ColumnHeader>Date</Table.ColumnHeader>
											<Table.ColumnHeader >Verification URL</Table.ColumnHeader>
											<Table.ColumnHeader >Actions</Table.ColumnHeader>
										</Table.Row>
									</Table.Header>
									<Table.Body>
										{certifications?.map((certification, index) => (
											<Table.Row key={index}>
												<Table.Cell>{certification.name}</Table.Cell>
												<Table.Cell>{formatDate(certification.expiration_date) || "N/A"}</Table.Cell>
												<Table.Cell>{formatDate(certification.issue_date)}</Table.Cell>
												<Table.Cell className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
													<a
														href={certification.verification_url}
														target="_blank"
														rel="noopener noreferrer"
														title={certification.verification_url}
														className="text-blue-500 underline"
													>
														{certification.verification_url.replace(/^https?:\/\//, '').slice(0, 30) || "N/A"}...
													</a>
												</Table.Cell>
												<Table.Cell className="flex" textAlign="end">
													<span
														className="cursor-pointer"
														onClick={() => handleOpenModalDelete(certification)}
													>
														<IconlyDelete size={24} color={"#000"} />
													</span>
													<span
														className="cursor-pointer"
														onClick={() => handleUpdateCertification(certification)}
													>
														<IconlyEdit size={24} color={"#000"} />
													</span>
												</Table.Cell>
											</Table.Row>
										))}
									</Table.Body>
								</Table.Root>

							</div>
						</div>
					</div>
				</div>
			</div>
			{/* =========== MODAL CREATE OR UPDATE CERTIFICATION ========== */}
			<Dialog.Root
				size={'lg'}
				open={isOpenModalCreateOrUpdateCertification}
				placement={'center'}
				motionPreset="slide-in-bottom"
			>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content className="bg-white">
							<Dialog.Header>
								<Dialog.Title>
									{action === 'create' ? 'Add certification' : 'Update certification'}
								</Dialog.Title>
							</Dialog.Header>
							<Dialog.Body gap={6}>
								<Stack gap="6">
									<Stack direction="row">
										<SelectCustom
											required
											label="Organization"
											collection={organizationFramework}
											height="40px"
											placeholder="Ex: AWS"
											onChange={(e) => handleChange(e, 'organization_id')}
											value={formData.organization_id}
											name="organization_id"
										/>
									</Stack>
									<Stack direction="row">
										<InputCustom
											label="Name"
											required
											placeholder="Ex: AWS Certified Solutions Architect"
											height="40px"
											name="name"
											onChange={handleChange}
											value={formData.name}
										/>
									</Stack>
									<Checkbox onCheckedChange={(event) => onCheckedChange(event, 'is_lifetime')}>
										Certified for life
									</Checkbox>
									<Stack direction="row">
										<InputCustom
											type="month"
											label="Issue Date"
											required
											height="40px"
											name="issue_date"
											onChange={handleChange}
											value={formData.issue_date}
										/>
										<InputCustom
											type="month"
											disabled={formData.is_lifetime}
											label="Expiration Date"
											required
											height="40px"
											name="expiration_date"
											onChange={handleChange}
											value={formData.expiration_date}
										/>
									</Stack>
									<Stack direction="row">
										<InputCustom
											ps="4.5rem"
											label="Verification URL"
											startElement="https://"
											placeholder="www.yourcertification.com"
											height="40px"
											name="verification_url"
											onChange={handleChange}
											value={formData.verification_url}
										/>
									</Stack>
								</Stack>
							</Dialog.Body>
							<Dialog.Footer>
								<Button
									className="border-[#F4F5F6] bg-[#2F65B9] text-white"
									onClick={handleSaveChanges}
									borderRadius={4}
									loading={isLoadingCreateOrUpdateCertification}
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
			{/* =========== MODAL DELETE CERTIFICATION ========== */}
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
								<Dialog.Title>Delete certification</Dialog.Title>
							</Dialog.Header>
							<Dialog.Body gap={6}>
								<Stack gap="6">Do you want to delete this certification?</Stack>
							</Dialog.Body>
							<Dialog.Footer>
								<Button
									className="border-[#F4F5F6] bg-[#2F65B9] text-white"
									onClick={handleDeleteCertification}
									borderRadius={4}
									loading={isLoadingCreateOrUpdateCertification}
									loadingText="Loading..."
									spinnerPlacement="start"
								>
									CONFIRM
								</Button>
								<Dialog.ActionTrigger asChild>
									<Button
										className="border-[#F4F5F6] text-black hover:bg-[#F4F5F6]"
										variant="outline"
										onClick={() => setIsOpenModalDeleteCertification(false)}
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
	);
};

export default Certifications;