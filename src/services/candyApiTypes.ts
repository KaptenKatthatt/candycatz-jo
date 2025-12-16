export interface AddressData {
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_postcode: string;
  customer_city: string;
  customer_email: string;
  customer_phone?: string;
}

export interface CandyData {
  id: number;
  name: string;
  price: number;
  on_sale: boolean;
  images: {
    thumbnail: string;
  };
  stock_status: string;
  stock_quantity: number;
}

export interface CartProduct {
  id: number;
  name: string;
  qty: number;
  price: number;
  thumbnail: string;
  stock_quantity: number;
  on_sale: boolean;
}

export interface CheckoutData {
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_postcode: string;
  customer_city: string;
  customer_email: string;
  customer_phone?: string;
  order_total: number;
  order_items: OrderItems[];
}

export interface OrderItems {
  product_id: number;
  qty: number;
  item_price: number;
  item_total: number;
}

export interface ResponseData {
  status: string;
  data: {
    created_at: string;
    customer_address: string;
    customer_city: string;
    customer_email: string;
    customer_first_name: string;
    customer_last_name: string;
    customer_phone?: string;
    customer_postcode: string;
    id: number;
    items: {
      id: number;
      item_price: number;
      item_total: number;
      order_id: number;
      product_id: number;
      qty: number;
    }[];
    order_date: string;
    order_total: string;
    updated_at: string;
    user_id: number;
  };
}
