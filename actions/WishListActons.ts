"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import Wishlist from "@/model/wishlist-model";

export const addToWishListActions = async (productId: string) => {
  await dbConnect();

  // Authenticate the user
  const session = await auth();
  if (!session || !session.user) {
    return { status: 401, success: false, message: "User not authenticated" };
  }

  try {
    // Check if the product is already in the user's wishlist
    const existingWishlistItem = await Wishlist.findOne({
      productId,
      userId: session.user.id,
    });

    if (existingWishlistItem) {
      return {
        status: 400,
        success: false,
        message: "Product already in wishlist",
      };
    }

    // Add product to the wishlist
    const newWishlistItem = await Wishlist.create({
      productId,
      userId: session.user.id,
    });

    return {
      status: 201,
      success: true,
      message: "Product added to wishlist",
      wishlistItem: newWishlistItem,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: "Error adding product to wishlist",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
