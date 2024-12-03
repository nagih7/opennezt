import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";

function ChatsPopover() {
  const stepState = useSelector((state) => state.home.steps);
  const [receiverData, setReceiverData] = useState([]);
  const [receivedid, setReceivedid] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [openChats, setOpenChats] = useState([]);
  const [minimizedChats, setMinimizedChats] = useState([]);
  const [socket, setSocket] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem('token');
  const getUserIdFromToken = useCallback(() => {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.data.user_id;
  }, [token]);

  const fetchReceiverData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/chat/receiverIds/${getUserIdFromToken()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const receivedid = response.data[0].userId;
      setReceivedid(receivedid);
      setReceiverData(response.data);
    } catch (error) {
      console.error("Error fetching receiver data:", error);
    }
  }, [getUserIdFromToken, token]);

  useEffect(() => {
    fetchReceiverData();
  }, [fetchReceiverData]);

  const filteredReceiverData = receiverData.filter((receiver) =>
    receiver.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const createChat = async (senderId, receivedid, messageContent, date) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/chat/create-chat`,
        { senderId, receiverId: receivedid, message: messageContent, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        const chatHistory = response.data.chatHistory || [];
        setMessages(chatHistory.map((msg) => ({
          message: msg.message,
          timestamp: msg.date,
          isSender: msg.senderId === getUserIdFromToken(),
        })));
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const url_sock = `${process.env.REACT_APP_WS_URL}/${receivedid}`;
  const initializeWebSocket = (receivedid) => {
    const newSocket = new WebSocket(url_sock);
    setSocket(newSocket);

    newSocket.onmessage = (message) => {
      if (message.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = function() {
          try {
            const data = JSON.parse(reader.result);
            setMessages((prevMessages) => [
              ...prevMessages,
              { ...data, isSender: data.senderId === getUserIdFromToken() },
            ]);
            saveMessageToLocalStorage(data);
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        };
        reader.readAsText(message.data);
      } else {
        try {
          const data = JSON.parse(message.data);
          setMessages((prevMessages) => [
            ...prevMessages,
            { ...data, isSender: data.senderId === getUserIdFromToken() },
          ]);
          saveMessageToLocalStorage(data);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  };

  const saveMessageToLocalStorage = (message) => {
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    storedMessages.push({ ...message, saved: false });
    localStorage.setItem('chatMessages', JSON.stringify(storedMessages));
  };

  const sendMessage = async () => {
    if (!message) return;

    const senderId = getUserIdFromToken();
    const date = new Date().toISOString();

    const messagePayload = {
      senderId,
      receiverId: receivedid,
      message,
      timestamp: date,
    };

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(messagePayload));
    } else {
      saveMessageToLocalStorage(messagePayload);
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/chat/save-messages`, [messagePayload], {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        const updatedMessages = storedMessages.map(msg => msg.timestamp === messagePayload.timestamp ? { ...msg, saved: true } : msg);
        localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
      } catch (error) {
        console.error('Error saving message:', error);
      }
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { senderId, message, timestamp: date, isSender: true },
    ]);

    setMessage("");
  };

  const openChatBox = async (receiver) => {
    console.log('Receiver:', receiver);
    setReceiverId(receiver.userId);
    console.log('Receiver ID:', receiver.userId);

    if (openChats.some((c) => c.username === receiver.username)) return;
  
    if (openChats.length >= 1) {
      const [removedChat, ...remainingChats] = openChats;
      // setMinimizedChats([...minimizedChats, removedChat]);
      setOpenChats([...remainingChats, receiver]);
    } else {
      setOpenChats([...openChats, receiver]);
    }
  
    if (!socket) {
      initializeWebSocket(receiver.userId);
    }
  
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/chat/get-chat-history/${receiver.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const localMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
      const combinedMessages = [
        ...response.data.chatHistory.map((msg) => ({
          message: msg.message,
          timestamp: msg.date,
          isSender: msg.senderId === getUserIdFromToken(),
        })),
        ...localMessages.filter(msg => !msg.saved)
      ];
      setMessages(combinedMessages);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };
  

  const closeChatBox = (username) => {
    setOpenChats(openChats.filter((chat) => chat.username !== username));
  };

  const restoreMinimizedChat = (chat) => {
    setMinimizedChats(minimizedChats.filter((c) => c.username !== chat.username));
    openChatBox(chat);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
      const unsavedMessages = storedMessages.filter(msg => !msg.saved);
      if (unsavedMessages.length > 0) {
        axios.post(`${process.env.REACT_APP_API_URL}/chat/save-messages`, unsavedMessages, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          const updatedMessages = storedMessages.map(msg => ({ ...msg, saved: true }));
          localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
        }).catch((error) => {
          console.error('Error saving messages:', error);
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <div className={styles.chatPopoverWrap}>
      <div className={styles.headerWrap}>
        <h3>Chats</h3>
        <input
          type="text"
          placeholder="Search people"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className={styles.chatListWrap}>
        {filteredReceiverData.length > 0 ? (
          filteredReceiverData.map((receiver, index) => (
            <div
              className={styles.chatItem}
              key={index}
              onClick={() => openChatBox(receiver)}
            >
              <div
                className={styles.avatar}
                style={{ backgroundColor: receiver.avatarColor }}
              >
                {receiver.username[0]}
              </div>
              <div className={styles.chatContent}>
                <div className={styles.chatName}>{receiver.username}</div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResult}>No chats found</div>
        )}
      </div>
      <div className={styles.miniChatBoxWrap}>
        {openChats.map((chat, index) => (
          <div className={styles.miniChatBox} key={index}>
            <div className={styles.miniChatHeader}>
              <span>{chat.username}</span>
              <button
                onClick={() => closeChatBox(chat.username)}
                className={styles.closeButton}
              >
                X
              </button>
            </div>
            <div className={styles.miniChatBody}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${styles.message} ${msg.isSender ? styles.sent : styles.received}`}
                >
                  <span>{msg.message}</span>
                </div>
              ))}
            </div>
            <div className={styles.miniChatFooter}>
              <input
                type="text"
                placeholder="Type a message..."
                className={styles.miniChatInput}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={sendMessage} className={styles.sendButton}>
                Send
              </button>
            </div>
          </div>
        ))}
        <div className={styles.minimizedChatIcons}>
          {minimizedChats.map((chat, index) => (
            <div
              key={index}
              className={styles.minimizedChatIcon}
              style={{ backgroundColor: chat.avatarColor }}
              onClick={() => restoreMinimizedChat(chat)}
            >
              {chat.username[0]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatsPopover;