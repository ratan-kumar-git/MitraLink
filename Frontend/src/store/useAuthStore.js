import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_API_BASE_URL
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSignup: false,
  isLogin: false,
  isUpdaetingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("api/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSignup: true });
    try {
      const res = await axiosInstance.post("api/auth/signup", data);
      const { token } = res.data;
      if (token) {
        localStorage.setItem("token", token);
        set({ authUser: res.data });
        toast.success("Account created Successfully");
        get().connectSocket();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSignup: false });
    }
  },

  logout: () => {
    try {
      localStorage.removeItem("token");
      set({ authUser: null });
      toast.success("Logout Successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  login: async (data) => {
    set({ isLogin: true });
    try {
      const res = await axiosInstance.post("api/auth/login", data);
      const { token } = res.data;
      if (token) {
        localStorage.setItem("token", token);
        set({ authUser: res.data });
        toast.success("Login Successfully");
        get().connectSocket();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLogin: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdaetingProfile: true });
    try {
      const res = await axiosInstance.put("api/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile update successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdaetingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
