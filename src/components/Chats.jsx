import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import { chatsData } from "../data/whatsapp";
import { ImFolderDownload } from "react-icons/im";

function Chats({ filter }) {
  const [chats, setChats] = useState(chatsData);
  const [activeChatId, setActiveChatId] = useState(0); // Default: no chat selected

  useEffect(() => {
    const newChats = filter
      ? chatsData.filter((chat) => chat.unreadMessages)
      : chatsData;
    setChats(newChats);
  }, [filter]);

  const handleChatClick = (chatId) => {
    setActiveChatId(chatId); // Update the active chat ID on click
    console.log(chatId)
  };

  return (
    <div className="flex flex-col overflow-y-scroll cursor-pointer h-100">
      {/* Archived container */}
      <div className="flex justify-between items-center w-100 min-h-[55px] px-3 hover:bg-[#202d33]">
        <div className="flex justify-around items-center w-[150px]">
          <span className="text-emerald-500 text-lg">
            <ImFolderDownload />
          </span>
          <h1 className="text-white">Archived</h1>
        </div>
        <p className="text-emerald-500 text-xs font-light">7</p>
      </div>

      {/* Chats */}

      
      {
        chats.map((chat, i) => (
          <Chat
            key={chat.id} // Ensure unique keys for list items
            pp={chat.pp}
            chatName={chat.chatName}
            latestMessage={chat.latestMessage}
            lastUpdated={chat.lastUpdated}
            unreadMessages={chat.unreadMessages}
            active={i === activeChatId} // Check if the chat is active
            onClick={() => handleChatClick(chat.id)} 
          />
        ))
      
      }
    </div>
  );
}

export default Chats;
