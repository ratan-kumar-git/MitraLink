import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

import MessageSkeleton from "../skelton/MessageSkeleton";
import { useAuthStore } from "../../store/useAuthStore";
import avatarImg from "../../assets/avatar.webp";
import chat_bg_img from "../../assets/chat_bg.webp";
import chat_bg_dark_img from "../../assets/chat_bg_dark.webp";
import { Check, CheckCheck } from "lucide-react";
import { useGroupStore } from "../../store/useGroupStore";
import GroupChatHeader from "./GroupChatHeader";
import GroupChatInput from "./GroupChatInput";

const MessageStatus = ({ status = "sent", className = "" }) => {
  const isSeen = status === "seen";
  const isDelivered = status === "delivered";

  // grey for sent/delivered, blue for seen
  const color = isSeen ? "text-blue-500" : "text-gray-400";

  return (
    <span className={`${color} ${className}`}>
      {status === "sent" && <Check size={16} strokeWidth={2.5} />}
      {(isDelivered || isSeen) && <CheckCheck size={16} strokeWidth={2.5} />}
    </span>
  );
};

const GroupChatContainer = () => {
  const [isDark, setIsDark] = useState(false);
  const { authUser, socket } = useAuthStore();
  const {
    groupMessages,
    selectedGroup,
    isGroupMessagesLoading,
    getGroupMessage,
  } = useGroupStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getGroupMessage(selectedGroup._id);
  }, [selectedGroup._id, getGroupMessage]);

  // scroll to the last msg
  useEffect(() => {
    if (messageEndRef.current && groupMessages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [groupMessages]);

  // for light/dark mode
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
    }
  }, []);


  if (isGroupMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <GroupChatHeader />
        <MessageSkeleton />
        <GroupChatInput />
      </div>
    );
  }

  return (
    <div
      className="h-[calc(100vh-64px)] flex flex-col overflow-auto bg-cover bg-center"
      style={{
        backgroundImage: `url(${isDark ? chat_bg_dark_img : chat_bg_img})`,
      }}
    >
      <GroupChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {groupMessages.map((message, idx) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId._id === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={idx === groupMessages.length - 1 ? messageEndRef : null}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || avatarImg
                      : selectedGroup.profilePic || avatarImg
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header">
              {message.senderId.fullName && (
                <span className="text-emerald-800 dark:text-yellow-400 opacity-70 text-xs font-semibold pb-2">
                  {message.senderId.fullName}
                </span>
              )}
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}

              {/* Time + status */}
              <div className="flex items-center justify-end gap-1">
                {message.text && <span>{message.text}</span>}
                <span className="opacity-70 text-xs text-nowrap">
                  {dayjs(message.createdAt).format("hh:mm A")}
                </span>
                {message.senderId._id === authUser._id && (
                  <MessageStatus status={message.status} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <GroupChatInput />
    </div>
  );
};

export default GroupChatContainer;
