import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import ProductCard from "./components/ProductCard";
import SubNav from "./components/SubNav";
import { useSelector } from "react-redux";
import axios from 'axios';

const Wishlist = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [checkout, setCheckout] = useState(null);
  const [wishlist, setWishlist] = useState({ items: [] }); // Fix here
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get('https://ecommerce.pinksurfing.com/api/customer/wishlist/view/', {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        });

        console.warn(response);
        setWishlist(response.data);
      } catch (err) {
        console.log("the error is ", err);
      }
    };
    fetchWishlist();
  }, [accessToken]);

  return (
    <div className="relative bg-white w-full h-full  overflow-hidden text-left text-xl text-gray flex px-11 flex-col">
      {/* Main Content */}
      <div className={`  w-screen mx-10 bg-gray-100`}>
        {/* Product cards */}
        <h1 className="text-xl text-black w-full text-start mb-2">
          Wishlist Summary
        </h1>
        <div
          className={`${
            checkout
              ? `${
                  isMobile
                    ? "flex flex-col-reverse justify-around gap-4 items-center"
                    : "grid grid-cols-2"
                }`
              : "flex flex-col"
          }`}
        >
          <div
            className={`flex flex-row flex-wrap min-h-screen w-full col-start-1 content-baseline gap-8`}
          >
            {wishlist.items.map((data, index) => (
              <ProductCard key={index} data={data} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white w-full h-16 fixed bottom-0 left-0 flex items-center justify-between p-4">
        <button
          onClick={() => (checkout ? setCheckout(null) : null)}
          style={{ padding: "8px" }}
          className="bg-whitesmoke flex items-center space-x-5 rounded-lg"
        >
          <IoIosArrowBack className="w-5 h-5 text-black" />
          <span className="text-black">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
