import { Button, createListCollection, HStack, Stack } from "@chakra-ui/react";
import {
	createOrUpdateCertification,
	getOrganizationFramework,
} from "api/profile";
import { Checkbox } from "components/UI/checkbox";
import {
	DialogActionTrigger,
	DialogBody,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogRoot,
	DialogTitle,
} from "components/UI/dialog";
import InputCustom from "components/UI/InputCustom";
import SelectCustom from "components/UI/SelectCustom";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenModalCreateOrUpdateCertification } from "states/modules/profile";

const CertificationProfile = () => {
	const dispatch = useDispatch();

	// ========== STATE FROM REDUX STORE ========== //
	const {
		isOpenModalCreateOrUpdateCertification,
		isLoadingCreateOrUpdateCertification,
		organizationFramework,
	} = useSelector((state) => state.profile);

	// ========== STATE MANAGEMENT ========== //
	const [action, setAction] = useState("");
	const [formData, setFormData] = useState({
		organization_id: "",
		name: "",
		description: "",
		issue_date: "",
		expiration_date: "",
		is_lifetime: false,
		verification_url: "",
	});

	// ========== USE EFFECT ========== //
	useEffect(() => {
		dispatch(getOrganizationFramework());
	}, [dispatch]);

	// ========== LOGIC ========== //
	const handleAddCertification = () => {
		setAction("create");
		dispatch(setIsOpenModalCreateOrUpdateCertification(true));
	};
	const onChange = debounce((event, nameSelect) => {
		setFormData({
			...formData,
			[nameSelect]: event?.target?.value || event?.value[0],
		});
	}, 300);

	const onCheckedChange = (event, nameSelect) => {
		if (event.checked === true) {
			setFormData({
				...formData,
				expiration_date: "",
			});
		}
		setFormData({
			...formData,
			[nameSelect]: event.checked,
		});
	};

	const handleConfirm = () => {
		if (formData.is_lifetime) {
			const { expiration_date, ...rest } = formData;
			dispatch(
				createOrUpdateCertification(
					{ ...rest, expiration_date: "" },
					action
				)
			);
		} else {
			dispatch(createOrUpdateCertification(formData, action));
		}
	};

	// ========== COMPONENT RENDER ========== //
	return (
		<>
			<Button
				onClick={handleAddCertification}
				height={50}
				className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
				borderRadius={4}
				loading={false}
				loadingText="Loading..."
				spinnerPlacement="start">
				Add Certification
			</Button>
			<DialogRoot
				size={"lg"}
				placement={"center"}
				open={isOpenModalCreateOrUpdateCertification}
				onOpenChange={(e) =>
					dispatch(setIsOpenModalCreateOrUpdateCertification(e.open))
				}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add Certification</DialogTitle>
					</DialogHeader>
					<DialogBody pb="4">
						<Stack gap="6">
							<SelectCustom
								required
								label="Organization"
								collection={organizationFramework}
								height="40px"
								placeholder="Ex: AWS"
								onChange={(event) => onChange(event, "organization_id")}
							/>
							<InputCustom
								onChange={(event) => onChange(event, "name")}
								label="Name"
								required
								placeholder="Ex: AWS Certified Solutions Architect"
								height="40px"
							/>
							<InputCustom
								onChange={(event) => onChange(event, "description")}
								label="Description"
								placeholder="Ex: Certified in designing scalable and secure cloud architectures on AWS"
								height="40px"
							/>
							<Checkbox
								onCheckedChange={(event) =>
									onCheckedChange(event, "is_lifetime")
								}>
								Certified for life
							</Checkbox>

							<HStack gap="2">
								<InputCustom
									type="month"
									onChange={(event) => onChange(event, "issue_date")}
									label="Issued Date"
									placeholder="Month"
									height="40px"
								/>
								<InputCustom
									disabled={formData.is_lifetime}
									type="month"
									onChange={(event) =>
										onChange(event, "expiration_date")
									}
									label="Expiration Date"
									placeholder="Month"
									height="40px"
								/>
							</HStack>
							<InputCustom
								required
								ps="4.5rem"
								startElement="https://"
								onChange={(event) =>
									onChange(event, "verification_url")
								}
								label="Verification URL"
								placeholder="www.yourcertification.com"
								height="40px"
							/>
						</Stack>
					</DialogBody>
					<DialogFooter>
						<DialogActionTrigger asChild>
							<Button variant="outline">Cancel</Button>
						</DialogActionTrigger>
						<Button
							loadingText="Saving..."
							loading={isLoadingCreateOrUpdateCertification}
							onClick={handleConfirm}
							spinnerPlacement="start">
							Save
						</Button>
					</DialogFooter>
				</DialogContent>
			</DialogRoot>
		</>
	);
};

export default CertificationProfile;
