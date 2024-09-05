import Image from "next/image";

export default function Ads() {
  return (
    <div className="container pb-16">
      <a href="#">
        <Image
          width={700}
          height={700}
          src="/images/offer.jpg"
          alt="ads"
          className="w-full"
        />
      </a>
    </div>
  );
}
