import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";

function NewFeeds() {
	const [feeds, setFeeds] = useState([]);
	const [selectedFeed, setSelectedFeed] = useState(null);
	const popupRef = useRef(null);

	useEffect(() => {
		const mockFeeds = [
			{
				id: 1,
				title: "Innovative AI Startup Raises $10M in Series A",
				description:
					"The startup leverages AI to enhance decision-making processes for businesses.",
				details:
					"This startup focuses on building AI solutions for enterprises to automate workflows and make data-driven decisions. They plan to use the $10M raised to expand their team and further develop their technology.",
				image: "https://cdn.prod.website-files.com/65c9d364707f20d739b9981f/65ce017e736b73b90897f255_65c9d364707f20d739b9991f_5469-1.jpeg",
				date: "2024-11-01",
			},
			{
				id: 2,
				title: "GreenTech Startup Launches New Solar Panel Technology",
				description:
					"Their solar panels increase efficiency by 30% compared to existing solutions.",
				details:
					"This GreenTech company has revolutionized solar panel efficiency using advanced nano-coating technology. The product is expected to disrupt the renewable energy market.",
				image: "https://nairametrics.com/wp-content/uploads/2019/12/Planning-1.jpeg",
				date: "2024-11-10",
			},
			{
				id: 3,
				title: "GreenTech Startup Launches New Solar Panel Technology",
				description:
					"Their solar panels increase efficiency by 30% compared to existing solutions.",
				details:
					"This GreenTech company has revolutionized solar panel efficiency using advanced nano-coating technology. The product is expected to disrupt the renewable energy market.",
				image: "https://images.prismic.io/turing/652ec738fbd9a45bcec81a2a_Startup_Project_Management_f0edf9a96f.webp?auto=format,compress",
				date: "2024-11-10",
			},
			{
				id: 4,
				title: "GreenTech Startup Launches New Solar Panel Technology",
				description:
					"Their solar panels increase efficiency by 30% compared to existing solutions.",
				details:
					"This GreenTech company has revolutionized solar panel efficiency using advanced nano-coating technology. The product is expected to disrupt the renewable energy market.",
				image: "https://cbx-prod.b-cdn.net/COLOURBOX56715706.jpg?width=800&height=800&quality=70",
				date: "2024-11-10",
			},
			{
				id: 5,
				title: "GreenTech Startup Launches New Solar Panel Technology",
				description:
					"Their solar panels increase efficiency by 30% compared to existing solutions.",
				details:
					"This GreenTech company has revolutionized solar panel efficiency using advanced nano-coating technology. The product is expected to disrupt the renewable energy market.",
				image: "https://www.imensosoftware.com/wp-content/uploads/2024/03/Top5StartupProjectManagementMethodologiesin2023.webp",
				date: "2024-11-10",
			},
			{
				id: 6,
				title: "GreenTech Startup Launches New Solar Panel Technology",
				description:
					"Their solar panels increase efficiency by 30% compared to existing solutions.",
				details:
					"This GreenTech company has revolutionized solar panel efficiency using advanced nano-coating technology. The product is expected to disrupt the renewable energy market.",
				image: "https://www.startupguruz.com/wp-content/uploads/2024/02/20240208_201243_0000-1.png",
				date: "2024-11-10",
			},
			{
				id: 7,
				title: "GreenTech Startup Launches New Solar Panel Technology",
				description:
					"Their solar panels increase efficiency by 30% compared to existing solutions.",
				details:
					"This GreenTech company has revolutionized solar panel efficiency using advanced nano-coating technology. The product is expected to disrupt the renewable energy market.",
				image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0GY9au-VQCZk0VXS88BdEJV4SeUHR25U8zQ&s",
				date: "2024-11-10",
			},
			{
				id: 8,
				title: "GreenTech Startup Launches New Solar Panel Technology",
				description:
					"Their solar panels increase efficiency by 30% compared to existing solutions.",
				details:
					"This GreenTech company has revolutionized solar panel efficiency using advanced nano-coating technology. The product is expected to disrupt the renewable energy market.",
				image: "https://newbusinessage-media.s3.ap-south-1.amazonaws.com/img/news/20240611123440_1606904006.start-up-businesss.jpg",
				date: "2024-11-10",
			},
		];
		setFeeds(mockFeeds);
	}, []);

	const handleFeedClick = (feed) => {
		setSelectedFeed(feed);
	};

	const closePopup = () => {
		setSelectedFeed(null);
	};

	useEffect(() => {
		if (!selectedFeed) return;

		const handleClickOutside = (event) => {
			if (popupRef.current && !popupRef.current.contains(event.target)) {
				closePopup();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [selectedFeed]);

	return (
		<div className="newfeed-container">
			<h1 className="newfeed-title">Startup News</h1>
			<div className="feed-grid">
				{feeds.map((feed) => (
					<div
						key={feed.id}
						className="feed-card"
						onClick={() => handleFeedClick(feed)}>
						<img
							src={feed.image}
							alt={feed.title}
							className="feed-image"
						/>
						<div className="feed-content">
							<h2 className="feed-title">{feed.title}</h2>
							<p className="feed-description">{feed.description}</p>
							<span className="feed-date">{feed.date}</span>
						</div>
					</div>
				))}
			</div>

			{selectedFeed && (
				<div className="feed-popup">
					<div className="popup-content" ref={popupRef}>
						<button className="close-button" onClick={closePopup}>
							&times;
						</button>
						<img
							src={selectedFeed.image}
							alt={selectedFeed.title}
							className="popup-image"
						/>
						<h2 className="popup-title">{selectedFeed.title}</h2>
						<p className="popup-details">{selectedFeed.details}</p>
						<button className="connect-button">View Details</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default NewFeeds;
