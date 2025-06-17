'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import { FaSpinner } from "react-icons/fa";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset email sent! Please check your inbox.');
      
      // Wait for 3 seconds to show success message
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Redirect to login page
      router.push('/login');
    } catch (err) {
      console.error('Password reset error:', err);
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email');
          break;
        default:
          setError('Failed to send reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF1]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-[#0E2517] mb-6">Forgot Password</h1>
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded text-green-500 text-sm">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-[#0E2517]">
              Enter your email address and we'll send you a link to reset your password.
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded bg-gray-100 text-[#0E2517] placeholder-gray-500 outline-none"
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-[#81F18E] text-[#0E2517] font-semibold py-2 rounded transition relative overflow-hidden group ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            <span className="relative z-10">{loading ? (
              <span className="flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" />
                Sending...
              </span>
            ) : (
              'Send Reset Link'
            )}</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#81F18E] to-[#83E4E8]"></span>
          </button>
          <div className="text-center text-[#0E2517]">
            <p>Remember your password? <a href="/login" className="text-[#0E2517] hover:underline">Back to Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
} 