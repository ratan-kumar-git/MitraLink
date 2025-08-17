import React, { useEffect } from "react";

import ChatContainer from "../components/chat/ChatContainer";
import NoChatSelected from "../components/skelton/NoChatSelected";
import BaseLayout from "../components/layout/BaseLayout";
import SidebarLayout from "../components/layout/SidebarLayout";
import SidebarUserList from "../components/layout/SidebarUserList";

import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatPage = () => {
  const { users, selectedUser, getUsers, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <BaseLayout
      // sidebar
      sidebar={
        <SidebarLayout
          content={
            <SidebarUserList
              users={users}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              onlineUsers={onlineUsers}
            />
          }
        />
      }
      // content
      content={!selectedUser ? <NoChatSelected /> : <ChatContainer />}
    />
  );
};

export default ChatPage;
