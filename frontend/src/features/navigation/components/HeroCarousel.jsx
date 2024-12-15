import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroCarousel = () => {
  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];

  const arrows = {
    prevArrow: (
      <button className="bg-transparent -mt-10 ml-5 hidden lg:block">
        <ChevronLeft size={40} className="text-white" strokeWidth={1} />
      </button>
    ),
    nextArrow: (
      <button className="bg-transparent -mt-10 mr-5 hidden lg:block">
        <ChevronRight size={40} className="text-white" strokeWidth={1} />
      </button>
    ),
  };

  return (
    <Fade
      scale={1.4}
      autoplay={true}
      infinite
      arrows
      transitionDuration={500}
      canSwipe
      indicators={(index) => <div className="indicator"></div>}
      {...arrows}
    >
      {images.map((each, index) => (
        <div key={index} style={{ width: "100%" }}>
          <img
            className="h-[63vh] xl:h-[70vh] w-full"
            alt="Slide Image"
            src={each}
          />
        </div>
      ))}
    </Fade>
  );
};

export default HeroCarousel;
