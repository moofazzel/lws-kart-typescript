"use client";

import Image from "next/image";
import { useState } from "react";

const ShowProductImage = ({ productImages }) => {
  const [image, setImage] = useState(productImages[0]);

  const handleSetImage = (image) => {
    setImage(image);
  };
  return (
    <div>
      <div className="aspect-w-5 aspect-h-3">
        <Image
          width={600}
          height={600}
          src={image}
          alt="product"
          className="w-fullf object-cover "
        />
      </div>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {productImages.map((image) => {
          return (
            <div className="w-[140px] h-[100px]" key={image}>
              <Image
                onClick={() => handleSetImage(image)}
                width={600}
                height={600}
                src={image}
                alt="product2"
                className="w-full h-full object-cover cursor-pointer hover:scale-105 border border-gray-200 hover:border-primary transition-all "
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowProductImage;
