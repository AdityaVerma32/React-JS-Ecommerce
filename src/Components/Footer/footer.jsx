import React from 'react'

function footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">About Us</h3>
          <p className="text-sm">
            We are committed to providing the best quality products and services to our customers. Your satisfaction is our priority.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-white">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-bold">Address:</span> 123 Main Street, City, Country
            </li>
            <li>
              <span className="font-bold">Phone:</span> +1 234 567 890
            </li>
            <li>
              <span className="font-bold">Email:</span>{" "}
              <a href="mailto:info@example.com" className="hover:text-white">
                info@example.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} AppName. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default footer
