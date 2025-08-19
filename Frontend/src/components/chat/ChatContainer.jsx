import React, { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "../skelton/MessageSkeleton";
import { useAuthStore } from "../../store/useAuthStore";
import { formatMessageTime } from "../../utils/helper";
import { useChatStore } from "../../store/useChatStore";
import avatarImg from "../../assets/avatar.webp";
import chat_bg_img from "../../assets/chat_bg.webp";
import chat_bg_dark_img from "../../assets/chat_bg_dark.webp";

const ChatContainer = () => {

  const [isDark, setIsDark] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser, socket } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  // scroll to the last msg
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // for light/dark mode 
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
    }
  }, []);

  // for typing indicator
  useEffect(() => {
    let typingTimeout;

    socket.on("typing", ({ senderId }) => {
      if (senderId === selectedUser._id) {
        setIsTyping(true);

        // auto-stop after 3 seconds
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => setIsTyping(false), 500);
      }
    });

    socket.on("stopTyping", ({ senderId }) => {
      if (senderId === selectedUser._id) {
        setIsTyping(false);
        clearTimeout(typingTimeout);
      }
    });

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
      clearTimeout(typingTimeout);
    };
  }, [selectedUser]);


  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div
      className="h-[calc(100vh-64px)] flex flex-col overflow-auto bg-cover bg-center"
      style={{ backgroundImage: `url(${isDark ? chat_bg_dark_img : chat_bg_img})` }}
    >
      <ChatHeader isTyping={isTyping} />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, idx) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
            ref={idx === messages.length - 1 ? messageEndRef : null}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || avatarImg
                      : selectedUser.profilePic || avatarImg
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput senderId={authUser._id} receiverId={selectedUser._id} />
    </div>
  );
};

export default ChatContainer;
