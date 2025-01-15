"use client";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
const Category = () => {
  const array = Array(10).fill(null);
  return (
    <div className=" flex-col w-[350px] bg-white h-[calc(100vh-60px)] gap-4 fixed overflow-hidden rounded-xl flex">
      <h2 className="px-5 py-4 text-xl text-center text-white bg-green rounded-t-xl">
        Categories
      </h2>
      <div className="flex items-center gap-2 p-3 mx-2 border border-gray-200 rounded-md focus-within:border focus-within:border-green">
        <div className="cursor-pointer ">
          <Image
            className=""
            src="/search.png"
            width={20}
            height={20}
            alt="profile"
          />
        </div>
        <input
          className="bg-transparent outline-none "
          type="search"
          placeholder="Search by Duas Name "
        />
      </div>

      <div className="flex flex-col gap-4 overflow-scroll">
        {array.map((item, i) => {
          return (
            <div
              key={i}
              className="flex items-center gap-1 mx-2 p-3 rounded-xl cursor-pointer hover:bg-[#E8F0F5]"
            >
              <div>
                <Image
                  className="bg-[#CFE0E5] p-3 rounded-lg"
                  src="/fever.png"
                  width={50}
                  height={50}
                  alt="logo"
                />
              </div>

              <div>
                <h2 className="text-lg font-medium">Dua's important</h2>
                <p className="text-sm text-gray-500">Subcategory:1</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
