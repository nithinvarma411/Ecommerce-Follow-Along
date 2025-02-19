import React from 'react'

function Pic() {
  return (
    <div>
      <section
        className="bg-cover bg-center h-96 relative"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1350&q=80")',
        }}
      >
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
  )
}

export default Pic
