import React from "react";
import TopBanner from "../features/navigation/components/TopBanner";
import Navbar2 from "../features/navigation/components/Navbar2";
import HeroCarousel from "../features/navigation/components/HeroCarousel";
import { Footer } from "../features/footer/Footer";
import ProductList2 from "../features/products/components/ProductList2";

const Homepage2 = () => {
  return (
    <div className="w-full bg-primary">
      <TopBanner />
      <Navbar2 />
      <HeroCarousel />
      <ProductList2 />
      <Footer />
    </div>
  );
};

export default Homepage2;
