import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets_admin/assets";

const Dashboard = () => {
  const { aToken, cancelledAppointment, dashData, getDashData } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition-all">
          <div className="bg-blue-50 p-3 rounded-lg">
            <img className="w-12 h-12" src={assets.doctor_icon} alt="" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">
              {dashData.doctors}
            </p>
            <p className="text-gray-500">Total Doctors</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition-all">
          <div className="bg-green-50 p-3 rounded-lg">
            <img className="w-12 h-12" src={assets.patients_icon} alt="" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">
              {dashData.patients}
            </p>
            <p className="text-gray-500">Total Patients</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition-all">
          <div className="bg-purple-50 p-3 rounded-lg">
            <img className="w-12 h-12" src={assets.appointments_icon} alt="" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">
              {dashData.appointments}
            </p>
            <p className="text-gray-500">Total Appointments</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="flex items-center gap-3 p-6 border-b">
          <div className="bg-gray-50 p-2 rounded-lg">
            <img className="w-6 h-6" src={assets.list_icon} alt="" />
          </div>
          <h2 className="text-xl font-semibold">Latest Appointments</h2>
        </div>

        <div className="divide-y">
          {dashData.latestAppointment &&
          dashData.latestAppointment.length > 0 ? (
            dashData.latestAppointment.map((item, index) => (
              <div
                className="flex items-center p-6 gap-4 hover:bg-gray-50 transition-colors"
                key={index}
              >
                <img
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                  src={item.docData?.image || "/default-avatar.png"}
                  alt=""
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {item.docData?.name || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.slotDate || "N/A"}
                  </p>
                </div>
                {item.cancelled ? (
                  <span className="px-3 py-1 text-sm font-medium text-red-600 bg-red-50 rounded-full">
                    Cancelled
                  </span>
                ) : (
                  <button
                    onClick={() => cancelledAppointment(item._id)}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No recent appointments found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
