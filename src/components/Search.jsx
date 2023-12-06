import { useCallback, useEffect, useState } from "react";
import {
  filterProducts,
  getProductCategories,
  getSubCategories,
} from "../redux/actions/product";
import { tempCategoriesDataArray } from "../Home";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Search = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    //it will call once on production
    getProductCategories()
      .then((res) => {
        const tempData =
          res &&
          res?.map((el) => {
            return {
              ...el,
              image: tempCategoriesDataArray?.find(
                (item) => item?.slug === el?.slug
              )?.image,
            };
          });
        setCategoriesData(tempData);
      })
      .catch(() => {
        setCategoriesData([]);
      });
  }, []);

  function debounce(func, timeout) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  function SearchInstitution(event) {
    const searchValue = (event.target.value || "").trim();
    if (searchValue.length >= 1) {
      dispatch(filterProducts({ category: searchValue }))
        .then((res) => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setIsLoading(false);
        });
    }
  }

  const inputChangeHandler = useCallback(debounce(SearchInstitution, 1000), []);
  return (
    <div className="search-components flex md:space-x-8 items-center sm:px-20 justify-between py-6 md:py-0 my-3">
      <div className="dropdown categories z-20">
        <label
          tabIndex={0}
          className="btn m-1 bg-[#2d1e5f] text-white hover:bg-[#261c46] hidden sm:flex"
        >
          <div className="bars space-y-1 cursor-pointer mr-2">
            <div className="bar w-5 h-0.5 bg-white"></div>
            <div className="bar w-5 h-0.5 bg-white"></div>
            <div className="bar w-5 h-0.5 bg-white"></div>
          </div>
          Shop by Categories
        </label>
        <label
          tabIndex={0}
          className="btn btn-sm m-1 bg-white text-white hover:bg-[#51408b] sm:hidden h-10 w-10 flex"
        >
          <div className="bars space-y-1 cursor-pointer mx-auto">
            <div className="bar w-5 h-0.5 bg-black"></div>
            <div className="bar w-5 h-0.5 bg-black"></div>
            <div className="bar w-5 h-0.5 bg-black"></div>
          </div>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-4 shadow rounded-box w-52 space-y-1 text-white bg-[#51408b]"
        >
          {tempCategoriesDataArray &&
            tempCategoriesDataArray?.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={`/subcategories/${item?.slug?.toLowerCase()}`}
                >
                  <li>{item?.name}</li>
                </Link>
              );
            })}
        </ul>
      </div>
      <div className="search text-black relative">
        <input
          type="text"
          className="input input-bordered py-2 px-3  xs:px-5 xs:py-2.5 rounded-lg w-full xs:w-96 bg-white focus:outline-none border-2"
          placeholder="Search here..."
          onChange={inputChangeHandler}
        />
        <button className="text-white px-2 py-1 md:px-3 md:py-1 bg-[#2d1e5f] rounded absolute right-1 md:right-3 top-2">
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
