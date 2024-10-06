import { ProductItem } from "@/app/_components/ProductItem";
import { LeanProduct } from "@/types/Products";

interface RelatedProductsProps {
  relatedProducts: LeanProduct[];
}

export default function RelatedProducts({
  relatedProducts,
}: RelatedProductsProps) {
  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        Related products
      </h2>
      <div className="grid grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
