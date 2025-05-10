import React from 'react'

interface SummaryCardProps {
  totalVehicles: number;
  totalDrivers: number;
  reminderPreference: string;
  whatsappUpdates: boolean;
  documentAssistance: boolean;
  onboardingSteps: number;
  reminderPeriod: number;
  isCompany: boolean;
  totalBookings: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  totalVehicles,
  totalDrivers,
  reminderPreference,
  whatsappUpdates,
  documentAssistance,
  onboardingSteps,
  reminderPeriod,
  isCompany,
  totalBookings
}) => {
  return (
    <div className='bg-gradient-to-br from-blue-400 to-indigo-400 text-white p-6 rounded-3xl shadow-md border border-gray-200 dark:border-gray-800'>
      <h2 className='text-2xl font-medium mb-4'>Summary</h2>
      <div className='space-y-1'>
        <div className='flex items-center justify-between'>
          <span className='text-md font-medium'>Total Vehicles</span>
          <span className='text-xl font-bold'>{totalVehicles}</span>
        </div>
        {isCompany && (
          <div className='flex items-center justify-between'>
            <span className='text-md font-medium'>Total Drivers</span>
            <span className='text-xl font-bold'>{totalDrivers}</span>
          </div>
        )}
        <div className='flex items-center justify-between'>
          <span className='text-md font-medium'>Total Bookings</span>
          <span className='text-xl font-bold'>{totalBookings}</span>
        </div>
        <div className='space-y-1 border-t border-white pt-4 text-sm'>
          <div className='flex items-center justify-between'>
            <span>Reminder Preference</span>
            <span>{reminderPreference}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span>WhatsApp Updates</span>
            <span>{whatsappUpdates ? 'Enabled' : 'Disabled'}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span>Document Assistance</span>
            <span>{documentAssistance ? 'Enabled' : 'Disabled'}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span>Onboarding Steps</span>
            <span>{onboardingSteps}/5</span>
          </div>
          <div className='flex items-center justify-between'>
            <span>Reminder Period</span>
            <span>{reminderPeriod} days</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard
