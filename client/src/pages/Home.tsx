import { Helmet } from 'react-helmet';
import HeroCarousel from "../components/HeroCarousel";
import FeaturedProducts from "../components/FeaturedProducts";
import TaglineBanner from "../components/TaglineBanner";
import ProductList from "../components/ProductList";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import WhoAreWe from "../components/WhoAreWe";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Alluraiah Sweets | Authentic Indian Sweets & Namkeens</title>
        <meta name="description" content="Discover authentic Indian sweets, namkeens, and traditional pickles crafted with love at Alluraiah Sweets." />
      </Helmet>
      
      {/* Hero Section */}
      <HeroCarousel />
      
      {/* Product List (includes both stats bar and featured tabs) */}
      <ProductList />
      
      {/* Who Are We with Video */}
      <WhoAreWe />
      
      {/* Why Choose Us */}
      <WhyChooseUs />
      
      {/* Testimonials */}
      <Testimonials />
    </>
  );
}
