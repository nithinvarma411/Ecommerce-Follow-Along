import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Products({ _id, name, image, description, actualPrice, discountPrice, availableSizes }) {
  const location = useLocation(); // Get the current route
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ name, image, description, actualPrice, discountPrice, availableSizes });

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `http://localhost:5000/api/v1/products/edit/${_id}`,
        editedProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      alert("Product updated successfully!");
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(
        `http://localhost:5000/api/v1/products/delete/${_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      
      alert("Product deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("Please log in to add products to your cart.");
      return;
    }

    const response = axios.post()
  };

  return (
    <div className="bg-gray-300 p-4 rounded-lg flex flex-col justify-between">
      {isEditing ? (
        <>
          <input className="w-full p-2 mb-2 border" value={editedProduct.name} onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })} />
          <input className="w-full p-2 mb-2 border" value={editedProduct.image} onChange={(e) => setEditedProduct({ ...editedProduct, image: e.target.value })} />
          <textarea className="w-full p-2 mb-2 border" value={editedProduct.description} onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })} />
          <input className="w-full p-2 mb-2 border" type="number" value={editedProduct.actualPrice} onChange={(e) => setEditedProduct({ ...editedProduct, actualPrice: Number(e.target.value) })} />
          <input className="w-full p-2 mb-2 border" type="number" value={editedProduct.discountPrice} onChange={(e) => setEditedProduct({ ...editedProduct, discountPrice: Number(e.target.value) })} />
          <button onClick={handleEdit} className="w-full text-white px-4 py-2 rounded-md bg-green-600">SAVE</button>
          <button onClick={() => setIsEditing(false)} className="w-full text-white px-4 py-2 rounded-md bg-gray-600">CANCEL</button>
        </>
      ) : (
        <>
          <img src={image} alt={name} className="w-full h-56 object-cover rounded-lg mb-2" />
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-base opacity-50 my-2">{description}</p>
          <p className="text-lg font-bold my-2">Original Price: ${actualPrice}</p>
          <p className="text-lg font-bold my-2">Selling Price: ${discountPrice}</p>

          {location.pathname === "/MyProducts" ? (
            <>
              <button onClick={() => setIsEditing(true)} className="w-full text-white px-4 py-2 rounded-md bg-blue-600">EDIT</button>
              <button onClick={handleDelete} className="w-full text-white px-4 py-2 rounded-md bg-red-600 mt-2">DELETE</button>
            </>
          ) : (
            <button onClick={handleAddToCart} className="w-full text-white px-4 py-2 rounded-md bg-green-600 mt-2">ADD TO CART</button>
          )}
        </>
      )}
    </div>
  );
}

export default Products;
