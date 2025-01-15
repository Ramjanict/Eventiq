"use client";

import { HiOutlineLightBulb } from "react-icons/hi2";
import { FiCopy } from "react-icons/fi";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
const Share = () => {
  return (
    <div className="flex items-center gap-4 text-2xl text-gray-500 md:gap-10 ">
      <div className="relative flex items-center justify-center group">
        <span className="cursor-pointer ">
          <FiCopy />
        </span>
        <div className="absolute invisible px-2 py-1 text-xs text-white bg-gray-900 rounded-md -top-8 group-hover:visible">
          <p>Copy</p>
        </div>
      </div>
      <div className="relative flex items-center justify-center group">
        <span className="cursor-pointer ">
          <FaRegBookmark />
        </span>
        <div className="absolute invisible px-2 py-1 text-xs text-white bg-gray-900 rounded-md -top-8 group-hover:visible">
          <p>Bookmark</p>
        </div>
      </div>
      <div className="relative flex items-center justify-center group">
        <span className="cursor-pointer ">
          <HiOutlineLightBulb />
        </span>
        <div className="absolute invisible px-2 py-1 text-xs text-white bg-gray-900 rounded-md -top-8 group-hover:visible">
          <p>Memorize</p>
        </div>
      </div>
      <div className="relative flex items-center justify-center group">
        <span className="cursor-pointer ">
          <IoShareSocialOutline />
        </span>
        <div className="absolute invisible px-2 py-1 text-xs text-white bg-gray-900 rounded-md -top-8 group-hover:visible">
          <p>Share</p>
        </div>
      </div>
      <div className="relative flex items-center justify-center group">
        <span className="cursor-pointer ">
          <MdOutlineReportGmailerrorred />
        </span>
        <div className="absolute invisible px-2 py-1 text-xs text-white bg-gray-900 rounded-md -top-8 group-hover:visible">
          <p>Report</p>
        </div>
      </div>
    </div>
  );
};

export default Share;
