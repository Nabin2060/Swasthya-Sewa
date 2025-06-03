import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState({});

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    if (docInfo?.slots_booked) {
      //already book slots
      setBookedSlots(docInfo.slots_booked);
    }
  };

  const getAvailableSlots = async () => {
    if (!docInfo) return;
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      const dateStr = currentDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD check gareko

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        });

        // Check if this slot is already booked cha choina
        const isBooked = bookedSlots[dateStr]?.includes(formattedTime);

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
          isBooked: isBooked
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    if (!slotTime) {
      toast.warn("Please select a time slot");
      return;
    }

    try {
      const date = docSlots[slotIndex][0].datetime;
      const slotDate = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD

      const { data } = await axios.post(
        backendUrl + "/api/v1/user/book-appointment",
        {
          docId,
          slotDate,
          slotTime
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(
        error.response?.data?.message || "Failed to book appointment"
      );
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  if (!docInfo) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - Doctor Info */}
        <div className="lg:w-2/3">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="sm:w-1/3">
              <img
                className="w-full rounded-lg shadow-lg"
                src={docInfo.image}
                alt={docInfo.name}
              />
            </div>

            <div className="sm:w-2/3">
              <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                {docInfo.name}
                <img src={assets.verified_icon} alt="" />
              </p>
              <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                <p>
                  {docInfo.degree} - {docInfo.speciality}
                </p>
                <button className="py-0.5 px-2 border text-xs rounded-full">
                  {docInfo.experience}
                </button>
              </div>
              <div className="mt-4">
                <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
                  About <img src={assets.info_icon} alt="" />
                </p>
                <p className="text-sm text-gray-500 mt-1">{docInfo.about}</p>
                <p className="text-gray-600 mt-2">
                  Appointment Fee:{" "}
                  <span className="font-medium">
                    {currencySymbol}
                    {docInfo.fees}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Booking Slots */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Book Appointment
            </h3>

            {/* Date Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Select Date
              </p>
              <div className="flex gap-3 items-center w-full overflow-x-auto pb-2">
                {docSlots.length > 0 &&
                  docSlots.map((item, index) => (
                    <div
                      onClick={() => setSlotIndex(index)}
                      className={`text-center py-4 min-w-16 rounded-full cursor-pointer ${
                        slotIndex === index
                          ? "bg-blue-500 text-white"
                          : "border border-gray-200 hover:border-blue-500"
                      }`}
                      key={index}
                    >
                      <p className="text-sm">
                        {item[0] && dayOfWeek[item[0].datetime.getDay()]}
                      </p>
                      <p className="font-medium">
                        {item[0] && item[0].datetime.getDate()}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Select Time
              </p>
              <div className="flex flex-wrap gap-2">
                {docSlots.length > 0 &&
                  docSlots[slotIndex].map((item, index) => (
                    <button
                      onClick={() => !item.isBooked && setSlotTime(item.time)}
                      className={`text-sm px-4 py-2 rounded-full ${
                        item.isBooked
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : item.time === slotTime
                          ? "bg-blue-500 text-white"
                          : "border border-gray-200 text-gray-600 hover:border-blue-500"
                      }`}
                      key={index}
                      disabled={item.isBooked}
                    >
                      {item.time}
                      {item.isBooked && " (Booked)"}
                    </button>
                  ))}
              </div>
            </div>

            {/* Book Button */}
            <button
              onClick={bookAppointment}
              className="w-full bg-blue-500 text-white font-medium px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={!slotTime}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      {/* listing related doctors  */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
