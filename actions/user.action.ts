"use server";

import { cookies } from "next/headers";
import axiosInstance from "@/config/axios";
import { IAdmin, IUser, Result } from "@/helpers/types";
import { error } from "console";

export async function signOut(): Promise<Result<{ message: string }>> {
  try {
    await axiosInstance.post("/api/users/sign-out");

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

export async function getUserById(
  id: string
): Promise<Result<{ user: IUser }>> {
  try {
    const res = await axiosInstance.get(`/api/users/${id}`);

    console.log("🚀 ~ res:", res);
    return { data: { user: res.data.body.user } };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Delete user failed";
    return { error: errorMessage };
  }
}

export async function editUser(
  userId: string,
  data: IUser
): Promise<Result<IUser>> {
  try {
    const response = await axiosInstance.put(`/api/users/${userId}`, data);

    console.log("🚀 ~ response:", response);
    return { data: response.data.body.updated_user };
  } catch (error: any) {
    // Extract detailed error message if available
    const errorMessage = error.response?.data?.error || "Edit user failed";
    // console.error("Edit user failed:", errorMessage);
    return { error: errorMessage };
  }
}

export async function createUser(data: IUser): Promise<Result<IUser>> {
  try {
    const response = await axiosInstance.post("/api/users", {
      ...data,
      _id: null,
    });

    return { data: response.data.body.new_admin_user };
  } catch (error: any) {
    // Extract detailed error message if available
    const errorMessage = error.response?.data?.error || "Create user failed";
    // console.error("Create user failed:", errorMessage);
    return { error: errorMessage };
  }
}

export async function createNewAdmin(data: IAdmin): Promise<Result<IAdmin>> {
  console.log("🚀 ~ createNewAdmin ~ data:", data);
  try {
    const response = await axiosInstance.post("/api/admin/users/create", data);
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
}): Promise<Result<IUser[]>> {
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


export async function getSingleUser(id: string) {
  try {
    const response = await axiosInstance.get(`/api/admin/users/${id}`);
    console.log("🚀 ~ response:", response.data);
    return { data: response.data.body };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Fetch user failed";
    return { error: errorMessage };
  }
}

export async function getUserVehicles(
  id: string,
  { limit, page }: { limit: number; page: number }
) {
  try {
    const response = await axiosInstance.get(
      `/api/admin/users/${id}/vehicles`,
      {
        params: { limit, page },
      }
    );
    console.log(response);
    return { data: response.data.body, meta: response.data.meta };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Fetch user failed";
    return { error: errorMessage };
  }
}

export async function getUserDrivers(id: string) {
  try {
    const response = await axiosInstance.get(`/api/admin/users/${id}/drivers`);
    console.log(response);
    return { data: response.data.body, meta: response.data.meta };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Fetch user failed";
    return { error: errorMessage };
  }
}

export async function deleteUser(id: string) {
  try {
    const response = await axiosInstance.delete(`/api/admin/users/${id}`);
    console.log("🚀 ~ response:", response.data);
    return { data: response.data.body };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Delete user failed";
    return { error: errorMessage };
  }
}

export async function getUserDetails(id: string) {
  try {
    const response = await axiosInstance.get(`/api/users/${id}`);
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Delete user failed";
    return { error: errorMessage };
  }
}

export async function getAllUsersWithOutPagination() {
  try {
    const response = await axiosInstance.get("/api/users/getUsers");

    return { data: response.data.body };
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Fetch users failed";
    // console.error("Fetch users failed:", errorMessage);
    return { error: errorMessage };
  }
}
