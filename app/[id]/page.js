import { getProductDetailsById } from "@/queries/queryProducts";
import { formatCurrency } from "@/utils";
import StarRating from "../_components/StarRating";
import RelatedProducts from "./_components/RelatedProducts";
import ShowProductImage from "./_components/ShowProductImage";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import ProductAction from "./_components/ProductAction";

export default async function ProductDetails({ params: { id } }) {
  const productDetails = await getProductDetailsById(id);

  return (
    <section>
      {/* Breadcrumb */}
      <div className="container py-4 flex items-center gap-3">
        <a href="../index.html" className="text-primary text-base">
          <i className="fa-solid fa-house"></i>
        </a>
        <span className="text-sm text-gray-400">
          <i className="fa-solid fa-chevron-right"></i>
        </span>
        <p className="text-gray-600 font-medium">Product</p>
      </div>
      {/* Product Details */}
      <div className="container grid grid-cols-2 gap-6">
        <ShowProductImage productImages={productDetails?.images} />

        <div>
          <h2 className="text-3xl font-medium uppercase mb-2">
            {productDetails.name}
          </h2>
          <div className="flex items-center mb-4">
            <StarRating rating={productDetails.ratings} />
            <div className="text-xs text-gray-500 ml-3">
              ({productDetails.reviewCount} Reviews)
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-800 font-semibold space-x-2">
              <span>Availability: </span>
              <span className="text-green-600">
                {productDetails.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Brand: </span>
              <span className="text-gray-600">{productDetails.brand}</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Category: </span>
              <span className="text-gray-600">{productDetails.category}</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">SKU: </span>
              <span className="text-gray-600">{productDetails.SKU}</span>
            </p>
          </div>
          <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
            <p className="text-xl text-primary font-semibold">
              {formatCurrency(productDetails.salePrice)}
            </p>
            <p className="text-base text-gray-400 line-through">
              {" "}
              {formatCurrency(productDetails.price)}
            </p>
          </div>

          <p className="mt-4 text-gray-600">{productDetails.description}</p>

          <ProductAction productDetails={productDetails} />

          {/* social share */}
          <div className="flex gap-3 mt-4">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="container pb-16 pt-5">
        <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
          Product details
        </h3>
        <div className="w-3/5 pt-6">
          <div className="text-gray-600">{productDetails.description}</div>
        </div>
      </div>
      {/* related product */}
      <RelatedProducts />
    </section>
  );
}
