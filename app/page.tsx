import Banner from "@/app/_components/Banner";
import Features from "@/app/_components/Features";
import Ads from "./_components/Ads";
import Categories from "./_components/Categories";
import NewArrival from "./_components/NewArrival";
import Product from "./_components/Product";

export default function Home() {
  console.log("🚀 ~ file: page.tsx:Home");

  return (
    <main>
      <Banner />
      <Features />
      <Categories />
      <NewArrival />
      <Ads />
      <Product />
    </main>
  );
}
