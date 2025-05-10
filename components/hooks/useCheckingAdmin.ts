"use client";
import { useSession } from "next-auth/react";

export const useCheckAdmin = () => {
    const session = useSession();
    const isAdmin = session.data?.user?.type === "admin";
    // console.log("🚀 ~ useCheckAdmin ~ isAdmin:", session.data)
    return { isAdmin };
}
