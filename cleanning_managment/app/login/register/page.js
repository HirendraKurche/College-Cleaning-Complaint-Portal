'use client';
import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../../firebase/config';
import { setDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import { FaSpinner, FaEye, FaEyeSlash, FaMobileAlt, FaEnvelope } from "react-icons/fa";
export default function Register() {
  const router = useRouter();
  // Only email registration

  // Email registration state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    collegeId: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mobile registration removed

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

  // Email registration handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword || !formData.collegeId) {
      setError('All fields are required');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    return true;
  };

  const handleResendVerification = async () => {
    if (countdown > 0) return;
    setResendLoading(true);
    setError('');
    setSuccess('');
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await sendEmailVerification(userCredential.user);
      await auth.signOut();
      setSuccess('Verification email sent! Please check your inbox.');
      setCountdown(30);
    } catch (err) {
      setError('Failed to resend verification email. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(userCredential.user, {
        displayName: formData.collegeId,
        // collegeId: formData.collegeId
      });
      // Save user data to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username: formData.username,
        email: formData.email,
        collegeId: formData.collegeId,
        registrationMethod: "email",
        createdAt: new Date().toISOString()
      });
      await auth.currentUser.reload();
      await sendEmailVerification(userCredential.user);
      setSuccess('Registration successful! Please check your email to verify your account.');
      setCountdown(30);
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Email is already registered');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/operation-not-allowed':
          setError('Registration is currently disabled');
          break;
        case 'auth/weak-password':
          setError('Password is too weak');
          break;
        default:
          setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  
  // Mobile registration handlers removed

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF1]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-center text-[#0E2517] mb-6">Register with Email</h1>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded text-green-500 text-sm">
            {success}
            <button
              type="button"
              onClick={handleResendVerification}
              disabled={resendLoading || countdown > 0}
              className="block mt-2 text-[#0E2517] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendLoading ? (
                <span className="flex items-center">
                  <FaSpinner className="animate-spin mr-2" /> Sending...
                </span>
              ) : countdown > 0 ? (
                `Resend available in ${countdown}s`
              ) : (
                'Resend verification email'
              )}
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-3 py-2 rounded bg-gray-100 text-[#0E2517] placeholder-gray-500 outline-none"
            required
            disabled={loading || resendLoading}
          />
          <input
            type="text"
            name="collegeId"
            value={formData.collegeId}
            onChange={handleChange}
            placeholder="College ID"
            className="w-full px-3 py-2 rounded bg-gray-100 text-[#0E2517] placeholder-gray-500 outline-none"
            required
            disabled={loading || resendLoading}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-3 py-2 rounded bg-gray-100 text-[#0E2517] placeholder-gray-500 outline-none"
            required
            disabled={loading || resendLoading}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-3 py-2 rounded bg-gray-100 text-[#0E2517] placeholder-gray-500 outline-none"
              required
              disabled={loading || resendLoading}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-3 py-2 rounded bg-gray-100 text-[#0E2517] placeholder-gray-500 outline-none"
              required
              disabled={loading || resendLoading}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className={`w-full bg-[#81F18E] text-[#0E2517] font-semibold py-2 rounded transition relative overflow-hidden group ${loading || resendLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading || resendLoading}
          >
            <span className="relative z-10">{loading ? (
              <span className="flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" /> Registering...
              </span>
            ) : (
              'Register'
            )}</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#81F18E] to-[#83E4E8]"></span>
          </button>
          <div className="text-center text-[#0E2517]">
            <p>Already have an account? <a href="/login" className="text-[#0E2517] hover:underline">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
} 