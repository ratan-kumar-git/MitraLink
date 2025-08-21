import React, { useState } from "react";
import dayjs from "dayjs";
import { Plus, X } from "lucide-react";
import avatarImg from "../assets/avatar.webp";

const GroupList = ({
  groups,
  selectedGroup,
  setSelectedGroup,
  createGroup,
  allUsers,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleUserClick = (group) => {
    setSelectedGroup(group);
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    createGroup({ name: groupName, members: selectedUsers });
    setGroupName("");
    setSelectedUsers([]);
    setIsOpenModal(false);
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="relative h-full w-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {/* group list */}
        {groups.map((group) => (
          <button
            key={group._id}
            onClick={() => handleUserClick(group)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-slate-100 hover:dark:bg-slate-700 transition-colors ${
              selectedGroup?._id === group._id
                ? "dark:bg-slate-700 bg-slate-100"
                : ""
            }`}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={group.groupImage || avatarImg}
                alt={group.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-left w-full">
              <div className="font-medium truncate">{group.name}</div>
              <div className="flex items-center justify-end">
                {/* <div className="text-sm text-zinc-400 truncate max-w-[150px]">
                {group.lastMessage ? group.lastMessage : "No message!"}
              </div> */}
                <div className="text-xs text-zinc-500 whitespace-nowrap">
                  {group.createdAt && dayjs(group.createdAt).format("hh:mm A")}
                </div>
              </div>
            </div>
          </button>
        ))}

        {/* Modal */}
        {isOpenModal && (
          <div className="fixed p-3 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg w-96 p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Create Group</h2>
                <button
                  onClick={() => setIsOpenModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleCreateGroup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Group Name
                  </label>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                    required
                  />
                </div>

                {/* Select Users */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Select Users
                  </label>
                  <div className="max-h-40 overflow-y-auto border rounded-lg p-2">
                    {allUsers.map((user) => (
                      <label
                        key={user._id}
                        className="flex items-center gap-2 mb-1 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user._id)}
                          onChange={() => toggleUserSelection(user._id)}
                        />
                        <span>{user.fullName}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!groupName || selectedUsers.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg disabled:opacity-50"
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Floating Create group Button */}
      <button
        onClick={() => setIsOpenModal(true)}
        className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default GroupList;
