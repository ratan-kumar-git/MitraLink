import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, LucideMessagesSquare, User2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import avatarImg from "../assets/avatar.webp";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isopen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="h-16 w-full px-5 sm:px-10 fixed top-0 z-40 bg-white dark:bg-slate-800 border-b border-base-300">
          <div className="flex items-center justify-between h-full w-full">
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="flex items-center justify-center gap-2.5 text-black dark:text-white font-sans hover:opacity-95 transition-all"
              >
                <LucideMessagesSquare className="w-10 h-10 p-1 rounded-md bg-[#422ad5] text-white"/>
                <h1 className="text-2xl font-bold tracking-widest">MitraLink</h1>
              </Link>
            </div>

            <div className="flex items-center gap-4 relative" ref={dropdownRef}>
              {authUser ? (
                <>
                  <button
                    onClick={() => setIsOpen(!isopen)}
                    className="avatar focus:outline-none"
                  >
                    <div className="size-9 rounded-full ring-gray-700 ring-2 overflow-hidden">
                      <img
                        src={authUser.profilePic || avatarImg}
                        alt="User Avatar"
                      />
                    </div>
                  </button>
                  {/* Dropdown Menu */}
                  {isopen && (
                    <div className="absolute top-11 right-0 w-40 bg-white dark:bg-gray-700 text-black dark:text-white shadow-lg rounded-lg overflow-hidden z-50">
                      <Link
                        to="/myprofile"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-10 dark:hover:bg-gray-600"
                        onClick={() => setIsOpen(false)}
                      >
                        <User2 className="size-5" />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <LogOut className="size-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* <Link
                    to="/signup"
                    className="px-2 py-1 backdrop-blur-sm bg-yellow-200 rounded-md text-gray-800"
                  >
                    <span>Register</span>
                  </Link> */}
                  <Link
                    to="/login"
                    className="px-4 py-3 bg-[#422ad5] text-white text-sm font-semibold shadow-md rounded-md hover:opacity-95"
                  >
                    <span>Get Satarted</span>
                  </Link>
                </>
              )}
            </div>
          </div>
      </header>
    </>
  );
};

export default Navbar;
