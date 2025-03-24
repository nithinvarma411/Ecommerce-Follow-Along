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
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/orders/getOrders`, {
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

  const cancelOrder = async (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/orders/cancel/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Pic />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, index) => {
            // Format date and time
            const orderDate = new Date(order.createdAt).toLocaleString();

            return (
              <div key={index} className="bg-gray-200 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold">Order ID: {order._id}</h3>
                <p className="text-sm">Address: {order.address}</p>
                <p className="text-sm">Total Price: INR {order.price}</p>
                <p className="text-sm">Total Quantity: {order.quantity}</p>
                <p className="text-sm">Order Date: {orderDate}</p>

                {/* Order Status */}
                <p className="text-sm font-bold mt-2">
                  Status:{" "}
                  <span
                    className={`px-2 py-1 rounded ${
                      order.status === "Cancelled"
                        ? "bg-red-500 text-white"
                        : order.status === "Completed"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-black"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>

                {/* Cancel Order Button */}
                {order.status === "Pending" && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded mt-2"
                  >
                    Cancel Order
                  </button>
                )}

                <div className="mt-2">
                  <h4 className="text-md font-bold">Products:</h4>
                  {order.products.map((item, i) => (
                    <div key={i} className="bg-white p-2 rounded-lg mt-2">
                      <p>
                        <strong>{item.product.name}</strong> - {item.quantity} pcs
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Orders;
