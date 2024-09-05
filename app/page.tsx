import Banner from "@/app/_components/Banner";
import Features from "@/app/_components/Features";
import Navbar from "@/components/Navbar";
import Categories from "./_components/Categories";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Banner />
      <Features />
      <Categories />
    </main>
  );
}
