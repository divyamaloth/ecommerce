import { useEffect, useState } from "react";
import Search from "../src/components/Search";
import StoreCarousel from "../src/components/StoreCarousel";
import SmallCardsTest from "./components/SmallCardsTest";
import Spinner from "./components/Spinner";
import { getProductCategories } from "./redux/actions/product";
import SmallCards from "./components/SmallCards";
import { Link } from "react-router-dom";

export const tempCategoriesDataArray = [
  {
    image: "/cards.gif",
    slug: "Trading Cards",
    name: "Trading Cards",
    gif: true,
  },
  {
    image: "/beauty.png",
    slug: "Beauty/Makeup",
    name: "Beauty/Makeup",
  },
  {
    image: "/toy.gif",
    slug: "Toys",
    name: "Toys",
    gif: true,
  },
  {
    image: "/electronics.png",
    slug: "electronics",
    name: "Electronics",
  },
  {
    image: "/job.png",
    slug: "Jobs",
    name: "Jobs",
  },
  {
    image: "/pharmacy.png",
    slug: "Pharmacy",
    name: "Pharmacy",
  },
  {
    image: "/renovation.png",
    slug: "Home Improve",
    name: "Home Improve",
  },
  {
    image: "/furniture.png",
    slug: "Furniture",
    name: "Furniture",
  },
  {
    image: "/book.png",
    slug: "Books",
    name: "Books",
  },
  {
    image: "/nft.png",
    slug: "NFTs",
    name: "NFTs",
  },
  {
    image: "/movies.png",
    slug: "Entertainment",
    name: "Entertainment",
  },
  {
    image: "/store.png",
    slug: "My Store",
    name: "My Store",
  },
  {
    image: "/real Estate.png",
    slug: "estate-sale",
    name: "Estate Sale",
  },
  {
    image: "/game.gif",
    slug: "video-games",
    name: "Video Games",
    gif: true,
  },
  {
    image: "hotel.png",
    slug: "hotels",
    name: "Hotels",
  },
  {
    image: "/acquisition.png",
    slug: "business-4-sale",
    name: "Business 4 sale",
  },
  {
    image: "/computer.png",
    slug: "computer-parts",
    name: "Computer Parts",
  },
];

const Home = () => {
  return (
    <div>
      <Search />
      <div className="uppercards grid xs:grid-cols-2 sm:grid-cols-3 xs:gap-x-0 sm:gap-x-5 gap-y-10 px-2 md:px-14 pt-3 md:pt-14 place-items-center grid-cols-1">
        {/* Mobile  */}
        <Link to={"/list-items"}>
          <div className="card w-[90vw] xs:w-40 h-36 md:w-50 md:h-60 bg-[#2d1e5f] rounded-xl shadow-md relative md:hidden flex justify-center items-center">
            <img
              src="/mall.png"
              alt=""
              className="w-32 h-32 md:w-50 md:h-60 rounded-xl"
            />
            <div className="text-center absolute left-0 right-0 -bottom-7 text-black">
              Shopping Mall
            </div>
          </div>
        </Link>
        <Link to={"/list-items"}>
          <div className="card w-[90vw] xs:w-40 h-36 md:w-50 md:h-60 bg-[#2d1e5f] rounded-xl shadow-md relative md:hidden flex justify-center items-center">
            <img
              src="/real Estate.png"
              alt=""
              className="w-32 h-32 md:w-50 md:h-60 rounded-xl"
            />
            <div className="text-center absolute left-0 right-0 -bottom-7 text-black">
              Real Estate
            </div>
          </div>
        </Link>
        <Link to={"/list-items"}>
          <div className="card w-[90vw] sm:w-40 h-36 mx-auto bg-[#2d1e5f] rounded-xl shadow-md relative md:hidden flex justify-center items-center xs:ml-3 ml-1 ">
            <img
              src="/cars and trucks.png"
              alt=""
              className="md:w-50 md:h-60 rounded-xl w-[50vw] h-32 "
            />
            <div className="text-center absolute left-0 right-0 -bottom-7 text-black">
              Cars and Trucks
            </div>
          </div>
        </Link>
        {/* Desktop */}
        <Link to={"/list-items"}>
          <div className="card w-[27vw] h-60 bg-[#2d1e5f] rounded-xl shadow-md relative hidden md:flex justify-center items-center">
            <img src="/mall.png" alt="" className=" h-48 rounded-xl" />
            <div className="text-center absolute left-0 right-0 -bottom-8 text-lg text-black">
              Shopping Mall
            </div>
          </div>
        </Link>
        <Link to={"/list-items"}>
          <div className="card w-[27vw] h-60 bg-[#2d1e5f] rounded-xl shadow-md relative hidden md:flex justify-center items-center">
            <img src="/real Estate.png" alt="" className=" h-48 rounded-xl" />
            <div className="text-center absolute left-0 right-0 -bottom-8 text-lg text-black">
              Real Estate
            </div>
          </div>
        </Link>
        <Link to={"/list-items"}>
          <div className="card w-[27vw] h-60 bg-[#2d1e5f] rounded-xl shadow-md relative hidden md:flex justify-center items-center">
            <img
              src="/cars and trucks.png"
              alt=""
              className=" h-48 rounded-xl"
            />
            <div className="text-center absolute left-0 right-0 -bottom-8 text-lg text-black">
              Cars and Trucks
            </div>
          </div>
        </Link>
      </div>
      <SmallCardsTest categoriesData={tempCategoriesDataArray} />
      <StoreCarousel />
    </div>
  );
};

export default Home;
