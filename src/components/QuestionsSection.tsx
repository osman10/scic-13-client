"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaClock, FaEnvelope } from 'react-icons/fa';

const QuestionsSection = () => {
    const [openQuestion, setOpenQuestion] = useState(null);

    const questions = [
        {
            id: 1,
            question: "How are experiences vetted?",
            answer: "All experiences are carefully reviewed by our team to ensure quality, safety, and authenticity. We verify hosts, check reviews, and maintain high standards for every listing on Voyagio."
        },
        {
            id: 2,
            question: "What if my plans change?",
            answer: "We understand plans can change. Most experiences offer free cancellation up to 24-48 hours before the start time. Check the specific cancellation policy on each experience page for details."
        },
        {
            id: 3,
            question: "Is Voyagio a booking site or a tour operator?",
            answer: "Voyagio is a booking platform that connects travelers with local hosts and experience providers. We are not a tour operator - we facilitate bookings and ensure a smooth experience for both guests and hosts."
        },
        {
            id: 4,
            question: "Can I host on Voyagio?",
            answer: "Yes! If you have a unique experience to share, we'd love to have you as a host. Apply through our host registration page and our team will guide you through the process of listing your experience."
        }
    ];

    const toggleQuestion = (id) => {
        setOpenQuestion(openQuestion === id ? null : id);
    };

    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">

                <div className='flex gap-10 flex-wrap lg:flex-nowrap p-4'>
                    {/* Left side */}
                    <div>
                        {/* Header */}
                        <div className="flex flex-col items-start mb-10">
                            <h2 className="text-3xl font-bold text-gray-800 tracking-wide">QUESTIONS</h2>
                            <p className="text-xl font-semibold text-gray-700 mt-1">Before you go</p>
                        </div>

                        {/* Contact Support Section */}
                        <div className="flex mt-10 max-w-4xl">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 gap-4">
                                <div className="flex items-start gap-3 flex-1">
                                    <div className="flex-shrink-0 mt-1">
                                        <FaClock className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Can't find what you need?</span> Our team replies in under an hour, 7am-11pm local time.
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href="/contact"
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm whitespace-nowrap transition-colors duration-200 flex-shrink-0"
                                >
                                    <FaEnvelope className="w-4 h-4" />
                                    Contact us →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right side Questions List */}
                    <div className="flex flex-col space-y-4 max-w-4xl">
                        {questions.map((q) => (
                            <div
                                key={q.id}
                                className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
                            >
                                <button
                                    onClick={() => toggleQuestion(q.id)}
                                    className="flex items-center justify-between w-full p-5 text-left hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <span className="text-base font-medium text-gray-800 flex-1 pr-4">
                                        {q.question}
                                    </span>
                                    <span className="text-gray-400 flex-shrink-0">
                                        {openQuestion === q.id ? (
                                            <FaChevronUp className="w-4 h-4" />
                                        ) : (
                                            <FaChevronDown className="w-4 h-4" />
                                        )}
                                    </span>
                                </button>

                                {/* Answer - Expandable */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openQuestion === q.id ? 'max-h-96 pb-5 px-5' : 'max-h-0'
                                        }`}
                                >
                                    <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                                        {q.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default QuestionsSection;