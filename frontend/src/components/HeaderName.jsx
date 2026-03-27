"use client";
import React from "react";
import { useMainContext } from "@/context/MainContext";

const HeaderName = () => {
  const { user, setAvatar } = useMainContext();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=" bg-gradient-to-r from-red-300 via-pink-300 to-pink-200 shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Greeting */}
      <div className="flex-1">
        <h1 className="text-3xl md:text-4xl font-bold text-violet-950">
          Hello, {user?.name} 👋
        </h1>
        <p className="text-violet-800 mt-1 text-sm md:text-base">
          Today is{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-violet-800 italic mt-2 text-sm md:text-base">
          "Every day is a new opportunity!"
        </p>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center gap-2">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-green-600 object-cover"
          />
        ) : (
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-green-600 bg-gray-200 flex items-center justify-center text-gray-500">
            No Avatar
          </div>
        )}
        <label className="mt-1 px-3 py-1 bg-red-800 text-white rounded-md cursor-pointer hover:bg-red-800 transition text-sm md:text-base">
          Upload Avatar
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Progress bar */}
      <div className="w-full md:w-1/3 mt-4 md:mt-0">
        <p className="text-violet-900 text-sm">Profile Completion</p>
        <div className="w-full bg-yellow-50 rounded-full h-3 mt-1">
          <div
            className="bg-red-700 h-3 rounded-full transition-all duration-500"
            style={{ width: `${user?.progress || 80}%` }}
          ></div>
        </div>
        <p className="text-sm text-violet-800 mt-1">{user?.progress || 80}% completed</p>
      </div>
    </div>
  );
};

export default HeaderName;
