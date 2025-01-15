"use client";
import { MdMenu } from "react-icons/md";
const MobileMenu = () => {
  return (
    <div>
      <div className="flex items-center gap-3 p-4   bg-white rounded-md">
        <button className="text-2xl font-normal text-gray-400 cursor-pointer">
          <MdMenu />
        </button>
        <h2>Dua's importance</h2>
      </div>
    </div>
  );
};

export default MobileMenu;
