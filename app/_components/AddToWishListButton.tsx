"use client";

import { useCartWishlist, WishlistItem } from "@/context/CartWishlistProvider";
import { FaHeart } from "react-icons/fa6";

const AddToWishListButton = ({ product, isOnlyIcon = false }) => {
  const { addToWishlist } = useCartWishlist();

  const wishlistProduct: WishlistItem = {
    productId: product._id,
    images: product.images,
    name: product.name,
    salePrice: product.salePrice,
    stock: product.stock,
  };

  return (
    <>
      {isOnlyIcon ? (
        <button
          onClick={() => addToWishlist(wishlistProduct)}
          className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
          title="add to wishlist"
        >
          <FaHeart />
        </button>
      ) : (
        <button
          onClick={() => addToWishlist(wishlistProduct)}
          className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
        >
          <FaHeart /> Wishlist
        </button>
      )}
    </>
  );
};

export default AddToWishListButton;
