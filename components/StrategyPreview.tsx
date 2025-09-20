
import React from 'react';
import type { Strategy, KeyPillar, ContentIdea, DistributionChannel, Kpi } from '../types';
import { SpinnerIcon } from './icons';

interface StrategyPreviewProps {
    strategy: Strategy | null;
    onSave: () => void;
    isSaving: boolean;
    onClear: () => void;
}

const Card: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => (
    <div className={`bg-white/5 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/10 ${className}`}>
        {children}
    </div>
);

const CardHeader: React.FC<{icon: string, title: string}> = ({icon, title}) => (
     <div className="flex items-center gap-3 mb-6">
        <i className={`fas ${icon} text-[#6E44FF] text-xl`}></i>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
    </div>
);

const StrategySection: React.FC<{ title: string; children: React.ReactNode; icon: string }> = ({ title, children, icon }) => (
    <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#4ECDC4] mb-3 flex items-center gap-2">
            <i className={`fas ${icon}`}></i> {title}
        </h3>
        <div className="space-y-3">{children}</div>
    </div>
);

const StrategyItem: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <div className="p-3 bg-white/5 rounded-lg border-l-4 border-[#6E44FF] text-gray-300 text-sm">
        {children}
    </div>
);

const StrategyPreview: React.FC<StrategyPreviewProps> = ({ strategy, onSave, isSaving, onClear }) => {
    return (
        <Card className="flex flex-col">
            <CardHeader icon="fa-chart-line" title="Strategy Preview" />
            <div className="flex-grow overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {!strategy ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <p>Your AI-generated strategy will appear here</p>
                    </div>
                ) : (
                    <div>
                        <StrategySection title="Key Pillars" icon="fa-monument">
                            {strategy.keyPillars.map((pillar: KeyPillar, index: number) => (
                                <StrategyItem key={index}>
                                    <p className="font-bold text-white">{pillar.pillar}</p>
                                    <p>{pillar.description}</p>
                                </StrategyItem>
                            ))}
                        </StrategySection>
                        <StrategySection title="Content Ideas" icon="fa-lightbulb">
                            {strategy.contentIdeas.map((idea: ContentIdea, index: number) => (
                                <StrategyItem key={index}>
                                    <p><span className="font-bold text-white">{idea.title}</span> ({idea.format})</p>
                                    <p>{idea.description}</p>
                                </StrategyItem>
                            ))}
                        </StrategySection>
                         <StrategySection title="Distribution Channels" icon="fa-share-nodes">
                            {strategy.distributionChannels.map((channel: DistributionChannel, index: number) => (
                                <StrategyItem key={index}>
                                    <p className="font-bold text-white">{channel.channel}</p>
                                    <p>{channel.strategy}</p>
                                </StrategyItem>
                            ))}
                        </StrategySection>
                         <StrategySection title="KPIs to Track" icon="fa-bullseye">
                            {strategy.kpis.map((kpi: Kpi, index: number) => (
                                <StrategyItem key={index}>
                                    <p className="font-bold text-white">{kpi.metric}</p>
                                    <p>{kpi.goal}</p>
                                </StrategyItem>
                            ))}
                        </StrategySection>
                    </div>
                )}
            </div>
            <div className="mt-6 flex items-stretch gap-3">
                <button 
                    onClick={onSave}
                    disabled={!strategy || isSaving}
                    className="flex-grow flex justify-center items-center gap-3 p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isSaving ? <><SpinnerIcon /><span>Saving...</span></> : <><i className="fas fa-save"></i><span>Save Strategy</span></>}
                </button>
                {strategy && (
                    <button 
                        onClick={onClear}
                        disabled={isSaving}
                        title="Clear Strategy"
                        className="flex-shrink-0 px-4 flex items-center justify-center bg-transparent border border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-500/80 font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <i className="fas fa-trash-alt"></i>
                        <span className="sr-only">Clear Strategy</span>
                    </button>
                )}
            </div>
        </Card>
    );
};

export default StrategyPreview;