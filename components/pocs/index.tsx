'use client'

import React, { useState } from 'react'
import { Input } from '@heroui/react'
import { TableWrapper } from '@/components/table/table'
import { IMeta } from '@/helpers/types'
import { RenderCell } from './render-cell'
import { Loader2 } from 'lucide-react'
import AddPoc from './add-poc-modal'

export const POCS = ({
  data,
  meta,
  loading,
  onSearch,
  refreshData
}: {
  data: any,
  meta: IMeta,
  loading: boolean,
  onSearch: (term: string) => void,
  refreshData:()=>void
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term)
  }

  const columns = [
    { name: 'Name', uid: 'name' },
    { name: 'Phone Number', uid: 'phone_number' },
    { name: 'ACTIONS', uid: 'actions' }
  ]

  return (
    <div className='my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4'>
      <div className='flex justify-between flex-wrap gap-4 items-center'>
        <div className='flex items-center gap-3 flex-wrap md:flex-nowrap'>
          <h3 className='text-xl font-semibold'>{'All Point Of Contacts'}</h3>
        </div>
        <div className='flex gap-x-4'>
          <AddPoc refreshData={refreshData}/>
          <div className='flex flex-wrap gap-4 items-center mb-4'>
            <Input
              placeholder='Search by name...'
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: '100%', maxWidth: '300px' }}
            />
          </div>
        </div>
      </div>

      <div className='max-w-[95rem] mx-auto w-full'>
        {loading ? (
          <div className='h-full w-full mt-10 flex flex-col justify-center items-center'>
            <Loader2 className='h-6 w-6 animate-spin' />
            <p>Loading...</p>
          </div>
        ) : (
          <TableWrapper
            meta={meta}
            RenderCell={RenderCell}
            data={data}
            columns={columns}
          />
        )}
      </div>
    </div>
  )
}
