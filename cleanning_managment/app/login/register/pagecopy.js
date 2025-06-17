// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
// import { auth } from '../../../firebase/config';
// import { FaSpinner, FaEye, FaEyeSlash, FaMobileAlt, FaEnvelope } from "react-icons/fa";

// export default function Register() {
//   const router = useRouter();
//   const [tab, setTab] = useState('email'); // 'email' or 'mobile'

//   // Email registration state
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Mobile registration state
//   const [mobileData, setMobileData] = useState({
//     username: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     otp: ''
//   });
//   const [showMobilePassword, setShowMobilePassword] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const recaptchaRef = useRef(null);

//   // Shared state
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [countdown, setCountdown] = useState(0);

//   // Add this at the top of the component
//   const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

//   useEffect(() => {
//     let timer;
//     if (countdown > 0) {
//       timer = setInterval(() => {
//         setCountdown(prev => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [countdown]);

//   // Email registration handlers
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);
//   const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

//   const validateForm = () => {
//     if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
//       setError('All fields are required');
//       return false;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return false;
//     }
//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return false;
//     }
//     if (!formData.email.includes('@')) {
//       setError('Please enter a valid email');
//       return false;
//     }
//     return true;
//   };

//   const handleResendVerification = async () => {
//     if (countdown > 0) return;
//     setResendLoading(true);
//     setError('');
//     setSuccess('');
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         formData.email,
//         formData.password
//       );
//       await sendEmailVerification(userCredential.user);
//       await auth.signOut();
//       setSuccess('Verification email sent! Please check your inbox.');
//       setCountdown(30);
//     } catch (err) {
//       setError('Failed to resend verification email. Please try again.');
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);
//     if (!validateForm()) {
//       setLoading(false);
//       return;
//     }
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         formData.email,
//         formData.password
//       );
//       await updateProfile(userCredential.user, {
//         displayName: formData.username
//       });
//       await sendEmailVerification(userCredential.user);
//       setSuccess('Registration successful! Please check your email to verify your account.');
//       setCountdown(30);
//     } catch (err) {
//       switch (err.code) {
//         case 'auth/email-already-in-use':
//           setError('Email is already registered');
//           break;
//         case 'auth/invalid-email':
//           setError('Invalid email address');
//           break;
//         case 'auth/operation-not-allowed':
//           setError('Registration is currently disabled');
//           break;
//         case 'auth/weak-password':
//           setError('Password is too weak');
//           break;
//         default:
//           setError('Registration failed. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Mobile registration handlers
//   const handleMobileChange = (e) => {
//     const { name, value } = e.target;
//     setMobileData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
//   const toggleMobilePasswordVisibility = () => setShowMobilePassword(!showMobilePassword);

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);
//     if (!mobileData.username || !mobileData.phone) {
//       setError('All fields are required');
//       setLoading(false);
//       return;
//     }
//     let formattedPhone = mobileData.phone.trim();
//     if (/^\d{10}$/.test(formattedPhone)) {
//       formattedPhone = '+91' + formattedPhone;
//     }
//     if (!/^\+91[6-9]\d{9}$/.test(formattedPhone)) {
//       setError('Please enter a valid Indian mobile number (10 digits or +91XXXXXXXXXX)');
//       setLoading(false);
//       return;
//     }
//     try {
//       // Debug logs
//       console.log('auth:', auth);
//       const recaptchaContainer = document.getElementById('recaptcha-container');
//       console.log('recaptcha-container exists:', !!recaptchaContainer);
//       if (!auth) {
//         setError('Firebase auth is not initialized. Check your environment variables.');
//         setLoading(false);
//         return;
//       }
//       if (!recaptchaContainer) {
//         setError('Recaptcha container not found in the DOM.');
//         setLoading(false);
//         return;
//       }
//       if (!isLocalhost) {
//         setError('Firebase Phone Auth may not work unless you access this app via localhost.');
//         setLoading(false);
//         return;
//       }
//       if (!window.recaptchaVerifier) {
//         try {
//           window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
//             size: 'invisible',
//             callback: () => {},
//           }, auth);
//         } catch (recaptchaError) {
//           setError('Failed to initialize RecaptchaVerifier. Try refreshing the page or use localhost.');
//           setLoading(false);
//           return;
//         }
//       }
//       const appVerifier = window.recaptchaVerifier;
//       const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
//       setConfirmationResult(confirmation);
//       setOtpSent(true);
//       setSuccess('OTP sent! Please check your phone.');
//     } catch (err) {
//       setError('Failed to send OTP. Please check the phone number and try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);
//     if (!mobileData.otp) {
//       setError('Please enter the OTP');
//       setLoading(false);
//       return;
//     }
//     try {
//       const result = await confirmationResult.confirm(mobileData.otp);
//       await updateProfile(result.user, { displayName: mobileData.username });
//       setSuccess('Registration successful! You are now logged in.');
//       router.push('/welcome');
//     } catch (err) {
//       setError('Invalid OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#FDFBF1]">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
//         <div className="flex justify-center mb-8 gap-4">
//           <button
//             className={`flex items-center gap-2 px-4 py-2 rounded-t font-semibold transition relative overflow-hidden group ${tab === 'email' ? 'bg-[#81F18E] text-[#0E2517]' : 'bg-gray-100 text-[#0E2517]'}`}
//             onClick={() => setTab('email')}
//           >
//             <span className="relative z-10"><FaEnvelope /> Email</span>
//             <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#81F18E] to-[#83E4E8]"></span>
//           </button>
//           <button
//             className={`flex items-center gap-2 px-4 py-2 rounded-t font-semibold transition relative overflow-hidden group ${tab === 'mobile' ? 'bg-[#81F18E] text-[#0E2517]' : 'bg-gray-100 text-[#0E2517]'}`}
//             onClick={() => setTab('mobile')}
//           >
//             <span className="relative z-10"><FaMobileAlt /> Mobile</span>
//             <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#81F18E] to-[#83E4E8]"></span>
//           </button>
//         </div>
//         {tab === 'email' ? (
//           <>
//             <h1 className="text-2xl font-bold text-center text-[#0E2517] mb-6">Register with Email</h1>
//             {error && (
//               <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">{error}</div>
//             )}
//             {success && (
//               <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded text-green-500 text-sm">
//                 {success}
//                 <button
//                   type="button"
//                   onClick={handleResendVerification}
//                   disabled={resendLoading || countdown > 0}
//                   className="block mt-2 text-[#0E2517] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {resendLoading ? (
//                     <span className="flex items-center">
//                       <FaSpinner className="animate-spin mr-2" /> Sending...
//                     </span>
//                   ) : countdown > 0 ? (
//                     `Resend available in ${countdown}s`
//                   ) : (
//                     'Resend verification email'
//                   )}
//                 </button>
//               </div>
//             )}
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 placeholder="Username"
//                 className="w-full px-3 py-2 rounded bg-gray-100 text-[#0E2517] placeholder-gray-500 outline-none"
//                 required
//                 disabled={loading || resendLoading}
//               />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 className="w-full px-3 py-2 rounded bg-gray-100 text-[#0E2517] placeholder-gray-500 outline-none"
//                 required
//                 disabled={loading || resendLoading}
//               />
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Password"
//                   className="w-full px-3 py-2 rounded bg-gray-100 text-[#0E2517] placeholder-gray-500 outline-none"
//                   required
//                   disabled={loading || resendLoading}
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </button>
//               </div>
//               <div className="relative">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="Confirm Password"
//                   className="w-full px-3 py-2 rounded bg-gray-100 text-[#0E2517] placeholder-gray-500 outline-none"
//                   required
//                   disabled={loading || resendLoading}
//                 />
//                 <button
//                   type="button"
//                   onClick={toggleConfirmPasswordVisibility}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
//                 >
//                   {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//                 </button>
//               </div>
//               <button
//                 type="submit"
//                 className={`w-full bg-[#81F18E] text-[#0E2517] font-semibold py-2 rounded transition relative overflow-hidden group ${loading || resendLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 disabled={loading || resendLoading}
//               >
//                 <span className="relative z-10">{loading ? (
//                   <span className="flex items-center justify-center">
//                     <FaSpinner className="animate-spin mr-2" /> Registering...
//                   </span>
//                 ) : (
//                   'Register'
//                 )}</span>
//                 <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#81F18E] to-[#83E4E8]"></span>
//               </button>
//               <div className="text-center text-[#0E2517]">
//                 <p>Already have an account? <a href="/login" className="text-[#0E2517] hover:underline">Login</a></p>
//               </div>
//             </form>
//           </>
//         ) : (
//           <>
//             <h1 className="text-2xl font-bold text-center text-[#0E2517] mb-6">Register with Mobile</h1>
//             {error && (
//               <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">{error}</div>
//             )}
//             {success && (
//               <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded text-green-500 text-sm">{success}</div>
//             )}
//             {!isLocalhost && (
//               <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500 rounded text-yellow-500 text-sm text-center">
//                 Warning: Firebase Phone Auth may not work unless you access this app via <b>localhost</b>.
//               </div>
//             )}
//             <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-6">
//               <input
//                 type="text"
//                 name="username"
//                 value={mobileData.username}
//                 onChange={handleMobileChange}
//                 placeholder="Username"
//                 className="w-full px-3 py-2 rounded bg-gray-100 text-[#0E2517] placeholder-gray-500 outline-none"
//                 required
//                 disabled={loading}
//               />
//               <input
//                 type="tel"
//                 name="phone"
//                 value={mobileData.phone}
//                 onChange={handleMobileChange}
//                 placeholder="Phone (10 digits or +91XXXXXXXXXX)"
//                 className="w-full px-3 py-2 rounded bg-gray-100 text-[#0E2517] placeholder-gray-500 outline-none"
//                 required
//                 disabled={loading || otpSent}
//                 pattern="^(\+91)?[6-9]\d{9}$"
//                 maxLength={13}
//               />
//               {otpSent && (
//                 <input
//                   type="text"
//                   name="otp"
//                   value={mobileData.otp}
//                   onChange={handleMobileChange}
//                   placeholder="Enter OTP"
//                   className="w-full px-3 py-2 rounded bg-gray-100 text-[#0E2517] placeholder-gray-500 outline-none"
//                   required
//                   disabled={loading}
//                 />
//               )}
//               <div id="recaptcha-container" />
//               <button
//                 type="submit"
//                 className={`w-full bg-[#81F18E] text-[#0E2517] font-semibold py-2 rounded transition relative overflow-hidden group ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 disabled={loading}
//               >
//                 <span className="relative z-10">{loading ? (
//                   <span className="flex items-center justify-center">
//                     <FaSpinner className="animate-spin mr-2" />
//                     {otpSent ? 'Verifying...' : 'Sending OTP...'}
//                   </span>
//                 ) : (
//                   otpSent ? 'Verify & Register' : 'Send OTP'
//                 )}</span>
//                 <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#81F18E] to-[#83E4E8]"></span>
//               </button>
//               <div className="text-center text-[#0E2517]">
//                 <p>Already have an account? <a href="/login" className="text-[#0E2517] hover:underline">Login</a></p>
//               </div>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// } 