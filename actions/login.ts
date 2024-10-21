"use server";

import { signIn } from "@/auth";
import { User } from "@/model/user-model";

export async function credentialLogin(formData: {
  email: string;
  password: string;
}) {
  try {
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false, // Disable auto redirection
    });

    if (response && !response.error) {
      const user = await User.findOne({ email: formData.email });
      return {
        success: true,
      };
    } else {
      throw new Error(response.error || "Login failed");
    }
  } catch (error: any) {
    console.log("🚀 ~ error:", error);
    return {
      success: false,
      message: error.message || "An error occurred during login",
    };
  }
}

export async function doSocialLogin(fromData: {
  action: "google" | "facebook";
  callback: string;
}) {
  const result = await signIn(fromData.action, {
    redirectTo: fromData.callback,
  });
  console.log("🚀 ~ result:", result);
  if (result) {
    return {
      success: true,
    };
  }

  return {
    success: false,
    message: `An error occurred during ${fromData.action} login`,
  };
}
