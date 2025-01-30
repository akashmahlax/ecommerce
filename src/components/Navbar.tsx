'use client';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">NextShop</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Products</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Cart</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Products</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Cart</a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contact</a>
          </div>
        )}
      </div>
    </nav>
  );
}