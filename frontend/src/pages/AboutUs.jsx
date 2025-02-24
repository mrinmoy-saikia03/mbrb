import React from "react";
import {
  MapPin,
  Award,
  Truck,
  Users,
  ArrowRight,
  Star,
  Clock,
  Shield,
  Leaf,
} from "lucide-react";
import aboutUsGulabJamun from "./../assets/images/abousUsGulabJamun.jpg";
import aboutUsChef from "./../assets/images/aboutUsChep.jpg";
import aboutUsBanner from "./../assets/images/AboutUsBanner.webp";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative h-[600px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url("${aboutUsBanner}")`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-white max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Crafting Sweet Moments Since 2008
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                From the heart of Rajasthan to homes across India, we bring you
                authentic sweets made with time-honored recipes and the finest
                ingredients.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={"/sweets"}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition-all"
                >
                  Explore Our Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "15+", label: "Years of Excellence" },
              { number: "50+", label: "Sweet Varieties" },
              { number: "10K+", label: "Happy Customers" },
              { number: "25+", label: "Cities Served" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Legacy Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Legacy of Authenticity & Excellence
              </h2>
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  Since our humble beginnings in 2008, MBRB Sweets has been more
                  than just a sweets manufacturer – we've been creators of
                  moments, memories, and traditions.
                </p>
                <p>
                  Our journey began in a small kitchen in Jaipur, where our
                  founder's passion for preserving authentic Rajasthani recipes
                  met with a vision to share these delicacies with the world.
                  Today, we stand as one of Rajasthan's most trusted names in
                  traditional sweets and premium raw materials.
                </p>
                <p>
                  Every sweet that leaves our kitchen carries with it the warmth
                  of tradition, the excellence of craftsmanship, and our
                  commitment to quality that has earned us the trust of
                  thousands of families across India.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                  <Star className="h-8 w-8 text-orange-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">
                    Premium Quality
                  </h3>
                  <p className="text-sm text-gray-600">
                    Only the finest ingredients make it to our kitchen
                  </p>
                </div>
                <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                  <Shield className="h-8 w-8 text-orange-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Food Safety</h3>
                  <p className="text-sm text-gray-600">
                    FSSAI certified facilities and processes
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 grid grid-cols-1 gap-8">
              <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
                <img
                  src={aboutUsChef}
                  alt="Traditional sweets display"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
                <img
                  src={aboutUsGulabJamun}
                  alt="Chef preparing sweets"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Process Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Our Commitment to Excellence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Leaf className="h-12 w-12 text-orange-600" />,
                title: "Ingredient Selection",
                description:
                  "We source the finest ingredients directly from trusted farmers and suppliers, ensuring every component meets our strict quality standards.",
              },
              {
                icon: <Clock className="h-12 w-12 text-orange-600" />,
                title: "Traditional Methods",
                description:
                  "Our master craftsmen follow time-honored recipes and techniques, taking no shortcuts in the pursuit of authentic taste.",
              },
              {
                icon: <Shield className="h-12 w-12 text-orange-600" />,
                title: "Quality Control",
                description:
                  "Every batch undergoes rigorous quality checks before reaching our customers, ensuring consistent excellence in every bite.",
              },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-6">{process.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{process.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="h-10 w-10 text-orange-600" />,
                title: "15+ Years of Expertise",
                description:
                  "A legacy built on trust, quality, and continuous innovation in traditional sweets.",
              },
              {
                icon: <Users className="h-10 w-10 text-orange-600" />,
                title: "Master Craftsmen",
                description:
                  "Our team of experienced artisans brings generations of expertise to every creation.",
              },
              {
                icon: <MapPin className="h-10 w-10 text-orange-600" />,
                title: "10+ Premium Outlets",
                description:
                  "Strategically located stores across Rajasthan for your convenience.",
              },
              {
                icon: <Truck className="h-10 w-10 text-orange-600" />,
                title: "Pan-India Delivery",
                description:
                  "Swift and secure delivery to your doorstep anywhere in India.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "The best Rajasthani sweets I've ever had! Their attention to detail and quality is unmatched. Every celebration at our home is incomplete without MBRB Sweets.",
                author: "Priya Sharma",
                position: "Regular Customer",
              },
              {
                text: "As a business owner, I appreciate their professionalism and consistency. Their bulk order handling and timely delivery have made them our go-to supplier for corporate gifts.",
                author: "Rajesh Kumar",
                position: "Business Client",
              },
              {
                text: "The authentic taste of their sweets reminds me of my childhood in Rajasthan. It's heartwarming to find such quality and tradition being maintained so beautifully.",
                author: "Amit Singhania",
                position: "Food Critic",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 text-orange-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Get in Touch with Us!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Whether you're planning a special celebration, looking for bulk
              orders, or simply want to learn more about our products, we're
              here to help.
            </p>
            <div className="bg-orange-50 p-8 rounded-2xl mb-8">
              <p className="text-lg text-gray-800 mb-4">
                Visit us at any of our premium outlets or reach out at:
              </p>
              <div className="space-y-4">
                <a
                  href="tel:6350127930"
                  className="block text-xl text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                >
                  +91 6350127930
                </a>
                <a
                  href="mailto:enquiry@mbrb.in"
                  className="block text-xl text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                >
                  enquiry@mbrb.in
                </a>
                <p className="text-gray-600">
                  GVM Road, Girdhar Market,
                  <br />
                  Near Bus Stand Sardarshaher,
                  <br />
                  Churu, Rajasthan, 331403
                </p>
                <p className="mt-4 text-gray-600">
                  Business Hours: Monday - Sunday, 8:00 AM - 9:00 PM
                </p>
              </div>
            </div>
            <Link
              to={"/sweets"}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-full inline-flex items-center transition-all"
            >
              Explore Our Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
