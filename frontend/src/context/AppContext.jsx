import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "NPR";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const value = {
    doctors,
    currencySymbol
  };

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/v1/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
