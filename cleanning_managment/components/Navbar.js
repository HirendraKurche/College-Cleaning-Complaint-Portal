'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleContactClick = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleComplaintsClick = () => {
    const complaintsSection = document.getElementById('complaint-list');
    if (complaintsSection) {
      complaintsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReportClick = () => {
    if (!user) {
      router.push('/login');
    }
  };

  return (
    <nav className="flex justify-between items-center px-8 py-5 bg-[#EBEFEB] text-[#0E2517] shadow-md font-sans tracking-wide">
      {/* Left Links */}
      <div className="flex gap-8 text-base font-medium uppercase">
        {user ? (
          <Link 
            href="https://clean-campus-dae8b.web.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition"
          >
            <span className="normal-case">Report</span>
          </Link>
        ) : (
          <button
            onClick={handleReportClick}
            className="hover:text-gray-400 transition normal-case"
          >
            Report
          </button>
        )}
        <button
          onClick={handleComplaintsClick}
          className="hover:text-gray-400 transition"
        >
          View Complaints
        </button>
      </div>

      {/* Center Title */}
      <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0 md:ml-0 text-center md:text-left">
        <Link 
          href="/" 
          className="text-2xl md:text-3xl font-bold font-serif text-center md:text-left hover:text-[#0E2517] transition duration-200 inline-block"
        >
          Complaint Portal
        </Link>
      </div>

      {/* Right Links */}
      <div className="flex gap-8 text-base font-medium uppercase">
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-[#81F18E] text-[#0E2517] font-bold uppercase rounded-full px-6 py-2 shadow-md transition duration-200 relative overflow-hidden group"
          >
            <span className="relative z-10">Logout</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#81F18E] to-[#83E4E8]"></span>
          </button>
        ) : (
          <Link href="/login">
            <button className="bg-[#81F18E] text-[#0E2517] font-bold uppercase rounded-full px-6 py-2 shadow-md transition duration-200 relative overflow-hidden group">
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#81F18E] to-[#83E4E8]"></span>
            </button>
          </Link>
        )}
        <button
          onClick={handleContactClick}
          className="hover:text-gray-400 transition"
        >
          Contact
        </button>
      </div>
    </nav>
  );
}
