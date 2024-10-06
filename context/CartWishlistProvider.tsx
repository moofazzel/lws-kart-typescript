"use client";

import { addToWishListActions } from "@/actions/WishListActons";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

// Cart and Wishlist item types
interface CartItem {
  productId: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  name: string;
  salePrice: number;
  images: string[];
  stock: number;
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

  // Load wishlist from localStorage when the component mounts
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

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

  const addToWishlist = async (item: WishlistItem) => {
    const isAlreadyInWishlist = wishlistItems.some(
      (wishlistItem) => wishlistItem.productId === item.productId
    );

    if (isAlreadyInWishlist) {
      toast.error("Product already in wishlist");
      return;
    }

    // Optimistically add to the local state
    setWishlistItems((prevItems) => {
      const updatedWishlist = [...prevItems, item];
      // Save to localStorage
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });

    try {
      const res = await addToWishListActions(item.productId); // Server-side action

      if (res.success) {
        toast.success(res.message);
      } else {
        // Rollback if there's a server error
        setWishlistItems((prevItems) =>
          prevItems.filter(
            (wishlistItem) => wishlistItem.productId !== item.productId
          )
        );
        localStorage.setItem("wishlist", JSON.stringify(wishlistItems)); // Sync rollback
        toast.error(res.message);
      }
    } catch (error) {
      setWishlistItems((prevItems) =>
        prevItems.filter(
          (wishlistItem) => wishlistItem.productId !== item.productId
        )
      );
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems)); // Sync rollback
      toast.error("Failed to add product to wishlist");
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prevItems) => {
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
