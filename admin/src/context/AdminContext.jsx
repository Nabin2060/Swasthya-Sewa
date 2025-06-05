// import { createContext, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const AdminContext = createContext();

// const AdminContextProvider = (props) => {
//   const [aToken, setAToken] = useState(
//     localStorage.getItem("adminToken") || ""
//   );
//   const [doctors, setDoctors] = useState([]);
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const getAllDoctors = async () => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + "/api/v1/admin/all-doctors",
//         {},
//         { headers: { aToken } }
//       );
//       if (data.success) {
//         setDoctors(data.doctors);
//         console.log(data.doctors);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const value = {
//     aToken,
//     setAToken,
//     backendUrl,
//     doctors,
//     getAllDoctors
//   };
//   return (
//     <AdminContext.Provider value={value}>
//       {props.children}
//     </AdminContext.Provider>
//   );
// };

// export default AdminContextProvider;

import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("adminToken") || ""
  );
  // console.log("Admin token:", aToken);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
    latestAppointment: []
  });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/v1/admin/all-doctors",
        {}, // empty body
        {
          headers: { aToken } // correct placement
        }
      );
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/v1/admin/change-availability",
        { docId },
        {
          headers: { aToken } // ✅ correctly wrap inside object
        }
      );
      if (data.sucess) {
        toast.success(toast.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointment = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/v1/admin/all-appointments-admin",
        { headers: { aToken } }
      );
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const cancelledAppointment = async (appointmentId) => {
  //   try {
  //     const { data } = await axios.post(
  //       backendUrl,
  //       "/api/v1/admin/cancel-appointment",{appointmentId}
  //       { headers: { aToken } }
  //     );
  //     if (data.success) {
  //       toast.success(data.message);
  //       getAllAppointment();
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  // };

  const cancelledAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/v1/admin/cancel-appointment",
        { appointmentId }, // body
        { headers: { aToken } } // config
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointment();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/v1/admin/admin-dashboard",
        { headers: { aToken } }
      );

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Dashboard data error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointment,
    cancelledAppointment,
    dashData,
    getDashData
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
