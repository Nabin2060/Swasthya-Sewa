import axios from "axios";
import { useState, createContext } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(
    localStorage.getItem("doctorToken") || ""
  );
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const getAppointments = async () => {
    try {
      setLoading(true); // ✅ start loading
      const { data } = await axios.get(
        `${backendUrl}/api/v1/doctor/appointments`, // ✅ fixed URL
        {
          headers: { dtoken: dToken } // ✅ correct key
        }
      );
      if (data.success) {
        const reversed = [...data.appointments].reverse(); // ✅ avoid double reverse
        setAppointments(reversed);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/doctor/complete-appointment`,
        { appointmentId },
        {
          headers: { dtoken: dToken } // ✅ correct key
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/doctor/cancel-appointment`,
        { appointmentId },

        {
          headers: { dtoken: dToken } // ✅ correct key
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/v1/doctor/dashboard`,
        {
          headers: { dtoken: dToken }
        }
      );
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/doctor/profile`, {
        headers: { dtoken: dToken }
      });
      if (data.success) {
        setProfileData(data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateDoctorProfile = async (updateData) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/doctor/update-profile`,
        updateData,
        {
          headers: { dtoken: dToken }
        }
      );
      // if (data.success) {
      //   toast.success(data.message);
      //   getProfileData(); // Refresh profile data after update
      //   return data;
      // } else {
      //   toast.error(data.message);
      return data;
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
      throw error;
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    loading,
    completeAppointment,
    cancelAppointment,
    dashData,
    setDashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData,
    updateDoctorProfile
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
