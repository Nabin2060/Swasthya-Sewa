import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
// import { toast } from "react-toastify";

const Sidebar = () => {
  const { setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const menuItems = [
    {
      path: "/admin-dashboard",
      name: "Dashboard",
      icon: assets.home_icon
    },
    {
      path: "/all-appointments",
      name: "All Appointments",
      icon: assets.appointments_icon
    },
    {
      path: "/add-doctor",
      name: "Add Doctor",
      icon: assets.add_icon
    },
    {
      path: "/doctor-list",
      name: "Doctors List",
      icon: assets.doctor_icon
    }
  ];

  //   const handleLogout = () => {
  //     setAToken("");
  //     localStorage.removeItem("adminToken");
  //     toast.success("Logged out successfully!");
  //     navigate("/");
  //   };

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg relative">
      {/* <div className="p-4">
        <img
          src={assets.admin_logo}
          alt="Admin Logo"
          className="w-32 mx-auto"
        />
      </div> */}

      <nav className="mt-8">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  : ""
              }`
            }
          >
            <img src={item.icon} alt={item.name} className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* <div className="absolute bottom-0 w-64 p-4 border-t">
        <div
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg cursor-pointer transition-colors duration-200"
        >
          <img src={assets.cancel_icon} alt="Logout" className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">Logout</span>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
