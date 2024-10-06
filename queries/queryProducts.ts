import dbConnect from "@/lib/mongodb";
import { Product } from "@/model/product-model";
import { IProduct } from "@/types/models/IProduct";

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

  // Ensure TypeScript understands that this is an array of LeanProduct
  const newArrivals = await Product.find(query)
    .sort({ createdAt: -1 })
    .limit(10)
    .select("_id name price salePrice images ratings reviewCount")
    .lean()
    .exec();

  // Map through the array of products and ensure TypeScript knows the product structure
  const newArrivalsWithReqField = newArrivals.map((product) => ({
    ...product,
    images: product.images.length ? [product.images[0]] : [],
  }));

  // return replaceMongoIdInArray(newArrivalsWithReqField);
  return newArrivalsWithReqField;
};

export const getTrendingProducts = async () => {
  await dbConnect();

  const query = {
    isTrending: true, // Only include products flagged as trending
    views: { $gte: 1000 }, // Products with at least 1000 views
    salesVolume: { $gte: 50 }, // Products with at least 50 sales
  };

  const trendingProducts = await Product.find(query)
    .sort({ views: -1 }) // Sort by views in descending order (most popular first)
    .limit(20) // Limit to the top 20 trending products
    .select("_id name price salePrice images ratings reviewCount") // Select only required fields
    .lean() // Return plain JavaScript objects instead of Mongoose documents
    .exec();

  // Map through the results and replace _id with id
  return trendingProducts.map((product) => ({
    ...product,
    images: product.images.length ? [product.images[0]] : [],
  }));
};

export const getProductDetailsById = async (
  id: string
): Promise<IProduct | null> => {
  await dbConnect();

  const product = await Product.findById(id).lean();

  if (!product) return null;

  const serializedProduct = {
    ...product,
    _id: product._id.toString(),
    createdAt: product.createdAt?.toISOString(),
    updatedAt: product.updatedAt?.toISOString(),
  };

  return serializedProduct as IProduct;
};

export const getRelatedProducts = async (category: string, id: string) => {
  await dbConnect();

  const relatedProducts = (await Product.find({
    category,
    _id: { $ne: id },
  })
    .lean()
    .select(
      "_id name price salePrice images ratings reviewCount"
    )) as IProduct[];

  const serializedProducts = relatedProducts.map((product) => ({
    ...product,
    _id: product._id.toString(),
    images: product.images.length ? [product.images[0]] : [],
  }));

  return serializedProducts;
};
