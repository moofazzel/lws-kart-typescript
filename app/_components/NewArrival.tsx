import { getNewArrivals } from "@/queries/queryProducts";
import { formatCurrency } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import StarRating from "./StarRating";

export default async function NewArrival() {
  const newArrivalProducts = await getNewArrivals();

  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        top new arrival
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {newArrivalProducts.map((product) => {
          return (
            <div
              key={product.id}
              className="bg-white shadow rounded overflow-hidden group"
            >
              <div className="relative">
                <Image
                  width={300}
                  height={300}
                  src={product.images[0]}
                  alt="product 1"
                  className="w-full"
                />
                <div
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                >
                  <Link
                    href="#"
                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                    title="view product"
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </Link>
                  <Link
                    href="#"
                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                    title="add to wishlist"
                  >
                    <i className="fa-solid fa-heart"></i>
                  </Link>
                </div>
              </div>
              <div className="pt-4 pb-3 px-4">
                <Link href="/id">
                  <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                    {product.name}
                  </h4>
                </Link>
                <div className="flex items-baseline mb-1 space-x-2">
                  <p className="text-xl text-primary font-semibold">
                    {formatCurrency(product?.price)}
                  </p>
                  <p className="text-sm text-gray-400 line-through">
                    {formatCurrency(product?.salePrice)}
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
        })}
      </div>
    </div>
  );
}
