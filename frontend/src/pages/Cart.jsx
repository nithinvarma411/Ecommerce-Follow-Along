import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Pic from "../components/Pic";
import Footer from "../components/Footer";

function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/cart/getCart",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setCart(data.cart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (index, delta) => {
    const updatedCart = { ...cart };
    const productItem = updatedCart.products[index];
    const token = localStorage.getItem("accessToken");

    try {
      await axios.put(
        `http://localhost:5000/api/v1/cart/update/${productItem.product._id}`,
        { size: productItem.size, delta },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      productItem.quantity += delta;
      if (productItem.quantity < 1) {
        productItem.quantity = 1;
      }
      setCart(updatedCart);
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  const getTotalPrice = () => {
    return cart?.products.reduce((total, { product, quantity }) => {
      return total + product.discountPrice * quantity;
    }, 0);
  };

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
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm">Size: {product.size}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm font-bold mt-2">
                  Price: {product.discountPrice} x {quantity} = INR {" "}
                  {product.discountPrice * quantity}
                </p>
              </div>
            </div>
          ))
        )}

        {cart && cart.products.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Total Price: INR {getTotalPrice()}</h3>
            <button
              onClick={() => navigate("/select-address")}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Place Order
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Cart;