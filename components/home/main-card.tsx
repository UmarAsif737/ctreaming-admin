import { Card, CardBody } from "@heroui/react";
import React from "react";
import { Camera, CheckCircle, AlertTriangle, Image, XCircle } from "lucide-react"; // Importing icons from Lucide

export const StatusCard = ({ statusName, currentCount, totalProducts }: any) => {
    // Function to get the background color class based on the status
    const getStatusColor = (status: string) => {
        switch (status) {
            case "to-shoot":
                return "bg-primary";
            case "shot":
                return "bg-danger";
            case "images-ready":
                return "bg-secondary";
            case "changes-required":
                return "bg-warning";
            default: // "approved" or any other status
                return "bg-success";
        }
    };

    // Function to get the appropriate icon based on the status
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "to-shoot":
                return <Camera className="text-white" />;
            case "shot":
                return <CheckCircle className="text-white" />;
            case "images-ready":
                return <Image className="text-white" />;
            case "changes-required":
                return <AlertTriangle className="text-white" />;
            default: // "approved" or any other status
                return <CheckCircle className="text-white" />;
        }
    };

    return (
        <Card className={`${getStatusColor(statusName)} rounded-xl shadow-md px-3 w-full`}>
            <CardBody className="py-5 overflow-hidden">
                <div className="flex gap-2.5">
                    {getStatusIcon(statusName)} {/* Display the dynamic icon */}
                    <div className="flex flex-col">
                        <span className="capitalize text-white">
                            {statusName?.replaceAll("-", " ")}

                        </span>
                        <span className="text-white text-xs">Total Products: {totalProducts}</span>
                    </div>
                </div>
                <div className="flex gap-2.5 py-2 items-center">
                    <span className="text-white text-xl font-semibold">{currentCount} {currentCount > 1 ? "Products" : "Product"}</span>
                </div>
            </CardBody>
        </Card>
    );
};
