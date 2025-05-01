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

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="max-w-screen bg-zinc-900 text-white px-6 md:px-10 py-15">
            <div className="max-w-screen mx-auto px-6 py-20">
                <p className="text-xl text-gray-300 mb-2">Latest</p>
                <h2 className="text-6xl md:text-4xl font-bold mb-2">How It Works</h2>
                <p className="text-2xl font-light text-gray-200 mb-20">
                    Easily report and track cleanliness issues in your hostel or campus.
                </p>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-start">
                            <div className="w-full h-32 md:h-50 bg-gray-200 rounded-3xl mb-4"></div>
                            <h4 className="font-semibold text-xl leading-tight mb-2 ml-3">{step.title}</h4>
                            <p className="text-xl font-light text-gray-300 ml-3">{step.desc}</p>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="flex justify-center mt-20">
                    <button className="bg-white text-black px-10 py-3 rounded-full text-xl font-semibold hover:bg-gray-300 transition">
                        View more
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
