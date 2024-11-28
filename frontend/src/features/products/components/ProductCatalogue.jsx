import React from "react";
import Filter from "./Filter";
import { ChevronRight } from "lucide-react";
import ProductCard2 from "./ProductCard2";
const ProductCatalogue = () => {
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-10 mx-auto">
        <div class="flex flex-col text-center w-full mb-10 items-center">
          <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 flex items-center gap-x-5">
            <img
              width="45"
              height="32"
              src="https://img.icons8.com/retro/32/naan.png"
              alt="naan"
            />{" "}
            Discover our wide range of Sweets
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/parakeet/48/pie.png"
              alt="pie"
            />
          </h1>
          <h2 class="text-md text-ternary tracking-widest font-medium title-font mt-2 flex items-center">
            Home <ChevronRight /> Sweets
          </h2>
        </div>
        <Filter />
        <div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-7">
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalogue;
