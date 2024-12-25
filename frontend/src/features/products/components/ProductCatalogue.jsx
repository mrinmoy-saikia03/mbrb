import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRight, Package } from "lucide-react";
import { Alert, Typography } from "@material-tailwind/react";
import {
  fetchProductsAsync,
  resetProductFetchStatus,
  selectProductFetchStatus,
  selectProducts,
} from "../ProductSlice";
import ProductCard2 from "./ProductCard2";
import Filter from "./Filter";
import { ProductSkeleton } from "./Skeletons";
import { Link } from "react-router-dom";

const ProductCatalogue = () => {
  const products = useSelector(selectProducts);
  const productFetchStatus = useSelector(selectProductFetchStatus);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);
  const renderContent = () => {
    switch (productFetchStatus) {
      case "pending":
        return (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        );
      case "rejected":
        return (
          <Alert
            variant="gradient"
            color="red"
            className="mx-auto max-w-md text-center mt-8"
            icon={<Package className="h-6 w-6" />}
          >
            <Typography variant="h6" color="white">
              Failed to load products. Kindly refresh to try again.
            </Typography>
          </Alert>
        );
      case "fulfilled":
        return (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard2 key={product._id} product={product} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              width="45"
              height="32"
              src="https://img.icons8.com/retro/32/naan.png"
              alt="naan"
              className="animate-bounce"
            />
            <Typography
              variant="h1"
              className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              Discover our Sweets
            </Typography>
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/parakeet/48/pie.png"
              alt="pie"
              className="animate-bounce"
            />
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Link
              to={"/home"}
              className="hover:text-blue-500 transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-gray-900">Sweets</span>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <Filter />
        </div>

        {/* Products Grid with Loading States */}
        <div className="relative">{renderContent()}</div>
      </div>
    </section>
  );
};

export default ProductCatalogue;
