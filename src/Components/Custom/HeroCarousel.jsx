import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import { Link } from "react-router";

const HeroCarousel = () => {
  return (
    <div className=" relative max-h-[800px] h-[700px] w-full">
      <div className="h-full w-full rounded-3xl shadow-blue-400 shadow-2xl overflow-hidden">
        <Swiper
          direction={"vertical"}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          modules={[Mousewheel, Pagination]}
          className="h-full w-full"
        >
          {/* Slide 1 - Welcome */}
          <SwiperSlide className="bg-gradient-to-b from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] text-white text-center px-6">
            <div className="flex flex-col justify-center items-center py-50">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome to BillEase
              </h1>
              <p className="text-base md:text-lg max-w-xl mx-auto">
                Manage all your bills from one place — secure, simple, and
                always available. No more chaos.
              </p>
              <div className="mt-10">
                <Link to="/auth/login">
                  <button className="btn btn-wide btn-lg shadow-md transition hover:scale-105 duration-300">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 - Features */}
          <SwiperSlide className="bg-gradient-to-b from-[#164e63] via-[#1e3a8a] to-[#0c4a6e] text-white text-center px-6">
            <div className="flex flex-col justify-center items-center py-50">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need
              </h2>
              <ul className="text-sm md:text-base space-y-3 max-w-md mx-auto">
                <li>💡 Electricity, 💻 Internet, 🔥 Gas — all in one</li>
                <li>❄️ Clean, winter-themed design</li>
                <li>🛡️ Top-tier OTP & secure verification</li>
                <li>📱 Seamless mobile & desktop experience</li>
              </ul>
            </div>
          </SwiperSlide>

          {/* Slide 3 - CTA */}
          <SwiperSlide className="bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155] text-white text-center px-6">
            <div className="flex flex-col justify-center items-center py-50">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Ahead, Pay Smart
              </h2>
              <p className="text-base md:text-lg max-w-xl mb-6 mx-auto">
                Make late fees a thing of the past. With BillEase, payments are
                a tap away.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="absolute bottom-6 right-6 text-white flex items-center gap-2 animate-bounce z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <span className="text-sm md:text-base font-semibold">
            Scroll Down
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
