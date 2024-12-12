import React from "react";

const ExpertiseBox = (props) => {
	const { expertise, key } = props;

	return (
		<>
			<h3>{key}</h3>
			{expertise.map((area) => {
				return <p key={area}>{area}</p>;
			})}
		</>
	);
};

export default ExpertiseBox;
