import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";
// import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <footer className="bg-white-300 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/swasthya-logo.png"
                alt="Swasthya Sewa Logo"
                className="w-30 h-19 object-contain"
              />
              <h3 className="text-2xl font-bold text-white">Swasthya Sewa</h3>
            </div>
            <p className="text-sm">
              Providing quality healthcare services to everyone. Your health is
              our priority.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-300 transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:text-blue-600 transition-colors"
                >
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link
                  to="/appointments"
                  className="hover:text-blue-600 transition-colors"
                >
                  Appointments
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Our Services
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services/general"
                  className="hover:text-blue-600 transition-colors"
                >
                  General Medicine
                </Link>
              </li>
              <li>
                <Link
                  to="/services/cardiology"
                  className="hover:text-blue-600 transition-colors"
                >
                  Cardiology
                </Link>
              </li>
              <li>
                <Link
                  to="/services/neurology"
                  className="hover:text-blue-600 transition-colors"
                >
                  Neurology
                </Link>
              </li>
              <li>
                <Link
                  to="/services/pediatrics"
                  className="hover:text-blue-600 transition-colors"
                >
                  Pediatrics
                </Link>
              </li>
              <li>
                <Link
                  to="/services/dermatology"
                  className="hover:text-blue-600 transition-colors"
                >
                  Dermatology
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <FaPhone className="text-blue-500" />
                <span>+977 1234567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-500" />
                <span>info@swasthyasewa.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-blue-500 mt-1" />
                <span>Kathmandu, Nepal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {new Date().getFullYear()} Swasthya Sewa. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-sm hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/faq"
                className="text-sm hover:text-white transition-colors"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
