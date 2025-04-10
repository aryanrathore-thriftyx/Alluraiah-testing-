import { Helmet } from 'react-helmet';
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhyChooseUs from "../components/WhyChooseUs";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Alluraiah Sweets</title>
        <meta name="description" content="Learn about our journey, values, and commitment to authentic Indian sweets and snacks." />
      </Helmet>
      
      {/* Hero Section */}
      <div className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Our Sweet Journey</h1>
            <p className="text-xl text-muted-foreground">
              Bringing traditional Indian sweets and snacks to your doorstep since 1992.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Story */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                <span className="border-b-2 border-primary pb-1">Who We Are</span>
              </h2>
              <h3 className="text-xl md:text-2xl text-primary mb-4">Our Journey</h3>
              <p className="text-muted-foreground mb-6">
                For over three decades, Alluraiah Sweets has been a name synonymous with authentic traditions. What started as a humble shop has transformed into a beloved brand, carrying generations-old recipes and perfection-quality ingredients.
              </p>
              <p className="text-muted-foreground mb-8">
                Heart and craftsmanship have guided our sweet-making journey for more than 30 years. Every creation is a testament to our unwavering dedication to preserving authentic flavors while embracing innovation with unique traditional recipes.
              </p>
              <p className="text-muted-foreground mb-8">
                We take immense pride in sourcing the finest ingredients from trusted suppliers across India. Our ghee comes from the pristine valleys of the north, our nuts and spices from selected farms, and our recipes from the treasured family cookbook of our founder.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1607877108019-5a1c237fc498?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&h=500&q=80" 
                  alt="Traditional sweet making" 
                  className="w-full h-auto rounded-lg custom-shadow"
                />
                <div className="absolute -bottom-5 -left-5 bg-primary text-primary-foreground p-4 rounded-lg hidden md:block">
                  <div className="font-bold text-2xl">30+</div>
                  <div className="text-sm">Years of Sweet Legacy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              <span className="border-b-2 border-primary pb-1">Our Mission & Vision</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To preserve the authentic taste of traditional Indian sweets and snacks while adapting to modern needs and preferences. We strive to bring the joy of homemade Indian delicacies to every household, maintaining the highest standards of quality and taste.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To become the most trusted name in Indian sweets and snacks globally, known for our commitment to authenticity, quality, and customer satisfaction. We envision a world where the rich culinary heritage of India is appreciated and enjoyed worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <WhyChooseUs />
      
      {/* Our Team */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              <span className="border-b-2 border-primary pb-1">Meet Our Experts</span>
            </h2>
            <p className="text-muted-foreground">
              Behind every sweet is a team of dedicated professionals committed to preserving tradition and ensuring quality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="https://randomuser.me/api/portraits/men/47.jpg" 
                  alt="Rajesh Sharma" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">Rajesh Sharma</h3>
              <p className="text-primary">Master Chef</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="https://randomuser.me/api/portraits/women/33.jpg" 
                  alt="Priya Patel" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">Priya Patel</h3>
              <p className="text-primary">Quality Manager</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src="https://randomuser.me/api/portraits/men/72.jpg" 
                  alt="Vikram Singh" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">Vikram Singh</h3>
              <p className="text-primary">Product Innovation</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Ready to Experience Authentic Flavors?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore our wide range of authentic Indian sweets, namkeens, and pickles made with love and tradition.
          </p>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="/shop">
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
