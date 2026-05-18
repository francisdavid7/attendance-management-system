import Image from "next/image";
import Link from "next/link";

const Logo = ({ path = "/" }) => {
  return (
    <div>
      {/* LOGO */}
      <Link href={path} className="text-xl font-bold flex items-center">
        <Image
          src="/logo.png"
          width={30}
          height={30}
          alt="Logo"
          className="mr-2"
        />
        Attend<span className="text-primary">X</span>
      </Link>
    </div>
  );
};

export default Logo;
