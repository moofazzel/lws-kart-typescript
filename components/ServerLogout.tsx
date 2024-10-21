import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export function ServerLogout() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        redirect("/login");
      }}
    >
      <button
        className="text-gray-200 hover:text-white transition"
        type="submit"
      >
        Log Out
      </button>
    </form>
  );
}
