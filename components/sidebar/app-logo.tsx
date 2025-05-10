"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/public";

const AppLogo = () => {
  return (
    // <div className="w-full min-w-40">
    //   <div className="cursor-pointer">
    //     <div className="flex items-center gap-2">
    <Link href={"/dashboard"}>
      <div className="flex items-center gap-3">
        {/* Logo! */}
        <Image
          src={IMAGES.LOGO}
          alt="logo"
          width={32}
          height={37}
          className="object-contain"
        />

        {/* App Name! */}
        <h1 className="font-bold text-xl md:text-2xl">Ctreaming</h1>
      </div>
    </Link>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AppLogo;
