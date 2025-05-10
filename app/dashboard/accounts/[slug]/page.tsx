'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import DriversCard from '@/components/accounts/user-details/all-drivers'
import VehiclesCard from '@/components/accounts/user-details/all-vehicles'
import ProfileCard from '@/components/accounts/user-details/profile-card'
import SummaryCard from '@/components/accounts/user-details/summar-card'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { getSingleUser } from '@/actions/user.action'
import Error from '@/components/error'
import BookingsCard from '@/components/accounts/user-details/all-bookings'

const UserDetailsPage = () => {
  const pathname = usePathname()
  const id = pathname.split('/').pop()
  console.log('🚀 ~ UserDetailsPage ~ id:', id)

  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      ;(async () => {
        try {
          const result = await getSingleUser(id)
          console.log({result})
          if (result.error) {
            setError(result.error)
          } else {
            setUserData(result.data)
          }
        } catch (err) {
          setError('An error occurred while fetching user details.')
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [id])

  if (loading) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <div className='flex flex-col items-center justify-center'>
          <Loader2 size={28} className='animate-spin' />
          <p>Loading User...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Error
        error={error || 'An error occurred while fetching user details.'}
      />
    )
  }

  if (!userData) {
    return <Error error={error || 'No user data found'} />
  }

  const latestVehicles = userData.vehicles.slice(0, 2)
  const latestDrivers = userData.drivers.slice(0, 2)
  const latestBookings = userData?.bookings?.slice(0, 2) || []


  return (
    <div className='p-6 md:p-8 min-h-screen bg-white dark:bg-black'>
      <h1 className='text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-left'>
        <p className='flex justify-start items-center gap-x-2'>
          <Link href={'/dashboard/accounts'}>
            <ArrowLeft size={24} />
          </Link>
          <span>User Details</span>
        </p>
      </h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 items-start'>
        <div className='lg:col-span-2'>
          <ProfileCard
            name={userData.name}
            email={userData.email}
            type={userData.type}
            phone={userData.phone_number}
            city={userData.city}
            address={userData.address}
          />
        </div>
        <div>
          <SummaryCard
            totalVehicles={userData.vehicles.length}
            totalDrivers={userData.drivers.length}
            reminderPreference={userData.reminder_preference}
            whatsappUpdates={userData.get_renewal_updates_via_whatapp}
            documentAssistance={userData.is_document_assistance_enabled}
            onboardingSteps={userData.completed_onboarding_steps}
            reminderPeriod={userData.reminder_period}
            isCompany={userData.type === 'company'}
            totalBookings={userData?.bookings?.length || 0}
          />
        </div>
      </div>

      <VehiclesCard vehicles={latestVehicles} userId={userData.id} />

      {userData.type === 'company' && (
        <DriversCard drivers={latestDrivers} userId={userData.id} />
      )}

      {/* BOOKINGS CARD! */}
      <BookingsCard
        bookings={userData?.bookings?.length > 0 ? latestBookings : [{}, {}]}
        userId={userData?.id || 0}
      />
    </div>
  )
}

export default UserDetailsPage
