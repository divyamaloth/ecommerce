import React, { useRef } from "react";
import { FaWallet } from 'react-icons/fa';
import { AiTwotoneHeart, AiOutlineLogout, AiOutlineSetting } from 'react-icons/ai';
import { BsCartFill } from 'react-icons/bs';

const Sidebar = () => {
  const ref = useRef();
  const toogleNav = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (ref.current.classList.contains("translate-x-0")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  return (
    <div>
      {" "}
      <div
        className="bars space-y-1 md:hidden cursor-pointer"
        onClick={toogleNav}
      >
        <div className="bar w-5 h-0.5 bg-white"></div>
        <div className="bar w-5 h-0.5 bg-white"></div>
        <div className="bar w-5 h-0.5 bg-white"></div>
      </div>
      <ul
        className="space-y-3 h-full w-2/3 absolute top-0 right-0 z-10 bg-[#0d1520] transform transition-transform translate-x-full"
        ref={ref}
      >
        <li
          className="float-right mr-4 mt-3 cursor-pointer"
          onClick={toogleNav}
        >
          X
        </li>
        <li className="flex items-center space-x-5 px-5 pt-10 py-2">
          <div className="avatar w-12">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img height={10} width={10} src="/avatar.svg" className="w-24 h-24" />
            </div>
          </div>
          <div className="name-city">
            <p className="text-lg">
              Hello <span className="text-gray-300">Shaq</span>
            </p>
            <select name="" id="" className="bg-transparent text-sm">
              <option value="banglore">Bangalore</option>
            </select>
          </div>
        </li>
        <li>
          <button className="flex items-center  space-x-3 pl-4 pr-28 rounded-md focus:text-[#928aed] focus:bg-[#2f3541] py-1.5 mx-2"><FaWallet className="" /> <p>$1000</p></button>
        </li>
        <li>
          <button className="flex items-center  space-x-3 pl-4 pr-32 rounded-md focus:text-[#928aed] focus:bg-[#2f3541] py-1.5 mx-2"><BsCartFill className="" /> <p>Cart</p></button>
        </li>
        <li>
          <button className="flex items-center  space-x-3 pl-4 pr-24 rounded-md focus:text-[#928aed] focus:bg-[#2f3541] py-1.5 mx-2"><AiTwotoneHeart className="" /> <p>Wishlist</p></button>
        </li>
        <li className="relative top-64">
          <button className="flex items-center text-sm space-x-3 pl-4 pr-24 rounded-md focus:text-[#928aed] focus:bg-[#2f3541] py-1 mx-2"><AiOutlineSetting className="" /> <p>Settings</p></button>
        </li>
        <li className="relative top-64">
          <button className="flex items-center text-sm space-x-3 pl-4 pr-24 rounded-md py-1 mx-2"><AiOutlineLogout className="" /> <p>Logout</p></button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
