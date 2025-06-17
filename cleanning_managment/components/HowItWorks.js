import React from 'react';

const steps = [
    {
        title: "Take a Picture of the Issue",
        desc: "Capture the unclean area using your phone and upload it to the platform."
    },
    {
        title: "Select a Category & Submit",
        desc: "Choose the complaint type (cleaning, water issue, etc.) and submit it."
    },
    {
        title: "Supervisor Gets Notified",
        desc: "The responsible supervisor receives an instant WhatsApp notification."
    },
    {
        title: "Work is Done & Status Updated",
        desc: "Workers clean the area, upload before-and-after images, and update the complaint status."
    }
];

const stepImages = [
    '/assets/images/step1.png',
    '/assets/images/step2.png',
    '/assets/images/step3.png',
    '/assets/images/step4.png',
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="max-w-screen bg-#FDFBF1 text-#0E2517  px-6 md:px-10 py-15">
            <div className="max-w-screen mx-auto px-6 py-20">
                <p className="text-xl text-#0E2517  mb-2">Latest</p>
                <h2 className="text-6xl md:text-4xl font-bold mb-2">How It Works</h2>
                <p className="text-2xl font-light text-#0E2517  mb-20">
                    Easily report and track cleanliness issues in your hostel or campus.
                </p>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-start">
                            <div className="w-full h-32 md:h-60  rounded-3xl mb-4 overflow-hidden flex items-center justify-center">
                                <img 
                                    src={stepImages[index]} 
                                    alt={step.title} 
                                    className="object-contain w-full h-full scale-130 translate-y-8" 
                                />
                            </div>
                            <h4 className="font-semibold text-xl leading-tight mb-2 ml-3">{step.title}</h4>
                            <p className="text-xl font-light text-#0E2517  ml-3">{step.desc}</p>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="flex justify-center mt-20">
                    <button className="bg-[#81F18E] text-[#0E2517] px-10 py-3 rounded-full text-xl font-semibold transition relative overflow-hidden group">
                        <span className="relative z-10">View more</span>
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#81F18E] to-[#83E4E8]"></span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
