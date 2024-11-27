import { IndianRupee, Star } from "lucide-react";
import React from "react";

const ProductCard2 = () => {
  return (
    <>
      <div className="relative w-full flex flex-col overflow-hidden rounded-lg">
        <div
          className="relative mt-3 flex h-80 overflow-hidden rounded-lg border"
          href="#"
        >
          <img
            className="w-full"
            src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
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
          <div className="mt-3 mb-5 flex items-center justify-between">
            <p>
              <span className="text-xl font-medium tracking-tighter text-slate-900 flex items-center">
                <IndianRupee />
                449
              </span>
            </p>
          </div>
          
          <button className="w-full flex items-center justify-center rounded-md bg-cta px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
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
