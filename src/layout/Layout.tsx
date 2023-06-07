import React from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>
      <nav className=" w-full h-12 flex items-center justify-center border-b border-gray-500">
        <p className=" text-xl text-gray-500 font-semibold">Contact Manager</p>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
