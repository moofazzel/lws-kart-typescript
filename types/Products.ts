import { IProduct } from "./models/IProduct";

export interface ProductItemProps {
  product: IProduct;
}

// Define the LeanProduct type
export interface LeanProduct {
  _id: string;
  id: string;
  name: string;
  price: number;
  salePrice: number;
  images: string[];
  ratings: number;
  reviewCount: number;
}

export interface IProductDetails {}
