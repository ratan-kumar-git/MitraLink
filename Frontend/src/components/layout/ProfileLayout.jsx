import React from "react";
import dayjs from "dayjs";
import { X } from "lucide-react";
import avatarImg from '../../assets/avatar.webp';

const ProfileLayout = ({ user, onlineUsers, setSelectedUser }) => {
  const isOnline = onlineUsers.includes(user._id);
  return (
    <>
      {/* Close button */}
      <div className="mx-5 w-full h-3/4 sm:h-auto sm:w-1/2 bg-zinc-300 dark:bg-slate-800 shadow-lg rounded-2xl p-6">
        <button className="relative" onClick={() => setSelectedUser(null)}>
          <div className="absolute bottom-0">
            <X />
          </div>
        </button>
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={user.profilePic || avatarImg}
              alt={user.fullName}
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-200 dark:border-slate-700"
            />
            <span
              className={`absolute bottom-2 right-2 w-4 h-4 rounded-full ring-2 ring-white dark:ring-slate-800 ${
                isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
              aria-label={isOnline ? "Online" : "Offline"}
            />
          </div>

          {/* Name */}
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            {user.fullName}
          </h2>

          {/* Status */}
          <p
            className={`mt-1 text-sm font-medium ${
              isOnline ? "text-green-500" : "text-gray-500"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>

        {/* Info */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between text-gray-700 dark:text-gray-300 gap-10">
            <span className="font-medium block">Email: </span>
            <span className="block">{user.email}</span>
          </div>
          <div className="flex justify-between text-gray-700 dark:text-gray-300">
            <span className="font-medium">Since Joined</span>
            <span>
              {user.createdAt
                ? dayjs(user.createdAt).format("DD MMM YYYY")
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
