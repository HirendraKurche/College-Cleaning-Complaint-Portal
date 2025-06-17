'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const slides = [
    {
        title: "Faster Response Time",
        description: "Report issues instantly, and our system ensures that supervisors receive real-time notifications, enabling quicker action.",
        button: "Report Now",
        action: "report"
    },
    {
        title: "Efficient Complaint Management",
        description: "Automatically assign complaints to the right supervisor based on category, streamlining the process for effective problem-solving.",
        button: "Learn More",
        action: "learn"
    },
    {
        title: "Transparency in Work",
        description: "Track complaints from submission to resolution with before-and-after images, ensuring accountability at every step.",
        button: "View Progress",
        action: "progress"
    }
]

export default function WhyThisSystem() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const handleButtonClick = (action) => {
        switch(action) {
            case 'report':
                window.open('https://clean-campus-dae8b.web.app/', '_blank', 'noopener,noreferrer');
                break;
            case 'progress':
                const complaintsSection = document.getElementById('complaint-list');
                if (complaintsSection) {
                    complaintsSection.scrollIntoView({ behavior: 'smooth' });
                }
                break;
            case 'learn':
                const howItWorksSection = document.getElementById('how-it-works');
                if (howItWorksSection) {
                    howItWorksSection.scrollIntoView({ behavior: 'smooth' });
                }
                break;
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-#FDFBF1 px-2">
            {/* Left Section (Static) */}
            <div className="text-8xl font-normal text-#0E2517  px-35 py-8 text-center md:text-left">
                Why This
                <br/>
                System?
            </div>
            <div className="flex w-screen max-w-3xl items-center justify-between">

                {/* Right Section (Animated) */}
                <div className="w-full relative h-200 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 250 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -250 }}
                            transition={{ duration: 0.6 }}
                            className="absolute w-full p-8  rounded-2xl shadow-lg"
                        >
                            <h2 className="text-2xl font-semibold text-#0E2517  mb-2">
                                {slides[index].title}
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {slides[index].description}
                            </p>
                            <div className="flex justify-center py-4">
                                <button 
                                    onClick={() => handleButtonClick(slides[index].action)}
                                    className="px-20 py-2 text-[#0E2517] border border-[#0E2517] rounded-full font-semibold hover:bg-gray-800 hover:text-white transition"
                                >
                                    {slides[index].button}
                                </button>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
