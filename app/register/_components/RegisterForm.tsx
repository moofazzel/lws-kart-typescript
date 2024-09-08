"use client";

import eyeicon from "@/public/images/icons/eyeicon.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterForm = () => {
  const [isAgreed, setIsAgreed] = useState(true);
  const [isConfirmedPassword, setIsConfirmedPassword] = useState(true);
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);

    const fullName = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirm = formData.get("confirm");

    if (confirm !== password) {
      setIsConfirmedPassword(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password,
        }),
      });
      setLoading(false);

      router.push("/login");
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  const toggleVisibility = (field: "password" | "confirmPassword") => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <>
      {errorMessage && (
        <div className="px-4 py-3 text-center text-black bg-red-100 border border-red-500 rounded-lg">
          <p className="font-bold">Warning</p>
          <p>{errorMessage}</p>
        </div>
      )}
      <form onSubmit={registerUser} method="post" autoComplete="off">
        <div className="space-y-2">
          <div>
            <label htmlFor="name" className="text-gray-600 mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              placeholder="fulan fulana"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="text-gray-600 mb-2 block">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              placeholder="youremail.@domain.com"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="text-gray-600 mb-2 block">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisibility.password ? "text" : "password"}
                name="password"
                id="password"
                className={`${
                  isConfirmedPassword ? "" : "!border-red-500"
                } block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400`}
                placeholder="*******"
                required
              />
              <Image
                onClick={() => toggleVisibility("password")}
                className="absolute top-3 w-8 right-2 cursor-pointer"
                src={eyeicon}
                alt="eye"
              />
            </div>
            {isConfirmedPassword ? (
              ""
            ) : (
              <small className="text-red-500">Password not match</small>
            )}
          </div>
          <div>
            <label htmlFor="confirm" className="text-gray-600 mb-2 block">
              Confirm password
            </label>
            <div className="relative">
              <input
                type={passwordVisibility.confirmPassword ? "text" : "password"}
                name="confirm"
                id="confirm"
                className={`${
                  isConfirmedPassword ? "" : "!border-red-500"
                } block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400`}
                placeholder="*******"
                required
              />
              <Image
                onClick={() => toggleVisibility("confirmPassword")}
                className="absolute top-3 w-8 right-2 cursor-pointer"
                src={eyeicon}
                alt="eye"
              />
            </div>
            {isConfirmedPassword ? (
              ""
            ) : (
              <small className="text-red-500">Password not match</small>
            )}
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="aggrement"
              id="aggrement"
              className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              onChange={() => setIsAgreed(!isAgreed)}
            />
            <label
              htmlFor="aggrement"
              className="text-gray-600 ml-3 cursor-pointer"
            >
              I have read and agree to the{" "}
              <Link href="#" className="text-primary">
                terms & conditions
              </Link>
            </label>
          </div>
        </div>
        <div className="mt-4">
          {loading ? (
            <button
              type="submit"
              className="w-full py-3 text-white bg-primary rounded font-medium"
              disabled
            >
              Creating...
            </button>
          ) : (
            <button
              type="submit"
              className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium disabled:bg-red-300 disabled:border-red-300 disabled:hover:text-white"
              disabled={isAgreed}
            >
              create account
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
