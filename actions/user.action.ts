/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/config/axios";
import { Result } from "@/types/index.types";

export async function signOut(): Promise<Result> {
  try {
    await axiosInstance.post("/api/admin/auth/sign-out");

    // Clear the token from local storage
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
    }

    return { data: { message: "Logged out successfully" } };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Sign out failed";
    return { error: errorMessage };
  }
}
