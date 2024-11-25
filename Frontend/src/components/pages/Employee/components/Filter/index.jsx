import React from "react";
import styles from "./styles.module.scss";
import { Col, Row } from "antd";
import SelectCustom from "../../../../../components/UI/Select";
import PropTypes from "prop-types";
import { STATUS_USER } from "../../../../../utils/constains";

Filter.prototype = {
	onClose: PropTypes.func,
	onChangeStatus: PropTypes.func,
};

Filter.defaultProps = {
	onChangeStatus: () => {},
	onClose: () => {},
};

function Filter(props) {
	const { onChangeStatus } = props;

	return (
		<div>
			<div className={styles.filterWrap}>
				<Row gutter={10}>
					<Col span={24}>
						<div className={styles.inputWrap}>
							<div className={styles.label}>Filter by user status</div>
							<SelectCustom
								value={""}
								onChange={onChangeStatus}
								options={[
									{
										value: "",
										label: "All",
									},
									{
										value: STATUS_USER["ACTIVATE"],
										label: "Active",
									},
									{
										value: STATUS_USER["INACTIVATE"],
										label: "Inactive",
									},
								]}
							/>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	);
}

export default Filter;
