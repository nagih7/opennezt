import React, { useState } from "react";
import styles from "./styles.module.scss";

function ChatsPopover() {
  const randomNames = [
    "Giang Nguyen",
    "Minh Tran",
    "Huy Le",
    "Lan Pham",
    "Dung Hoang",
    "Thao Nguyen",
    "Phuong Tran",
    "Linh Vu",
    "Binh Nguyen",
    "Nam Do",
  ];

  const randomMessages = [
    "You: I’ve got a new idea",
    "You: Let’s catch up later",
    "You: Can you send me the file?",
    "You: That’s awesome!",
    "You: Sure, no problem",
    "You: I’m on my way",
    "You: Let me check",
    "You: Call me back",
    "You: Thanks a lot!",
    "You: See you soon",
  ];

  function generateRandomChatData(count) {
    const chatData = [];
    for (let i = 0; i < count; i++) {
      const name = randomNames[Math.floor(Math.random() * randomNames.length)];
      const message =
        randomMessages[Math.floor(Math.random() * randomMessages.length)];
      const time = `${Math.floor(Math.random() * 60) + 1}m`;
      const avatarColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
      chatData.push({ name, message, time, avatarColor });
    }
    return chatData;
  }

  const [chatData] = useState(generateRandomChatData(20));
  const [searchQuery, setSearchQuery] = useState("");
  const [openChats, setOpenChats] = useState([]);
  const [minimizedChats, setMinimizedChats] = useState([]);

  const filteredChatData = chatData.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openChatBox = (chat) => {
    if (openChats.some((c) => c.name === chat.name)) return;

    if (openChats.length >= 3) {
      const [removedChat, ...remainingChats] = openChats;
      setMinimizedChats([...minimizedChats, removedChat]);
      setOpenChats([...remainingChats, chat]);
    } else {
      setOpenChats([...openChats, chat]);
    }
  };

  const closeChatBox = (name) => {
    setOpenChats(openChats.filter((chat) => chat.name !== name));
  };

  const restoreMinimizedChat = (chat) => {
    setMinimizedChats(minimizedChats.filter((c) => c.name !== chat.name));
    openChatBox(chat);
  };

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
        {filteredChatData.length > 0 ? (
          filteredChatData.map((chat, index) => (
            <div
              className={styles.chatItem}
              key={index}
              onClick={() => openChatBox(chat)}
            >
              <div
                className={styles.avatar}
                style={{ backgroundColor: chat.avatarColor }}
              >
                {chat.name[0]}
              </div>
              <div className={styles.chatContent}>
                <div className={styles.chatName}>{chat.name}</div>
                <div className={styles.chatMessage}>
                  {chat.message}{" "}
                  <span className={styles.chatTime}>{chat.time}</span>
                </div>
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
              <span>{chat.name}</span>
              <button
                onClick={() => closeChatBox(chat.name)}
                className={styles.closeButton}
              >
                X
              </button>
            </div>
            <div className={styles.miniChatBody}>
              <p>{chat.message}</p>
            </div>
            <div className={styles.miniChatFooter}>
              <input
                type="text"
                placeholder="Type a message..."
                className={styles.miniChatInput}
              />
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
              {chat.name[0]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatsPopover;
