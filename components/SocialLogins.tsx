"use client";

import { doSocialLogin } from "@/actions/login";
import { useRouter, useSearchParams } from "next/navigation";

const SocialLogins = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSocialLogin = async (
    event: React.FormEvent<HTMLFormElement>,
    action: "facebook" | "google"
  ) => {
    event.preventDefault();

    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const fromData = {
      action,
      callback: callbackUrl,
    };

    try {
      const res = await doSocialLogin(fromData);
      if (res.success) {
        router.push(callbackUrl); // Redirect after successful login
      } else {
        alert(res.message || "Invalid login attempt");
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  };

  return (
    <div className="flex mt-4 justify-center gap-4 w-full">
      {/* Google Login Form */}
      <form
        onSubmit={(event) => handleSocialLogin(event, "google")}
        className="flex-1"
      >
        <input type="hidden" name="action" value="google" />
        <button className="w-full py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">
          Google
        </button>
      </form>

      {/* Facebook Login Form */}
      <form
        onSubmit={(event) => handleSocialLogin(event, "facebook")}
        className="flex-1"
      >
        <button
          className="w-full py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
          name="action"
          value="facebook"
        >
          Facebook
        </button>
      </form>
    </div>
  );
};

export default SocialLogins;
