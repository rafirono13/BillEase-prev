import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Link } from "react-router";
import {
  FiCreditCard,
  FiBarChart2,
  FiShield,
  FiSmartphone,
  FiChevronsDown,
  FiInfo,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";

const HeroCarousel = () => {
  return (
    <div className="relative max-h-[800px] h-[700px] w-full">
      <div className="h-full w-full rounded-3xl shadow-blue-400 shadow-2xl overflow-hidden">
        <Swiper
          direction={"vertical"}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          modules={[Mousewheel, Pagination, EffectFade]}
          className="h-full w-full"
        >
          <SwiperSlide className="bg-gradient-to-b from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] text-white flex justify-center items-center px-6 text-center">
            <div className="max-w-2xl mx-auto mt-20">
              <FiCreditCard className="text-6xl md:text-7xl text-sky-200 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Welcome to <span className="text-sky-200">BillEase</span>!
              </h1>
              <p className="text-lg md:text-xl text-slate-100 mb-8 max-w-lg mx-auto">
                Tired of juggling due dates? Manage all your utilities
                effortlessly in one secure, simple place.
              </p>
              <Link to="/about">
                <button className="btn btn-lg bg-white text-[#3b82f6] hover:bg-sky-100 shadow-xl transition-all duration-300 transform hover:scale-105">
                  <FiInfo className="mr-2" /> Learn More
                </button>
              </Link>
            </div>
          </SwiperSlide>

          <SwiperSlide className="bg-gradient-to-b from-[#164e63] via-[#1e3a8a] to-[#0c4a6e] text-white flex justify-center items-center px-6 text-center">
            <div className="max-w-2xl mx-auto mt-20">
              <FiBarChart2 className="text-6xl md:text-7xl text-teal-300 mx-auto mb-6" />

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-snug">
                Smart Features, Simple Payments.
              </h2>
              <p className="text-md md:text-lg text-slate-200 mb-8 max-w-md mx-auto">
                BillEase streamlines your finances with:
              </p>
              <ul className="space-y-3 text-md md:text-lg text-slate-100 max-w-[300px] mx-auto flex flex-col">
                <li className="flex items-center">
                  <FiCreditCard className="mr-3 text-xl text-teal-300 flex-shrink-0" />
                  Unified bill dashboard
                </li>
                <li className="flex items-center">
                  <FiShield className="mr-3 text-xl text-teal-300 flex-shrink-0" />
                  Secure & seamless payments
                </li>
                <li className="flex items-center">
                  <FiSmartphone className="mr-3 text-xl text-teal-300 flex-shrink-0" />
                  Access anywhere, anytime
                </li>
              </ul>
              <div className="mt-10">
                <Link to="/auth/register">
                  <button className="btn btn-outline btn-lg border-teal-300 text-teal-300 hover:bg-teal-300 hover:text-[#164e63] transition-all duration-300 transform hover:scale-105">
                    <FiUserPlus className="mr-2" /> Get Started Free
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155] text-white flex justify-center items-center px-6 text-center">
            <div className="max-w-2xl mx-auto mt-20">
              <FiLogIn className="text-6xl md:text-7xl text-slate-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-snug">
                Take Control. Pay Smart. Live Easy.
              </h2>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-lg mx-auto">
                Join BillEase today. Say goodbye to late fees and hello to
                financial peace of mind.
              </p>
              <Link to="/auth/login">
                <button className="btn btn-lg bg-slate-300 text-[#0f172a] hover:bg-slate-200 shadow-xl transition-all duration-300 transform hover:scale-105">
                  Login & Manage Bills
                </button>
              </Link>
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
