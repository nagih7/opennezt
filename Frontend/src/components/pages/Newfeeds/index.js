import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import Article from "./components/Article";

function NewFeeds() {
	const [feeds, setFeeds] = useState([]);
	const [selectedFeed, setSelectedFeed] = useState(null);
	const popupRef = useRef(null);

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
		// <div className="newfeed-container">
		// 	<h1 className="newfeed-title">Startup News</h1>
		// 	<div className="feed-grid">
		// 		{feeds.map((feed) => (
		// 			<div
		// 				key={feed.id}
		// 				className="feed-card"
		// 				onClick={() => handleFeedClick(feed)}>
		// 				<img
		// 					src={feed.image}
		// 					alt={feed.title}
		// 					className="feed-image"
		// 				/>
		// 				<div className="feed-content">
		// 					<h2 className="feed-title">{feed.title}</h2>
		// 					<p className="feed-description">{feed.description}</p>
		// 					<span className="feed-date">{feed.date}</span>
		// 				</div>
		// 			</div>
		// 		))}
		// 	</div>

		// 	{selectedFeed && (
		// 		<div className="feed-popup">
		// 			<div className="popup-content" ref={popupRef}>
		// 				<button className="close-button" onClick={closePopup}>
		// 					&times;
		// 				</button>
		// 				<img
		// 					src={selectedFeed.image}
		// 					alt={selectedFeed.title}
		// 					className="popup-image"
		// 				/>
		// 				<h2 className="popup-title">{selectedFeed.title}</h2>
		// 				<p className="popup-details">{selectedFeed.details}</p>
		// 				<button className="connect-button">View Details</button>
		// 			</div>
		// 		</div>
		// 	)}
		// </div>
		<div>
			{Array(5)
				.fill(0)
				.map((_, index) => (
					<Article key={index} />
				))}
		</div>
	);
}

export default NewFeeds;
