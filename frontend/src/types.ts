// src/types.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  discount_price: number | null;
  rating: number;
  reviews_count: number;
}
