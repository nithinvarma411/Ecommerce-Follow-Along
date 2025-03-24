import React, { useState, useEffect } from 'react';
import Products from "../components/Products";
import axios from "axios";
import Navbar from '../components/Navbar';
import Pic from '../components/Pic';
import Footer from '../components/Footer';


const HomePage = () => {
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const token = localStorage.getItem("accessToken"); 
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/getAllProducts`,
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );
    
          if (!response.data.products) {
            console.log("No products found");
            return;
          }
          setProductDetails(response.data.products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }, []);
    

    return (
    <div className="bg-white text-gray-900">
      
      <Navbar/>
      <Pic/>
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Shoes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {productDetails.map((product, index) => (
          <Products key={index} {...product} />
        ))}
        </div>
      </section>

      <Footer/>
      
    </div>
  );
};

export default HomePage;
