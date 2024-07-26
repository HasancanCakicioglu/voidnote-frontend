"use server";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import Account from "./account";
import SidebarMobile from "./sidebarMobile";
import { useTranslations } from 'next-intl';
import { Link } from "@/navigations";

const Navbar = () => {
  const t = useTranslations("Navbar");

  return (
    <header className="py-4 border-b">
      <div className="px-5 flex justify-between items-center">
        <SidebarMobile />
        <div className="flex items-center overflow-hidden max-h-[40px]">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="VoidNote Logo" width={64} height={64} className="object-contain" />
            <span className="ml-1 text-lg font-bold">VoidNote</span>
          </Link>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="/pricing">
            <div className="hover:text-gray-300">{t("pricing")}</div>
          </Link>
          <Link href="/features">
            <div className="hover:text-gray-300">{t("features")}</div>
          </Link>
          <Link href="/note">
            <div className="hover:text-gray-300">{t("notes")}</div>
          </Link>
          <Link href="/about">
            <div className="hover:text-gray-300">{t("about")}</div>
          </Link>
        </nav>
        <div className="flex space-x-2 md:space-x-4">
          <ModeToggle />
          <Account />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
