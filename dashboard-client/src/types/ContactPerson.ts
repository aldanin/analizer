import * as Prod from './Product'

export interface ContactPerson {
  id: Prod.ProductID,
  name: string,
  phoneHome: string,
  phoneWork: string,
  phoneMobile: string,
  email: string,
  address: {
    street: string,
    city: string,
    country?: string,
  },
  avatar: string,
}

export type ContactPersonId = Prod.ProductID;

export const defaultPerson = {
  id: -1,
  name: '',
  phoneHome: '',
  phoneWork: '',
  phoneMobile: '',
  email: '',
  address: {
    street: '',
    city: ''
  },
  photoUrl: '',
}
