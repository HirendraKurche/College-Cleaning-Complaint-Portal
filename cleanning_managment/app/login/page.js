'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, sendEmailVerification, signInWithPhoneNumber, RecaptchaVerifier, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { FaUser, FaLock, FaSpinner, FaEye, FaEyeSlash, FaMobileAlt, FaEnvelope } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  // Only email login

  // Email login state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    collegeId: ''  // Add college ID field
  });
  const [showPassword, setShowPassword] = useState(false);

  // Mobile login removed

  // Shared state
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Add this at the top of the component
  const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Email login handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      if (!userCredential.user.emailVerified) {
        setError('Please verify your email before logging in. Check your inbox for the verification link.');
        await auth.signOut();
        setLoading(false);
        return;
      }
      // Store college ID in user's profile
      await updateProfile(userCredential.user, {
                displayName: formData.collegeId
      });
    
      router.push('/welcome');
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        default:
          setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Mobile login handlers removed

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF1]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-8 gap-4">
          <h1 className="text-4xl font-bold text-center text-[#0E2517] mb-10">Login</h1>
        </div>
        {/* Only email login remains */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded text-green-500 text-sm">{success}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ...existing email login form... */}
          <div className="input-box flex items-center bg-gray-100 rounded px-3 py-2 mb-6">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-transparent outline-none text-[#0E2517] flex-1 placeholder-gray-500"
              required
              disabled={loading || resendLoading}
            />
            <FaUser className="text-gray-500 ml-2" />
          </div>
          <div className="input-box flex items-center bg-gray-100 rounded px-3 py-2 mb-6">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="bg-transparent outline-none text-[#0E2517] flex-1 placeholder-gray-500"
              required
              disabled={loading || resendLoading}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="input-box flex items-center bg-gray-100 rounded px-3 py-2 mb-6">
            <input
              type="text"
              name="collegeId"
              value={formData.collegeId}
              onChange={handleChange}
              placeholder="College ID"
              className="bg-transparent outline-none text-[#0E2517] flex-1 placeholder-gray-500"
              required
              disabled={loading || resendLoading}
            />
            <FaUser className="text-gray-500 ml-2" />
          </div>
          <div className="remember-forget flex items-center justify-between text-sm text-[#0E2517] mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />Remember me
            </label>
            <a href="/login/forgot-password" className="hover:underline text-[#0E2517]">Forget password?</a>
          </div>
          <button
            type="submit"
            className={`w-full bg-[#81F18E] text-[#0E2517] font-semibold py-2 rounded transition relative overflow-hidden group ${loading || resendLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading || resendLoading}
          >
            <span className="relative z-10">{loading ? (
              <span className="flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" />
                Logging in...
              </span>
            ) : (
              'Login'
            )}</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#81F18E] to-[#83E4E8]"></span>
          </button>
          <div className="register-link text-center text-[#0E2517] mt-8">
            <p>Don&apos;t have an account? <a href="/login/register" className="text-[#0E2517] hover:underline">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}
