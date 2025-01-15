import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
const inter = Inter({
  subsets: ["latin"],
});
export const metadata = {
  title: "Dua & Ruqyah | All Duas Collection",
  description: "All duas collection application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background  `}>
        <div className="min-w-[100px] h-[calc(100vh-25px)] fixed z-10 pt-6 pl-6 ">
          <div className="flex-col hidden h-full gap-12 pb-10 overflow-y-scroll bg-white rounded-3xl xl:flex">
            <Link
              className="flex items-center justify-center drop-shadow"
              href="/"
            >
              <Image src="/logo.png" width={80} height={80} alt="logo" />
            </Link>
            <Menu />
            <Link
              className="flex items-center justify-center drop-shadow"
              href="/"
            >
              <Image src="/donate.png" width={80} height={80} alt="logo" />
            </Link>
          </div>
        </div>

        <div>
          <Navbar />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
