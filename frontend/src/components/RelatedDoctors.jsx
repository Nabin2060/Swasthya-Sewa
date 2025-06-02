import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaRegStar,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaClock,
  FaArrowRight
} from "react-icons/fa";

const RelatedDoctors = ({ speciality, docID }) => {
  const { doctors } = useContext(AppContext);

  const getRandomRating = () => (4 + Math.random()).toFixed(1);

  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/doctors");
    window.scrollTo(0, 0);
  };
  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docID
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docID]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600">Our Top Doctors</h1>
        <p className="mt-2 text-gray-600 max-w-2xl">
          Find and book appointments with our most experienced and highly-rated
          doctors. Get the best medical care from trusted professionals.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0">
        {relDoc.slice(0, 5).map((item, index) => {
          const rating = getRandomRating();
          return (
            <div key={index} className="group">
              <div
                onClick={() => {
                  navigate(`/appointment/${item._id}`);
                  scrollTo(0, 0);
                }}
                className="border border-blue-100 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500 bg-white"
              >
                <div className="relative">
                  <img
                    className="w-full h-56 object-cover"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-2 text-sm text-green-500 bg-white px-3 py-1 rounded-full shadow-sm">
                    <p className="w-1 h-1 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg text-gray-800">
                      {item.name}
                    </h3>
                    <span className="text-yellow-400 flex items-center gap-1">
                      <FaStar />
                      <span className="text-gray-600">{rating}</span>
                    </span>
                  </div>

                  <p className="text-blue-600 font-medium">{item.speciality}</p>

                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <FaGraduationCap className="text-blue-500" />
                    <p className="text-sm">{item.degree}</p>
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-gray-600">
                    <FaClock className="text-blue-500" />
                    <p className="text-sm">{item.experience} Experience</p>
                  </div>

                  {/* <div className="flex items-center gap-2 mt-1 text-gray-600">
                        <FaMapMarkerAlt className="text-blue-500" />
                        <p className="text-sm truncate">{item.address.line1}</p>
                      </div> */}

                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-lg font-bold text-blue-600">
                      ${item.fees}/hr
                    </p>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 text-sm flex items-center gap-2 group-hover:gap-3 shadow-md hover:shadow-lg"
                      onClick={() => {
                        // e.stopPropagation();
                        navigate(`/appointment/${item._id}`);
                      }}
                    >
                      Book Now
                      <FaArrowRight className="transition-all duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleViewAll}
        className="mt-8 px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex items-center gap-2 group-hover:gap-3"
      >
        View All Doctors
        <FaArrowRight className="transition-all duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default RelatedDoctors;
