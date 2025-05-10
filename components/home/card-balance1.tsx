import { Card, CardBody } from "@heroui/react";
import React from "react";
import { Community } from "../icons/community";

export const TaskCountCard = ({
  title,
  count,
  subtitle,
  color,
  chartColor,
}: {
  title: string;
  count: number;
  subtitle: string;
  color: string;
  chartColor: string;
}) => {
  return (
    <Card
      className={`xl:max-w-sm bg-${color} rounded-xl border border-black px-2 w-full dark:bg-[#18181b]`}
    >
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5">
          <div className="flex flex-col">
            <span className="text-gray-700 dark:text-gray-100 font-semibold">
              {title}
            </span>
            <span className="text-gray-500 text-xs">{subtitle}</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span
            className={`text-gray-700 dark:text-gray-300 text-2xl font-bold`}
          >
            {count}
          </span>
        </div>
      </CardBody>
    </Card>
  );
};
