// src/components/Footer.js

import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center">
                <p className="text-sm mb-4">
                    &copy; 2024 Developed by <span className="font-bold">Pranjay & Satvik</span>
                </p>
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                        <FaFacebook size={24} />
                    </a>
                    <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                        <FaTwitter size={24} />
                    </a>
                    <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                        <FaInstagram size={24} />
                    </a>
                    <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
                        <FaLinkedin size={24} />
                    </a>
                </div>
                <div className="text-sm">
                    <p>Contact us: <a href="mailto:info@example.com" className="underline">info@vit.ac.in</a></p>
                    <p className="mt-2">VIT, Vellore, India</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
