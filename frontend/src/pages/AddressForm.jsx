import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AddressForm = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    country: '',
    city: '',
    address1: '',
    address2: '',
    zipCode: '',
    addressType: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    try {
      const response = await axios.put('http://localhost:5000/api/v1/uploadAdress', { address }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Address added:', response.data);
      alert('Address added successfully!');
      navigate('/Profile');
    } catch (error) {
      console.error('Error adding address:', error);
      alert('Error adding address. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto bg-gray-200 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Address Form</h2>

        <label className="block text-gray-700 font-semibold mb-2">Country:</label>
        <input type="text" name="country" value={address.country} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />

        <label className="block text-gray-700 font-semibold mb-2">City:</label>
        <input type="text" name="city" value={address.city} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />

        <label className="block text-gray-700 font-semibold mb-2">Address Line 1:</label>
        <input type="text" name="address1" value={address.address1} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />

        <label className="block text-gray-700 font-semibold mb-2">Address Line 2:</label>
        <input type="text" name="address2" value={address.address2} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />

        <label className="block text-gray-700 font-semibold mb-2">Zip Code:</label>
        <input type="number" name="zipCode" value={address.zipCode} onChange={handleChange} className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />

        <label className="block text-gray-700 font-semibold mb-2">Address Type:</label>
        <input type="text" name="addressType" value={address.addressType} onChange={handleChange} className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />

        <button type="submit" className="w-full p-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300">Submit</button>
      </form>
      <Footer />
    </div>
  );
};

export default AddressForm;
