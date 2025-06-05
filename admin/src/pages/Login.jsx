import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (state === "Admin") {
        const { data } = await axios.post(
          backendUrl + "/api/v1/admin/login-admin",
          {
            email,
            password
          }
        );
        if (data.success) {
          setAToken(data.token);
          localStorage.setItem("adminToken", data.token);
          toast.success("Login successful!");
          navigate("/admin/dashboard");
        }
      } else {
        const { data } = await axios.post(
          backendUrl + "/api/v1/doctor/doctor-login",
          {
            email,
            password
          }
        );
        if (data.success) {
          setDToken(data.token);
          localStorage.setItem("doctorToken", data.token);
          toast.success("Login successful!");
          navigate("/doctor/dashboard");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={onSubmitHandler} className="w-full max-w-md">
        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {state} Login
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="email"
                required
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="password"
                required
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center text-sm">
            {state === "Admin" ? (
              <p>
                Doctor Login?{" "}
                <button
                  type="button"
                  onClick={() => setState("Doctor")}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Click here
                </button>
              </p>
            ) : (
              <p>
                Admin Login?{" "}
                <button
                  type="button"
                  onClick={() => setState("Admin")}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Click here
                </button>
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
