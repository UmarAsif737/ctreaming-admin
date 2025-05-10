import React from 'react'
import Link from 'next/link'

interface BookingsCardProps {
  bookings: any[];
  userId: number;
}

const BookingsCard: React.FC<BookingsCardProps> = ({ bookings, userId }) => {
  return (
    <div className='bg-[#f3f3f3] dark:bg-[#18181b] text-black dark:text-gray-200 p-6 rounded-3xl shadow-custom-black dark:shadow-custom-white border border-black dark:border-white mt-8'>
      <div className='w-full h-full flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-medium'>Bookings</h2>
        {bookings.length > 0 ? (
          <Link
            href={`/dashboard/accounts/${userId}/bookings`}
            className='px-2 py-1 rounded-full bg-white dark:bg-black  border border-black dark:border-white shadow-custom-black dark:shadow-custom-white text-sm'
          >
            See All Bookings
          </Link>
        ) : null}
      </div>
      {bookings.length > 0 ? (
        bookings.map(booking => (
          <div
            key={booking.id}
            className='border-t border-black dark:border-white text-gray-600 dark:text-gray-300 border-opacity-50 py-4 first:border-t-0'
          >
            <p className='text-sm '>
              <span className='font-semibold'>Client Name:</span>{' '}
              {booking?.client_name || 'Invalid Name'}
            </p>
            <p className='text-sm '>
              <span className='font-semibold'>Client Phone Number:</span>{' '}
              {booking?.client_phone_number || 'Invalid Number'}
            </p>
            <p className='text-sm '>
              <span className='font-semibold'>Client Address:</span>{' '}
              {booking?.client_address || 'Invalid Address'}
            </p>{' '}
            <p className='text-sm '>
              <span className='font-semibold'>Vehicle Identification Number:</span>{' '}
              {booking?.vehicle?.vehicle_identification_number || 'Invalid VIN'}
            </p>
            <p className='text-sm '>
              <span className='font-semibold'>Driver Name:</span>{' '}
              {booking?.driver?.name || 'Invalid Driver Name'}
            </p>
            <p className='text-sm '>
              <span className='font-semibold'>Start Date:</span>{' '}
              {booking?.start_date
                ? new Date(booking?.start_date).toLocaleDateString()
                : '15-00-2099'}
            </p>
            <p className='text-sm '>
              <span className='font-semibold'>End Date:</span>{' '}
              {booking?.end_date
                ? new Date(booking?.end_date).toLocaleDateString()
                : '15-00-2099'}
            </p>
          </div>
        ))
      ) : (
        <p className='text-gray-600'>No drivers assigned.</p>
      )}
    </div>
  )
}

export default BookingsCard
