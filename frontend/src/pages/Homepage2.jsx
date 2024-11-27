import React from "react";
import TopBanner from "../features/navigation/components/TopBanner";
import Navbar2 from "../features/navigation/components/Navbar2";
import HeroCarousel from "../features/navigation/components/HeroCarousel";
import { Footer } from "../features/footer/Footer";
import ProductList2 from "../features/products/components/ProductList2";
import USPbanner from "../features/navigation/components/USPbanner";
import StatsSection from "../features/navigation/components/StatsSection";
import OurStory from "../features/navigation/components/OurStory";
import JoinUs from "../features/navigation/components/JoinUs";
const Homepage2 = () => {
  return (
    <div className="w-full bg-primary">
      <TopBanner />
      <Navbar2 />
      <HeroCarousel />
      <ProductList2 />
      <USPbanner />
      <StatsSection />
      <OurStory />
      <JoinUs />
      <Footer />
    </div>
  );
};

export default Homepage2;
