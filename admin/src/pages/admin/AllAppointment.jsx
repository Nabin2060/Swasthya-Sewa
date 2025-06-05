import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const AllAppointment = () => {
  const { aToken, appointments, getAllAppointment, cancelledAppointment } =
    useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointment();
    }
  }, [aToken]);

  if (!appointments) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full p-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded-lg shadow-sm text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b sticky top-0 bg-white">
          <p className="font-medium">#</p>
          <p className="font-medium">Patient</p>
          <p className="font-medium">Age</p>
          <p className="font-medium">Date & Time</p>
          <p className="font-medium">Doctors</p>
          <p className="font-medium">Fees</p>
          <p className="font-medium">Actions</p>
        </div>
        {appointments && appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
              key={index}
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-3">
                <img
                  className="w-9 h-9 rounded-full object-cover"
                  src={item.userData?.image || "/default-avatar.png"}
                  alt=""
                />
                <p className="font-medium">{item.userData?.name || "N/A"}</p>
              </div>
              <p className="max-sm:hidden">
                {item.userData?.dob ? (
                  <span
                    className={
                      calculateAge(item.userData.dob) === "Invalid DOB"
                        ? "text-red-500"
                        : ""
                    }
                  >
                    {calculateAge(item.userData.dob)}
                    {calculateAge(item.userData.dob) !== "Invalid DOB" &&
                      " years"}
                  </span>
                ) : (
                  "N/A"
                )}
              </p>
              <p>
                {item.slotDate || "N/A"}, {item.slotTime || "N/A"}
              </p>

              <div className="flex items-center gap-3">
                <img
                  className="w-9 h-9 rounded-full object-cover"
                  src={item.docData?.image || "/default-avatar.png"}
                  alt=""
                />
                <p className="font-medium">{item.docData?.name || "N/A"}</p>
              </div>
              <p>
                {currency}
                {item.amount}
              </p>

              <div className="flex gap-2">
                <button className="text-blue-500 hover:text-blue-700">
                  View
                </button>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : (
                  <button
                    onClick={() => cancelledAppointment(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No appointments found
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointment;
