import React from 'react';
import { Link } from '@tanstack/react-router';
import { HelpCircle } from 'lucide-react';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-neutral-50 text-black pt-16 pb-8 font-sans border-t border-neutral-200 mt-16 sm:mt-24 lg:mt-32">
      <div className="container-premium px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Link to="/" className="inline-block mb-2">
              <img src="/images/logo.jpg" alt="Roymall Scents" className="h-[60px] w-auto object-contain rounded-lg shadow-sm" />
            </Link>
            <p className="text-[14px] text-neutral-600 leading-relaxed max-w-sm">
              A perfect perfume for every mood. Discover our exclusive collection of luxury fragrances and elevate your daily scent profile.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-primary hover:text-gold transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-primary hover:text-gold transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-primary hover:text-gold transition-colors">
                <FaFacebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[13px] font-bold tracking-[0.1em] uppercase mb-2 text-primary">
              Shop
            </h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/women" className="text-[14px] text-neutral-600 hover:text-gold transition-colors">Women's Fragrances</Link></li>
              <li><Link to="/men" className="text-[14px] text-neutral-600 hover:text-gold transition-colors">Men's Fragrances</Link></li>
              <li><Link to="/collections/unisex" className="text-[14px] text-neutral-600 hover:text-gold transition-colors">Unisex Scents</Link></li>
              <li><Link to="/collections/gifts" className="text-[14px] text-neutral-600 hover:text-gold transition-colors">Gift Sets</Link></li>
              <li><Link to="/collections/best-sellers" className="text-[14px] text-neutral-600 hover:text-gold transition-colors">Best Sellers</Link></li>
            </ul>
          </div>

          {/* Help & Info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[13px] font-bold tracking-[0.1em] uppercase mb-2 text-primary">
              Help & Information
            </h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/about" className="text-[14px] text-neutral-600 hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-[14px] text-neutral-600 hover:text-gold transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-[14px] text-neutral-600 hover:text-gold transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="text-[14px] text-neutral-600 hover:text-gold transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <h4 className="text-[13px] font-bold tracking-[0.1em] uppercase mb-2 text-primary">
              Stay Connected
            </h4>
            <p className="text-[14px] text-neutral-600 mb-2">
              Subscribe to our newsletter and receive 10% off your first order.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 w-full" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white border border-neutral-300 text-black px-4 py-3 text-[14px] w-full focus:outline-none focus:border-gold transition-colors placeholder:text-neutral-400"
              />
              <button type="submit" className="bg-primary text-white px-6 py-3 text-[13px] font-bold tracking-wider uppercase hover:bg-gold transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-200 pt-6 mt-8">
        <div className="container-premium px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-neutral-500 font-medium">
            &copy; {new Date().getFullYear()} Roymall Scents. All rights reserved.
          </p>
          <div className="flex gap-6 text-[12px] text-neutral-500">
            <Link to="/terms" className="hover:text-gold transition-colors">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>

      {/* Floating Help Button */}
      <button className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-gold text-white px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 transition-colors border border-white/10">
        <HelpCircle size={18} />
        <span className="text-sm font-bold tracking-wide">Help</span>
      </button>
    </footer>
  );
}
