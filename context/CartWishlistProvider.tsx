"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import toast from "react-hot-toast";

// Cart and Wishlist item types
interface CartItem {
  productId: string;
  quantity: number;
}

interface WishlistItem {
  productId: string;
}

// Combined context type
interface CartWishlistContextType {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
}

// Create the context
const CartWishlistContext = createContext<CartWishlistContextType | undefined>(
  undefined
);

export const CartWishlistProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
    // Optionally, synchronize with the server here
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );
    // Optionally, synchronize with the server here
  };

  const addToWishlist = (item: WishlistItem) => {
    const isAlreadyInWishlist = wishlistItems.some(
      (wishlistItem) => wishlistItem.productId === item.productId
    );

    if (isAlreadyInWishlist) {
      toast.error("Product already in wishlist");
      return;
    }

    setWishlistItems((prevItems) => [...prevItems, item]);
    // Optionally, synchronize with the server here

    toast.success("Product added to wishlist");
  };

  const removeFromWishlist = (productId: string) => {
    console.log("🚀 ~ productId:", productId);
    setWishlistItems((prevItems) => {
      console.log("🚀 ~ prevItems:", prevItems);
      return prevItems.filter((item) => item.productId !== productId);
    });

    // Optionally, synchronize with the server here

    toast.success("Product removed from wishlist");
  };

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

// Hook to use the context
export const useCartWishlist = (): CartWishlistContextType => {
  const context = useContext(CartWishlistContext);
  if (!context) {
    throw new Error(
      "useCartWishlist must be used within a CartWishlistProvider"
    );
  }
  return context;
};
