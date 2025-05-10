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
import { editPOC } from '@/actions/poc-actions'
import { toast } from 'sonner'
import { UserRoundPen } from 'lucide-react'

type Props = {
  data?: any
}

const EditPoc = ({ data }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState(data?.name || '')
  const [phone_number, setPhoneNumber] = useState(data?.phone_number || '')
  const [picture, setPicture] = useState(data?.image || null)

  const handleUpdate = async () => {
    try {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('phone_number', phone_number)

      if (picture) {
        console.log('changed')
        formData.append('image', picture)
      }

      await toast.promise(
        editPOC(data?.id, formData),
        {
          loading: 'Updating POC...',
          success: 'POC has been updated successfully!',
          error: 'Error updating POC.'
        }
      )


      onClose()
    } catch (error) {
      console.error('Error updating POC:', error)
    }
  }

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setPicture(file)
    }
  }

  return (
    <div>
      <button onClick={onOpen}>
        <UserRoundPen size={20} color='#4F9240FF' />
      </button>

      <Modal isOpen={isOpen} onClose={onClose} placement='top-center'>
        <ModalContent>
          <ModalHeader>Edit POC Details</ModalHeader>
          <ModalBody>
            <div className='flex items-center w-full justify-center'>
              <div className='h-32 w-32 bg-green-200 rounded-full relative overflow-hidden'>
                <img
                  src={
                    data?.image ||
                    (picture && URL?.createObjectURL(picture)) ||
                    '/default-user.jpg'
                  }
                  alt={picture?.name || data?.image}
                  className='w-full h-full rounded-full object-cover'
                />
                <label htmlFor='edit'>
                  <input
                    id='edit'
                    type='file'
                    className='hidden'
                    accept='image/jpeg, image/png, image/jpg, image/webp'
                    onChange={handlePictureChange}
                  />
                  <div className='absolute bottom-0 right-0 bg-gray-200 text-black text-xs font-semibold py-2   w-full text-center rounded-full cursor-pointer'>
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
            <Button color='primary' onPress={handleUpdate}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default EditPoc
