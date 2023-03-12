import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="container mx-auto px-8">
        <div className="flex flex-wrap justify-between py-8">
          <div className="w-full md:w-1/3 lg:w-1/4 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">About Us</h2>
            <p className="text-gray-400 leading-relaxed">
              Watch Movies In our Finest Theaters
            </p>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Links</h2>
            <ul className="list-none">
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  Services
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              Social Media
            </h2>
            <div className="flex items-center">
              <a href="#" className="mr-4 text-gray-400 hover:text-white">
                <FaFacebook />
              </a>
              <a href="#" className="mr-4 text-gray-400 hover:text-white">
                <FaTwitter />
              </a>
              <a href="#" className="mr-4 text-gray-400 hover:text-white">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 pb-4">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} My Awesome Website. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
