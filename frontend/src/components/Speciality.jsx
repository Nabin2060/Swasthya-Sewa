import React from "react";
import { specialityData } from "../assets/assets_frontend/assets.js";
import { Link } from "react-router-dom";

const Speciality = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
      id="speciality"
    >
      <h1 className="text-3xl font-medium ">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => {
              scrollTo(0, 0);
            }}
            key={index}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col items-center p-4 hover:bg-gray-100 rounded-lg"
          >
            <img
              src={item.image}
              alt={item.speciality}
              className="w-24 h-24 object-cover"
            />
            <p className="mt-2 text-center">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Speciality;
