import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Github,
  Instagram,
  Twitter,
  TwitterIcon,
} from "lucide-react";
import tricolrImg from "../assets/tricolr.webp";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="h-[calc(100vh-64px)] w-full flex flex-col justify-center items-center gap-6 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${tricolrImg})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-md">
            Welcome to <span className="text-yellow-400">MitraLink</span>
          </h1>

          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            A modern chat app where you can connect with friends securely and
            instantly 🚀
          </p>

          <Link
            to="/chat"
            className="mt-6 inline-block px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow hover:bg-yellow-400 transition"
          >
            Start Chatting
          </Link>

          <div className="mt-8 text-gray-300 text-sm">
            Home Page under construction ... <br />
            Coming soon !!
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            Why Choose <span className="text-yellow-500">MitraLink?</span>
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-yellow-500">
                🔒 Secure Chats
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                End-to-end encrypted conversations for complete privacy.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-yellow-500">
                ⚡ Fast Messaging
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Lightning-fast delivery and instant notifications.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-yellow-500">
                🎨 Simple UI
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Clean, modern interface designed for easy communication.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-yellow-500">
                🌍 Connect Anywhere
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Stay connected with friends and family across the globe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:flex lg:items-center lg:gap-16">
          {/* Left Side - Image */}
          <div className="lg:w-1/2 mb-10 lg:mb-0 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2950/2950669.png"
              alt="About MitraLink"
              className="w-80 h-auto rounded-xl shadow-2xl"
            />
          </div>

          {/* Right Side - Text */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white leading-snug">
              About <span className="text-yellow-500">MitraLink</span>
            </h2>

            <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              MitraLink is a modern chat platform designed to keep you{" "}
              <span className="font-semibold text-yellow-500">connected</span>{" "}
              with the people who matter most. Enjoy{" "}
              <span className="font-semibold">
                fast, secure, and reliable messaging
              </span>
              anytime, anywhere.
            </p>

            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Whether it’s chatting with friends, sharing media, or creating
              groups, MitraLink makes conversations{" "}
              <span className="font-semibold text-yellow-500">
                simple, private, and fun
              </span>
              .
            </p>

            <Link
              to="/chat"
              className="mt-8 inline-block px-8 py-3 bg-yellow-500 text-black text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <div className="border-t border-gray-700 py-6 text-center text-sm text-gray-500 bg-gray-50 dark:bg-gray-900">
        © {new Date().getFullYear()}{" "}
        <span className="text-yellow-400">MitraLink</span>. All rights reserved.
        <br />
        <span className="text-gray-400">
          Designed & Developed by{" "}
          <span className="text-yellow-400 font-semibold">Ratan Kumar</span>
        </span>
      </div>
    </>
  );
};

export default Home;
