import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaStar, FaGraduationCap, FaClock, FaArrowRight } from "react-icons/fa";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      // Filter doctors by speciality
      const filtered = doctors.filter((doc) => doc.speciality === speciality);
      setFilterDoc(filtered);
    } else {
      // If no speciality is selected, show all doctors
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  // Function to generate random rating between 4.0 and 5.0
  const getRandomRating = () => (4 + Math.random()).toFixed(1);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">
        {speciality ? `${speciality} Doctors` : "All Doctors"}
      </h1>
      {/* <p className="text-gray-600 mb-8">
        {speciality
          ? `Browse through our ${speciality} specialists and book your appointment.`
          : "Browse through our specialist doctors and book your appointment."}
      </p> */}
      <button
        className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
          showFilter ? "bg-blue-600 text-white" : ""
        }`}
        onClick={() => setShowFilter((prev) => !prev)}
      >
        Filters
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-1/4 ">
          <h2 className="text-xl font-semibold mb-4 grid pt-4">Specialities</h2>
          <div
            className={` flex-col gap-3 ${
              showFilter ? "flex" : "hidden sm:flex"
            }`}
          >
            <p
              onClick={() => navigate("/doctors")}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                !speciality
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              All Doctors
            </p>
            <p
              onClick={() => navigate("/doctors/General physician")}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                speciality === "General physician"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              General physician
            </p>
            <p
              onClick={() => navigate("/doctors/Gynecologist")}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                speciality === "Gynecologist"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              Gynecologist
            </p>
            <p
              onClick={() => navigate("/doctors/Dermatologist")}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                speciality === "Dermatologist"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              Dermatologist
            </p>
            <p
              onClick={() => navigate("/doctors/Pediatricians")}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                speciality === "Pediatricians"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              Pediatricians
            </p>
            <p
              onClick={() => navigate("/doctors/Neurologist")}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                speciality === "Neurologist"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              Neurologist
            </p>
            <p
              onClick={() => navigate("/doctors/Gastroenterologist")}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                speciality === "Gastroenterologist"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              Gastroenterologist
            </p>
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="lg:w-3/4">
          {filterDoc.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600 text-lg">
                No doctors found for this speciality.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterDoc.map((doc) => {
                const rating = getRandomRating();
                return (
                  <div key={doc._id} className="group">
                    <div
                      onClick={() => navigate(`/appointment/${doc._id}`)}
                      className="border border-blue-100 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500 bg-white"
                    >
                      <div className="relative">
                        <img
                          className="w-full h-56 object-cover"
                          src={doc.image}
                          alt={doc.name}
                        />
                        <div className="absolute top-2 right-2 flex items-center gap-2 text-sm text-green-500 bg-white px-3 py-1 rounded-full shadow-sm">
                          <p className="w-1 h-1 bg-green-500 rounded-full"></p>
                          <p>Available</p>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg text-gray-800">
                            {doc.name}
                          </h3>
                          <span className="text-yellow-400 flex items-center gap-1">
                            <FaStar />
                            <span className="text-gray-600">{rating}</span>
                          </span>
                        </div>

                        <p className="text-blue-600 font-medium">
                          {doc.speciality}
                        </p>

                        <div className="flex items-center gap-2 mt-2 text-gray-600">
                          <FaGraduationCap className="text-blue-500" />
                          <p className="text-sm">{doc.degree}</p>
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-gray-600">
                          <FaClock className="text-blue-500" />
                          <p className="text-sm">{doc.experience} Experience</p>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                          <p className="text-lg font-bold text-blue-600">
                            ${doc.fees}/hr
                          </p>
                          <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 text-sm flex items-center gap-2 group-hover:gap-3 shadow-md hover:shadow-lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/appointment/${doc._id}`);
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
