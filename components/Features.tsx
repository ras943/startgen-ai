
import React from 'react';

const FeatureCard: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 text-center border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(110,68,255,0.15)]">
        <div className="text-4xl text-[#6E44FF] mb-4">
            <i className={`fas ${icon}`}></i>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-300">{children}</p>
    </div>
);

export const Features: React.FC = () => (
    <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon="fa-robot" title="AI-Powered Insights">
                Leverage advanced machine learning to create data-driven content strategies.
            </FeatureCard>
            <FeatureCard icon="fa-bolt" title="Lightning Fast">
                Generate comprehensive strategies in seconds, not hours.
            </FeatureCard>
            <FeatureCard icon="fa-chart-pie" title="Performance Analytics">
                Track and optimize your strategy with built-in performance metrics.
            </FeatureCard>
        </div>
    </section>
);
