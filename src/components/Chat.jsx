import React from "react";

function Chat({ pp, chatName, latestMessage, lastUpdated, unreadMessages, active, onClick }) {
  return (
    // Chat container
    <div
      className={`flex justify-between items-center cursor-pointer w-100 h-[85px] px-3 hover:bg-[#1f2c34] chat ${
        active ? "bg-[#2b3942]" : ""
      }`}
      onClick={onClick}
    >
      {/* Profile picture */}
      <img
        src={pp}
        alt="profile_picture"
        className="rounded-full w-[50px] mr-5"
      />

      {/* Info container */}
      <div className="flex justify-between border-t border-neutral-700 w-100 h-100 py-3">
        {/* Contact name and message */}
        <div className="flex flex-col justify-between text-white">
          {/* Contact name */}
          <h1 className="font-medium mb-1">{chatName}</h1>

          {/* Message */}
          <p className={`text-sm ${!unreadMessages ? "text-neutral-400" : ""}`}>
            {latestMessage}
          </p>
        </div>

        {/* Time and number of messages*/}
        <div className="flex flex-col justify-between items-end h-100 text-xs">
          {/* Time */}
          <p className="text-emerald-500 min-w-[55px]">{lastUpdated}</p>

          {/* Number of messages */}
          {unreadMessages && (
            <div className="flex justify-center items-center bg-emerald-500 rounded-full w-[20px] h-[20px]">
              <p className="text-emerald-900">{unreadMessages}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
