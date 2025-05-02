import React from "react";

const HTMLContent = ({ content, className }) => (
	<div className={className} dangerouslySetInnerHTML={{ __html: content }} />
);

export default HTMLContent;
