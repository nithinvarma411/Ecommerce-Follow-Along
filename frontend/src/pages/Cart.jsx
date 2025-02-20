import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Pic from "../components/Pic";
import Footer from "../components/Footer";

function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { data } = await axios.get("http://localhost:5000/api/v1/cart/getCart", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setCart(data.cart);
      } catch (error) {
        console.log(error);
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div>
      <Navbar />
      <Pic />

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {!cart || cart.products.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.products.map(({ product, quantity }, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-lg mb-4 flex">
              <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
              <div>
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm">Size: {product.size}</p>
                <p className="text-sm">Quantity: {quantity}</p>
                <p className="text-sm font-bold">
                  Price: ${product.discountPrice} x {quantity} = ${product.discountPrice * quantity}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
