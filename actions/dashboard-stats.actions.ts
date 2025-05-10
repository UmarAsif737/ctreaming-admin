"use server";

import axiosInstance from "@/config/axios";

export const getDashboardStats = async () => {
  try {
    const response = await axiosInstance("/api/admin/dashboard");
    console.log("🚀 ~ getDashboardStats ~ response:", response);
    return { data: response.data.body };
  } catch (error) {
    console.log("🚀 ~ getDashboardStats ~ error:", error);
    return { error: error };
  }
};
