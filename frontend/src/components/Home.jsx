import { useState, useEffect } from "react";
import Products from "../pages/Products";
import axios from "axios";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/products/getAllProducts");
        setProductDetails(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = productDetails.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.discountPrice >= minPrice &&
      product.discountPrice <= maxPrice
  );

  return (
    <div className="w-full min-h-screen bg-neutral-800 p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search for products..."
          className="px-4 py-2 rounded-md w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Min Price"
            className="px-4 py-2 rounded-md"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max Price"
            className="px-4 py-2 rounded-md"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {filteredProducts.map((product, index) => (
          <Products key={index} {...product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
