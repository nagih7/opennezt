// // src/SocketContext.js
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";

// // Tạo một Context để chia sẻ socket cho các component khác
// const SocketContext = createContext();

// // URL của server socket
// const SOCKET_SERVER_URL = process.env.REACT_APP_API_URL;

// // Tạo hook để sử dụng socket context
// export const useSocket = () => {
// 	return useContext(SocketContext);
// };

// // Component SocketProvider sẽ quản lý kết nối socket
// export const SocketProvider = ({ children }) => {
// 	const [socket, setSocket] = useState(null);

// 	useEffect(() => {
// 		// Thiết lập kết nối socket
// 		const socketInstance = io(SOCKET_SERVER_URL);
// 		setSocket(socketInstance);

// 		// Cleanup khi component unmount
// 		return () => {
// 			socketInstance.disconnect();
// 		};
// 	}, []);

// 	return (
// 		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
// 	);
// };
