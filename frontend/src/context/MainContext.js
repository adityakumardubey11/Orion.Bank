"use client";
import Loader from "@/components/Loader";
import { axiosClient } from "@/utils/AxiosClient";
import { toast } from "react-toastify";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const mainContext = createContext({
  user: {},
  fetchUserProfile() {},
  LogoutHandler() {},
  fetchATMDetails() {},
  atm: {},
  setAvatar() {}, // added for avatar upload
});

export const useMainContext = () => useContext(mainContext);

export const MainContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [atm, setAtm] = useState(null);

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      if (!token) return;
      const response = await axiosClient.get("/auth/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.data;

      // Load avatar from localStorage if exists
      const savedAvatar = localStorage.getItem("userAvatar");
      if (savedAvatar) data.avatar = savedAvatar;

      setUser(data);
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch ATM details
  const fetchATMDetails = async (id) => {
    try {
      if (!id) return;
      const response = await axiosClient.get(`/atm/get/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.data;
      setAtm(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || error.message);
    }
  };

  // Logout
  const LogoutHandler = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
    toast.success("Logout Success");
  };

  // Set avatar and persist
  const setAvatar = (avatarUrl) => {
    if (user) {
      setUser({ ...user, avatar: avatarUrl });
      localStorage.setItem("userAvatar", avatarUrl);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <Loader />
      </div>
    );
  }

  return (
    <mainContext.Provider
      value={{ user, fetchUserProfile, LogoutHandler, fetchATMDetails, atm, setAvatar }}
    >
      {children}
    </mainContext.Provider>
  );
};
