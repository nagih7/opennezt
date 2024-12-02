import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Input, Select, Space } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Switch, DatePicker, Button, Image } from "antd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FundingSourceBox from "./FundingSourceBox";
const { Dragger } = Upload;
const { TextArea } = Input;

const CreateProjectForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		lading_page_url: "",
		related_industries: [],
		stage: "",
		problem: "",
		solution: "",
		product_demo_url: "",
		team_intro_url: "",
		pitch_deck: "",
		background: "",
		statistics: "",
		target_money: "",
		target_audience: "",
		competitors: "",
		competitive_advantage: "",
		why_now: "",
		strategy: "",
		milestones: "",
		about_opennezt: "",
	});
	const [revenues, setRevenues] = useState([{ time: "", revenue: "" }]);
	const [pitchDesk, setPitchDesk] = useState([]);
	const [backgroundStartUp, setBackgroundStartUp] = useState([]);
	const [isHaveRevenue, setIsHaveRevenue] = useState(true);
	const [fundingSources, setFundingSources] = useState({
		friend_and_family: "",
		grant: "",
		angel: "",
		venture_capital: "",
		other: "",
	});
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");

	const pitchDeskState = {
		name: "file",
		multiple: false,
		fileList: pitchDesk,
		onChange(info) {
			const { file } = info;
			if (file.status === "done") {
				message.success(`${file.name} file uploaded successfully.`);
			}
			// else if (file.status === "error") {
			// 	message.error(`${file.name} file upload failed.`);
			// }
		},
		beforeUpload(file) {
			const isPDF = file.type === "application/pdf";
			if (isPDF) {
				setPitchDesk([file]);
				message.success(`${file.name} file uploaded successfully.`);
			} else {
				message.error("Only PDF files are allowed!");
				return isPDF;
			}

			return isPDF;
		},

		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
		},

		onRemove() {
			setPitchDesk([]);
		},
	};
	const onChangeBackground = ({ fileList: newFileList }) => {
		setBackgroundStartUp(newFileList);
	};

	const optionsIndustries = [
		{
			label: "Infomation Technology",
			value: "Infomation Technology",
			// emoji: "IT",
			// desc: "China (中国)",
		},
		{
			label: "Healthcare",
			value: "Healthcare",
		},
		{
			label: "Consumer Staples",
			value: "Consumer Staples",
		},
		{
			label: "Material",
			value: "Material",
		},
		{
			label: "Communication Services",
			value: "Communication Services",
		},
		{
			label: "Industrials",
			value: "Industrials",
		},
		{
			label: "Financials",
			value: "Financials",
		},
		{
			label: "Consumer Discretionary",
			value: "Consumer Discretionary",
		},
		{
			label: "Utilities",
			value: "Utilities",
		},
		{
			label: "Real Esates",
			value: "Real Esates",
		},
	];
	const optionsStage = [
		{
			label: "Idea Stage",
			value: "Idea Stage",
		},
		{
			label: "Pre-seed Stage",
			value: "Pre-seed Stage",
		},
		{
			label: "Seed Stage",
			value: "Seed Stage",
		},
		{
			label: "Early Stage",
			value: "Early Stage",
		},
		{
			label: "Growth Stage",
			value: "Growth Stage",
		},
		{
			label: "Expansion Stage",
			value: "Expansion Stage",
		},
		{
			label: "Mature Stage",
			value: "Mature Stage",
		},
	];

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

	const onChangeDate = (date, dateString) => {
		console.log(date, dateString);
	};

	const handleAddRevenue = () => {
		setRevenues([...revenues, { time: "", revenue: "" }]);
	};

	const handleRemoveRevenue = (index) => {
		const updatedRevenues = revenues.filter((_, i) => i !== index);
		setRevenues(updatedRevenues);
	};

	const handleChangeFundingSource = (field, value) => {
		setFundingSources({ ...fundingSources, [field]: value });
	};

	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
	};

	const [pitchDeck, setPitchDeck] = useState(null);
	const [backgroundImage, setBackgroundImage] = useState(null);

	const handleRevenueChange = (index, field, value) => {
		const updatedRevenues = [...revenues];
		updatedRevenues[index][field] = value;
		setRevenues(updatedRevenues);
	};

	const handlePitchDeckChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type === "application/pdf") {
			setPitchDeck(file);
		} else {
			alert("Please upload a PDF file.");
		}
	};

	const handleBackgroundImageChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith("image/")) {
			setBackgroundImage(URL.createObjectURL(file));
		} else {
			alert("Please upload a valid image file.");
		}
	};

	const handleFormSubmit = (event) => {
		console.log(event.target);
		event.preventDefault();
		const newProject = {
			_id: "newId",
			name: event.target.projectName.value,
			related_industries: event.target.relatedIndustries.value.split(","),
			stage: event.target.stage.value,
			problem: event.target.problem.value,
			solution: event.target.solution.value,
			product_demo_url: event.target.productDemoURL.value,
			team_intro_url: event.target.teamIntroURL.value,
			pitch_deck: pitchDeck ? pitchDeck.name : null,
			background: backgroundImage ? backgroundImage : null,
			statistics: event.target.statistics.value,
			target_money: event.target.targetMoney.value,
			target_audience: event.target.targetAudience.value,
			competitors: event.target.competitors.value,
			competitive_advantage: event.target.competitiveAdvantage.value,
			why_now: event.target.whyNow.value,
			strategy: event.target.strategy.value,
			milestones: event.target.milestones.value,
			about_opennezt: event.target.aboutOpennezt.value,
			revenues,
			funding_sources: fundingSources,
		};
	};

	return (
		<form className={styles.createProjectForm} onSubmit={handleFormSubmit}>
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
				options={optionsIndustries}
				optionRender={(optionsIndustries) => (
					<Space>
						<span role="img" aria-label={optionsIndustries.data.label}>
							{optionsIndustries.data.emoji}
						</span>
						{optionsIndustries.data.desc}
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
				// value={formData.stage}
				style={{ width: "100%" }}
				options={optionsStage}
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
			<Dragger {...pitchDeskState}>
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
					{revenues.map((revenue, index) => (
						<div key={index} style={{ display: "flex", gap: "0.5rem" }}>
							<DatePicker
								required
								onChange={onChangeDate}
								picker="month"
							/>
							<Input
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
				fundingSourceCost={fundingSources.friend_and_family}
				handleChangeFundingSource={handleChangeFundingSource}
			/>
			<FundingSourceBox
				fundingSourceName="Grant"
				foundingSourceTarget="grant"
				fundingSourceCost={fundingSources.grant}
				handleChangeFundingSource={handleChangeFundingSource}
			/>
			<FundingSourceBox
				fundingSourceName="Angel"
				foundingSourceTarget="angel"
				fundingSourceCost={fundingSources.angel}
				handleChangeFundingSource={handleChangeFundingSource}
			/>
			<FundingSourceBox
				fundingSourceName="Venture Capital"
				foundingSourceTarget="venture_capital"
				fundingSourceCost={fundingSources.venture_capital}
				handleChangeFundingSource={handleChangeFundingSource}
			/>
			<FundingSourceBox
				fundingSourceName="Other"
				foundingSourceTarget="other"
				fundingSourceCost={fundingSources.other}
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
				name="What is your competitive advantage?*"
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
				style={{ width: "100%" }}
				listType="picture-card"
				fileList={backgroundStartUp}
				onPreview={handlePreview}
				onChange={onChangeBackground}
				maxCount={1}>
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
		</form>
	);
};

export default CreateProjectForm;
