"use client";
import { userSession } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Navbar Component
const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userSession, setUserSession] = useState<userSession>();

  useEffect(() => {
    console.log('entro acá')
    if (typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem("userSession");
      setUserSession(JSON.parse(userToken!));
    }
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 bg-gray-200">
      <div className="w-full flex flex-row justify-between items-center">
        <Link href="/">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/15216/15216856.png"
            alt="T Store Logo"
            width={40}
            height={40}
          />
        </Link>

        <input
          type="text"
          placeholder="Search..."
          className="max-w-[220px] flex-1 mx-4 p-2 rounded-md"
        />

        <div className="block md:hidden" onClick={toggleMenu}>
          <div className="w-4 h-0.5 bg-black my-1"></div>
          <div className="w-4 h-0.5 bg-black my-1"></div>
          <div className="w-4 h-0.5 bg-black my-1"></div>
        </div>

        {userSession?.token && (
          <Image
            src="/carrito-de-compras.svg"
            alt="cart"
            width={20}
            height={20}
          />
        )}
      </div>

      <div
        className={`${
          isMenuOpen ? "translate-y-0" : "-translate-y-[1000%]"
        } transition-transform duration-300 mt-4 md:translate-y-0 md:flex md:flex-row md:gap-4 md:justify-center`}
      >
        <a href="#" className="text-black mb-2 md:mb-0">
          Category 1
        </a>
        <a href="#" className="text-black mb-2 md:mb-0">
          Category 2
        </a>
        <a href="#" className="text-black mb-2 md:mb-0">
          Category 3
        </a>
        {/* Add more categories as needed */}
      </div>
    </div>
  );
};

export default Navbar;
