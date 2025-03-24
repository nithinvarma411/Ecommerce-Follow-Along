import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Pic from "../components/Pic";
import Footer from "../components/Footer";
import axios from "axios";

function SelectAddress() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/addresses`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formattedAddresses = data.addresses.flatMap((address) => [
          { ...address, fullAddress: address.address1, id: address._id + "-1" },
          address.address2 ? { ...address, fullAddress: address.address2, id: address._id + "-2" } : null,
        ]).filter(Boolean);

        setAddresses(formattedAddresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select an address.");
      return;
    }
    
    const selectedAddressDetails = addresses.find(address => address.id === selectedAddress);
  
    navigate("/order-summary", { state: { selectedAddress: selectedAddressDetails } });
  };
  

  return (
    <div >
        <Navbar/>
        <Pic/>
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Select Delivery Address</h2>
            {addresses.length === 0 ? (
                <p>No addresses found.</p>
            ) : (
                addresses.map((address) => (
                <div
                    key={address.id}
                    className={`p-4 border rounded-lg mb-2 cursor-pointer transition-all duration-200 ${
                    selectedAddress === address.id ? "bg-blue-200 border-blue-500" : "bg-gray-100"
                    }`}
                    onClick={() => setSelectedAddress(address.id)}
                >
                    <p>{address.fullAddress}, {address.city}, {address.country}</p>
                </div>
                ))
            )}

            <button
                onClick={handlePlaceOrder}
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                disabled={!selectedAddress}
            >
                Continue
            </button>

        </div>
      <Footer/>
    </div>
  );
}

export default SelectAddress;
