'use client'
import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Input
} from '@heroui/react'
import { createPOC } from '@/actions/poc-actions'
import { toast } from 'sonner'


type Props = {
  refreshData: () => void
}

const AddPoc = ({refreshData}:Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState('')
  const [phone_number, setPhoneNumber] = useState('')
  const [picture, setPicture] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = async () => {
    setIsLoading(true)
    try {
      if (!name || !phone_number) {
        toast.error('Please fill all details')
      }

      const formData = new FormData()
      formData.append('name', name)
      formData.append('phone_number', phone_number)

      if (picture) {
        formData.append('image', picture)
      }

      const result = await createPOC(formData)
      if (result.error) {
        throw new Error(result.error)
      }

      toast.success('POC created successfully!')
      setName('')
      setPhoneNumber('')
      setPicture(null)
      refreshData()
      onClose()
    } catch (error) {
      console.error('Error creating POC:', error)
      toast.error('Error creating POC.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPicture(e.target.files[0])
    }
  }

  return (
    <div>
      <Button onPress={onOpen}>Add New Poc</Button>

      <Modal isOpen={isOpen} onClose={onClose} placement='top-center'>
        <ModalContent>
          <ModalHeader>Add POC Details</ModalHeader>
          <ModalBody>
            <div className='flex items-center w-full justify-center'>
              <div className='h-32 w-32 bg-green-200 rounded-full relative overflow-hidden'>
                <img
                  src={
                    (picture && URL.createObjectURL(picture)) ||
                    '/default-user.jpg'
                  }
                  alt={picture?.name || 'Default'}
                  className='w-full h-full rounded-full object-cover'
                />
                <label htmlFor='add'>
                  <input
                    id='add'
                    type='file'
                    className='hidden'
                    accept='image/jpeg, image/png, image/jpg, image/webp'
                    onChange={handlePictureChange}
                  />
                  <div className='absolute bottom-0 right-0 bg-gray-200 text-black text-xs font-semibold py-2 w-full text-center rounded-full cursor-pointer'>
                    Change
                  </div>
                </label>
              </div>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700'>Name:</label>
              <Input
                placeholder='Enter POC Name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Phone Number:</label>
              <Input
                placeholder='Enter Phone Number'
                value={phone_number}
                onChange={e => setPhoneNumber(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='default' variant='flat' onPress={onClose}>
              Close
            </Button>
            <Button
              color='primary'
              onPress={handleCreate}
              isDisabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default AddPoc
