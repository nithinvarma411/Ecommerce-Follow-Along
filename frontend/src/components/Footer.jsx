import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto text-center px-4">
          <p>&copy; {new Date().getFullYear()} ShoeStore. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="hover:text-white">
              Facebook
            </a>
            <a href="#" className="hover:text-white">
              Twitter
            </a>
            <a href="#" className="hover:text-white">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
