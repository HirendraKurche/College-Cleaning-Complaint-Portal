'use client';

import Link from 'next/link';

export default function Navbar() {
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

  return (
    <nav className="flex justify-between items-center px-6 py-4 text-white bg-zinc-900">
      {/* Left Links */}
      <div className="flex gap-6 text-sm">
        <Link 
          href="https://clean-campus-dae8b.web.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          Report
        </Link>
        <button
          onClick={handleComplaintsClick}
          className="hover:text-gray-400 transition"
        >
          View Complaints
        </button>
      </div>

      {/* Center Title */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link 
          href="/" 
          className="text-2xl font-serif text-center hover:text-gray-400 transition transform hover:-rotate-2 duration-300 inline-block"
        >
          Complaint Portal
        </Link>
      </div>

      {/* Right Links */}
      <div className="flex gap-6 text-sm">
        <Link href="/login" className="hover:text-gray-400 transition">Login</Link>
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
