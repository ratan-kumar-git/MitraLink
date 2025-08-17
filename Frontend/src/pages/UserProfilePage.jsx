import React, { useEffect } from "react";
import BaseLayout from "../components/layout/BaseLayout";
import SidebarLayout from "../components/layout/SidebarLayout";
import ProfileLayout from "../components/layout/ProfileLayout";
import SidebarUserList from "../components/layout/SidebarUserList";
import NoChatSelected from "../components/skelton/NoChatSelected";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const UserProfilePage = () => {
  const { users, selectedUser, getUsers, setSelectedUser } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <BaseLayout
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
        content={
          selectedUser ? (
            <>
              <div className="flex items-center justify-center w-full h-full bg-zinc-200 dark:bg-gray-900">
                <ProfileLayout
                  user={selectedUser}
                  authUser={authUser}
                  onlineUsers={onlineUsers}
                  setSelectedUser={setSelectedUser}
                />
              </div>
            </>
          ) : (
            <NoChatSelected />
          )
        }
      />
    </>
  );
};

export default UserProfilePage;
