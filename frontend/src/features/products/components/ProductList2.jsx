import React from "react";
import ProductCard2 from "./ProductCard2";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
const ProductList2 = () => {
  return (
    <>
      <section class="body-font">
        <div class="text-xl md:text-2xl lg:text-5xl  font-semibold text-center mt-10 xl:mt-20 flex justify-between border-b mx-5 lg:mx-16 ">
          <p className="md:pb-2">Our Best Sellers</p>
          <div className="hover-underline-animation-black">
            <Link
              to={"/sweets"}
              className="flex items-center gap-x-2 group text-lg md:text-2xl lg:text-4xl "
            >
              <p className="">View More</p>
              <MoveRight className="rotate-[-45deg] group-hover:rotate-0 transition duration-200" />
            </Link>
          </div>
        </div>
        <div class="container px-5 pb-5 pt-3 md:pt-5 md:pb-10 lg:pb-16 mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-7">
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
          </div>
          <div className="grid place-items-center">
            <Link
              to={"/sweets"}
              className="text-center text-lg border-b border-black mt-5 xl:hidden flex justify-center items-center gap-x-2"
            >
              View All <MoveRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductList2;
