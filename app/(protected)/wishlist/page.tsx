"use client";

import { useCartWishlist } from "@/context/CartWishlistProvider";
import { FaChevronRight, FaHouse } from "react-icons/fa6";
import WishlistItem from "../../(main)/_components/WishlistItem";

export default function WishlistPage() {
  const { wishlistItems } = useCartWishlist();
  return (
    <section>
      <div className="container py-4 flex items-center gap-3">
        <a href="/" className="text-primary text-base">
          <FaHouse />
        </a>
        <span className="text-sm text-gray-400">
          <FaChevronRight />
        </span>
        <p className="text-gray-600 font-medium">Profile</p>
      </div>

      <div className="container gap-6 pt-4 pb-16">
        {/* <!-- wishlist --> */}
        <div className="mx-auto space-y-4 max-w-6xl">
          {wishlistItems?.length > 0 ? (
            wishlistItems.map((product) => (
              <WishlistItem key={product.productId} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500 font-medium">
              No items in wishlist
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
