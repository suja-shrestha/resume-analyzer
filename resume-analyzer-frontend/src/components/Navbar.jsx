import { useState } from 'react';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-22">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-4">
              <div className="bg-white rounded-xl p-3 shadow-lg">
                <img src={logo} alt="AI Resume Pro Logo" className="h-14 w-14 object-contain" />
              </div>
              <span className="text-3xl font-bold text-white tracking-tight">
SkillSight              </span>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <a
                href="#home"
                className="text-white hover:bg-white hover:bg-opacity-20 px-5 py-2 rounded-lg text-base font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Home
              </a>
              <a
                href="#dashboard"
                className="text-white hover:bg-white hover:bg-opacity-20 px-5 py-2 rounded-lg text-base font-medium transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Dashboard
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all duration-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white bg-opacity-10 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#home"
              className="text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
            >
              Home
            </a>
            <a
              href="#dashboard"
              className="text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
            >
              Dashboard
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}