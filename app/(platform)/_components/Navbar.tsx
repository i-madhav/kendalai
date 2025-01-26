"use client"
import React from 'react'
import Link from 'next/link'
import { signIn , signOut , useSession} from "next-auth/react";
const Navbar = () => {
  const session = useSession();
  console.log("This is session data");
  console.log(session.data);
  return (
    <nav className="bg-white/70 backdrop-blur-sm border-b border-black shadow-sm px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/" className="font-bold text-xl text-gray-700 hover:text-gray-900 transition-colors">
          Kendal Property
        </Link>

        {/* User Menu */}
        <div className="flex items-center space-x-5">
          {session.data ? (
            <button 
              onClick={() => signOut()}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Logout
            </button>
          ) : (
            <button 
              onClick={() => signIn()}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Login
            </button>
          )}
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200">
            <span className="text-sm font-medium text-gray-500">U</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar