"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface cartItem {
  productId: string;
  quantity: number;
}

interface wishlistItem {
  productId: string;
}

interface CartWishlistContextType {
  cartItems: cartItem[];
  wishlistItems: wishlistItem[];
  addToCart: (item: cartItem) => void;
  removeFromCart: (productId: string) => void;
  addToWishlist: (item: wishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
}

const CartWishlistContext = createContext<CartWishlistContextType | undefined>(
  undefined
);

export const CartWishlistProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<cartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<wishlistItem[]>([]);

  const addToCart = (item: cartItem) => {};

  const removeFromCart = (productId: string) => {};

  const addToWishlist = (item: wishlistItem) => {};

  const removeFromWishlist = (productId: string) => {};

  return (
    <CartWishlistContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};
export const useCartWishlist = (): CartWishlistContextType => {
  const context = useContext(CartWishlistContext);

  if (!context) {
    throw new Error(
      "useCartWishlist must be used within a CartWishlistProvider"
    );
  }

  return context;
};
