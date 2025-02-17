export interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  discountPercentage: number;
  description: string;
  stock: number;
  tags: string[];
  thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
