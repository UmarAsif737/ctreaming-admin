"use server";

import axiosInstance from "@/config/axios";
import { IAdmin, IUser, Result } from "@/types/index.types";

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

export async function getAllUsers({
  query = "",
  page = 1,
  limit = 10,
  search = "",
  is_document_assistance_enabled = false,
}: {
  query?: string;
  page?: number;
  limit?: number;
  search?: string;
  is_document_assistance_enabled?: boolean;
}): Promise<Result> {
  try {
    const params: Record<string, any> = { query, page, limit, search };

    if (is_document_assistance_enabled) {
      params.is_document_assistance_enabled = is_document_assistance_enabled;
    }

    const response = await axiosInstance.get("/api/admin/users", { params });

    return { data: response.data.body, meta: response.data.meta };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Fetch users failed";
    return { error: errorMessage };
  }
}
