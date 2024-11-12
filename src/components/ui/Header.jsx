"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { FaPhone } from "react-icons/fa6";
import { PiSignIn } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className='hidden lg:flex flex-row justify-between items-center diagonalimg text-white p-3 px-10'>
                <div className='w-1/2 px-10'>
                </div>
                <div className='w-2/3 flex flex-wrap gap-3 justify-end text-white px-10'>
                    <div className='flex flex-row items-center gap-x-5'>
                        <div className='flex flex-row gap-4 items-center'>
                            <FaPhone />
                            <span>(302) 244-0434</span>
                        </div>

                        <div className='flex flex-row gap-4 items-center'>
                            <PiSignIn />
                            <span>Sign in</span>
                        </div>

                        <div className='flex flex-row gap-4 items-center'>
                            <FaRegUserCircle />
                            <span>Free Signup</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between h-16 ">
                    <div className="w-full flex flex-row justify-between">
                        <div className="w-4/5 lg:w-1/5 flex-shrink-0 flex items-center">
                            <img className="h-full w-auto" src="./assets/BCS Logo billingcaresolutions.com.svg" alt="Logo" />
                        </div>
                        <div className="hidden lg:flex lg:space-x-8 items-center w-4/5 justify-end uppercase">
                            <Link href='/' className="text-secondary inline-flex items-center p-2 font-semibold hover:text-primary">Home</Link>
                            <Link href='/about' className="text-secondary inline-flex items-center p-2 font-semibold hover:text-primary">About Us</Link>
                            <Link href='/credentialing' className="text-secondary inline-flex items-center p-2 font-semibold hover:text-primary">Providers Credentialing</Link>
                        </div>
                    </div>
                    <div className="flex items-center lg:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="bg-grays-900 inline-flex items-center justify-center p-2 rounded-md text-grays-400 hover:text-secondary hover:bg-grays-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-grays-800 focus:ring-primary"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <div className="relative group">

                    </div>
                    <Link href="/" className="text-grays-900 block px-3 py-2 rounded-md text-base font-medium hover:text-secondary">Home</Link>
                    <Link href="/about" className="text-grays-900 block px-3 py-2 rounded-md text-base font-medium hover:text-secondary">About</Link>
                    <Link href="/credentialing" className="text-grays-900 block px-3 py-2 rounded-md text-base font-medium hover:text-secondary">Providers Credentialing</Link>
                    
                </div>
            </div>
        </nav>
    );
};

export default Header;