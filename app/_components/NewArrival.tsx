import { getNewArrivals } from "@/queries/queryProducts";
import { ProductItem } from "./ProductItem";

export default async function NewArrival() {
  const newArrivalProducts = await getNewArrivals();
  console.log("🚀 ~ newArrivalProducts:", newArrivalProducts);

  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        top new arrival
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {newArrivalProducts.map((product) => {
          return (
            <ProductItem key={product._id as string} product={product as any} />
          );
        })}
      </div>
    </div>
  );
}
