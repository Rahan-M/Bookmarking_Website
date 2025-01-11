import React from "react";
import logo from "../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
  return (
    <div className="bg-gradient-to-br from-cyan-500 to-blue-500 flex justify-between h-14 items-center">
      <GiHamburgerMenu color="white" className="pl-5 text-6xl" />
      <div className="flex items-center">
        <img src={logo} className="h-[6rem] pt-1"></img>
        <h1 className="font-bold text-4xl pb-2 text-white">BookMarq</h1>
      </div>
      <FaUserCircle className="pr-5 text-6xl" color="white" />
    </div>
  );
};

export default Navbar;
