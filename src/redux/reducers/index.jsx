import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import productsReducer from "./products";
const rootReducer = (state, action) => {
  return allReducers(state, action);
};
const allReducers = combineReducers({
  cart: cartReducer,
  product: productsReducer,
});

export default rootReducer;
