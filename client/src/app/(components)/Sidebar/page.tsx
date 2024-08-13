"use client";

import { Menu } from "lucide-react";
import React from "react";

const Sidebar = () => {
  return (
    <div className="">
      <div className="flex gap-3 justify-between md:justify-normal items-center pt-8">
        <div className="">Logo</div>
        <h1 className="font-extrabold">Polly</h1>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={() => {}}
        >
          <Menu className="size-4" />
        </button>
      </div>

      {/* Links */}
      <div className="flex-grow mt-8"></div>

      {/* Footer */}
      <div className="">
        <p className="text-center text-xs text-gray-500">
          {" "}
          &copy; 2024 Polly Mayson
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
