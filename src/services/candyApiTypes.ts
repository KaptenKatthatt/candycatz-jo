export interface CandyData {
  status: string;
  data: {
    id: number;
    name: string;
    price: number;
    on_sale: boolean;
    images: {
      thumbnail: string;
    };
    stock_status: string;
    stock_quantity: number;
  };
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

export interface CandyResponseID {
  status: string;
  data: CandyDataID;
}
