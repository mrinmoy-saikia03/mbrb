import { IndianRupee, Star } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAsync,
  deleteCartItemByIdAsync,
  selectCartItems,
} from "../../cart/CartSlice";
import { toast } from "react-toastify";

const ProductCard2 = ({ product }) => {
  const { _id, title, price, thumbnail, rating, weightOptions } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [selectedWeightOption, setSelectedWeightOption] = useState(
    weightOptions[0] || {}
  );
  const [isInCart, setIsInCart] = useState(false);
  const [cartItemId, setCartItemId] = useState(null);

  // Check if product is already in the cart
  useEffect(() => {
    const cartItem = cartItems.find(
      (item) =>
        item.product._id === _id &&
        item.selectedWeightOption._id === selectedWeightOption._id
    );

    if (cartItem) {
      setIsInCart(true);
      setCartItemId(cartItem._id);
    } else {
      setIsInCart(false);
      setCartItemId(null);
    }
  }, [cartItems, _id, selectedWeightOption]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const item = {
      user: "user_id", // Replace with logged-in user ID
      product: _id,
      quantity: 1,
      selectedWeightOption: selectedWeightOption,
    };
    dispatch(addToCartAsync(item));
    toast.success(`${title} added to cart`);
  };

  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    if (cartItemId) {
      dispatch(deleteCartItemByIdAsync(cartItemId));
      toast.info(`${title} removed from cart`);
    }
  };

  const handleWeightChange = (e) => {
    const weightOption = weightOptions.find(
      (opt) => opt._id === e.target.value
    );
    setSelectedWeightOption(weightOption);
  };

  return (
    <Link to={`/sweets/${_id}`}>
      <div className="relative w-full flex flex-col overflow-hidden rounded-lg border border-transparent transition duration-200 hover:bg-secondary/10 hover:border-secondary px-3">
        {/* Product Image */}
        <div className="relative mt-3 flex h-48 sm:h-60 md:h-72 lg:h-80 overflow-hidden rounded-lg border">
          <img
            className="w-full object-cover"
            src={thumbnail || "https://via.placeholder.com/535x535.png"} // Fallback image if no image is provided
            alt={title}
          />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-cta text-center text-xs sm:text-sm font-medium text-white flex items-center gap-x-1 p-1 px-2 sm:p-2 sm:px-3">
            {rating} <Star className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
        </div>

        {/* Product Info */}
        <div className="mt-4 pb-5">
          <div className="px-2">
            <h5 className="text-base sm:text-lg md:text-xl font-medium tracking-tight text-slate-900">
              {title || "Product Name"}
            </h5>
          </div>

          <div className="px-2 mt-3 mb-5 flex items-center justify-between">
            <p className="flex items-center text-slate-900">
              <span className="text-base sm:text-lg md:text-xl font-medium tracking-tighter flex items-center">
                <IndianRupee className="h-4 w-4 sm:h-5 sm:w-5" />
                {selectedWeightOption.price || price || 0}
              </span>
            </p>
          </div>

          {/* Weight Selector */}
          <div className="mb-3" onClick={(e) => e.preventDefault()}>
            <select
              className="border text-xs sm:text-sm bg-secondary/20 border-secondary rounded-lg text-black w-full p-2 cursor-pointer"
              onChange={handleWeightChange}
              value={selectedWeightOption._id}
            >
              {weightOptions &&
                weightOptions.map((opt, index) => (
                  <option key={index} value={opt._id}>
                    {opt.weight + "gm : " + opt.price + "Rs"}
                  </option>
                ))}
            </select>
          </div>

          {/* Add/Remove from Cart Button */}
          {isInCart ? (
            <button
              onClick={handleRemoveFromCart}
              className="w-full flex items-center justify-center rounded-md bg-red-500 px-3 py-2 sm:px-4 sm:py-2.5 text-center text-xs sm:text-sm font-medium text-white hover:bg-red-600"
            >
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center rounded-md bg-secondary px-3 py-2 sm:px-4 sm:py-2.5 text-center text-xs sm:text-sm font-medium text-white hover:bg-gray-700"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard2;
