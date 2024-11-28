import React, { useEffect, useState } from "react";
import AppLayout from "components/layouts/AppLayout";
import "./styles.scss";
import store from "states/configureStore";
import { recruitTalents } from "api/talent";

function RecruitTalents() {
	const [requestRecruitTalents, setRequestRecruitTalents] = useState({
		expertise_area: "",
		experience_level: "",
		location: "",
		language: "",
		page: 1,
	}); // Request recruit talents

	useEffect(() => {
		store.dispatch(recruitTalents(requestRecruitTalents));
	}, [requestRecruitTalents]);

	return (
		<AppLayout>
			<div>Recruit Talents</div>
		</AppLayout>
	);
}

export default RecruitTalents;
