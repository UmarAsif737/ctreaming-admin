"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/public";

const CompanyCard = () => {
  return (
    <div className="w-full min-w-40">
      <div className="cursor-pointer">
        <div className="flex items-center gap-2">
          <Link href={"/dashboard"}>
            <Image
              src={IMAGES.LOGO}
              alt="Company Logo"
              width={100}
              height={100}
              className="w-[150px] h-auto"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
