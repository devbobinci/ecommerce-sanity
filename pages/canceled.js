import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useStateContext } from "../context/StateContext";
import { runFireforks } from "../lib/utils";

export default function Success() {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="color=red">
          <MdOutlineRemoveShoppingCart color="red" size={50} />
        </p>
        <h2>Your order could not be completed</h2>
        <p className="email-msg">
          You're probably too poor to buy stuff from my shop
        </p>
        <p className="description">
          If you have any questions, please email{" "}
          <a className="email" href="mailto:ziomekwaliwodbyt123@gmail.com">
            ziomekwaliwodbyt123@gmail.com
          </a>
        </p>
        <Link href="/">
          <button className="btn" type="button" width="300px">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}
