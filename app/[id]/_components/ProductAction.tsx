"use client";

import { IProduct } from "@/types/models/IProduct";
import { useState } from "react";

const ProductAction = ({ productDetails }: { productDetails: IProduct }) => {
  const [quantity, setQuantity] = useState(1);

  // Increment quantity
  const increaseQuantity = () => {
    if (quantity < productDetails.stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  // Decrement quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <>
      <div className="mt-4">
        <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
        <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
          <div
            className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
            onClick={decreaseQuantity}
          >
            -
          </div>
          <div className="h-8 w-8 text-base flex items-center justify-center">
            {quantity}
          </div>
          <div
            className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
            onClick={increaseQuantity}
          >
            +
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
        <a
          href="#"
          className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
        >
          <i className="fa-solid fa-bag-shopping"></i> Add to cart
        </a>
        <a
          href="#"
          className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
        >
          <i className="fa-solid fa-heart"></i> Wishlist
        </a>
      </div>
    </>
  );
};

export default ProductAction;
