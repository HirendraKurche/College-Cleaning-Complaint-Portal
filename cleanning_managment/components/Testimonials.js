'use client';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const testimonials = [
    {
        name: 'Hirendra',
        quote: `“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.”`,
    },
    {
        name: 'Aarav',
        quote: `“This platform made it super easy to report and track cleanliness issues. Fast, smooth, and transparent.”`,
    },
    {
        name: 'Sneha',
        quote: `“I love how we can see before-and-after pictures. It makes things feel really accountable.”`,
    },
    {
        name: 'Ravi',
        quote: `“Great initiative for campus cleanliness. The reporting process is seamless!”`,
    },
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="max-w-screen bg-zinc-900 text-white px-6 md:px-10 py-15">
            <div className="max-w-screen mx-auto px-6 py-20">
                {/* Header */}
                <div className="flex items-center mb-8 space-x-4 my-10 mb-15">
                    <h3 className="text-xl font-medium ">Happy Users</h3>
                    <div className="flex space-x-2">
                        {testimonials.map((_, index) => (
                            <span
                                key={index}
                                className={`w-4 h-4 rounded-full ${index === current ? 'bg-white' : 'bg-zinc-600'
                                    }`}
                            ></span>
                        ))}
                    </div>
                </div>

                {/* Testimonial Content */}
                <div className="text-xl md:text-4xl font-light leading-relaxed mb-8 transition-all duration-300 ease-in-out">
                    {testimonials[current].quote}
                </div>

                {/* User Name */}
                <div className="text-xl font-semibold">{testimonials[current].name}</div>

                {/* Navigation Arrows */}
                <div className="mt-8 flex justify-end space-x-4">
                    <button
                        onClick={prevSlide}
                        className="bg-white text-zinc-900 p-2 rounded-full hover:bg-gray-300"
                    >
                        <FaArrowLeft />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="bg-white text-zinc-900 p-2 rounded-full hover:bg-gray-300"
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </section>
    );
}
