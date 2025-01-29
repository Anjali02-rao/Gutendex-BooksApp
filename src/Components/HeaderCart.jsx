import { useContext } from "react";
import { AppContext } from "../App";

export default function HeaderCart() {
  const { cart } = useContext(AppContext);

  return <div className="header-cart">Items in cart: {cart.length}</div>;
}
