"use client";

import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    icon: "/Home.png",
    href: "/",
  },
  {
    icon: "/All Duas.png",
    href: "/alldua",
  },
  {
    icon: "/Memorize.png",
    href: "/memorize",
  },
  {
    icon: "/Bookmark.png",
    href: "/bookmark",
  },
  {
    icon: "/Ruqyah.png",
    href: "/ruqyah",
  },
  {
    icon: "/Book.png",
    href: "/books",
  },
  {
    icon: "/Dua Q&A.png",
    href: "/dua-info",
  },
];
const Menu = () => {
  return (
    <div className="flex flex-col w-full h-full gap-6 ">
      {menuItems.map((item, i) => {
        return (
          <Link
            key={i}
            href={item.href}
            className="flex items-center justify-center transition-all hover:scale-105 "
          >
            <Image src={item.icon} width={40} height={40} alt="icon" />
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;
