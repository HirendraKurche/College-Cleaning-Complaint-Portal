// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { signInWithEmailAndPassword, sendEmailVerification, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
// import { auth } from '../../firebase/config';
// import { FaUser, FaLock, FaSpinner, FaEye, FaEyeSlash, FaMobileAlt, FaEnvelope } from "react-icons/fa";

// export default function Login() {
//   const router = useRouter();
//   const [tab, setTab] = useState('email'); // 'email' or 'mobile'

//   // Email login state
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);

//   // Mobile login state
//   const [mobile, setMobile] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [confirmationResult, setConfirmationResult] = useState(null);

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

//   // Email login handlers
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         formData.email,
//         formData.password
//       );
//       if (!userCredential.user.emailVerified) {
//         setError('Please verify your email before logging in. Check your inbox for the verification link.');
//         await auth.signOut();
//         setLoading(false);
//         return;
//       }
//       router.push('/welcome');
//     } catch (err) {
//       switch (err.code) {
//         case 'auth/invalid-email':
//           setError('Invalid email address');
//           break;
//         case 'auth/user-disabled':
//           setError('This account has been disabled');
//           break;
//         case 'auth/user-not-found':
//           setError('No account found with this email');
//           break;
//         case 'auth/wrong-password':
//           setError('Incorrect password');
//           break;
//         default:
//           setError('Login failed. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Mobile login handlers
//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);
//     let formattedMobile = mobile.trim();
//     if (/^\d{10}$/.test(formattedMobile)) {
//       formattedMobile = '+91' + formattedMobile;
//     }
//     if (!/^\+91[6-9]\d{9}$/.test(formattedMobile)) {
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
//       const confirmation = await signInWithPhoneNumber(auth, formattedMobile, appVerifier);
//       setConfirmationResult(confirmation);
//       setOtpSent(true);
//       setSuccess('OTP sent! Please check your phone.');
//     } catch (err) {
//       console.error('OTP Error:', err);
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
//     if (!otp) {
//       setError('Please enter the OTP');
//       setLoading(false);
//       return;
//     }
//     try {
//       await confirmationResult.confirm(otp);
//       setSuccess('Login successful!');
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
//         {!isLocalhost && (
//           <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500 rounded text-yellow-500 text-sm text-center">
//             Warning: Firebase Phone Auth may not work unless you access this app via <b>localhost</b>.
//           </div>
//         )}
//         {tab === 'email' ? (
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <h1 className="text-4xl font-bold text-center text-[#0E2517] mb-10">Login</h1>
//             {error && (
//               <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">{error}</div>
//             )}
//             {success && (
//               <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded text-green-500 text-sm">{success}</div>
//             )}
//             <div className="input-box flex items-center bg-gray-100 rounded px-3 py-2 mb-6">
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 className="bg-transparent outline-none text-[#0E2517] flex-1 placeholder-gray-500"
//                 required
//                 disabled={loading || resendLoading}
//               />
//               <FaUser className="text-gray-500 ml-2" />
//             </div>
//             <div className="input-box flex items-center bg-gray-100 rounded px-3 py-2 mb-6">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 className="bg-transparent outline-none text-[#0E2517] flex-1 placeholder-gray-500"
//                 required
//                 disabled={loading || resendLoading}
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="text-gray-500 hover:text-gray-700 transition-colors"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             <div className="remember-forget flex items-center justify-between text-sm text-[#0E2517] mb-6">
//               <label className="flex items-center">
//                 <input type="checkbox" className="mr-2" />Remember me
//               </label>
//               <a href="/login/forgot-password" className="hover:underline text-[#0E2517]">Forget password?</a>
//             </div>
//             <button
//               type="submit"
//               className={`w-full bg-[#81F18E] text-[#0E2517] font-semibold py-2 rounded transition relative overflow-hidden group ${loading || resendLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//               disabled={loading || resendLoading}
//             >
//               <span className="relative z-10">{loading ? (
//                 <span className="flex items-center justify-center">
//                   <FaSpinner className="animate-spin mr-2" />
//                   Logging in...
//                 </span>
//               ) : (
//                 'Login'
//               )}</span>
//               <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#81F18E] to-[#83E4E8]"></span>
//             </button>
//             <div className="register-link text-center text-[#0E2517] mt-8">
//               <p>Don&apos;t have an account? <a href="/login/register" className="text-[#0E2517] hover:underline">Register</a></p>
//             </div>
//           </form>
//         ) : (
//           <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-6">
//             <h1 className="text-4xl font-bold text-center text-[#0E2517] mb-10">Login with Mobile</h1>
//             {error && (
//               <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">{error}</div>
//             )}
//             {success && (
//               <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded text-green-500 text-sm">{success}</div>
//             )}
//             <div className="input-box flex items-center bg-gray-100 rounded px-3 py-2 mb-6">
//               <input
//                 type="tel"
//                 name="mobile"
//                 value={mobile}
//                 onChange={e => setMobile(e.target.value)}
//                 placeholder="Mobile (10 digits or +91XXXXXXXXXX)"
//                 className="bg-transparent outline-none text-[#0E2517] flex-1 placeholder-gray-500"
//                 required
//                 disabled={loading || otpSent}
//                 pattern="^(\+91)?[6-9]\d{9}$"
//                 maxLength={13}
//               />
//               <FaMobileAlt className="text-gray-500 ml-2" />
//             </div>
//             {otpSent && (
//               <div className="input-box flex items-center bg-gray-100 rounded px-3 py-2 mb-6">
//                 <input
//                   type="text"
//                   name="otp"
//                   value={otp}
//                   onChange={e => setOtp(e.target.value)}
//                   placeholder="Enter OTP"
//                   className="bg-transparent outline-none text-[#0E2517] flex-1 placeholder-gray-500"
//                   required
//                   disabled={loading}
//                 />
//               </div>
//             )}
//             <div id="recaptcha-container" />
//             <button
//               type="submit"
//               className={`w-full bg-[#81F18E] text-[#0E2517] font-semibold py-2 rounded transition relative overflow-hidden group ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//               disabled={loading}
//             >
//               <span className="relative z-10">{loading ? (
//                 <span className="flex items-center justify-center">
//                   <FaSpinner className="animate-spin mr-2" />
//                   {otpSent ? 'Verifying...' : 'Sending OTP...'}
//                 </span>
//               ) : (
//                 otpSent ? 'Verify & Login' : 'Send OTP'
//               )}</span>
//               <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#81F18E] to-[#83E4E8]"></span>
//             </button>
//             <div className="register-link text-center text-[#0E2517] mt-8">
//               <p>Don&apos;t have an account? <a href="/login/register" className="text-[#0E2517] hover:underline">Register</a></p>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }
