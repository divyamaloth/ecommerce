import React from "react";
import media from "../utils/media";
import axios from "axios";
import endpoint from "../utils/endpoint";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeCustomerCart } from "./redux/actions/customer";
import { useNavigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartData = useSelector(
    (state) => (state && state?.cart && state?.cart?.cartItems) || []
  );

  const RemoveCart = async (product_id) => {
    try {
      dispatch(removeCustomerCart({ data: { quantity: 1 }, product_id }));
      console.log(`Item with product_id ${product_id} removed successfully.`);
    } catch (error) {
      console.error(
        `Error removing item with product_id ${product_id} from cart:`,
        error
      );
    }
  };
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

  return (
    <div className="bg-[#1d232a]">
      <div className="flex justify-around flex-wrap">
        {cartData?.map((item, index) => (
          <div className="card w-96 glass my-6" key={item?.id}>
            <figure>
              <img src={media + item?.image} alt={item?.name} className="" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item?.name}</h2>
              <h2 className="card-title">items :{item?.count}</h2>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-secondary"
                  onClick={() => RemoveCart(item?.id)} // Pass product_id to the remove function
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="buy-btn flex justify-center">
        <button className="btn btn-primary btn-wide glass" onClick={buyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default Cart;
