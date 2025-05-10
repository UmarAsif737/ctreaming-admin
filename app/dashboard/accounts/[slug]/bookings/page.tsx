"use client";

import React, { useEffect, useState } from "react";
import { Pagination, Tooltip, Link } from "@heroui/react";
import { ArrowLeft, Loader2, FileSearch2 } from "lucide-react";
import { usePathname } from "next/navigation";

import { getUserBookings } from "@/actions/booking.action";
import { daysDifference } from "@/helpers/utils";

const AllBookings = () => {
  const pathname = usePathname();
  const userId = pathname?.split("/")[3];

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 5,
    totalItems: 0,
  });

  const fetchBookings = async (page: number) => {
    setLoading(true);
    try {
      const result = await getUserBookings(userId, {
        limit: pagination.limit,
        page,
      });
      console.log({result})
      if (result.error) {
        setError(result.error);
      } else {
        setBookings(result.data);
        setPagination({
          currentPage: page,
          totalPages: result.meta.total_pages,
          limit: pagination.limit,
          totalItems: result.meta.total_items,
        });
      }
    } catch (err) {
      setError("An error occurred while fetching user bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
        fetchBookings(pagination.currentPage);
    }
  }, [userId]);

  const handlePageChange = (page: number) => {
    fetchBookings(page);
  };


  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <Loader2 size={28} className="animate-spin" />
          <p>Loading User Bookings...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center">
        {error || "An error occurred while fetching user bookings."}
      </div>
    );

  return (
    <div className="p-6 bg-white dark:bg-black min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100text-left">
        <p className="flex justify-start items-center gap-x-2">
          <Link href={`/dashboard/accounts/${userId}`}>
            <ArrowLeft size={24} className="text-gray-800 dark:text-gray-100" />
          </Link>
          <span className="text-gray-800 dark:text-gray-100">
            All User Bookings
          </span>
        </p>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {bookings?.map((booking: any) => (
          <div
            key={booking.id}
            className="bg-[#c4e9c9] rounded-3xl shadow-custom-black dark:shadow-custom-green border border-black p-6"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {booking?.vehicle?.vehicle_identification_number} (
                  {booking?.driver?.name})
                </h2>
                <p className="text-gray-600">
                  Booking Dates: {booking?.start_date} {"to"} {booking?.end_date}
                </p>
                <p className="text-gray-600">
                  Booking Duration: {daysDifference(booking?.start_date,booking?.end_date)} day{daysDifference(booking?.start_date,booking?.end_date) > 1 && "s"}
                </p>
                <p className="text-gray-600">
                  Client Name: {booking?.client_name} 
                </p>
                <p className="text-gray-600">
                  Client Phone: {booking?.client_phone_number}
                </p>
                <p className="text-gray-600">
                  Client Address: {booking?.client_address}
                </p>
              </div>
              <div className="flex justify-center items-start gap-x-4">
                <Tooltip content="Booking Details">
                  <Link href={`/dashboard/bookings/${booking?.company_id}-${booking?.id}`}>
                    <FileSearch2
                      size={24}
                      className="text-gray-800 cursor-pointer"
                    />
                  </Link>
                </Tooltip>
            
              </div>
            </div>
        
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Pagination
          total={pagination.totalPages}
          showControls
          onChange={(page) => handlePageChange(page)}
          initialPage={pagination.currentPage}
          variant="flat"

        />
      </div>
    </div>
  );
};

export default AllBookings;
