import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets_frontend";
// import { assets_frontend } from "../assets/assets_frontend";
const Navbar = () => {
  const navigate = useNavigate();

  // const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm mb-5 pt-4 border-b border-b-gray-400 ">
      <img className="w-44 cursor-pointer" src="" alt="Swa" />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li py-1>Home</li>
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF w-3/5 m-auto" />
        </NavLink>
        <NavLink to="/doctors">
          <li py-1>All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto" />
        </NavLink>
        <NavLink to="/about">
          <li py-1>About</li>
          <hr className="border-none outline-none h-0.5  w-3/5 m-auto" />
        </NavLink>
        <NavLink to="/contact">
          <li py-1>Contact</li>
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img width={50} height={50} src="/navimage/profile.jpg" alt="" />
            <img src="/navimage/dropdown_icon.svg" alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-200 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointment
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-light md:block "
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
