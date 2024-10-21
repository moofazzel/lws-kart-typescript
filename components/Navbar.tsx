import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import Logo from "./Logo";
import NavCartAndWish from "./NavCartAndWish";
import { ServerLogout } from "./ServerLogout";

export default async function Navbar() {
  const session = await auth();
  console.log("🚀 ~ session:", session);
  return (
    <>
      <header className="py-4 shadow-sm bg-white">
        <div className="container flex items-center justify-between">
          <Logo />

          <div className="w-full max-w-xl relative flex">
            <span className="absolute left-4 top-4 text-lg text-gray-400">
              <IoIosSearch />
            </span>
            <input
              type="text"
              name="search"
              id="search"
              className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex "
              placeholder="search"
            />
            <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex justify-center items-center">
              Search
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Wishlist and Cart buttons */}
            <NavCartAndWish />

            <Link
              href="/account"
              className="text-center text-gray-700 hover:text-primary transition relative"
            >
              <div className="text-2xl">
                <i className="fa-regular fa-user"></i>
              </div>
              <div className="text-xs leading-3">Account</div>
            </Link>
          </div>
        </div>
      </header>

      <nav className="bg-gray-800">
        <div className="container flex">
          <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
            <span className="text-white">
              <i className="fa-solid fa-bars"></i>
            </span>
            <span className="capitalize ml-2 text-white hidden">
              All Categories
            </span>

            {/* <!-- dropdown --> */}
            <div
              className="absolute left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px]"
              style={{ width: "300px" }}
            >
              <Link
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <Image
                  width={300}
                  height={300}
                  src="/images/icons/sofa.svg"
                  alt="sofa"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Sofa</span>
              </Link>
              <Link
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <Image
                  width={300}
                  height={300}
                  src="/images/icons/terrace.svg"
                  alt="terrace"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Living Room</span>
              </Link>
              <Link
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <Image
                  width={300}
                  height={300}
                  src="/images/icons/bed.svg"
                  alt="bed"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Bedroom</span>
              </Link>
              <Link
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <Image
                  width={300}
                  height={300}
                  src="/images/icons/office.svg"
                  alt="Outdoor"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Outdoor</span>
              </Link>
              <Link
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <Image
                  width={300}
                  height={300}
                  src="/images/icons/outdoor-cafe.svg"
                  alt="outdoor"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Outdoor</span>
              </Link>
              <Link
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <Image
                  width={300}
                  height={300}
                  src="/images/icons/bed-2.svg"
                  alt="Mattress"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Mattress</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
            <div className="flex items-center space-x-6 capitalize">
              <Link
                href="/"
                className="text-gray-200 hover:text-white transition"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-gray-200 hover:text-white transition"
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="text-gray-200 hover:text-white transition"
              >
                About us
              </Link>
              <Link
                href="/contact"
                className="text-gray-200 hover:text-white transition"
              >
                Contact us
              </Link>
            </div>
            {session?.user?.email ? (
              <ServerLogout />
            ) : (
              <Link
                href="/login"
                className="text-gray-200 hover:text-white transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
