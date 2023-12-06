import {
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineBell,
} from "react-icons/ai";
import { BsFillMicFill, BsCartPlus, BsMic } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";

const SubNav = () => {
  return (
    <div className="hidden sm:flex flex-wrap items-center w-screen min-h-[79px] text-center text-black">
      <div className="text-[18px] text-gray text-left flex w-1/2 h-[45px] bg-whitesmoke items-center mr-4">
        <AiOutlineSearch className="w-10"></AiOutlineSearch>
        <input
          placeholder="Search"
          name="Search"
          className="flex-1 bg-whitesmoke"
        />
        <BsMic className="w-10"></BsMic>
      </div>
      <div className="flex items-center justify-center w-38 h-[78px] ml-1 cursor-pointer">
        <AiOutlineBell className="w-10"></AiOutlineBell>
        Notifications
      </div>
      <div className="flex items-center justify-center w-32 h-[78px] mx-2 cursor-pointer">
        Orders
      </div>
      <Link
        href={"/cart"}
        className="flex items-center justify-center h-[78px] mx-2 cursor-pointer"
      >
        <AiOutlineShoppingCart className="w-10"></AiOutlineShoppingCart>
        Cart
      </Link>
      <div className="flex flex-4 items-center mx-2 cursor-pointer">
        <RxAvatar className="w-10"></RxAvatar>
        Sign In
      </div>
    </div>
  );
};

export default SubNav;
