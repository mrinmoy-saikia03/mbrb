import React from "react";
import { Button, Rating } from "@material-tailwind/react";
import Quantity from "./Quantity";
import ProductImageSwiper from "./ProductImageSwiper";
import { Truck, Clock } from "lucide-react";
const ProductInfo = () => {
  return (
    <section class="text-gray-600 body-font overflow-hidden">
      <div class="px-5 py-24">
        <div class="xl:w-4/5 mx-auto lg:flex">
          <div>
            <ProductImageSwiper />
          </div>
          <div className="flex-1 lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest">
              Category
            </h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
              The Catcher in the Rye
            </h1>
            <div class="flex mb-4">
              <span class="flex items-center">
                <Rating value={4} readonly />
                <span class="text-gray-600 ml-3">4 Reviews</span>
              </span>
            </div>

            <div class="flex mt-5 p-3 pb-5">
              <p class="title-font font-medium text-2xl text-gray-900">
                $58.00
              </p>
              <select class="ml-5 lg:ml-auto text-sm border-2 border-secondary w-3/4 bg-transparent rounded">
                <option>250g - Rs 500</option>
                <option>500g - Rs 1000</option>
              </select>
            </div>
            <div className=" border-b pb-5 border-cta">
              <Quantity />
            </div>
            <div className="flex flex-col lg:flex-row gap-2 mt-5 w-full">
              <Button className="flex-1 w-full ml-auto text-center text-white bg-ternary border-0 py-4 tracking-widest px-6 rounded">
                Buy Now
              </Button>
              <Button className="flex-1 w-full ml-auto text-center text-white bg-secondary border-0 py-4 tracking-widest px-6  rounded">
                Add to Cart
              </Button>
            </div>
            <p class="leading-relaxed mt-5">
              Fam locavore kickstarter distillery. Mixtape chillwave tumeric
              sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
              juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
              seitan poutine tumeric. Gastropub blue bottle austin listicle
              pour-over, neutra jean shorts keytar banjo tattooed umami
              cardigan.
            </p>
            <ul className="py-3">
              <li className="py-2">
                <span className="font-semibold">Ingredients</span>: Milk , Sugar
                , Ghee
              </li>
              <li className="py-2">
                <span className="font-semibold">Shelf Life</span>: 5 Days
              </li>
              <li className="py-2">
                <span className="font-semibold">Pieces(1kg)</span>: 30 Approx
              </li>
            </ul>
            <div className="flex gap-x-2 border-t border-cta text-ternary pt-3 items-center justify-center">
              <Clock /> Order Now to get it delivered by 7th December,2024 (ETA){" "}
              <Truck />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
