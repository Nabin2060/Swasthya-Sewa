import React, { useState, useEffect } from "react";
import { FaUserMd, FaAmbulance, FaPills, FaStethoscope } from "react-icons/fa";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";

const About = () => {
  const [counts, setCounts] = useState({
    doctors: 0,
    patients: 0,
    support: 0,
    experience: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) => ({
        doctors: prev.doctors < 50 ? prev.doctors + 1 : prev.doctors,
        patients: prev.patients < 10000 ? prev.patients + 100 : prev.patients,
        support: prev.support < 24 ? prev.support + 1 : prev.support,
        experience: prev.experience < 15 ? prev.experience + 1 : prev.experience
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <FaUserMd className="w-16 h-16 text-blue-500" />,
      title: "Expert Doctors",
      description:
        "Our team consists of highly qualified and experienced medical professionals."
    },
    {
      icon: <FaAmbulance className="w-16 h-16 text-blue-500" />,
      title: "Emergency Care",
      description: "24/7 emergency medical services with quick response time."
    },
    {
      icon: <FaPills className="w-16 h-16 text-blue-500" />,
      title: "Quality Medicine",
      description:
        "We provide authentic and high-quality medicines for all treatments."
    },
    {
      icon: <FaStethoscope className="w-16 h-16 text-blue-500" />,
      title: "Medical Equipment",
      description: "State-of-the-art medical equipment for accurate diagnosis."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              About Swasthya Sewa
            </h1>
            <p className="text-lg text-gray-600">
              We are committed to providing the highest quality healthcare
              services to our patients. Our mission is to make healthcare
              accessible, affordable, and efficient for everyone in Nepal.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-600 mb-2">
                {counts.doctors}+
              </h3>
              <p className="text-gray-600">Expert Doctors</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-600 mb-2">
                {counts.patients}+
              </h3>
              <p className="text-gray-600">Happy Patients</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-600 mb-2">
                {counts.support}/7
              </h3>
              <p className="text-gray-600">Medical Support</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-600 mb-2">
                {counts.experience}+
              </h3>
              <p className="text-gray-600">Years Experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              To provide accessible, affordable, and high-quality healthcare
              services to all Nepalese citizens. We strive to make healthcare
              more efficient and patient-friendly through technology and
              innovation.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors">
                Contact Us
              </button>
              <button className="border border-blue-500 text-blue-500 px-6 py-3 rounded-full hover:bg-blue-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Have questions? We're here to help. Contact us for any inquiries
              about our services or to schedule an appointment.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <div className="flex items-center gap-3">
                <MdPhone className="w-6 h-6 text-blue-500" />
                <span className="text-gray-600">+977 1234567890</span>
              </div>
              <div className="flex items-center gap-3">
                <MdEmail className="w-6 h-6 text-blue-500" />
                <span className="text-gray-600">info@swasthyasewa.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MdLocationOn className="w-6 h-6 text-blue-500" />
                <span className="text-gray-600">Kathmandu, Nepal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
