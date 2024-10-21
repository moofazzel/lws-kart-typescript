"use client";
import { credentialLogin } from "@/actions/login";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [isAgreed, setIsAgreed] = useState(true);
  const [isConfirmedPassword, setIsConfirmedPassword] = useState(true);
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    setErrorMessage(null);
    event.preventDefault();

    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const formData = new FormData(event.target as HTMLFormElement);

    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    const rowFormData = { email, password };

    try {
      setLoading(true);
      const response = await credentialLogin(rowFormData);
      if (response?.success) {
        router.push(callbackUrl);
      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (error: any) {
      setLoading(false);

      if (error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An error occurred while logging in.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={loginUser} autoComplete="off">
      {errorMessage && (
        <div className="px-4 py-3 text-center text-black bg-red-100 border border-red-500 rounded-lg">
          <p className="font-bold">Warning</p>
          <p>{errorMessage}</p>
        </div>
      )}
      <div className="space-y-2">
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
          />
        </div>
        <div>
          <label htmlFor="password" className="text-gray-600 mb-2 block">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="*******"
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
          />
          <label
            htmlFor="remember"
            className="text-gray-600 ml-3 cursor-pointer"
          >
            Remember me
          </label>
        </div>
        <Link href="#" className="text-primary">
          Forgot password
        </Link>
      </div>
      <div className="mt-4">
        {loading ? (
          <button
            type="submit"
            className="w-full py-3 text-white bg-primary rounded font-medium"
            disabled
          >
            Login...
          </button>
        ) : (
          <button
            type="submit"
            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium disabled:bg-red-300 disabled:border-red-300 disabled:hover:text-white"
          >
            Login
          </button>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
