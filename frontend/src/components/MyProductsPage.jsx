import { useEffect, useState } from "react";
import axios from "axios";

const MyProductsPage = () => {
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
            "Authorization": `Bearer ${token}`, // Add the token here
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
    <div>
      <h2>My Products</h2>
      {products.length === 0 ? <p>No products found.</p> : (
        products.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <img src={product.image} alt={product.name} width="100" />
          </div>
        ))
      )}
    </div>
  );
};

export default MyProductsPage;
