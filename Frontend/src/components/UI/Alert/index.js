import { message } from "antd";

const Alert = (status, content) => {
	const type = status === (200 || 201) ? "success" : "error";
	message[type](content);
};

export default Alert;
