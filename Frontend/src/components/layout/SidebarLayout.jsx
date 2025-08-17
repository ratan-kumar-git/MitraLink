import React from 'react'
import { NavLink } from 'react-router-dom'
import { LucideMessagesSquare, UserCircle, Users } from 'lucide-react'
import { useChatStore } from "../../store/useChatStore";
import SidebarSkeleton from '../skelton/SidebarSkeleton';

const SidebarLayout = ({content}) => {
  const { selectedUser, isUserLoading } = useChatStore();

  if (isUserLoading) {
    return <SidebarSkeleton selectedUser={selectedUser} />;
  }

  return (
    <aside className={`h-[calc(100vh-64px)] w-full sm:w-72 border-r bg-slate-50 dark:bg-slate-800 flex sm:flex flex-col transition-all duration-200 ${selectedUser ? "hidden" : ""}`}>
      <div className="flex-1 overflow-y-auto w-full">
        {content}
      </div>
      {/* Bottom Navigation */}
      <div className="grid grid-cols-3 w-full py-2 border-t bg-zinc-100 dark:bg-gray-800">
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center cursor-pointer ${isActive ? "text-[#422ad5] font-semibold" : ""
            }`
          }
        >
          <LucideMessagesSquare className="size-5" />
          <span className="font-medium block text-sm">Chats</span>
        </NavLink>

        <NavLink
          to="/group"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center cursor-pointer ${isActive ? "text-[#422ad5] font-semibold" : ""
            }`
          }
        >
          <Users className="size-5" />
          <span className="font-medium block text-sm">Groups</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center cursor-pointer ${isActive ? "text-[#422ad5] font-semibold" : ""
            }`
          }
        >
          
          <UserCircle className="size-5" />
          <span className="font-medium block text-sm">Profile</span>
        </NavLink>
      </div>
    </aside>
  )
}

export default SidebarLayout