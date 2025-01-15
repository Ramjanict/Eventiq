"use client";
import { MdArrowBackIos } from "react-icons/md";
import Image from "next/image";
import { IoMdSettings } from "react-icons/io";
const Navbar = () => {
  return (
    <div className="xl:pl-[124px] lg:fixed w-full xl:w-[calc(100vw-36px)] flex justify-between bg-transparent md:bg-white xl:bg-background py-4  px-4 z-10">
      <div className="hidden md:block">
        <h2 className="hidden text-2xl font-medium xl:block">Duas Page</h2>
        <div className="flex items-center gap-1 xl:hidden">
          <Image src="/logo.png" width={80} height={80} alt="logo" />
          <h2 className="text-2xl font-medium ">Dua & Ruqyah</h2>
        </div>
      </div>

      <div className="items-center hidden gap-5 xl:gap-10 md:flex">
        <div className="flex items-center justify-between py-1 pl-3 pr-1 border border-transparent rounded-md w-80 xl:bg-white bg-background focus-within:border focus-within:border-green max ">
          <input
            className="bg-transparent outline-none "
            type="search"
            placeholder="Search by Duas Name "
          />
          <div className="px-4 py-3 bg-white rounded-md cursor-pointer xl:bg-background">
            <Image
              className=""
              src="/search.png"
              width={20}
              height={20}
              alt="profile"
            />
          </div>
        </div>
        <div className="text-2xl text-green xl:hidden">
          <IoMdSettings />
        </div>
        <div className="flex items-center gap-4 cursor-pointer ">
          <div className="flex items-center gap-2 cursor-pointer">
            <img src="/profile.png" alt="profile" />
            <Image
              src="/arrow-down.png"
              width={10}
              height={10}
              alt="arrow-down"
            />
          </div>

          <div className="hidden text-2xl text-green xl:block">
            <IoMdSettings />
          </div>
        </div>
      </div>

      {/* mobile menu  */}
      <div className="flex items-center gap-2 text-gray-500 md:hidden">
        <button className="text-2xl cursor-pointer">
          <MdArrowBackIos />
        </button>
        <h2 className="text-xl">Dua Page</h2>
      </div>
      <div className="text-2xl text-green md:hidden">
        <IoMdSettings />
      </div>
    </div>
  );
};

export default Navbar;
