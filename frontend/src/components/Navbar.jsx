
"use client";
import React from 'react';
import Link from 'next/link';
import { useMainContext } from '@/context/MainContext';
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import { setIsToggle } from '@/redux/slice/sidebarSlice';
import Image from 'next/image';

const Navbar = () => {
    const { user, LogoutHandler } = useMainContext();
    const dispatch = useDispatch();

    return (
        <header className="w-full border-b border-gray-300 bg-white shadow-sm sticky top-0 z-50"> 
        <nav className="w-[95%] lg:w-[80%] mx-auto py-4 flex items-center justify-between">

                  {/* Right side: Hamburger + Logo */}
                <div className="flex items-center gap-x-3">
                    <button 
                        onClick={() => dispatch(setIsToggle())} 
                        className='bg-gray-100 rounded-full p-2 sm:hidden text-xl hover:bg-gray-200 transition duration-300 cursor-pointer'>
                        <GiHamburgerMenu/>
                    </button>
                    {/* Logo on right */}
                     <div>
    <Image
        src="/logo.png"
        alt="Logo"
        width={250}   // desired display width
        height={250}  // desired display height
    />
</div>
    
                </div>
                
                {/* Left side: Navigation links */}
                <ul className="flex items-center gap-x-6">
                    <li>
                        <Link 
                            href="/" 
                            className="px-3 py-1 rounded-md hover:bg-amber-100 text-amber-950 font-semibold transition duration-300">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/about" 
                            className="px-3 py-1 rounded-md hover:bg-amber-100 text-amber-950 font-semibold transition duration-300">
                            About
                        </Link>
                    </li>
                    {user ? (
                        <li>
                            <button 
                                onClick={LogoutHandler} 
                                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-1 rounded-md font-medium transition duration-300">
                                Logout
                            </button>
                        </li>
                    ) : (
                        <li>
                            <Link 
                                href="/login" 
                                className="px-4 py-1 rounded-md bg-amber-950 text-white font-medium hover:bg-amber-600 transition duration-300">
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;

