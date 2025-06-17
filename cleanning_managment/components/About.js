import Image from 'next/image';
import cleaningImg from '../assets/images/ChatGPT Image May 12, 2025, 12_39_25 AM.png';

export default function AboutSection() {
    return (
        <section className="bg-#FDFBF1 text-#0E2517 py-16 px-6 md:px-7 relative overflow-hidden">
            {/* Absolute/fixed image on the left, hidden on small screens */}
            <div className="hidden md:block absolute left-10 top-1/2 -translate-y-1/2 h-[450px] w-[600px] flex items-center justify-center">
                <Image
                    src={cleaningImg}
                    alt="Cleaning Illustration"
                    className="rounded-lg object-contain shadow-lg " 
                    fill 
                    style={{ objectFit: 'contain' }}
                    priority
                />
            </div>
            <div className="max-w-3xl ml-auto relative z-10">
                {/* Section label */}
                <h3 className="text-sm uppercase tracking-widest mb-2 font-normal">About</h3>
                <hr className="border-#0E2517 w-125 " />

                {/* Main Heading */}
                <h2 className="text-[32px] md:text-[70px] font-normal font-semibold leading-tight mb-1 ">
                    We Create<br />
                    A Cleaner & <br />
                    Healthier Campus
                </h2>

                {/* Paragraph Content */}
                <div className="pr-0 md:pr-20 text-#0E2517 text-2xl font-light space-y-2 leading-normal text-justify">
                    <p>
                        By empowering students to report unsanitary conditions and supervisors to
                        monitor work, we ensure a hygienic campus environment.
                        <br />
                        <br />
                        Our system streamlines complaint management, allowing students to report
                        issues instantly and track their resolution. Automated notifications ensure
                        quick response, while before-and-after images enable transparent supervision.
                        <br />
                        {/* <br /> */}
                        Built for accountability, driven by community, made to keep our campus clean.
                    </p>
                </div>
            </div>
        </section>
    );
}
