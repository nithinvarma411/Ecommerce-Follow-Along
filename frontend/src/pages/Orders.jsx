import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pic from "../components/Pic";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { data } = await axios.get("http://localhost:5000/api/v1/orders/getOrders", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <Pic/>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-bold">Order ID: {order._id}</h3>
              <p className="text-sm">Address: {order.address}</p>
              <p className="text-sm">Total Price: INR {order.price}</p>
              <p className="text-sm">Total Quantity: {order.quantity}</p>
              <div className="mt-2">
                <h4 className="text-md font-bold">Products:</h4>
                {order.products.map((item, i) => (
                  <div key={i} className="bg-white p-2 rounded-lg mt-2">
                    <p><strong>{item.product.name}</strong> - {item.quantity} pcs</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Orders;
