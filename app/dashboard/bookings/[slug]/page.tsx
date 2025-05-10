'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { getBookingDetails } from '@/actions/booking.action'
import { getSingleUser } from '@/actions/user.action'
import { daysDifference } from '@/helpers/utils'

const InfoBlock = ({
  title,
  data
}: {
  title: string,
  data: Record<string, string | number | boolean>
}) => (
  <div className='bg-gray-100 dark:bg-[#18181b] p-6 rounded-3xl shadow-custom-black dark:shadow-custom-white border border-black dark:border-white'>
    <h2 className='text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200'>
      {title}
    </h2>
    {Object.entries(data).map(([key, value]) => (
      <p key={key} className='text-gray-600 dark:text-gray-300'>
        <span className='font-medium'>
          {key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}:
        </span>{' '}
        <span className={`${key === 'VIN' ? 'uppercase' : ''}`}>
          {String(value)}
        </span>
      </p>
    ))}
  </div>
)

export default function BookingDetails () {
  const router = useRouter()
  const pathname = usePathname()
  const ids = pathname?.split('/')?.pop()?.split('-')
  const bookingId = ids?.[1]
  const userId = ids?.[0]

  

  const [bookingData, setBookingData] = useState<any | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");





  const fetchBookingDetails = useCallback(async () => {
    try {
     
      if(bookingId == null || bookingId ==""){
        setError("Booking id is required!")
        return;
      }

      if(userId == null || userId == ""){
        setError("user id is required!")
    return;
      }

    setLoading(true)


      const [bookingDetailsResult, userDetailsResult] = await Promise.all([
        getBookingDetails(userId!, bookingId!),
        getSingleUser(userId!)
      ])

      console.log({
        bookingDetailsResult,
        userDetailsResult
      })

      if (bookingDetailsResult.error) {
        setError(bookingDetailsResult.error)
      } else {
        setBookingData(bookingDetailsResult.data)
      }

      if (userDetailsResult.error) {
        setError(userDetailsResult.error)
      } else {
        setUserData(userDetailsResult.data)
      }
    } catch (err) {
      console.log({ err })
      setError('An error occurred while fetching booking data.')
    } finally {
      setLoading(false)
    }
  }, [bookingId])

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails()
    }
  }, [bookingId, fetchBookingDetails])

  if (loading) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <div className='flex flex-col items-center justify-center'>
          <Loader2 size={28} className='animate-spin' />
          <p>Loading Booking Details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <p className='text-red-500'>{error}</p>
      </div>
    )
  }

  if (!bookingData || !userData?.id) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <p className='text-red-500'>No Booking data found.</p>
      </div>
    )
  }

  return (
    <div className='p-6 md:p-8 min-h-screen bg-white dark:bg-black'>
      <h1 className='text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100'>
        <div className='flex items-center gap-x-2'>
          <button
            onClick={() => router.back()}
            className='flex items-center gap-2 text-gray-800 dark:text-gray-100'
          >
            <ArrowLeft size={24} />
          </button>
          <span>Booking Details</span>
        </div>
      </h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mb-8'>
        <InfoBlock
          title='Vehicle Information'
          data={{
            Make: bookingData?.vehicle?.make,
            Model: bookingData?.vehicle?.model,
            Year: bookingData?.vehicle?.year,
            VIN: bookingData?.vehicle?.vehicle_identification_number
          }}
        />

        <InfoBlock
          title='Booking Information'
          data={{
            'Start Date': bookingData?.start_date,
            'End Date': bookingData?.end_date,
            'Client Name': bookingData?.client_name,
            'Client Address': bookingData?.client_address,
            'Client Phone Number': bookingData?.client_phone_number,
            'Driver Name': bookingData?.driver?.name,
            VIN: bookingData.vehicle.vehicle_identification_number
          }}
        />

        <InfoBlock
          title='Associated Driver'
          data={{
            Name: userData?.name,
            Email: userData?.email,
            Phone: userData?.phone_number,
            City: userData?.city,
            Address: userData?.address
          }}
        />
      </div>

      {/* SUMMARY! */}
      <div className='bg-gray-200 dark:bg-[#18181b] p-6 rounded-3xl shadow-custom-black dark:shadow-custom-white border border-black dark:border-white'>
        <h2 className='text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200'>
          Booking Summary
        </h2>
        <div>
          <p className='text-gray-600 dark:text-gray-300'>
            <span className='font-medium'>Driver Name:</span>{' '}
            <span className={``}>{bookingData?.driver?.name}</span>
          </p>

          <p className='text-gray-600 dark:text-gray-300'>
            <span className='font-medium'>Total Number of Days:</span>{' '}
            <span className={``}>
              {daysDifference(bookingData?.start_date, bookingData?.end_date)}{' '}
              day
              {daysDifference(bookingData?.start_date, bookingData?.end_date) >
                1 && 's'}
            </span>
          </p>

          <p className='text-gray-600 dark:text-gray-300'>
            <span className='font-medium'>Vehicle Identification Number:</span>{' '}
            <span className={``}>
              {bookingData?.vehicle?.vehicle_identification_number}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
