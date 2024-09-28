import dbConnect from "@/lib/mongodb";
import { Product } from "@/model/product-model";

export const getAllProducts = async () => {
  await dbConnect();
  const products = await Product.find({});
  return products;
};

export const getNewArrivals = async () => {
  await dbConnect();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const query = {
    // createdAt: { $gte: thirtyDaysAgo }, // Products added in the last 30 days
    views: { $gte: 500 }, // Products with at least 500 views
    salesVolume: { $gte: 10 }, // Products with at least 10 sales
    addToCartCount: { $gte: 5 }, // Products added to the cart at least 5 times
    totalTimeSpent: { $gte: 2000 }, // Products with a total of 2000 seconds spent on the page
    isTrending: true, // Filter only trending products
    // isFeatured: true, // Only featured products
    quickSalesFlag: true, // Products that had quick sales
  };

  const newArrivals = await Product.find(query)
    .sort({ createdAt: -1 })
    .limit(10);
  return newArrivals;
};
