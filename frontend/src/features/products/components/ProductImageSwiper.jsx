import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ProductImageSwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Main Swiper */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="swiper"
      >
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            alt="Nature 1"
            className="object-cover w-full h-56 md:h-64 lg:h-72 rounded"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-2.jpg"
            alt="Nature 2"
            className="object-cover w-full h-56 md:h-64 lg:h-72 rounded"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-3.jpg"
            alt="Nature 3"
            className="object-cover w-full h-56 md:h-64 lg:h-72 rounded"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-4.jpg"
            alt="Nature 4"
            className="object-cover w-full h-56 md:h-64 lg:h-72 rounded"
          />
        </SwiperSlide>
      </Swiper>

      {/* Thumbnail Swiper */}
      <div className="mt-4">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="productImageSwiper2"
        >
          <SwiperSlide>
            <img
              className="object-cover w-16 h-12 md:w-20 md:h-16 rounded"
              src="https://swiperjs.com/demos/images/nature-1.jpg"
              alt="Thumb 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="object-cover w-16 h-12 md:w-20 md:h-16 rounded"
              src="https://swiperjs.com/demos/images/nature-2.jpg"
              alt="Thumb 2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="object-cover w-16 h-12 md:w-20 md:h-16 rounded"
              src="https://swiperjs.com/demos/images/nature-3.jpg"
              alt="Thumb 3"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="object-cover w-16 h-12 md:w-20 md:h-16 rounded"
              src="https://swiperjs.com/demos/images/nature-4.jpg"
              alt="Thumb 4"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
