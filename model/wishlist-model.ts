import { Schema, Types, model, models } from "mongoose";

export interface IWishlistItem {
  productId: Types.ObjectId | string;
  userId: Types.ObjectId | string;
}

const wishlistSchema = new Schema<IWishlistItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Wishlist =
  models.Wishlist ?? model<IWishlistItem>("Wishlist", wishlistSchema);

export default Wishlist;
