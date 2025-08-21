import { X } from "lucide-react";
import React from "react";
import avatarImg from "../../assets/avatar.webp";
import { useGroupStore } from "../../store/useGroupStore";
import { useAuthStore } from "../../store/useAuthStore";

const GroupChatHeader = () => {
  const { groupDetails, setSelectedGroup, typingUsers, selectedGroup } =
    useGroupStore();
  const { authUser } = useAuthStore();

  const groupTyping = typingUsers[selectedGroup?._id] || [];
  const othersTyping = groupTyping.filter((id) => id !== authUser._id);

  return (
    <div className="p-2.5 border-b sticky top-0 z-10 bg-zinc-100 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={groupDetails.groupImage || avatarImg}
                alt={groupDetails.name}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{groupDetails.name}</h3>
            <p className="text-sm text-base-content/70">
              {othersTyping.length > 0 &&
                (othersTyping.length === 1
                  ? "Someone is typing..."
                  : "Multiple people are typing...")}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedGroup(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default GroupChatHeader;
