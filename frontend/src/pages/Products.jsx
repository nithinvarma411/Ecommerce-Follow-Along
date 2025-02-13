function Products({ name, image, description, actualPrice, discountPrice, availableSizes }) {

  return (
    <div className="bg-gray-300 p-4 rounded-lg flex flex-col justify-between">
      <div className="w-full">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover rounded-lg mb-2"
        />
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-base opacity-50 my-2">{description}</p>
      </div>
      <div className="w-full">
        <p className="text-lg font-bold my-2">Original Price: ${actualPrice}</p>
        <p className="text-lg font-bold my-2">Selling Price: ${discountPrice}</p>
        <div className="my-2">
          <label htmlFor="size" className="block text-sm font-semibold mb-1">
            Select Size:
          </label>
          <select
            id="size"
            className="w-full p-2 rounded-md border border-gray-400"
          >
            {availableSizes.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <button className="w-full text-white px-4 py-2 rounded-md bg-neutral-900">
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default Products;
