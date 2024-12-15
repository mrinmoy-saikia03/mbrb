import React, { useEffect } from "react";
import { CartItem } from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  resetCartItemRemoveStatus,
  selectCartItemRemoveStatus,
  selectCartItems,
} from "../CartSlice";
import { SHIPPING, TAXES } from "../../../constants";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { IndianRupee } from "lucide-react";

export const Cart = ({ checkout }) => {
  const items = useSelector(selectCartItems);
  const subtotal = items.reduce(
    (acc, item) => item.selectedWeightOption.price * item.quantity + acc,
    0
  );
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();
  const cartItemRemoveStatus = useSelector(selectCartItemRemoveStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (items.length === 0) {
      // navigate("/")
    }
  }, [items]);

  useEffect(() => {
    if (cartItemRemoveStatus === "fulfilled") {
      toast.success("Product removed from cart");
    } else if (cartItemRemoveStatus === "rejected") {
      toast.error("Error removing product from cart, please try again later");
    }
  }, [cartItemRemoveStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetCartItemRemoveStatus());
    };
  }, []);

  return (
    <div className="flex flex-col items-center mb-20">
      <div
        className={`w-full ${
          checkout ? "px-0" : "px-4"
        } mt-12 max-w-3xl space-y-8`}
      >
        {/* Cart items */}
        <div className="space-y-4">
          {items &&
            items.map((item) => {
              return (
                <CartItem
                  key={item._id}
                  id={item._id}
                  title={item.product.title}
                  brand={item.product.brand.name}
                  category={item.product.category.name}
                  price={item.selectedWeightOption.price}
                  quantity={item.quantity}
                  thumbnail={item.product.thumbnail}
                  stockQuantity={item.product.stockQuantity}
                  productId={item.product._id}
                />
              );
            })}
        </div>

        {/* Subtotal */}
        <div className="flex flex-col space-y-4">
          {checkout ? (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${SHIPPING.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${TAXES.toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${(subtotal + SHIPPING + TAXES).toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-medium">Subtotal</p>
                <p>Total items in cart: {totalItems}</p>
                <p className="text-gray-500 text-sm">
                  Shipping and taxes will be calculated at checkout.
                </p>
              </div>
              <div>
                <p className="text-lg font-medium flex items-center">
                  <IndianRupee size={20} />
                  {subtotal.toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Checkout or Continue Shopping */}
        {!checkout && (
          <div className="space-y-4">
            <Link to="/checkout">
              <button className="w-full py-2 px-4 bg-secondary text-white rounded ">
                Checkout
              </button>
            </Link>
            <div className="text-center mt-10">
              <Link to="/">
                <Button className="py-2 px-4 border border-gray-300 rounded cursor-pointer">
                  or continue shopping
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
