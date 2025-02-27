import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="text-2xl font-bold">ShoeStore</div>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><Link className="hover:text-gray-500" to="/HomePage">Home</Link></li>
          <li><Link className="hover:text-gray-500" to="/shop">Shop</Link></li>
          <li><Link className="hover:text-gray-500" to="/ProductForm">Add Products</Link></li>
          <li><Link className="hover:text-gray-500" to="/cart">Cart</Link></li>
          <li><Link className="hover:text-gray-500" to="/MyProducts">My Products</Link></li>
          <li><Link className="hover:text-gray-500" to="/orders">Orders</Link></li>
        </ul>
        
        {/* Profile and Logout Button */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/Profile">
            <div className="flex items-center cursor-pointer hover:text-gray-500">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>Profile</span>
            </div>
          </Link>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Logout
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none z-50 relative">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      
      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute top-4 right-4 focus:outline-none"
        >
          <X size={24} />
        </button>
        <ul className="flex flex-col items-start p-6 space-y-4">
          <li><Link onClick={() => setIsOpen(false)} className="hover:text-gray-500" to="/HomePage">Home</Link></li>
          <li><Link onClick={() => setIsOpen(false)} className="hover:text-gray-500" to="/shop">Shop</Link></li>
          <li><Link onClick={() => setIsOpen(false)} className="hover:text-gray-500" to="/ProductForm">Add Products</Link></li>
          <li><Link onClick={() => setIsOpen(false)} className="hover:text-gray-500" to="/cart">Cart</Link></li>
          <li><Link onClick={() => setIsOpen(false)} className="hover:text-gray-500" to="/MyProducts">My Products</Link></li>
          <li><Link onClick={() => setIsOpen(false)} className="hover:text-gray-500" to="/orders">Orders</Link></li>
        </ul>
        <div className="p-6 border-t">
          <Link to="/Profile" onClick={() => setIsOpen(false)}>
            <div className="flex items-center cursor-pointer hover:text-gray-500 mb-4">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>Profile</span>
            </div>
          </Link>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;