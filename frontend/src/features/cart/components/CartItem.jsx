import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCartItemByIdAsync, updateCartItemByIdAsync } from "../CartSlice";
import { IndianRupee } from "lucide-react";

export const CartItem = ({
  id,
  thumbnail,
  title,
  category,
  brand,
  price,
  quantity,
  stockQuantity,
  productId,
}) => {
  const dispatch = useDispatch();
  const handleAddQty = () => {
    const update = { _id: id, quantity: quantity + 1 };
    dispatch(updateCartItemByIdAsync(update));
  };

  const handleRemoveQty = () => {
    if (quantity === 1) {
      dispatch(deleteCartItemByIdAsync(id));
    } else {
      const update = { _id: id, quantity: quantity - 1 };
      dispatch(updateCartItemByIdAsync(update));
    }
  };

  const handleProductRemove = () => {
    dispatch(deleteCartItemByIdAsync(id));
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 shadow-md rounded-lg">
      {/* Image and Details */}
      <div className="flex flex-col md:flex-row items-center space-x-4">
        <Link
          to={`/product-details/${productId}`}
          className="w-32 h-32 flex-shrink-0"
        >
          <img
            src={thumbnail}
            alt={`${title} image unavailable`}
            className="w-full h-full object-contain rounded-lg"
          />
        </Link>

        <div className="text-center md:text-left">
          <Link
            to={`/product-details/${productId}`}
            className="text-blue-600 font-semibold text-lg hover:underline"
          >
            {title}
          </Link>
          <p className="text-gray-500 text-sm">{brand}</p>
          <p className="mt-2 text-gray-700">Quantity</p>
          <div className="flex items-center justify-center md:justify-start space-x-2 mt-1">
            <button
              onClick={handleRemoveQty}
              className="p-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={handleAddQty}
              className="p-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Price and Remove Button */}
      <div className="flex flex-col items-end space-y-4 mt-4 md:mt-0">
        <p className="text-gray-700 font-medium flex items-center">
          <IndianRupee size={20} />
          {price}
        </p>
        <button
          onClick={handleProductRemove}
          className="py-1 px-4 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
