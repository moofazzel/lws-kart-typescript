import { IProduct } from "@/types/models/IProduct";
import { model, models, Schema } from "mongoose";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
    },
    SKU: {
      type: String,
      required: true,
      unique: true,
    },

    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    colors: {
      type: [String],
    },
    stock: {
      type: Number,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    salesVolume: {
      type: Number,
      default: 0,
    },
    addToCartCount: {
      type: Number,
      default: 0,
    },
    totalTimeSpent: {
      type: Number,
      default: 0, // Track the time spent on the product page
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false, // If the product is featured/promoted
    },
    isUnique: {
      type: Boolean,
      default: false, // If it's a unique or seasonal product
    },
    quickSalesFlag: {
      type: Boolean,
      default: false, // Flag for quick sales
    },
    images: {
      type: [String], // Array of image URLs
      required: true,
    },
  },
  { timestamps: true }
);

export const Product =
  models.Product ?? model<IProduct>("Product", productSchema);
