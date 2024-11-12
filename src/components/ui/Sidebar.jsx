"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope } from 'react-icons/fa';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex">
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } lg:hidden`}
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 h-screen bg-gradient-to-b from-blue-700 to-blue-900 shadow-xl transition-transform transform duration-300 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 lg:static lg:inset-0`}
            >
                <div className="p-6 text-2xl font-bold text-white">
                    <Link href="/">
                        <span className="cursor-pointer hover:text-yellow-300 transition-colors duration-200">MyApp</span>
                    </Link>
                </div>
                <nav className="p-4">
                    <ul className="flex flex-col gap-y-4 text-white text-xl">
                        <li className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                            <FaHome />
                            <Link href="/">
                                <span className="cursor-pointer hover:text-yellow-300">Home</span>
                            </Link>
                        </li>
                        <li className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                            <FaInfoCircle />
                            <Link href="/about">
                                <span className="cursor-pointer hover:text-yellow-300">About</span>
                            </Link>
                        </li>
                        <li className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                            <FaServicestack />
                            <Link href="/services">
                                <span className="cursor-pointer hover:text-yellow-300">Services</span>
                            </Link>
                        </li>
                        <li className="w-full p-3 flex items-center gap-3 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                            <FaEnvelope />
                            <Link href="/contact">
                                <span className="cursor-pointer hover:text-yellow-300">Contact</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Toggle Button */}
            <button
                className="z-50 p-2 m-4 text-white bg-blue-600 rounded-lg shadow-md lg:hidden hover:bg-blue-700 transition duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? 'Close' : 'Open'} Sidebar
            </button>
        </div>
    );
}
