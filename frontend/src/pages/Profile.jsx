import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axios.get('http://localhost:5000/api/v1/profile/getUserProfile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('User data:', response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleAddAddress = () => {
    navigate('/AddressForm');
  };

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-2xl mx-auto bg-gray-200 shadow-lg rounded-lg mt-10">
        <div className="flex justify-center mb-6">
          <img 
            src={user.avatar || 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'} 
            alt="User Avatar" 
            className="w-32 h-32 rounded-full" 
          />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center">Profile</h2>
        <div className="mb-4">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="mb-4">
          <strong>Full Name:</strong> {user.fullname}
        </div>
        <div className="mb-4">
          <strong>Phone Number:</strong> {user.phoneNumber}
        </div>
        <h3 className="text-2xl font-semibold mt-6 mb-4">Addresses</h3>
        {user.addresses && user.addresses.length > 0 ? (
          user.addresses.map((address, index) => (
            <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow">
              <p><strong>Country:</strong> {address.country}</p>
              <p><strong>City:</strong> {address.city}</p>
              <p><strong>Address Line 1:</strong> {address.address1}</p>
              <p><strong>Address Line 2:</strong> {address.address2}</p>
              <p><strong>Zip Code:</strong> {address.zipCode}</p>
              <p><strong>Address Type:</strong> {address.addressType}</p>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p>No addresses available.</p>
            <button 
              onClick={handleAddAddress} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300">
              Add Address
            </button>
            
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
