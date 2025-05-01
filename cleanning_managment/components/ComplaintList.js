'use client';

import React from 'react';

export default function ComplaintList() {
    const complaints = [
        {
            id: 1,
            title: 'Dirty Corridor in Hostel Block A',
            description: 'Students reported foul smell and scattered garbage on the corridor floor.',
            status: 'Pending',
        },
        {
            id: 2,
            title: 'Water Leakage in Mess',
            description: 'A leaking tap has caused water to pool around the mess floor area.',
            status: 'In Progress',
        },
        {
            id: 3,
            title: 'Trash Overflow in Library Lawn',
            description: 'Garbage bins haven’t been cleared, attracting stray dogs.',
            status: 'Resolved',
        },
    ];

    return (
        <section id="complaint-list" className="bg-zinc-900 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Headings */}
                <h2 className=" text-white text-4xl font-bold mb-2">Complaint Lists</h2>
                <p className="text-white text-lg mb-6">Recent Complaints</p>

                {/* Filters */}
                <div className="flex gap-4 mb-8">
                    <button className="bg-gray-600 text-white px-4 py-2 rounded-full text-sm">Filters</button>
                    <button className="bg-gray-600 text-white px-4 py-2 rounded-full text-sm">Filters</button>
                </div>

                {/* Complaint Cards */}
                <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                    {complaints.map((complaint) => (
                        <div
                            key={complaint.id}
                            className="bg-white rounded-3xl shadow-md overflow-hidden p-4"
                        >
                            {/* Image Placeholder */}
                            <div className="w-full h-52 bg-zinc-900 rounded-2xl mb-4"></div>

                            {/* Title */}
                            <h3 className="text-lg font-bold">{complaint.title}</h3>

                            {/* Description */}
                            <p className="text-sm text-gray-700 mt-2">
                                {complaint.description.length > 100
                                    ? complaint.description.slice(0, 100) + '...'
                                    : complaint.description}
                            </p>

                            {/* Buttons */}
                            <div className="flex justify-between mt-4">
                                <span className="bg-zinc-900 text-white px-4 py-1 rounded-full text-sm">
                                    {complaint.status}
                                </span>
                                <button className="bg-zinc-900 text-white px-4 py-1 rounded-full text-sm">
                                    View more
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
