import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SmallCardsTest = ({ categoriesData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("aliasgar", location.pathname);
  const handleClick = (cat) => {
    if (location.pathname === "/") {
      navigate(
        `/subcategories/?category=${cat?.replace(/\s+/g, "-")?.toLowerCase()}`
      );
    } else {
      navigate(
        `/products/?subcategories=${cat?.replace(/\s+/g, "-")?.toLowerCase()}`
      );
    }
  };

  return (
    <div className="smallcards grid lg:grid-cols-4 xl:grid-cols-8 gap-10 md:gap-2 px-10 md:px-14 pt-14 place-items-center md:gap-y-16 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 text-black">
      {categoriesData &&
        categoriesData?.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleClick(item?.slug)}
              className="card w-32 h-32 bg-[#2d1e5f] rounded-xl shadow-md relative cursor-pointer border
    flex justify-center items-center"
            >
              <img
                src={item?.image}
                alt=""
                className={`rounded-xl h-26 ${item?.gif ? "" : "w-24 "}`}
              />
              <div className="text text-sm text-center w-32 absolute left-0 right-0 -bottom-7">
                {item?.name}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SmallCardsTest;
