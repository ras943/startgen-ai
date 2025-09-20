
import React from 'react';

export const Hero: React.FC = () => (
    <section className="text-center mb-16 py-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-gray-100 to-[#4ECDC4] bg-clip-text text-transparent">
            Transform Your Content Strategy with AI
        </h1>
        <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Generate data-driven content strategies that engage your audience and drive results. Powered by advanced AI algorithms.
        </p>
        <button className="bg-gradient-to-r from-[#6E44FF] to-[#5431D6] text-white font-semibold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(110,68,255,0.15)] hover:shadow-[0_10px_25px_rgba(110,68,255,0.25)] hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-3 text-lg">
            <i className="fas fa-rocket"></i>
            Start Generating Now
        </button>
    </section>
);
