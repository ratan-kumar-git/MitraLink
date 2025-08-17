import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
  isSendMessage: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("api/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`api/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      set({isSendMessage: true})
      const res = await axiosInstance.post(
        `api/message/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data], isSendMessage: false });
    } catch (error) {
      toast.error(error.response.data.message || "Failed to send message");
    } finally {
      set({ isSendMessage: false })
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    const authUserId = useAuthStore.getState().authUser._id;

    // todo: optimized it later
    socket.on("newMessage", (newMessage) => {
      const { selectedUser, messages } = get();

      if (!selectedUser) return;

      const isRelevantMessage =
        (newMessage.senderId === selectedUser._id &&
          newMessage.receiverId === authUserId) ||
        (newMessage.receiverId === selectedUser._id &&
          newMessage.senderId === authUserId);

      if (!isRelevantMessage) return;

      set({ messages: [...messages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
