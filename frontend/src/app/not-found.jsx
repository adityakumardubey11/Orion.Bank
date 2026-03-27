
'use client';
import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import { EffectCoverflow } from 'swiper/modules';

const AboutPage = () => {
  const slides = Array.from({ length: 10 }, (_, i) => `/${i + 1}.png`);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10 px-4">
      <h1 className="text-5xl font-bold mb-10 text-center">About Us</h1>

      <div className="w-full max-w-6xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          effect="coverflow"
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: true,
          }}
          className="w-full h-[600px] md:h-[700px] lg:h-[800px]"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="object-contain w-full h-full rounded-xl shadow-2xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Link
        href="/"
        className="mt-12 px-6 py-3 bg-rose-600 hover:bg-rose-800 text-white font-semibold rounded-lg transition-all duration-300"
      >
        Go To Dashboard
      </Link>
    </div>
  );
};

export default AboutPage;
