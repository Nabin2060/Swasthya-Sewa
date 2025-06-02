import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const initialForm = {
  name: "",
  email: "",
  password: "",
  speciality: "General physician",
  degree: "",
  experience: "1 Year",
  fees: "",
  address1: "",
  address2: "",
  about: "",
  available: true,
  image: null,
  imagePreview: null
};

const AddDoctor = () => {
  const [form, setForm] = useState(initialForm);

  const { backendUrl, aToken } = useContext(AdminContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate required fields
    const requiredFields = [
      "name",
      "email",
      "password",
      "speciality",
      "degree",
      "experience",
      "about",
      "fees",
      "address1",
      "image"
    ];
    for (let field of requiredFields) {
      if (
        !form[field] ||
        (typeof form[field] === "string" && form[field].trim() === "")
      ) {
        return toast.error(`Please fill the ${field} field.`);
      }
    }
    if (form.password.length < 8) {
      return toast.error("Password must be at least 8 characters long");
    }
    try {
      const formData = new FormData();
      formData.append("image", form.image);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("speciality", form.speciality);
      formData.append("degree", form.degree);
      formData.append("experience", form.experience);
      formData.append("about", form.about);
      formData.append("available", form.available);
      formData.append("fees", form.fees);
      formData.append(
        "address",
        JSON.stringify({ address1: form.address1, address2: form.address2 })
      );
      // Optionally add date
      formData.append("date", new Date().toISOString());

      const { data } = await axios.post(
        backendUrl + "/api/v1/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if (data.message && data.message.toLowerCase().includes("success")) {
        toast.success(data.message);
        setForm(initialForm); // Reset form after success
      } else {
        toast.error(data.message || data.error || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add doctor. Please try again."
      );
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Add Doctor</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-8 max-w-5xl mx-auto"
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image upload */}
          <div className="flex flex-col items-center w-full md:w-1/4 mb-6 md:mb-0">
            <label className="flex flex-col items-center cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-2 overflow-hidden">
                {form.imagePreview ? (
                  <img
                    src={form.imagePreview}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                )}
              </div>
              <span className="text-gray-500 text-sm">
                Upload doctor picture
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Form fields */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Doctor name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Speciality
              </label>
              <select
                name="speciality"
                value={form.speciality}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option>General physician</option>
                <option>Cardiologist</option>
                <option>Dentist</option>
                <option>Dermatologist</option>
                <option>Gynecologist</option>
                <option>Neurologist</option>
                <option>Orthopedic</option>
                <option>Pediatrician</option>
                <option>Psychiatrist</option>
                <option>Surgeon</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Doctor Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Your email"
                type="email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Degree</label>
              <input
                name="degree"
                value={form.degree}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Degree"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Doctor Password
              </label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Password"
                type="password"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                name="address1"
                value={form.address1}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mb-2"
                placeholder="Address 1"
                required
              />
              <input
                name="address2"
                value={form.address2}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Address 2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Experience
              </label>
              <select
                name="experience"
                value={form.experience}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
                <option value="4">4 year</option>
                <option value="5">5 year</option>
                <option value="6">6 year</option>
                <option value="7">7 year</option>
                <option value="8">8 years</option>
                <option value="9">9 year</option>
                <option value="10">10 year</option>
                <option value="12">12 year</option>
                <option value="15">15 year</option>
                <option value="20">20+ years</option>
                <option value="25+">25+ year</option>
                <option value="30+">30+ year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fees</label>
              <input
                name="fees"
                value={form.fees}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Your fees"
                type="number"
                min="0"
                required
              />
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-sm">Available</label>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">About me</label>
          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={4}
            placeholder="write about yourself"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-6 px-8 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Add doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
