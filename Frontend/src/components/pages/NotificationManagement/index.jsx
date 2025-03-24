import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tag, Button, Modal, Row, Col } from "antd";
import TableCustom from "components/UI/Table";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import store from "states/configureStore";
import { getTalentDetails } from "api/talent";
import moment from "moment";
import {
	getNotifications,
	getTotalFriends,
	readRoot,
	replyNotification,
} from "api/notification";
import {
	FRIENDS,
	ACTIONS,
	STATUS,
	TYPE,
	REQUEST_BY,
	REQUEST_AT,
} from "utils/constains";

const TalentProfile = React.lazy(() =>
	import("components/common/TalentProfile")
);

function NotificationProject() {
	const [openModalTalentDetails, setOpenModalTalentDetails] = useState(false);
	const { language } = useSelector((state) => state.app);
	const [dataFilter, setDataFilter] = useState({
		page: 1,
		perPage: 10,
		order: null,
	});
	const { talentDetails, isLoadingGetTalentDetails } = useSelector(
		(state) => state.talent
	);
	const { notifications, totalFriends, paginationListNotification } =
		useSelector((state) => state.notification);

	useEffect(() => {
		store.dispatch(readRoot(dataFilter));
		store.dispatch(getTotalFriends());
	}, [dataFilter]);

	const handleOpenTalentDetails = async (user_id) => {
		setOpenModalTalentDetails(true);
		await store.dispatch(getTalentDetails(user_id));
	};

	const handleReplyNotification = async (notification_id, type_id, status) => {
		await store.dispatch(
			replyNotification({ notification_id, type_id, status })
		);
		await store.dispatch(getNotifications());
		if (status === "accepted") {
			await store.dispatch(getChatList());
		}
	};



	const changeCurrentPage = (page) => {
		setDataFilter({ ...dataFilter, page: page });
	};

	const onChange = (pagination, filters, sorter) => {
		if (sorter.order && sorter.field) {
			setDataFilter({
				...dataFilter,
				order: sorter.order === "descend" ? -1 : 1,
				column: sorter.field,
			});
		} else {
			setDataFilter({ ...dataFilter, order: null, column: null });
		}
	};

	return (
		<>
		</>
	);
}

export default NotificationProject;
