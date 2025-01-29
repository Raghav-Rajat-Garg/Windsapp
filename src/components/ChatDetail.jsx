import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import RoundedBtn from "./Common/RoundedBtn";
import { messagesData } from "../data/whatsapp";
import { MdSearch, MdSend } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { BiHappy } from "react-icons/bi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { cs1, cs2 } from "../assets/whatsapp";
import { getTime } from "../logic/whatsapp";  
import { io, Socket } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessages, sendMessage } from "../api/messages";
import { fetchChats, setActiveChat, setNotifications } from "../redux/actions/chat/actions";

let socket; 
let selectedChatCompare;
function ChatDetail() {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [isUserOnline, setIsUserOnline] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const [socketConnected, setSocketConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const activeUser = useSelector((state) => state.activeUser);
  const activeChat = useSelector((state) => state.chats);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('')

  console.log(activeChat)
  // Functions
  useEffect(() => {
      if (!socket) {
        // Initialize socket only if not already initialized
        socket = io(process.env.endpoint);
      }
    }, []);

useEffect(() => {
  socket.emit('setup', activeUser)
  socket.on('connected', () => {
    setSocketConnected(true)
  })
}, [messages, activeUser])
console.log(activeChat)
useEffect(() => {
  const fetchMessagesFnc = async () => {
    if(activeChat){
      setLoading(true)
      const data = await fetchMessages(activeChat._id)
      setMessages(data)
      socket.emit('join room', activeChat._id)
      setLoading(false)
    }
    return;
  }
  fetchMessagesFnc()
  selectedChatCompare = activeChat
}, [activeChat])
const keyDownFnc = async (e) => {
  if (e.key === "Enter" || e.type === "click") {
    if (message.trim()) {
      const newMessage = await sendMessage({
        chatId: activeChat,
        message,
      });
      socket.emit('new message', newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setMessage('');
      socket.emit('stop typing', activeChat._id);
    }
  } else if (message.length > 0) {
    socket.emit('typing', activeChat._id);
  } else {
    socket.emit('stop typing', activeChat._id);
  }
};


useEffect(() => {
  socket.on('messageRecieved',(newMessageRecieved) => {
    if ((!selectedChatCompare || selectedChatCompare._id) !== newMessageRecieved.chatId._id) {
      if(!notifications.includes(newMessageRecieved)){
        dispatch(setNotifications([newMessageRecieved, ...notifications]))
      }
    } else{
      setMessages([...messages, newMessageRecieved])
    }
    dispatch(fetchChats)
  })
}, [])

  const addMessage = (msg) => {
    const newMessages = [...messages, msg];
    setMessages(newMessages);
  };

  const handleEmojiClick = () => {
    inputRef.current.value += "🔥";
    inputRef.current.focus();
  };

  const handleImgUpload = () => {
    addMessage({
      img: cs2,
      time: getTime(),
      sent: true,
    });
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value)
    inputRef.current.value.length === 0 ? setTyping(false) : setTyping(true);
  };

  const handleInputSubmit = () => {
 
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter") handleInputSubmit();
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  });

  return (
    // ChatDetail main container
    <div className="flex flex-col h-[910px]">
      {/* Contact nav */}
      <div className="flex justify-between bg-[#202d33] h-[60px] p-3">
        {/* Contact info */}
        <div className="flex items-center">
          {/* Profile picture */}
          <img
            src={cs1}
            alt="profile_picture"
            className="rounded-full w-[45px] h-[45px] mr-5"
          />

          {/* Info */}
          <div className="flex flex-col">
            {/* Contact */}
            <h1 className="text-white font-medium">{}</h1>

            {/* Status */}
            <p className="text-[#8796a1] text-xs">{isUserOnline}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center w-[85px]">
          <RoundedBtn icon={<MdSearch />} />
          <RoundedBtn icon={<HiDotsVertical />} />
        </div>
      </div>

      {/* Messages section */}
      <div
        className="bg-[#0a131a] bg-[url('assets/images/bg.webp')] bg-contain overflow-y-scroll h-100"
        style={{ padding: "12px 7%" }}
      >
        {messages?.map((msg) => (
          <Message
            msg={msg.messageContent}
            time={msg.timeSent}
            isLink={msg.isLink}
            img={msg.img}
            sent={msg.sender}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Bottom section */}
      <div className="flex items-center bg-[#202d33] w-100 h-[70px] p-2">
        {/* Emoji btn */}
        <RoundedBtn icon={<BiHappy />} onClick={handleEmojiClick} />

        {/* Upload btn */}
        <span className="mr-2">
          <RoundedBtn icon={<AiOutlinePaperClip />} onClick={handleImgUpload} />
        </span>

        {/* Input bar */}
      <form onKeyDown={(e) => keyDownFnc(e)} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Type a message"
          className="bg-[#2c3943] rounded-lg outline-none text-sm text-neutral-200 w-100 h-100 px-3 placeholder:text-sm placeholder:text-[#8796a1]"
          onChange={(e) => handleInputChange(e)}
          ref={inputRef}
        />
     

        {/* Mic/Send btn */}
        <span className="ml-2">
          {typing ? (
            <RoundedBtn icon={<MdSend />} onClick={keyDownFnc} />
          ) : (
            <RoundedBtn icon={<BsFillMicFill />} />
          )}
        </span>
        </form>
      </div>
    </div>
  );
}

export default ChatDetail;
