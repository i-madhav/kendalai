'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue</p>
        </div>

        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <Image
            src="/google.svg"
            alt="Google Logo"
            width={20}
            height={20}
          />
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
