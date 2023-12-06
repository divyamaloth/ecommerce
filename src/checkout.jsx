import { useEffect, useMemo, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import PaymentForm from "./components/PaymentForm";
import ProductCard from "./components/ProductCard";
import ShippingForm from "./components/ShippingForm";
import SubNav from "./components/SubNav";
import { getProductDetails } from "./redux/actions/product";
import Ship from "./components/ShippingForm";
import { useDispatch } from "react-redux";
import { getAddressList } from "./redux/actions/customer";

const Checkout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const product_id = searchParams.get("id");

  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState([]);
  const [checkout, setCheckout] = useState(null);
  const [addressId, setAddressID] = useState(null);
  const [addressListData, setAddressListData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const width = window.innerWidth;
    setIsMobile(width <= 1200);
  }, []);

  useMemo(() => {
    dispatch(
      getAddressList({
        username: localStorage.getItem("accessToken"),
      })
    ).then((res) => {
      console.log(
        "rjasldjlasjdljaskldjaskldjaskljes?.addresses",
        res?.addresses
      );
      setAddressListData(res?.addresses);
    });
    if (type === "product" && product_id) {
      getProductDetails({ product_id })
        .then((data) => {
          setProducts([data]);
          console.log(data);
        })
        .catch((error) => {
          console.error(`Error from Fetching products: ${error}`);
        });
    } else if (type === "cart") {
      //
    }
  }, [product_id, type]);

  return (
    <div className="relative bg-white w-full h-full  overflow-hidden text-left text-xl text-gray flex px-11 flex-col">
      {/* Main Content */}
      <div className={`  w-screen mx-10 bg-gray-100`}>
        {/* Product cards */}
        <h1 className="text-xl text-black w-full text-start mb-2">
          Order Summary
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
            {products?.map((data, index) => (
              <ProductCard key={index} data={data} />
            ))}
          </div>
          {checkout ? (
            <div className=" col-start-2">
              {checkout === "shipping" ? (
                <ShippingForm
                  checkout={checkout}
                  setCheckout={setCheckout}
                  setAddressID={setAddressID}
                  addressId={addressId}
                  addressList={addressListData}
                />
              ) : (
                <PaymentForm addressId={addressId} />
              )}
            </div>
          ) : null}
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
          <span className="text-black">Back</span>
        </button>
        {checkout ? null : (
          <div className="flex space-x-4">
            <button className="bg-whitesmoke text-black px-4 py-2 rounded-lg">
              Save for later
            </button>
            <button
              className="bg-black text-white px-4 py-2 rounded-lg"
              onClick={() => setCheckout("shipping")}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
