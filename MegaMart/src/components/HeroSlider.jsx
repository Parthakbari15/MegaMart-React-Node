import { useState } from "react";
import { heroSlides } from "../data/dummyData.js";

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const total = heroSlides.length;

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6 relative">
      {/* Slider */}
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {heroSlides.map((slide) => (
            <div
              key={slide.id}
              className="min-w-full bg-[#1E293B] text-white p-8 flex flex-col md:flex-row items-center justify-between"
            >
              {/* Text */}
              <div>
                <p className="text-sm opacity-90">{slide.subtitle}</p>
                <h1 className="text-3xl md:text-4xl font-bold mt-2">
                  {slide.title}
                </h1>
                <p className="mt-2">{slide.offer}</p>
              </div>

              {/* Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="mt-6 md:mt-0 h-44 md:h-56 object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-gray-800 w-10 h-10 rounded-full shadow flex items-center justify-center hover:bg-gray-100"
      >
        ❮
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-gray-800 w-10 h-10 rounded-full shadow flex items-center justify-center hover:bg-gray-100"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {heroSlides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
              current === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
