import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRight } from "lucide-react";
import {
  fetchProductsAsync,
  selectProductFetchStatus,
  selectProducts,
  selectProductTotalResults,
} from "../ProductSlice";
import ProductCard2 from "./ProductCard2";
import Filter from "./Filter";
import Pagination from "@mui/material/Pagination";
import { ITEMS_PER_PAGE } from "../../../constants";
import { toast } from "react-toastify";

const ProductCatalogue = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();

  // Redux state selectors
  const products = useSelector(selectProducts);
  const totalResults = useSelector(selectProductTotalResults);
  const productFetchStatus = useSelector(selectProductFetchStatus);






  return (
    <section className="text-gray-600 body-font">
      <div className="container md:px-5 pt-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-10 items-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 flex items-start md:items-center md:gap-x-5 px-3">
            <img
              width="45"
              height="32"
              src="https://img.icons8.com/retro/32/naan.png"
              alt="naan"
              className="mt-2 md:mt-0"
            />{" "}
            Discover our wide range of Sweets
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/parakeet/48/pie.png"
              alt="pie"
            />
          </h1>
          <h2 className="text-md text-ternary tracking-widest font-medium title-font mt-2 flex items-center">
            Home <ChevronRight /> Sweets
          </h2>
        </div>

        <Filter setFilters={setFilters} />

        {/* Loading Spinner */}
        {productFetchStatus === "pending" && (
          <div className="flex justify-center mt-4">
            <div className="animate-spin rounded-full border-t-4 border-blue-500 w-12 h-12" />
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2 md:gap-x-2 gap-y-7 mt-5">
          {productFetchStatus === "fullfilled" &&
            products.map((product) => (
              <ProductCard2 key={product._id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCatalogue;
