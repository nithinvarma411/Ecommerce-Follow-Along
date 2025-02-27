import React from 'react';

function Pic() {
  return (
    <div>
      <section
        className="relative w-full h-[60vh] md:h-[500px] lg:h-[600px] flex items-center justify-center"
      >
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1350&q=80"
          alt="Shoes Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Step into Style
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mb-6">
              Discover our exclusive collection of sneakers & formal shoes
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded">
              Shop Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pic;