import { Card, CardBody } from "@heroui/react";
import React from "react";
import { Community } from "../icons/community";

export const CardBalance3 = () => {
  return (
    <Card className="xl:max-w-sm bg-success rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white">Card Insurance</span>
            <span className="text-white text-xs">1311 Cars</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">$3,910</span>
          <span className="text-danger text-xs">- 4.5%</span>
        </div>
      </CardBody>
    </Card>
  );
};
