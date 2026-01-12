import React from "react";
import HeroSlider from "../components/HeroSlider";
import ProductSection from "../components/ProductSection";
import CategorySection from "../components/CategorySection";


const Home = () => {
  return (
    <div>
      <HeroSlider />
      <ProductSection />
      <CategorySection />
      <ProductSection />
      <ProductSection />
      <CategorySection />
    </div>
  );
};

export default Home;
