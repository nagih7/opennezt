import React, { useCallback, useState } from "react";
import styles from "./styles.module.scss";
import { getTalentDetails } from "api/talent";
import { useDispatch } from "react-redux";
import { Modal } from "antd";
import { getRequestAddFriend } from "api/notification";
import RecruitWrap from "./RecuitWrap";
import ListTalents from "./ListTalents";
import LazyLoading from "components/UI/LazyLoading";

const TalentProfile = React.lazy(() =>
	import("components/common/TalentProfile")
);

function RecruitTalents() {
	const dispatch = useDispatch();

	const [modalTalentDetails, setModalTalentDetails] = useState(false);

	const handleGetDetailTalent = useCallback(
		(id) => {
			setModalTalentDetails(true);
			dispatch(getTalentDetails(id));
			dispatch(getRequestAddFriend(id));
		},
		[dispatch]
	);

	const handleClosePopup = () => {
		setModalTalentDetails(false);
	};

	return (
		<div className={styles.searchContainer}>
			<RecruitWrap />
			<ListTalents handleGetDetailTalent={handleGetDetailTalent} />

			<Modal
				footer={null}
				title=""
				okText="OK"
				open={modalTalentDetails}
				onOk={handleClosePopup}
				confirmLoading={false}
				onCancel={handleClosePopup}
				width={1000}>
				<LazyLoading>
					<TalentProfile />
				</LazyLoading>
			</Modal>
		</div>
	);
}

export default RecruitTalents;
