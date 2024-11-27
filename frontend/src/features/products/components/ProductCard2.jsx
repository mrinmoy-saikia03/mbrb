import { IndianRupee, Star } from "lucide-react";
import React from "react";

const ProductCard2 = () => {
  return (
    <>
      <div className="relative w-full flex flex-col overflow-hidden rounded-lg border border-transparent transition duration-200 hover:bg-secondary/10 hover:border-secondary px-3">
        <div
          className="relative mt-3 flex h-80 overflow-hidden rounded-lg border"
          href="#"
        >
          <img
            className="w-full"
            src="https://www.anandsweets.in/cdn/shop/products/MysorePak.png?v=1702370572&width=535"
            alt="product image"
          />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-cta text-center text-sm font-medium text-white flex items-center gap-x-1 p-2 px-3">
            5 <Star className="-mt-1" size={15} />
          </span>
        </div>
        <div className="mt-4 pb-5">
          <div className="px-2" href="#">
            <h5 className="text-xl tracking-tight text-slate-900">
              Nike Air MX Super 2500 - Red
            </h5>
          </div>
          <div className="px-2 mt-3 mb-5 flex items-center justify-between">
            <p>
              <span className="text-xl font-medium tracking-tighter text-slate-900 flex items-center">
                <IndianRupee />
                449
              </span>
            </p>
          </div>
          <div className="mb-3">
            <select className="border text-sm bg-secondary/20 border-secondary rounded-lg text-black w-full p-2 cursor-pointer">
              <option selected>500g</option>
              <option>1000g</option>
            </select>
          </div>
          <button className="w-full flex items-center justify-center rounded-md bg-secondary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard2;
