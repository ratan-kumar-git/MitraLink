import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import avatarImg from "../../assets/avatar.webp";

const SidebarUserList = ({
  users,
  selectedUser,
  setSelectedUser,
  onlineUsers,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Sort users based on last message timestamp
  const sortedUsers = [...users].sort(
    (a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
  );

  const handleUserClick = (user) => {
    setSelectedUser(user);
    const chatPath = `/chat/${user._id}`;
    const profilePath = `/profile/${user._id}`;

    if (
      location.pathname === "/chat" ||
      location.pathname === `/chat/${user.fullName}`
    ) {
      navigate(chatPath);
    } else if (
      location.pathname === "/profile" ||
      location.pathname === `/profile/${user.fullName}`
    ) {
      navigate(profilePath);
    }
  };
  return (
    <>
      {sortedUsers.map((user) => (
        <button
          key={user._id}
          onClick={() => handleUserClick(user)}
          className={`w-full p-3 flex items-center gap-3 hover:bg-slate-100 hover:dark:bg-slate-700 transition-colors ${
            selectedUser?._id === user._id
              ? "dark:bg-slate-700 bg-slate-100"
              : ""
          }`}
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                    src={user.profilePic || avatarImg}
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                />
            </div>
            {onlineUsers.includes(user._id) && (
              <span
                className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
              />
            )}
          </div>

          {/* User info - only visible on larger screens */}
          <div className="text-left w-full">
            <div className="font-medium truncate">{user.fullName}</div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-zinc-400 truncate max-w-[150px]">
                {user.lastMessage ? user.lastMessage : "No message!"}
              </div>
              <div className="text-xs text-zinc-500 whitespace-nowrap">
                {user.lastMessageAt
                  ? dayjs(user.createdAt).format("hh:mm A")
                  : ""}
              </div>
            </div>
          </div>
        </button>
      ))}
    </>
  );
};

export default SidebarUserList;
