
import React from 'react';

export const Header: React.FC = () => (
    <header className="flex justify-between items-center py-6 mb-8">
        <div className="flex items-center gap-3 text-2xl font-bold text-white">
            <i className="fas fa-brain text-[#6E44FF]"></i>
            <h1>Strat<span className="text-[#6E44FF]">Gen</span> AI</h1>
        </div>
        <nav className="hidden md:flex gap-8">
            <a href="#" className="text-gray-300 hover:text-[#6E44FF] transition-colors duration-300 font-medium">Features</a>
            <a href="#" className="text-gray-300 hover:text-[#6E44FF] transition-colors duration-300 font-medium">Pricing</a>
            <a href="#" className="text-gray-300 hover:text-[#6E44FF] transition-colors duration-300 font-medium">Resources</a>
        </nav>
        <button className="hidden md:block bg-gradient-to-r from-[#6E44FF] to-[#5431D6] text-white font-semibold py-3 px-6 rounded-xl shadow-[0_0_20px_rgba(110,68,255,0.15)] hover:shadow-[0_10px_25px_rgba(110,68,255,0.25)] hover:-translate-y-0.5 transition-all duration-300">
            Get Started
        </button>
    </header>
);
