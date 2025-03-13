import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Pic from "../components/Pic";
import Footer from "../components/Footer";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function OrderConfirmation() {
  const [cart, setCart] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const location = useLocation();
  const navigate = useNavigate();
  const selectedAddress = location.state?.selectedAddress;

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
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const getTotalPrice = () => {
    return cart?.products.reduce((total, { product, quantity }) => {
      return total + product.discountPrice * quantity;
    }, 0);
  };

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const orderData = {
        products: cart.products.map(({ product, quantity }) => ({
          product: product._id,
          quantity,
        })),
        address: selectedAddress.fullAddress,
        price: getTotalPrice(),
        quantity: cart.products.reduce((sum, item) => sum + item.quantity, 0),
        paymentMethod,
      };

      await axios.post("http://localhost:5000/api/v1/orders/placeOrder", orderData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      alert("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div>
      <Navbar />
      <Pic />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
        {cart && cart.products.length > 0 ? (
          <div>
            {cart.products.map(({ product, quantity }, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-lg mb-4 flex">
                <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
                <div>
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-sm">Size: {product.size}</p>
                  <p className="text-sm font-bold mt-2">
                    Price: {product.discountPrice} x {quantity} = INR {product.discountPrice * quantity}
                  </p>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <h3 className="text-lg font-bold">Delivery Address:</h3>
              <p>{selectedAddress?.fullAddress}, {selectedAddress?.city}, {selectedAddress?.country}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold">Total Price: INR {getTotalPrice()}</h3>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold">Payment Method</h3>
              <label className="mr-4">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                Cash on Delivery (COD)
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="Online"
                  checked={paymentMethod === "Online"}
                  onChange={() => setPaymentMethod("Online")}
                />
                Online Payment
              </label>
            </div>
            {paymentMethod === "Online" && (
              <div className="mt-4">
                <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: getTotalPrice().toFixed(2),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then(() => {
                        handlePlaceOrder();
                      });
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}
            {paymentMethod === "COD" && (
              <button
                onClick={handlePlaceOrder}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Place Order
              </button>
            )}
          </div>
        ) : (
          <p>No products found in your cart.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default OrderConfirmation;
