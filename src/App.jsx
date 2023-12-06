import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Cart from "./Cart";
import Home from "./Home";
import Productdetails from "./Productdetails";
import ProjectDisplay from "./ProjectDisplay";
import Signin from "./Signin";
import Signup from "./Signup";
import Checkout from "./checkout";
import ListItems from "./components/ListItems";
import NavBar from "./components/NavBar";
import TopBar from "./components/TopBar";
import {
  viewCustomerCart,
  viewCustomerProfile,
  viewCustomerWishlist,
} from "./redux/actions/customer";
import Wishlist from "./Wishlist";
import Subcategories from "./Subcategories";

function App() {
  const [userDetail, setUserDetail] = useState([]);
  const dispatch = useDispatch();

  const fetchUserDetail = async () => {
    try {
      const response = await viewCustomerProfile();
      setUserDetail(response);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error fetching user detail:", error);
    }
  };

  useEffect(() => {
    fetchUserDetail();
    dispatch(viewCustomerWishlist());
    dispatch(viewCustomerCart());
  }, []);

  return (
    <>
      <Router>
        <TopBar email={userDetail.customer_email} />
        <NavBar userdetail={userDetail} />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route
            exact
            path="/products/:category?"
            element={<ProjectDisplay />}
          ></Route>
          <Route
            exact
            path="/product/:id?"
            element={<Productdetails />}
          ></Route>
          <Route exact path="/cart" element={<Cart />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/signin" element={<Signin />}></Route>
          <Route exact path="/list-items" element={<ListItems />}></Route>
          <Route exact path="/checkout" element={<Checkout />}></Route>
          <Route exact path="/wishlist" element={<Wishlist />}></Route>
          <Route
            exact
            path="/subcategories/:id?"
            element={<Subcategories />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
