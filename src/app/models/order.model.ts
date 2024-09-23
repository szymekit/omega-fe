export interface Address {
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  apartmentNumber?: string;
  postalCode: string;
  city: string;
}

export type PaymentType = 'Cash' | 'Card' | 'Transfer' | 'BLIK';
export type DeliveryType = 'Courier' | 'Personal Pickup' | 'Service Point Pickup';

export interface Order {
  paymentType: PaymentType;
  deliveryType: DeliveryType;
  deliveryDate: string;
  deliveryAddress: Address;
  users: Address[];
}

