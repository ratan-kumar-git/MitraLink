import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios";
import { useAuthStore } from "./useAuthStore";

export const useGroupStore = create((set, get) => ({
  groupMessages: [],
  groups: [],
  groupDetails: [],
  selectedGroup: null,
  isGroupLoading: false,
  isGroupMessagesLoading: false,
  isSendMessage: false,
  typingUsers: {},

  setSelectedGroup: (selectedGroup) => {
    set({ selectedGroup });

    const { socket } = useAuthStore.getState();
    if (socket && selectedGroup?._id) {
      socket.emit("joinGroup", selectedGroup._id);
    }
  },

  getGroups: async () => {
    set({ isGroupLoading: true });
    try {
      const res = await axiosInstance.get("api/group/mygroups");
      set({ groups: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isGroupLoading: false });
    }
  },

  createGroup: async ({ name, members }) => {
    set({ isGroupLoading: true });
    try {
      const res = await axiosInstance.post("api/group/create", {
        name,
        members,
      });
      set((state) => ({ groups: [...state.groups, res.data] }));
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isGroupLoading: false });
    }
  },

  sendGroupMessages: async ({ text, image }) => {
    const { selectedGroup, groupMessages } = get();
    const { socket } = useAuthStore.getState();

    if (!selectedGroup) {
      toast.error("No group selected");
      return;
    }
    try {
      set({ isSendMessage: true });
      const res = await axiosInstance.post(
        `api/message/send-group/${selectedGroup._id}`,
        { text, image }
      );

      socket?.emit("group:sendMessage", {
        groupId: selectedGroup._id,
        message: res.data,
      });

      set({isSendMessage: false})
    } catch (error) {
      toast.error(error.response.data.message || "Failed to send message");
    } finally {
      set({ isSendMessage: false });
    }
  },

  getGroupMessage: async (groupId) => {
    set({ isGroupMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`api/group/${groupId}`);
      set({
        groupDetails: res.data.group,
        groupMessages: res.data.messages,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isGroupMessagesLoading: false });
    }
  },

  initGroupSocketListener: () => {
    const { socket } = useAuthStore.getState();
    if (!socket) return;

    socket.off("group:typing");
    socket.off("group:stopTyping");

    socket.on("group:typing", ({ groupId, senderId }) => {
      set((state) => {
        const prev = state.typingUsers[groupId] || [];
        if (!prev.includes(senderId)) {
          return { typingUsers: { ...state.typingUsers, [groupId]: [...prev, senderId] } };
        }
        return state;
      });
    });

    socket.on("group:stopTyping", ({ groupId, senderId }) => {
      set((state) => {
        const prev = state.typingUsers[groupId] || [];
        return { typingUsers: { ...state.typingUsers, [groupId]: prev.filter((id) => id !== senderId) } };
      });
    });

    socket.off("group:newMessage");
    socket.on("group:newMessage", (message) => {
      const { selectedGroup } = get();
      if (selectedGroup?._id === message.groupId) {
        set((state) => ({
          groupMessages: [...state.groupMessages, message],
        }));
      }
    });
  },

  sendTyping: (groupId) => {
    const { socket } = useAuthStore.getState();
    const { authUser } = useAuthStore.getState();
    socket?.emit("group:typing", { groupId, senderId: authUser._id });
  },

  stopTyping: (groupId) => {
    const { socket } = useAuthStore.getState();
    const { authUser } = useAuthStore.getState();
    socket?.emit("group:stopTyping", { groupId, senderId: authUser._id });
  },
}));
