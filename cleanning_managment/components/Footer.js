import React from 'react';

const Footer = () => {
  return (
    <footer id='footer' className="max-w-screen h-screen bg-[#121010] text-white px-5 py-7 text-sm ">
      <div>
        <h1 className="text-3xl md:text-6xl font-semibold leading-tight mb-4 px-22 py-15 ">
          WE WOULD LOVE <br /> TO HEAR FROM YOU.
        </h1>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-30 pb-20">

        {/* Left section - Contact message */}
        <div className="md:col-span-1">
          <p className="mb-4 text-gray-300">
            Feel free to reach out if you want to collaborate with us, or simply have a chat.
          </p>
          <a
            href="mailto:contact@monopo.london"
            className="underline hover:text-gray-400 transition"
          >
            contact@monopo.london →
          </a>
        </div>

        {/* Our Address */}
        <div>
          <h4 className="font-semibold mb-2 text-gray-400">OUR ADDRESS</h4>
          <p>
            Unit D104<br />
            116 Commercial Street<br />
            London, E1 6NF<br />
            United Kingdom<br />
            <br />
            VAT: 319656475<br />
            Company no. 11843590<br />
            Registered in England & Wales
          </p>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="font-semibold mb-2 text-gray-400">FOLLOW US</h4>
          <p className="mb-1">Fb &nbsp; Tw &nbsp; Ig &nbsp; Li</p>
          <ul className="space-y-1">
            <li>↗ MONOPO TKY</li>
            <li>↗ MONOPO NYC</li>
            <li>↗ POWERED BY TOKYO</li>
          </ul>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="font-semibold mb-2 text-gray-400">HOME</h4>
          <ul className="space-y-1">
            <li>WORK</li>
            <li>SERVICES</li>
            <li>TEAM</li>
            <li>CONTACT</li>
            <li>PRESS & NEWS</li>
            <li>PRIVACY POLICY</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Get me A Chai – Fund your projects with chai.
      </div>
    </footer>
  );
};

export default Footer;
