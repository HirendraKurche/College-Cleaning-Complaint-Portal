export default function HeroSection() {
    return (
      <div className="bg-zinc-900 text-white min-h-screen flex flex-col items-center justify-center px-4 ">
        {/* Hero Heading */}
        <h1 className="text-center font-serif text-[40px] md:text-[64px] font-semibold leading-tight mb-6">
          Keeping Our Campus Clean,<br className="hidden md:block" />
          One Report at a Time
        </h1>
        {/* Subheading */}
        <p className="text-center font-extralight text-[20px] md:text-[32px] max-w-3xl leading-snug">
          Report unclean areas in hostels and campus.<br className="hidden md:block" />
          Get them cleaned fast!
        </p>
      </div>
    );
  }
  