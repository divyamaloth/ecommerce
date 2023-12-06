import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import endpoint from "../utils/endpoint";
import media from "../utils/media";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { filterProducts } from "./redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomerCart,
  addProduct,
  viewCustomerCart,
} from "./redux/actions/customer";

const ProjectDisplay = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const subcategories = searchParams.get("subcategories");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const productList = useSelector(
    (state) => (state && state?.product && state?.product?.productList) || []
  );
  useEffect(() => {
    subcategories &&
      dispatch(filterProducts({ subcategories }))
        .then((res) => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setIsLoading(false);
        });
  }, [subcategories]);

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + "...";
  };

  // Helper function to render skeleton loading
  const renderSkeletonLoading = () => {
    const skeletonItems = Array.from({ length: 6 }, (_, index) => (
      <div
        key={index}
        className="bg-white rounded-xl p-2 shadow-md animate-pulse"
      >
        <div className="w-52 h-40 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
    ));

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {skeletonItems}
      </div>
    );
  };

  const handleClick = (product_id) => {
    navigate(`/product/${product_id}`);
  };

  if (productList?.length === 0 && !isLoading) {
    return (
      <div className="h-[200px] text-gray-600 d-flex text-center">
        No data found
      </div>
    );
  }

  const buyNow = async () => {
    try {
      dispatch(
        addProduct({
          data: {
            username: localStorage.getItem("accessToken"),
            address: "8dd078a8-64de-4071-8818-d4d3d8667d6a",
          },
        })
      ).then(() => {
        navigate("/list-items");
      });
    } catch (error) {
      console.log("====================================");
      console.log("");
      console.log("====================================");
    }
  };

  const addToCart = (product_id, e) => {
    e.stopPropagation();
    dispatch(
      addCustomerCart({
        data: { quantity: 1 },
        product_id: product_id,
      })
    )
      .then((data) => {
        dispatch(viewCustomerCart());
      })
      .catch((e) => {});
  };
  // JSX related
  return (
    <>
      <div className="bg-gray-200 min-h-screen p-8">
        {isLoading ? (
          renderSkeletonLoading() // Render skeleton loading while data is loading
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {productList?.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl p-2 shadow-md hover:shadow-lg cursor-pointer flex flex-col"
                onClick={() => handleClick(product.id)}
              >
                <img
                  src={`${media}${product.image}`}
                  alt={product.name}
                  className="w-52 h-auto rounded"
                />
                <div className="space-y-1 mt-1">
                  <a href="#" className="text-blue-500 hover:underline">
                    {product.name}
                  </a>
                  <p className="text-gray-600">
                    {truncateText(product.description, 90)}
                  </p>
                  <p className="text-green-600 font-semibold">
                    ${product.unit_price}
                  </p>
                  <div className="mt-2 space-x-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={(e) => addToCart(product?.id, e)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={buyNow}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectDisplay;
