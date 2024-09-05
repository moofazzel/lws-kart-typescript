import Image from "next/image";

import logo from "@/public/images/logo.svg";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image src={logo} alt="Logo" className="w-32" />
    </Link>
  );
}
