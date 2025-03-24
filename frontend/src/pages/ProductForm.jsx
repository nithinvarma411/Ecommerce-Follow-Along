import { useState } from "react";
import axios from "axios";

const ProductForm = ({ onProductCreated }) => {
  const initialFormState = {
    image: null,
    title: "",
    actualPrice: "",
    discountPrice: "",
    description: "",
    availableSizes: []
  };

  const [formData, setFormData] = useState(initialFormState);
  const [newSize, setNewSize] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleAddSize = () => {
    if (newSize.trim() === "") return;
    const sizeNumber = parseFloat(newSize);
    if (isNaN(sizeNumber)) return;
    setFormData((prev) => ({
      ...prev,
      availableSizes: [...prev.availableSizes, sizeNumber],
    }));
    setNewSize("");
  };

  const handleRemoveSize = (index) => {
    setFormData((prev) => ({
      ...prev,
      availableSizes: prev.availableSizes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", formData.image);
    data.append("name", formData.title);
    data.append("description", formData.description);
    data.append("actualPrice", formData.actualPrice);
    data.append("discountPrice", formData.discountPrice);
    data.append("availableSizes", JSON.stringify(formData.availableSizes));

    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/products/createProduct`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      console.log("Product created:", res.data);
      alert("Product created successfully!");
      setFormData(initialFormState);
      setNewSize("");

      if (onProductCreated) {
        onProductCreated(res.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error.response ? error.response.data : error);
    }
  };

  return (
    <div className="bg-gray-500 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto mt-10 p-6 shadow-md rounded-2xl border border-gray-200 bg-white">
        <h2 className="text-xl font-semibold mb-4 text-center">Product Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block mb-1 font-medium">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Actual Price</label>
            <input
              type="number"
              name="actualPrice"
              value={formData.actualPrice}
              onChange={handleChange}
              placeholder="Enter actual price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Discount Price</label>
            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              placeholder="Enter discount price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium">Available Sizes</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                placeholder="Enter size (e.g., 38)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
              <button
                type="button"
                onClick={handleAddSize}
                className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
              >
                Add Size
              </button>
            </div>
            {formData.availableSizes.length > 0 && (
              <ul className="mt-2">
                {formData.availableSizes.map((size, index) => (
                  <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md mt-1">
                    <span>{size}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
