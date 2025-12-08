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

// export interface CandyResponse {
//   status: string;
//   data: CandyData;
// }

export interface CandyDataID {
  id: number;
  name: string;
  description: string;
  price: number;
  on_sale: boolean;
  images: {
    thumbnail: string;
    large: string;
  };
  stock_status: string;
  stock_quantity: number;
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
}

// export interface CandyResponseID {
//   status: string;
//   data: CandyDataID;
// }

// /////// Checkout Request/Response 

// interface CheckoutItems {
//   id?: number; 
//   order_id?: number; 
//   product_id: number; 
//   qty: number; 
//   item_price: number; 
//   item_total?: number; 
// }

// export interface CheckoutData {
//   id?: number; 
//   user_id?: number;
//   order_date?: string;
//   customer_first_name: string; 
//   customer_last_name: string; 
//   customer_address: string; 
//   customer_postcode: string; 
//   customer_city: string; 
//   customer_email: string; 
//   customer_phone?: string; 
//   order_total: number; 
//   created_at?: number;
//   updated_at?: number; 
//   order_items?: CheckoutItems[]; // request
//   items?: CheckoutItems[]; // response
// }

// export interface OrderResponse{
//   status: string;
//   data:CheckoutData;

// }

// export interface Cart{

//   products?: CandyData[];
//   total_price?: number; 
// } 

