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
    const socket = useAuthStore.getState().socket;
    const onlineUsers = useAuthStore.getState().onlineUsers;
    try {
      set({ isSendMessage: true });
      const res = await axiosInstance.post(
        `api/message/send/${selectedUser._id}`,
        messageData
      );

      let newMessage = { ...res.data, status: "sent" };

      if (onlineUsers.includes(selectedUser._id)) {
        socket.emit("message:delivered", newMessage._id);
        newMessage.status = "delivered";
      }

      set({ messages: [...messages, res.data], isSendMessage: false });
    } catch (error) {
      toast.error(error.response.data.message || "Failed to send message");
    } finally {
      set({ isSendMessage: false });
    }
  },

  updateMessageStatus: (messageId, status) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg._id === messageId ? { ...msg, status } : msg
      ),
    }));
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    const authUserId = useAuthStore.getState().authUser._id;

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

      if (selectedUser && newMessage.senderId === selectedUser._id) {
        socket.emit("message:seen", newMessage._id);
      } else {
        socket.emit("message:delivered", newMessage._id);
      }
    });

    socket.on("message:status", ({ messageId, status }) => {
      get().updateMessageStatus(messageId, status);
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
    socket.off("message:status");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
