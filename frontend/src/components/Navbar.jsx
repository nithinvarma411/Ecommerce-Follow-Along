import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <nav className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="text-2xl font-bold">ShoeStore</div>
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link className="hover:text-gray-500 cursor-pointer" to="/HomePage">Home</Link>
          </li>
          <li>
            <Link className="hover:text-gray-500 cursor-pointer" to="/shop">Shop</Link>
          </li>
          <li>
            <Link className="hover:text-gray-500 cursor-pointer" to="/ProductForm">Add Products</Link>
          </li>
          <li>
            <Link className="hover:text-gray-500 cursor-pointer" to="/cart">Cart</Link>
          </li>
          <li>
            <Link className="hover:text-gray-500 cursor-pointer" to="/MyProducts">My Products</Link>
          </li>
        </ul>
        <div className="flex space-x-4">
          {/* <button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">
            Login
          </button> */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Logout
          </button>
        </div>
      </nav>

      
    </div>
  )
}

export default Navbar
