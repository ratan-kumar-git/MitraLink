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
  setSelectedGroup: (selectedGroup) => set({ selectedGroup }),

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

      set({
        groupMessages: [...groupMessages, res.data],
        isSendMessage: false,
      });
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
  }
}));
