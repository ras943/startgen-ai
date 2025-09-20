
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import StrategyForm from './components/StrategyForm';
import StrategyPreview from './components/StrategyPreview';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { ToastProvider, useToasts } from './context/ToastContext';
import type { Strategy, StrategyInput } from './types';
import { generateStrategy } from './services/geminiService';

const AppContent: React.FC = () => {
    const [strategy, setStrategy] = useState<Strategy | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { addToast } = useToasts();

    useEffect(() => {
        try {
            const savedStrategy = localStorage.getItem('stratgen_ai_strategy');
            if (savedStrategy) {
                setStrategy(JSON.parse(savedStrategy));
                 addToast('Loaded saved strategy from your last session.', 'info');
            }
        } catch (error) {
            console.error("Failed to load strategy from localStorage", error);
            addToast('Could not load saved strategy.', 'error');
        }
    }, [addToast]);

    const handleGenerate = useCallback(async (formData: StrategyInput) => {
        setIsLoading(true);
        try {
            const generatedContent = await generateStrategy(formData);
            if(generatedContent){
                const newStrategy: Strategy = {
                    ...formData,
                    ...generatedContent,
                    id: Date.now().toString(),
                    createdAt: new Date().toISOString(),
                };
                setStrategy(newStrategy);
                addToast('Strategy generated successfully!', 'success');
            } else {
                 addToast('AI failed to generate a strategy. Please try again.', 'error');
            }
        } catch (error) {
            console.error("Error generating strategy:", error);
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            addToast(`Generation failed: ${errorMessage}`, 'error');
        } finally {
            setIsLoading(false);
        }
    }, [addToast]);

    const handleSave = useCallback(() => {
        if (!strategy) {
            addToast('No strategy to save.', 'warning');
            return;
        }
        setIsSaving(true);
        try {
            localStorage.setItem('stratgen_ai_strategy', JSON.stringify(strategy));
            addToast('Strategy saved successfully!', 'success');
            setTimeout(() => {
                // To give feedback to user
                setIsSaving(false)
            }, 1500)
        } catch (error) {
            console.error("Failed to save strategy to localStorage", error);
            addToast('Failed to save strategy. Storage might be full.', 'error');
            setIsSaving(false)
        }
    }, [strategy, addToast]);

    const handleClear = useCallback(() => {
        if (window.confirm('Are you sure you want to clear the current strategy? This action cannot be undone.')) {
            setStrategy(null);
            localStorage.removeItem('stratgen_ai_strategy');
            addToast('Strategy has been cleared.', 'info');
        }
    }, [addToast]);

    return (
        <div className="bg-gradient-to-br from-[#0D0C1D] to-[#1A1A2E] text-gray-100 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Header />
                <main>
                    <Hero />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        <StrategyForm onGenerate={handleGenerate} isLoading={isLoading} />
                        <StrategyPreview strategy={strategy} onSave={handleSave} isSaving={isSaving} onClear={handleClear} />
                    </div>
                    <Features />
                </main>
                <Footer />
            </div>
        </div>
    );
};


const App: React.FC = () => (
    <ToastProvider>
        <AppContent />
    </ToastProvider>
);

export default App;