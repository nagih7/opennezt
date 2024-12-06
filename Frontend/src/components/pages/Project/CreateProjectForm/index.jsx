import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Input, Select, Space } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Switch, DatePicker, Button, Image } from "antd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FundingSourceBox from "./FundingSourceBox";
import { listSector, listStage } from "components/common/ListSelected";
const { Dragger } = Upload;
const { TextArea } = Input;
const baseUrlApi = process.env.REACT_APP_API_URL;

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

const CreateProjectForm = (props) => {
	const { formData, setFormData } = props;

	const [pitchDesk, setPitchDesk] = useState([]);
	const [backgroundStartUp, setBackgroundStartUp] = useState([]);
	const [isHaveRevenue, setIsHaveRevenue] = useState(true);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");

	// Pitch Desk
	const onChangePitchDesk = ({ file: file }) => {
		const { status } = file;
		if (status !== "uploading") {
			console.log(file, fileList);
		}
		if (status === "done") {
			message.success(`${file.name} file uploaded successfully.`);
		} else if (status === "error") {
			message.error(`${file.name} file upload failed.`);
		}
	};
	const onBeforeUploadPitchDesk = async (file) => {
		const isPDF = file.type === "application/pdf";
		if (isPDF) {
			setPitchDesk([file]);
			setFormData((prevState) => ({
				...prevState,
				pitch_deck: file,
			}));
		} else {
			return isPDF;
		}

		return isPDF;
	};

	const onRemovePitchDesk = () => {
		setPitchDesk([]);
		setFormData((prevState) => ({
			...prevState,
			pitch_deck: {},
		}));
	};

	// Background
	const onChangeBackground = ({ fileList: newFileList }) => {
		if (newFileList[0].status !== "removed") {
			setBackgroundStartUp(newFileList);
			setFormData((prevState) => ({
				...prevState,
				background: newFileList[0].originFileObj,
			}));
		}
	};
	const onRemoveBackground = (file) => {
		setBackgroundStartUp([]);
		setFormData((prevState) => ({
			...prevState,
			background: {},
		}));
	};

	const handleOnChange = (event, nameSelect) => {
		if (nameSelect) {
			setFormData((prevState) => ({
				...prevState,
				[nameSelect]: event,
			}));
		} else {
			const { name, value } = event.target;
			setFormData((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	const onChangeSwitch = () => {
		setIsHaveRevenue(!isHaveRevenue);
	};

	const onChangeDate = (date, dateString, index) => {
		const updatedRevenues = formData.revenues.map((revenue, i) => {
			if (i === index) {
				return { ...revenue, time: dateString };
			}
			return revenue;
		});
		setFormData((prevState) => ({
			...prevState,
			revenues: updatedRevenues,
		}));
	};

	const onChangeRevenue = (event, id) => {
		const { value } = event.target;
		const updatedRevenues = formData.revenues.map((revenue, index) => {
			if (index === id) {
				return { ...revenue, revenue: value };
			}
			return revenue;
		});
		setFormData((prevState) => ({
			...prevState,
			revenues: updatedRevenues,
		}));
	};

	const handleAddRevenue = () => {
		setFormData((prevState) => ({
			...prevState,
			revenues: [...prevState.revenues, { time: "", revenue: "" }],
		}));
	};

	const handleRemoveRevenue = (index) => {
		const updatedRevenues = formData.revenues.filter(
			(revenue, i) => i !== index
		);
		setFormData((prevState) => ({
			...prevState,
			revenues: updatedRevenues,
		}));
	};

	const handleChangeFundingSource = (field, value) => {
		setFormData((prevState) => ({
			...prevState,
			funding_sources: {
				...prevState.funding_sources,
				[field]: value,
			},
		}));
	};

	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
	};

	return (
		<div className={styles.createProjectForm}>
			<h2>Startup Details</h2>
			<Input
				value={formData.name}
				name="name"
				placeholder="Startup name*"
				onChange={(e) => handleOnChange(e)}
				autoSize
				required
				style={{ padding: "4px 11px" }}
			/>
			<Input
				value={formData.lading_page_url}
				name="lading_page_url"
				placeholder="Landing page URL"
				onChange={(e) => handleOnChange(e)}
				autoSize
				style={{ padding: "4px 11px" }}
			/>
			<Select
				value={formData.related_industries}
				mode="multiple"
				style={{
					width: "100%",
				}}
				required
				size="large"
				placeholder="Which industries are relevant to your company?*"
				onChange={(value) => handleOnChange(value, "related_industries")}
				options={listSector}
				optionRender={(listSector) => (
					<Space>
						<span role="img" aria-label={listSector.data.label}>
							{listSector.data.emoji}
						</span>
						{listSector.data.desc}
					</Space>
				)}
			/>
			<Select
				required
				showSearch
				placeholder="What stage of development is your startup currently in?*"
				optionFilterProp="label"
				onChange={(value) => handleOnChange(value, "stage")}
				size="large"
				style={{ width: "100%" }}
				options={listStage}
			/>
			<TextArea
				rows={4}
				value={formData.problem}
				name="problem"
				placeholder="Describe the problem*"
				onChange={(e) => handleOnChange(e)}
				// autoSize
				maxLength={500}
			/>
			{/* <p>
				Tell us what your target audience is struggling with and why they
				might be unsatisfied with the current solutions available to them.
			</p> */}
			<TextArea
				rows={4}
				value={formData.solution}
				name="solution"
				placeholder="What is your company going to make to solve this problem?*"
				onChange={(e) => handleOnChange(e)}
				// autoSize
				maxLength={500}
			/>
			{/* <p>Please describe your product and what it does or will do.</p> */}
			<Input
				value={formData.product_demo_url}
				name="product_demo_url"
				placeholder="Product Demo Video URL"
				onChange={(e) => handleOnChange(e)}
				autoSize
				style={{ padding: "4px 11px" }}
			/>
			<Input
				value={formData.team_intro_url}
				name="team_intro_url"
				placeholder="Team Introduction Video (~2 minutes) URL"
				onChange={(e) => handleOnChange(e)}
				autoSize
				style={{ padding: "4px 11px" }}
			/>
			<Dragger
				name="file"
				action={`${baseUrlApi}/common/check-upload-pitch-desk`}
				method="POST"
				accept=".pdf"
				multiple={false}
				fileList={pitchDesk}
				onChange={onChangePitchDesk}
				beforeUpload={onBeforeUploadPitchDesk}
				onRemove={onRemovePitchDesk}>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">
					Upload your pitch deck here or drag and drop it
				</p>
				<p className="ant-upload-hint">
					Accepted file format: PDF. Max size of 50MB
				</p>
			</Dragger>
			<h2>Startup Progress</h2>
			<TextArea
				rows={4}
				value={formData.statistics}
				name="statistics"
				placeholder="Please share any traction metrics you have*"
				onChange={(e) => handleOnChange(e)}
				maxLength={500}
			/>
			<div>
				Do you have revenue?*
				<Switch
					defaultChecked
					onChange={onChangeSwitch}
					style={{ marginLeft: "1rem" }}
				/>
			</div>
			{isHaveRevenue && (
				<div
					style={{
						display: "flex",
						gap: "0.5rem",
						flexDirection: "column",
					}}>
					{formData.revenues.map((revenue, index) => (
						<div key={index} style={{ display: "flex", gap: "0.5rem" }}>
							<DatePicker
								required
								onChange={(date, dateString) =>
									onChangeDate(date, dateString, index)
								}
								picker="month"
							/>
							<Input
								onChange={(e) => onChangeRevenue(e, index)}
								required
								placeholder="Revenue"
								style={{
									padding: "0 0.5rem",
									width: "auto",
								}}
							/>
							<Button
								onClick={() => handleRemoveRevenue(index)}
								danger
								style={{
									fontSize: "12px",
									padding: "0 0.5rem",
									height: "auto",
								}}>
								Remove
							</Button>
						</div>
					))}
					<Button
						onClick={handleAddRevenue}
						style={{
							display: "flex",
							padding: "0.1rem 0",
							justifyContent: "center",
							height: "auto",
							width: "10rem",
						}}
						type="primary"
						shape="round"
						icon={<AddCircleOutlineIcon />}
						size="small">
						Add Revenue
					</Button>
				</div>
			)}
			<div>
				<h3 style={{ margin: "0" }}>
					What was your revenue in each of the past six months?*
				</h3>
				<p style={{ margin: "0" }}>
					Please use USD. A forecasted number can be entered for a month in
					progress.
				</p>
			</div>
			<FundingSourceBox
				fundingSourceName="Friend and Family"
				foundingSourceTarget="friend_and_family"
				fundingSourceCost={formData.funding_sources.friend_and_family}
				handleChangeFundingSource={handleChangeFundingSource}
			/>
			<FundingSourceBox
				fundingSourceName="Grant"
				foundingSourceTarget="grant"
				fundingSourceCost={formData.funding_sources.grant}
				handleChangeFundingSource={handleChangeFundingSource}
			/>
			<FundingSourceBox
				fundingSourceName="Angel"
				foundingSourceTarget="angel"
				fundingSourceCost={formData.funding_sources.angel}
				handleChangeFundingSource={handleChangeFundingSource}
			/>
			<FundingSourceBox
				fundingSourceName="Venture Capital"
				foundingSourceTarget="venture_capital"
				fundingSourceCost={formData.funding_sources.venture_capital}
				handleChangeFundingSource={handleChangeFundingSource}
			/>
			<FundingSourceBox
				fundingSourceName="Other"
				foundingSourceTarget="other"
				fundingSourceCost={formData.funding_sources.other}
				handleChangeFundingSource={handleChangeFundingSource}
			/>
			<h2>Startup Strategy</h2>
			<TextArea
				required
				rows={4}
				value={formData.target_money}
				name="target_money"
				placeholder="How do (or will) you make money? How much could you make?*"
				onChange={(e) => handleOnChange(e)}
				maxLength={500}
			/>
			<TextArea
				required
				rows={4}
				value={formData.target_audience}
				name="target_audience"
				placeholder="Who is your target audience?*"
				onChange={(e) => handleOnChange(e)}
				maxLength={500}
			/>
			<TextArea
				required
				rows={4}
				value={formData.competitors}
				name="competitors"
				placeholder="Who are your competitors or might become your competitors?*"
				onChange={(e) => handleOnChange(e)}
				maxLength={500}
			/>
			<TextArea
				required
				rows={4}
				value={formData.competitive_advantage}
				name="competitive_advantage"
				placeholder="What is your competitive advantage?*"
				onChange={(e) => handleOnChange(e)}
				maxLength={500}
			/>
			<TextArea
				required
				rows={4}
				value={formData.why_now}
				name="why_now"
				placeholder="Why is now the right timing for your startup?*"
				onChange={(e) => handleOnChange(e)}
				maxLength={500}
			/>
			<p style={{ marginTop: "0" }}>
				What trends, changes in the market, new laws, policies, or
				technologies signal this as an opportune time for your startup?
			</p>
			<TextArea
				required
				rows={4}
				value={formData.strategy}
				name="strategy"
				placeholder="What is your customer acquisition strategy?*"
				onChange={(e) => handleOnChange(e)}
				maxLength={500}
			/>
			<p style={{ marginTop: "0" }}>
				How will you get your first (or next) 10, 100, 1,000, or 10,000
				customers?
			</p>
			<TextArea
				required
				rows={4}
				value={formData.milestones}
				name="milestones"
				placeholder="What are your next major company milestones?*"
				onChange={(e) => handleOnChange(e)}
				maxLength={500}
			/>
			<p style={{ marginTop: "0" }}>
				What are your next features, or what are you learning to let you
				know you’re on the right path with your business?
			</p>
			<TextArea
				required
				rows={4}
				value={formData.about_opennezt}
				name="about_opennezt"
				placeholder="How did you hear about OpenNezt?*"
				onChange={(e) => handleOnChange(e)}
				maxLength={500}
			/>
			<Upload
				action={
					"http://localhost:3456/common/check-upload-background-startup"
				}
				method="POST"
				accept=".jpg,.jpeg,.png"
				listType="picture-card"
				fileList={backgroundStartUp}
				onPreview={handlePreview}
				onChange={onChangeBackground}
				maxCount={1}
				onRemove={onRemoveBackground}>
				{backgroundStartUp.length < 5 && "+ Upload"}
			</Upload>
			{previewImage && (
				<Image
					wrapperStyle={{
						display: "none",
					}}
					preview={{
						visible: previewOpen,
						onVisibleChange: (visible) => setPreviewOpen(visible),
						afterOpenChange: (visible) => !visible && setPreviewImage(""),
					}}
					src={previewImage}
				/>
			)}
		</div>
	);
};

export default CreateProjectForm;
