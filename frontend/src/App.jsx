import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import About from "./pages/About";
import MyProfile from "./pages/MyProfile";
import MyAppointment from "./pages/MyAppointment";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointment />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

// import React, { useContext, useEffect, useState } from "react";

// import { AppContext } from "../context/AppContext.jsx";
// import axios from "axios";
// import { toast } from "react-toastify";

// const MyAppointment = () => {
//   const { backendUrl, token } = useContext(AppContext);

//   const [appointments, setAppointments] = useState([]);

//   const getUserAppointment = async () => {
//     try {
//       const { data } = await axios.get(
//         backendUrl + "/api/v1/user/all-appointments",
//         { headers: { token } }
//       );

//       if (data.success) {
//         setAppointments(data.appointments.reverse());
//         console.log(data.appointments);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };
//   useEffect(() => {
//     if (token) {
//       getUserAppointment();
//     }
//   }, [token]);

//   return (
//     <div>
//       <p className="pb-3 mt-13 font-medium text-zinc-700 border-b">
//         My Appointment
//       </p>
//       <div>
//         {appointments.slice(0, 4).map((item, index) => (
//           <div
//             key={index}
//             className="grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
//           >
//             <div>
//               <img
//                 className="w-32 bg-indigo-50 "
//                 src={item.docData.image}
//                 alt=""
//               />
//             </div>
//             <div className="flex-1 text-sm text-zinc-600">
//               <p className="text-neutral-800 font-semibold">
//                 {item.docData.name}
//               </p>
//               <p>{item.docData.speciality}</p>
//               <p className="text-zinc-700 font-medium mt-1">Address:</p>
//               <p className="text-xs">{item.docData.address.line1}</p>
//               <p className="text-xs">{item.docData.address.line2}</p>
//               <p className="text-xs mt-1 ">
//                 <span className="text-sm text-neutral-700 font-medium">
//                   Date & Time:
//                 </span>
//                 {item.sloatDate} | {item.sloatTime}
//               </p>
//             </div>
//             <div></div>
//             <div className="flex flex-col justify-end gap-2">
//               <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-blue-600 hover:text-white transition-all duration-300">
//                 Pay Online
//               </button>
//               <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300">
//                 Cancel Appointment
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyAppointment;
