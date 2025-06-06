import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, getProfileData, updateDoctorProfile } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: "",
    about: "",
    experience: "",
    fees: "",
    address: {
      line1: "",
      line2: ""
    },
    available: false
  });

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  useEffect(() => {
    if (profileData) {
      setEditedData({
        name: profileData.name || "",
        about: profileData.about || "",
        experience: profileData.experience || "",
        fees: profileData.fees || "",
        address: {
          line1: profileData.address?.line1 || "",
          line2: profileData.address?.line2 || ""
        },
        available: profileData.available || false
      });
    }
  }, [profileData]);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    if (profileData) {
      setEditedData({
        name: profileData.name || "",
        about: profileData.about || "",
        experience: profileData.experience || "",
        fees: profileData.fees || "",
        address: {
          line1: profileData.address?.line1 || "",
          line2: profileData.address?.line2 || ""
        },
        available: profileData.available || false
      });
    }
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const response = await updateDoctorProfile({
        ...editedData,
        docId: profileData._id
      });
      if (response.success) {
        toast.success(response.message);
        setIsEditing(false);
        getProfileData();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={profileData.image || "/default-avatar.png"}
                  alt="Doctor"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div
                  className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${
                    profileData.available ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
              </div>
            </div>
          </div>
          <div className="pt-20 pb-6 px-8">
            <div className="flex justify-between items-start">
              <div className="w-full">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.name}
                    onChange={(e) =>
                      setEditedData({ ...editedData, name: e.target.value })
                    }
                    className="w-full p-2 text-xl font-bold border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Your Name"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">
                    {profileData.name}
                  </h1>
                )}
                <p className="text-gray-600 mt-1">
                  {profileData.degree} - {profileData.speciality}
                </p>
              </div>
              <button
                onClick={isEditing ? handleSave : handleEdit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ml-4"
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - About */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                About
              </h2>
              {isEditing ? (
                <textarea
                  value={editedData.about}
                  onChange={(e) =>
                    setEditedData({ ...editedData, about: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]"
                  placeholder="Write about yourself..."
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  {profileData.about}
                </p>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Professional Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedData.experience}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          experience: e.target.value
                        })
                      }
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Years of experience"
                    />
                  ) : (
                    <p className="font-medium">
                      {profileData.experience} Years
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Consultation Fee</p>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedData.fees}
                      onChange={(e) =>
                        setEditedData({ ...editedData, fees: e.target.value })
                      }
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Consultation fee"
                    />
                  ) : (
                    <p className="font-medium">
                      {currency} {profileData.fees}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Availability */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editedData.address.line1}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            address: {
                              ...editedData.address,
                              line1: e.target.value
                            }
                          })
                        }
                        className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Address Line 1"
                      />
                      <input
                        type="text"
                        value={editedData.address.line2}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            address: {
                              ...editedData.address,
                              line2: e.target.value
                            }
                          })
                        }
                        className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Address Line 2"
                      />
                    </div>
                  ) : (
                    <div className="text-gray-600">
                      <p>{profileData.address?.line1}</p>
                      <p>{profileData.address?.line2}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Availability
              </h2>
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    profileData.available ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={
                      isEditing ? editedData.available : profileData.available
                    }
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        available: e.target.checked
                      })
                    }
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    disabled={!isEditing}
                  />
                  <span className="text-gray-600">
                    Available for Appointments
                  </span>
                </label>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-4">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
