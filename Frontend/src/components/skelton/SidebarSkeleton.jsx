import { LucideMessagesSquare, UserCircle, Users } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

const SidebarSkeleton = ({selectedUser, selectedGroup}) => {
    // Create 8 skeleton items
    const skeletonContacts = Array(8).fill(null);
    return (
        <aside
            className={`h-full w-full sm:w-72 border-r border-base-300 flex sm:flex flex-col transition-all duration-200 ${(selectedUser || selectedGroup) ? "hidden" : ""}`}
        >
            {/* Skeleton Contacts */}
            <div className="overflow-y-auto w-full py-3">
                {skeletonContacts.map((_, idx) => (
                    <div key={idx} className="w-full p-3 flex items-center gap-3">
                        {/* Avatar skeleton */}
                        <div className="relative mx-auto lg:mx-0">
                            <div className="skeleton size-12 rounded-full" />
                        </div>

                        {/* User info skeleton - only visible on larger screens */}
                        <div className="block text-left min-w-0 flex-1">
                            <div className="skeleton h-4 w-32 mb-2" />
                            <div className="skeleton h-3 w-16" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Navigation */}
            <div className="grid grid-cols-3 w-full py-2 border-t bg-zinc-100 dark:bg-gray-800">
                <Link to={"/"} className="flex flex-col items-center justify-center cursor-pointer">
                    <LucideMessagesSquare className="size-5" />
                    <span className="font-medium block text-sm">Chats</span>
                </Link>
                <Link to={"/group"} className="flex flex-col items-center justify-center cursor-pointer">
                    <Users className="size-5" />
                    <span className="font-medium block text-sm">Groups</span>
                </Link>
                <Link to={"/profile"} className="flex flex-col items-center justify-center cursor-pointer">
                    <UserCircle className="size-5" />
                    <span className="font-medium block text-sm">Profile</span>
                </Link>
            </div>
        </aside>
    )
}

export default SidebarSkeleton