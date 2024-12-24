// src/SocketContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Tạo một Context để chia sẻ socket cho các component khác
const SocketContext = createContext();

// URL của server socket
const SOCKET_SERVER_URL = process.env.REACT_APP_API_URL;

// Tạo hook để sử dụng socket context
export const useSocket = () => {
	return useContext(SocketContext);
};

// Component SocketProvider sẽ quản lý kết nối socket
export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		// Thiết lập kết nối socket
		const socketInstance = io(SOCKET_SERVER_URL);

		// Gửi sự kiện `login` khi kết nối được thiết lập
		socketInstance.on("connect", () => {
			console.log("Connected to socket server...");

			// Lấy token từ localStorage (hoặc từ bất kỳ nguồn nào bạn lưu trữ token)
			const token = localStorage.getItem("token");
			if (token) {
				socketInstance.emit("login", token); // Gửi sự kiện `login`
			}
		});

		socketInstance.on("disconnect", () => {
			console.log("Disconnected from socket server");
		});

		setSocket(socketInstance);

		// Cleanup khi component unmount
		return () => {
			socketInstance.disconnect();
		};
	}, []);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};
