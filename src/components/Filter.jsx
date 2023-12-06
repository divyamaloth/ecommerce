"use client";

import React from "react";
import { filterProducts } from "../redux/actions/product";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();

  function onFilter() {
    dispatch(filterProducts({ category: "electronics" }))
      .then((res) => {})
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  function openSidebar() {
    document.querySelector(".sidebar").classList.toggle("hidden");
  }

  return (
    <>
      <span
        className="block  sm:hidden  cursor-pointer absolute top-[-35px] "
        onClick={openSidebar}
      >
        <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md p-[5px]">
          Filters
        </i>
      </span>
      <div className="hidden absolute sm:relative sm:block sidebar bg-gray-800 p-4 rounded-lg shadow-xl flex flex-col justify-between sm:h-[80%] left-0  w-60 z-10 top-[10px] w-[100%] sm:w-[25%] ">
        <div className="">
          <h2 className="text-xl font-bold text-white mb-4">Filters</h2>
          <div className="mb-4">
            <h3 className="font-medium text-white mb-2">Color</h3>
            <div className="flex space-x-1">
              <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none hover:bg-gray-300"></button>
              <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none hover:bg-gray-600"></button>
              <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none hover:bg-red-600"></button>
            </div>
          </div>
          <div className="mb-4 bg-gray-700 rounded-lg p-2">
            <h3 className="font-medium text-white mb-2">Size</h3>
            <select className="rounded border border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10 bg-gray-700 text-white">
              <option>SM</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>
          <div className="mb-4">
            <h3 className="font-medium text-white mb-2">Price Range</h3>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                className="rounded border border-gray-400 py-2 px-3 focus:outline-none focus:border-red-500 w-1/2"
                placeholder="Min"
              />
              <span className="text-white">-</span>
              <input
                type="number"
                className="rounded border border-gray-400 py-2 px-3 focus:outline-none focus:border-red-500 w-1/2"
                placeholder="Max"
              />
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-medium text-white mb-2">Rating</h3>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rating-4"
                className="rounded border-gray-400 focus:outline-none focus:border-red-500"
              />
              <label htmlFor="rating-4" className="text-white">
                4 Stars &amp; Up
              </label>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-medium text-white mb-2">Category</h3>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="category-1"
                className="rounded border-gray-400 focus:outline-none focus:border-red-500"
              />
              <label htmlFor="category-1" className="text-white">
                Category 1
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="category-2"
                className="rounded border-gray-400 focus:outline-none focus:border-red-500"
              />
              <label htmlFor="category-2" className="text-white">
                Category 2
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="category-3"
                className="rounded border-gray-400 focus:outline-none focus:border-red-500"
              />
              <label htmlFor="category-3" className="text-white">
                Category 3
              </label>
            </div>
          </div>
        </div>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={onFilter}
        >
          Apply
        </button>
      </div>
    </>
  );
};

export default Filter;
