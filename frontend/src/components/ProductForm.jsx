import { useState } from "react";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    actualPrice: "",
    discountPrice: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="bg-gray-500 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto mt-10 p-6 shadow-md rounded-2xl border border-gray-200 bg-white">
        <h2 className="text-xl font-semibold mb-4 text-center">Product Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
