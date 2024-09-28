export interface IProduct {
  name: string;
  brand: string;
  SKU: string;
  price: number;
  salePrice: number;
  category: string;
  colors: string[]; // Array of color options for the product
  stock: number;
  ratings: number; // Average rating of the product
  reviewCount: number; // Number of reviews the product has received
  views: number; // How many times the product page has been viewed
  salesVolume: number; // Number of sales
  addToCartCount: number; // Number of times the product was added to the cart
  totalTimeSpent: number; // Total time users have spent on the product page
  isTrending: boolean; // Flag to determine if the product is trending
  isFeatured: boolean; // Flag to indicate if the product is featured or promoted
  isUnique: boolean; // Flag for unique or seasonal products
  quickSalesFlag: boolean; // Flag for products that sold quickly
  images: string[]; // Array of image URLs
  createdAt?: Date; // Auto-generated by Mongoose
  updatedAt?: Date; // Auto-generated by Mongoose
}
