import React, { useState, useEffect } from 'react';
import Products from "../components/Products";
import axios from "axios";
import { Product } from './../../../backend/src/models/Product.model';

const HomePage = () => {
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await // When fetching products:
          axios
            .get("http://localhost:5000/api/v1/products/getAllProducts", {
              withCredentials: true,
            })
            .then((response) => {
              setProductDetails(response.data.products);
            })
            .catch((error) => {
              console.error("Error fetching products:", error);
            });
          
          setProductDetails(response.data.products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }, []);

    return (
    <div className="bg-white text-gray-900">
      {/* Navbar */}
      <nav className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="text-2xl font-bold">ShoeStore</div>
        <ul className="hidden md:flex space-x-6">
          <li className="hover:text-gray-500 cursor-pointer" to="/HomePage">Home</li>
          <li className="hover:text-gray-500 cursor-pointer" to="/shop">Shop</li>
          <li className="hover:text-gray-500 cursor-pointer" to="/ProductForm">Add Products</li>
          <li className="hover:text-gray-500 cursor-pointer" to="/cart">Cart</li>
          <li className="hover:text-gray-500 cursor-pointer" to="/MyProductsPage">My Products</li>
        </ul>
        <div className="flex space-x-4">
          <button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">
            Login
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-96 relative"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1350&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Step into Style
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mb-6">
              Discover our exclusive collection of sneakers & formal shoes
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Shoes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {productDetails.map((product, index) => (
          <Products key={index} {...product} />
        ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto text-center px-4">
          <p>&copy; {new Date().getFullYear()} ShoeStore. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="hover:text-white">
              Facebook
            </a>
            <a href="#" className="hover:text-white">
              Twitter
            </a>
            <a href="#" className="hover:text-white">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
