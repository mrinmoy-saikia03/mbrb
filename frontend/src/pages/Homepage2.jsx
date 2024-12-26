import React, { useEffect } from "react";
import HeroCarousel from "../features/navigation/components/HeroCarousel";
import ProductList2 from "../features/products/components/ProductList2";
import USPbanner from "../features/navigation/components/USPbanner";
import StatsSection from "../features/navigation/components/StatsSection";
import OurStory from "../features/navigation/components/OurStory";
import JoinUs from "../features/navigation/components/JoinUs";
const Homepage2 = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return (
    <div className="w-full bg-primary">
      <HeroCarousel />
      <ProductList2 isHome={true} />
      <USPbanner />
      <StatsSection />
      <OurStory />
      <JoinUs />
    </div>
  );
};

export default Homepage2;
