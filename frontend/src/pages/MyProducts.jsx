import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Pic from '../components/Pic'
import Footer from '../components/Footer'

function MyProducts() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const token = localStorage.getItem("accessToken")
        console.log(token);
        
        if (!token) {
          console.error("No token found");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/v1/products/myProducts", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        setProducts(res.data);
        console.log("success")
      } catch (error) {
        console.error("Error fetching user products", error);
      }
    };

    fetchMyProducts();
  }, []);
  return (
    <div className="bg-white text-gray-900">
      <Navbar/>
      <Pic/>

      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Your Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <Products key={index} {...product} />
        ))}
        </div>
      </section>

      <Footer/>

    </div>
  )
}

export default MyProducts
