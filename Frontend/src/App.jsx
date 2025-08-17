import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Group from "./pages/Group";
import UserProfilePage from "./pages/UserProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import ChatPage from "./pages/ChatPage";
import MyProfile from "./pages/MyProfile";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { authUser, checkAuth } = useAuthStore();
  

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/chat" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/chat" />}
        />

        {/* Pages */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:userName"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/group"
          element={
            <ProtectedRoute>
              <Group />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myprofile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:userName"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
