import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken, getAllDoctors]);

  return (
    // Removed w-32 from here, keep max-h and overflow
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium mb-6">All Doctors</h1>
      {/* Adjusted gap for potentially better layout */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5">
        {doctors.map((item, index) => (
          <div
            className="border border-indigo-200 rounded-xl bg-white shadow hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center overflow-hidden"
            key={item._id || index} // Use _id for key if available
            // Using min/max width for better responsiveness within grid
            style={{ minWidth: 220, maxWidth: 250, minHeight: 340 }}
          >
            <img
              className="bg-indigo-50 w-full h-40 object-cover rounded-t-xl"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4 w-full flex-1 flex flex-col items-center justify-between">
              <p className="text-neutral-800 text-lg font-medium text-center truncate w-full">
                {item.name}
              </p>
              <p className="text-zinc-600 text-sm text-center truncate w-full">
                {item.speciality}
              </p>
              {/* Availability Indicator */}
              <div className="mt-2 flex items-center gap-2 text-sm">
                <input
                  onChange={() => changeAvailability(item._id, !item.available)} // Pass current/new state to context
                  type="checkbox"
                  checked={item.available}
                  readOnly // Keep readOnly here if context handles the update logic entirely
                  className="cursor-pointer"
                />
                <span
                  className={`w-3 h-3 rounded-full ${
                    item.available ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                <span>Available</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
