import { createContext } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const value = {};
  return (
    <DoctorContext.Provider value={value}>
      {props.childern}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
