'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase/config';
import { FaUserCircle } from 'react-icons/fa';

export default function Welcome() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const displayName = user?.displayName || user?.email || '';
  console.log(displayName);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF1] text-[#0E2517]">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FDFBF1] text-[#0E2517] px-4">
      <div className="w-full max-w-2xl flex flex-col items-center justify-center">
        <FaUserCircle className="text-[80px] mb-6 text-[#81F18E]" />
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Welcome, {displayName} <span className="text-[#81F18E]">— an active citizen.</span>
        </h1>
        <p className="text-xl md:text-2xl font-light text-center text-[#0E2517] mb-10">
          Here are today&apos;s actions for you
        </p>
        <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
          <button
            onClick={() => window.open('https://clean-campus-dae8b.web.app/', '_blank')}
            className="w-full md:w-auto bg-[#81F18E] text-[#0E2517] px-10 py-4 rounded font-semibold text-lg transition mb-4 md:mb-0 relative overflow-hidden group"
          >
            <span className="relative z-10">Report</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#81F18E] to-[#83E4E8]"></span>
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full md:w-auto bg-[#81F18E] text-[#0E2517] px-10 py-4 rounded font-semibold text-lg transition relative overflow-hidden group"
          >
            <span className="relative z-10">My Complaints</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#81F18E] to-[#83E4E8]"></span>
          </button>
        </div>
      </div>
    </div>
  );
} 