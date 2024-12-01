import { IndianRupee, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
const ProductCard2 = () => {
  const addToCart = (e) => {
    e.preventDefault();
  };
  return (
    <Link to={"/sweets/123"}>
      <div className="relative w-full flex flex-col overflow-hidden rounded-lg border border-transparent transition duration-200 hover:bg-secondary/10 hover:border-secondary px-3">
        {/* Product Image */}
        <div className="relative mt-3 flex h-48 sm:h-60 md:h-72 lg:h-80 overflow-hidden rounded-lg border">
          <img
            className="w-full object-cover"
            src="https://www.anandsweets.in/cdn/shop/products/MysorePak.png?v=1702370572&width=535"
            alt="product image"
          />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-cta text-center text-xs sm:text-sm font-medium text-white flex items-center gap-x-1 p-1 px-2 sm:p-2 sm:px-3">
            5 <Star className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
        </div>

        {/* Product Info */}
        <div className="mt-4 pb-5">
          <div className="px-2">
            <h5 className="text-base sm:text-lg md:text-xl font-medium tracking-tight text-slate-900">
              Nike Air MX Super 2500 - Red
            </h5>
          </div>

          <div className="px-2 mt-3 mb-5 flex items-center justify-between">
            <p className="flex items-center text-slate-900">
              <span className="text-base sm:text-lg md:text-xl font-medium tracking-tighter flex items-center">
                <IndianRupee className="h-4 w-4 sm:h-5 sm:w-5" />
                449
              </span>
            </p>
          </div>

          {/* Size Selector */}
          <div className="mb-3" onClick={(e) => e.preventDefault()}>
            <select className="border text-xs sm:text-sm bg-secondary/20 border-secondary rounded-lg text-black w-full p-2 cursor-pointer">
              <option defaultValue>500g</option>
              <option>1000g</option>
            </select>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className="w-full flex items-center justify-center rounded-md bg-secondary px-3 py-2 sm:px-4 sm:py-2.5 text-center text-xs sm:text-sm font-medium text-white hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard2;
