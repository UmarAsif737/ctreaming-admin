"use server";

import axiosInstance from "@/config/axios";
import { IAdmin, Result } from "@/types/index.types";

export async function signOut(): Promise<Result> {
  try {
    await axiosInstance.post("/api/admin/auth/sign-out");

    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
    }

    return { data: { message: "Logged out successfully" } };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Sign out failed";
    return { error: errorMessage };
  }
}

export async function createNewAdmin(data: IAdmin): Promise<Result> {
  console.log("🚀 ~ createNewAdmin ~ data:", data);
  try {
    const response = await axiosInstance.post("/api/admin/admin-users", data);
    console.log("API response:", response);

    return { data: response.data.body.new_admin_user };
  } catch (error: any) {
    console.log("🚀 ~ createNewAdmin ~ error:", error);
    console.log("🚀 ~ createNewAdmin ~ error response:", error.response?.data);

    const errorMessage = error.response?.data?.error || "Create user failed";
    return { error: errorMessage };
  }
}
