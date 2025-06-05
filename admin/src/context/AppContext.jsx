import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = "NPR :";
  const calculateAge = (dob) => {
    if (!dob) return "N/A";

    const today = new Date();
    const birthDate = new Date(dob);

    // Check if date is valid
    if (isNaN(birthDate.getTime())) return "N/A";

    // Check if date is in future
    if (birthDate > today) return "Invalid DOB";

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If birthday hasn't occurred this year, subtract 1 from age
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const value = {
    calculateAge,
    currency
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
