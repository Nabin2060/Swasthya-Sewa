import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { FaArrowRight, FaUserPlus } from "react-icons/fa";

const Banner = () => {
  //   const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl px-6 md:px-12 my-20 md:mx-10 overflow-hidden">
      {/* left side */}
      <div className="flex-1 py-8 sm:py-10 lg:py-16">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
          <h1 className="leading-tight">
            Book Appointment with
            <br />
            <span className="text-yellow-300">100+ Trusted Doctors</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-blue-100">
            Get the best medical care from our experienced professionals
          </p>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link to="/doctors" className="group">
            <button className="w-full sm:w-auto bg-white text-blue-600 text-sm sm:text-base font-medium px-8 py-3 rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 group-hover:gap-3">
              Book Now
              <FaArrowRight className="transition-all duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
          <Link to="/login" className="group">
            <button className="w-full sm:w-auto bg-transparent border-2 border-white text-white text-sm sm:text-base font-medium px-8 py-3 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center gap-2 group-hover:gap-3">
              Create Account
              <FaUserPlus className="transition-all duration-300 group-hover:scale-110" />
            </button>
          </Link>
        </div>
      </div>

      {/* right side */}
      <div className="hidden md:block md:w-1/2 lg:w-[45%] relative">
        <div className="absolute bottom-0 right-0 w-full h-full">
          <img
            className="w-full h-full object-contain"
            src={assets.appointment_img}
            alt="Doctor consultation"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
