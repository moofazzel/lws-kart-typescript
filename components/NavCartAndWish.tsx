"use client";

import { useCartWishlist } from "@/context/CartWishlistProvider";
import Link from "next/link";

const NavCartAndWish = () => {
  const { wishlistItems } = useCartWishlist();

  // Fallback to an empty array if wishlistItems is undefined
  const wishlistCount = wishlistItems ? wishlistItems.length : 0;
  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/wishlist"
        className="text-center text-gray-700 hover:text-primary transition relative"
      >
        <div className="text-2xl">
          <i className="fa-regular fa-heart"></i>
        </div>

        <div className="text-xs leading-3">Wishlist</div>
        {/* Wishlist badge */}
        <div className="absolute -right-4 -top-3  w-4 h-4 rounded-full flex items-center justify-center bg-primary text-white text-xs">
          {wishlistCount}
        </div>
      </Link>
      <Link
        href="/cart"
        className="text-center text-gray-700 hover:text-primary transition relative"
      >
        <div className="text-2xl">
          <i className="fa-solid fa-bag-shopping"></i>
        </div>
        <div className="text-xs leading-3">Cart</div>
        {/* cart badge */}
        <div className="absolute -right-4 -top-3  w-4 h-4 rounded-full flex items-center justify-center bg-primary text-white text-xs">
          0
        </div>
      </Link>
    </div>
  );
};

export default NavCartAndWish;
