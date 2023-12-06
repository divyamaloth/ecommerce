import {
  AiTwotoneHeart,
  AiFillStar,
  AiOutlineClose,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useRef, useState, useEffect } from "react";
import Filter from "../components/Filter";
import Search from "../components/Search";
import { useNavigate } from "react-router-dom";
import { viewAllProducts } from "../redux/actions/product";
import { API_ENDPOINT, API_ENDPOINT_BASE } from "../services/apiConstant";
import { useDispatch, useSelector } from "react-redux";
import { addCustomerCart, viewCustomerCart } from "../redux/actions/customer";
import { toast } from "react-toastify";
import media from "../../utils/media";

const ListItems = () => {
  const ref = useRef();
  const ref2 = useRef();
  // const ref3 = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectProduct, setSelectProduct] = useState({});
  const [selectProductQuantity, setSelectProductQuantity] = useState(1);

  const productList = useSelector(
    (state) => (state && state?.product && state?.product?.productList) || []
  );

  const showDetails = (e) => {
    // e.stopPropagation();
    if (ref.current.classList.contains("hidden")) {
      ref.current.classList.remove("hidden");
      ref.current.classList.add("card");
      ref.current.classList.add("w-96");
      ref.current.classList.add("glass");
    }
  };

  const hideDetails = () => {
    if (!ref.current.classList.contains("hidden")) {
      ref.current.classList.remove("card");
      ref.current.classList.remove("w-96");
      ref.current.classList.remove("glass");
      ref.current.classList.add("hidden");
    }
  };

  useEffect(() => {
    dispatch(viewAllProducts())
      .then((res) => {})
      .catch();
    if (ref.current) {
      ref.current.classList.add("hidden");
    }
  }, []);

  const increment = () => {
    setSelectProductQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (selectProductQuantity > 0) {
      setSelectProductQuantity((prev) => prev - 1);
    } else {
      setSelectProductQuantity(0);
    }
  };

  function onDoubleClickProduct(id, e) {
    if (e?.detail == 2) {
      console.log("Double Clicked");
      navigate(`../product/${id}`);
    }
  }

  function onClickProduct(item, e) {
    e.stopPropagation();
    if (e?.detail == 1) {
      setSelectProduct(item);
      showDetails();
    }
  }

  const addToCart = (product_id, e) => {
    e.stopPropagation();
    dispatch(
      addCustomerCart({
        data: { quantity: selectProductQuantity },
        product_id: product_id,
        selectProduct,
      })
    )
      .then((data) => {
        dispatch(viewCustomerCart());
        if (data?.status === 200) {
          toast.success(
            `${
              selectProduct && "name" in selectProduct
                ? selectProduct?.name
                : "Current Product"
            } has been added to Cart`,
            {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Failed to Add product to Cart", {
          position: "bottom-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .finally(() => hideDetails());
  };

  return (
    <div className="flex flex-col grid-cols-2 md:grid-cols-6 gap-8 px-7 py-3">
      <Search />
      <div className="flex flex-column relative">
        <Filter />
        <div
          className="w-[100%] z-40 sm:w-[40rem] glass z-10 fixed top-72 bottom-5 left-1/2 right-1/2 -ml-[192px] -mt-[203.75px] overflow-scroll"
          ref={ref}
        >
          <AiOutlineClose
            onClick={hideDetails}
            // className="btn btn-circle btn-sm mx-auto btn-error"
            className="btn-circle text-xl ml-2 w-[20px] h-[20px]  absolute text-black cursor-pointer right-4 top-4 btn-error"
          />
          <img
            src={selectProduct?.image}
            alt="car!"
            className="rounded-t-xl h-[300px]"
          />
          <div className="card-body text-black">
            <h2 className="card-title">{selectProduct?.name}</h2>
            <div className="flex justify-between">
              <div className="flex items-center">
                4.7 <AiFillStar className="text-[#908128] text-xl ml-1" />{" "}
              </div>
              <div className="flex items-center">
                ${selectProduct?.unit_price}{" "}
                <AiTwotoneHeart className="text-[#908128] text-xl ml-1" />{" "}
              </div>
            </div>
            <div className="divider"></div>
            <details className="">
              {/* <summary>The best shoes</summary> */}
              <p>{selectProduct?.description}</p>
            </details>
            <div className="divider"></div>
            <div className="card-actions flex-col justify-start">
              <h5 className="font-semibold text-sm">Extras</h5>
              <div className="type flex justify-between items-center w-full">
                <p>Type</p>
                <select className="select bg-transparent">
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>
            </div>
            <div className="divider"></div>
            <div className="card-actions flex-col justify-start">
              <div className="quantity-price flex justify-between items-center w-full">
                <div className="flex items-center space-x-1">
                  <button
                    className="btn rounded btn-sm bg-[#2d1e5f] text-white border-none text-xl"
                    onClick={decrement}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="input w-16 h-8 bg-transparent focus:outline-none text-xl font-semibold text-center"
                    ref={ref2}
                    value={selectProductQuantity}
                  />
                  <button
                    className="btn rounded btn-sm bg-[#2d1e5f] text-white border-none text-xl"
                    onClick={increment}
                  >
                    +
                  </button>
                </div>
                <div className="price">
                  <p className="text-2xl font-bold">
                    $
                    {selectProductQuantity *
                      Number(selectProduct?.unit_price || 10)}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => addToCart(selectProduct?.id, e)}
                className=" lg:grid-col-span-2 lg:row-start-2 row-start-3 text-center bg-white m-auto my-5 smoke flex items-center justify-center w-[200px] h-[50px]"
              >
                <AiOutlineShoppingCart
                  className="w-10"
                  mx-4
                ></AiOutlineShoppingCart>
                Add To Cart
              </button>

              <button
                className="btn btn-circle btn-sm mx-auto btn-error"
                onClick={hideDetails}
              >
                X
              </button>
            </div>
          </div>
        </div>
        <div className="grid  grid-cols-1 xs:grid-cols-2 sm:grid-cols-2   md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-5">
          {productList?.map((item, index) => {
            return (
              <div
                key={index}
                className="h-auto w-[100%] h-fit m-3  padding-10 rounded-2xl shadow-[0.3rem_0.3rem_0.3rem_0_rgb(208,208,208),-0.3rem_-0.3rem_0.3rem_0_rgb(155,155,155)]"
              >
                <button
                  onDoubleClick={(e) => onDoubleClickProduct(item?.id, e)}
                  onClick={(e) => onClickProduct(item, e)}
                  className="w-[100%]"
                >
                  <img
                    className="h-[250px] w-full p-5 rounded-t-2xl shadow-xl"
                    src={media + item?.image}
                    alt=""
                  />
                  <div className="details bg-white text-black h-[30%] rounded-b-2xl relative">
                    <div className="desc flex flex-col px-4 py-2 items-center">
                      <h1 className="product_name text-xl font-semibold">
                        {item?.name}
                      </h1>
                      <h1 className="product_pricing text-lg font-semibold mt-2">
                        ${item?.unit_price}
                      </h1>
                      <div className="flex justify-between my-2">
                        <button
                          className="bg-[#2d1e5f] text-white px-7 rounded mr-1"
                          onClick={showDetails}
                        >
                          View
                        </button>
                        <button
                          onClick={(e) => addToCart(item?.id, e)}
                          className=" text-center text-white bg-black  smoke flex items-center justify-center  h-[40px] rounded px-2"
                        >
                          <AiOutlineShoppingCart
                            className="mr-2"
                            mx-4
                          ></AiOutlineShoppingCart>
                          Add To Cart
                        </button>
                      </div>
                      {/* <button className="like absolute right-3 bottom-3 h-button w-button m-2">
                        <AiTwotoneHeart className="text-2xl text-red-700" />
                      </button> */}
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListItems;
