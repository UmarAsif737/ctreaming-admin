// FORMS

export type LoginFormType = {
  email: string
  password: string
}
export type SignUpFormType = {
  email: string
  password: string
  full_name: string
}

export interface IUser {
  is_document_assistance_enabled: unknown
  id: string
  email: string
  full_name: string
  password: string
  type: 'admin' | 'user'
  vehicles: string[]
  drivers: string[]
  createdAt: string
  poc: Object | any | null
  poc_id: number | string | null
}

export interface IRenewalRequest {
  id: string
  status: string
  vehicle_document: {
    issue_date: string
    type: string
    document: string
    vehicle: {
      id: string
      vehicle_identification_number: string
      user: {
        name: string
        email: string
        type: string
      }
    }
  }

  type: string
  createdAt: string
}

export interface IDriverRenwal {
  id: string
  status: string
  driver_document: {
    issue_date: string
    type: string
    document: string
    driver: {
      name: string
      id: string
      user: {
        email: string
      }
    }
  }
  type: string
  createdAt: string
}

export interface IContactForm {
  id: string
  email: string
  name: string
  is_read: boolean
  message: string
}

export interface IAdmin {
  username: string
  name: string
  email: string
  password: string
  type: 'admin' | 'user'
}
export interface IProduct {
  _id?: string // The unique identifier for the product, optional for creation
  productCode: string // The unique code for the product, combining name, style, and color
  productName: string // The name of the product
  styleCode: string // The style code for the product
  colorCode: string // The color code of the product
  colorDescription: string // A description of the color
  collection?: string // The collection type, either Spring/Summer (SS) or Autumn/Winter (AW)
  productCollection?: string // The collection type, either Spring/Summer (SS) or Autumn/Winter (AW)
  notes?: string
  images?: any
  // Any additional notes or comments about the product
  status: 'draft' | 'picture-uploaded' | 'approved' | 'revision' // The status of the product
  createdAt?: string // The date the product was created, optional for creation
  updatedAt?: string // The date the product was last updated, optional for creation
}

export interface IColumn {
  name: string
  uid: string
}

export interface IBrand {
  name: string
  _id: string
}
export interface IEvent {
  _id?: string
  name: string
  date: string
  location: string
  description?: string
}
export interface IQuality {
  _id?: string
  name: string
  createdAt?: string
  updatedAt?: string
}

export interface Result<T> {
  is_read?: boolean | undefined
  data?: T
  error?: string
  meta?: IMeta
}

export interface IMeta {
  current_page: number
  page_items: number
  total_items: number
  total_pages: number
}

export interface ICustomer {
  _id?: string
  name: string
  email: string
  phone?: string
  createdAt?: string
  updatedAt?: string
}

export interface IOrder {
  _id?: string
  day_id?: number
  orderDate?: any
  event?: IEvent
  products: Array<{
    product?: IProduct
    customSize?: string
    quantity: number
    price: number
  }>
  status?: 'delivered' | 'in-process' | 'order-placed' | 'ready-to-go'
  seller?: IUser // Reference to the Seller (User)
  customer?: ICustomer // Reference to the Customer
  orderDiscount?: number // Discount percentage
  totalPrice?: number // Virtual field for total price
  receipts?: {
    clientReceipt: string
    internalReceipt: string
  } // Virtual field for receipts
  createdAt?: string // Timestamp for when the order was created
  updatedAt?: string // Timestamp for when the order was last updated
}

export interface IVehicle {
  id: string
  make: string
  model: string
  year: string
  createdAt: string
  vehicle_identification_number: string
  actions: string
}

export interface IDriver {
  id: string
  name: string
  license_number: string
  phone_number: string
  createdAt: string
}

export interface VehicleDocument {
  id: number
  type: string
  document: string
  issue_date: string
  expiry_date: string
  is_reminder_set: boolean
  is_being_renewed: boolean
}

export interface Vehicle {
  id: number
  make: string
  model: string
  year: string
  vehicle_identification_number: string
  vehicle_documents: VehicleDocument[]
}

export interface Driver {
  id: number
  name: string
  license_number: string
  phone_number: string
  createdAt: string
}

export interface UserData {
  id?: number
  name?: string
  email?: string
  type?: 'individual' | 'company'
  phone_number?: string
  city?: string
  address?: string
  reminder_preference?: string
  is_document_assistance_enabled?: boolean
  reminder_period?: number
  get_renewal_updates_via_whatapp?: boolean
  completed_onboarding_steps?: number
  createdAt?: string
  updatedAt?: string
  vehicles?: Vehicle[]
  drivers?: Driver[]
}
