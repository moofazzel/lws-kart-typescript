import { LeanProduct } from "@/types/Products";
import { formatCurrency } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";
import AddToWishListButton from "./AddToWishListButton";
import StarRating from "./StarRating";

interface ProductItemProps {
  product: LeanProduct;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  const serializedProducts = {
    ...product,
    _id: product._id.toString(),
  };
  return (
    <div className="bg-white shadow rounded overflow-hidden group">
      <div className="relative aspect-w-5 aspect-h-4 ">
        <Image
          width={300}
          height={300}
          src={product.images[0]}
          alt="product 1"
          className="object-cover w-full"
        />
        <div
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
        >
          <Link
            href={`/${product._id}`}
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="view product"
          >
            <FaMagnifyingGlass />
          </Link>
          <AddToWishListButton product={serializedProducts} isOnlyIcon={true} />
        </div>
      </div>
      <div className="pt-4 pb-3 px-4">
        <Link href={`/${product._id}`}>
          <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
            {product.name}
          </h4>
        </Link>
        <div className="flex items-baseline mb-1 space-x-2">
          <p className="text-xl text-primary font-semibold">
            {formatCurrency(product?.salePrice)}
          </p>
          <p className="text-sm text-gray-400 line-through">
            {formatCurrency(product?.price)}
          </p>
        </div>
        <div className="flex items-center">
          <StarRating rating={product.ratings} />
          <div className="text-xs text-gray-500 ml-3">
            ({product.reviewCount})
          </div>
        </div>
      </div>
      <Link
        href="#"
        className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
      >
        Add to cart
      </Link>
    </div>
  );
};
