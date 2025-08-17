import React from "react";
import { LucideMessagesSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="h-full hidden sm:flex flex-1 flex-col items-center justify-center p-16 bg-zinc-200 dark:bg-gray-900">
      <div className="max-w-sm text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <LucideMessagesSquare className="w-10 h-10 p-1 rounded-md bg-[#422ad5] text-white"/>
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to MitraLink!</h2>
        <p className="text-base-content/60">
          Select a user from the sidebar to start chatting or see profile
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
