import React, { useState } from 'react';
import type { StrategyInput } from '../types';
import { SpinnerIcon } from './icons';
import { useToasts } from '../context/ToastContext';

interface StrategyFormProps {
    onGenerate: (formData: StrategyInput) => void;
    isLoading: boolean;
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

const FormGroup: React.FC<{label: string, htmlFor: string, children: React.ReactNode, error?: string}> = ({label, htmlFor, children, error}) => (
    <div className="mb-6">
        <label htmlFor={htmlFor} className="block mb-2 font-medium text-gray-300">{label}</label>
        {children}
        {error && <div className="text-red-400 text-sm mt-2 flex items-center gap-2"><i className="fas fa-exclamation-circle"></i>{error}</div>}
    </div>
)

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }>(({ hasError, ...props }, ref) => (
    <input 
        ref={ref}
        {...props}
        className={`w-full p-3 bg-white/10 border ${hasError ? 'border-red-500' : 'border-white/10'} rounded-xl text-gray-100 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:border-[#6E44FF] focus:ring-2 focus:ring-[#6E44FF]/50`}
    />
));

const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { hasError?: boolean }>(({ hasError, children, ...props }, ref) => (
    <select
        ref={ref}
        {...props}
        className={`w-full p-3 bg-white/10 border ${hasError ? 'border-red-500' : 'border-white/10'} rounded-xl text-gray-100 transition-all duration-300 focus:outline-none focus:border-[#6E44FF] focus:ring-2 focus:ring-[#6E44FF]/50 appearance-none select-arrow`}
    >
        {children}
    </select>
));


const StrategyForm: React.FC<StrategyFormProps> = ({ onGenerate, isLoading }) => {
    const [formData, setFormData] = useState<StrategyInput>({
        topic: '', goal: '', audience: '', tone: 'Professional', framework: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { addToast } = useToasts();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({...prev, [id]: value}));
        if(errors[id]) {
            setErrors(prev => {
                const newErrors = {...prev};
                delete newErrors[id];
                return newErrors;
            })
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.topic.trim()) newErrors.topic = 'Topic is required';
        if (!formData.goal.trim()) newErrors.goal = 'Goal is required';
        if (!formData.audience.trim()) newErrors.audience = 'Target Audience is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onGenerate(formData);
        } else {
            addToast('Please fill in all required fields.', 'error');
        }
    };

    return (
        <Card>
            <CardHeader icon="fa-edit" title="Create Your Strategy" />
            <form onSubmit={handleSubmit} noValidate>
                <FormGroup label="Topic *" htmlFor="topic" error={errors.topic}>
                    <Input id="topic" value={formData.topic} onChange={handleChange} placeholder="e.g., Sustainable Fashion, Digital Marketing Trends" hasError={!!errors.topic} />
                </FormGroup>
                <FormGroup label="Goal *" htmlFor="goal" error={errors.goal}>
                    <Input id="goal" value={formData.goal} onChange={handleChange} placeholder="e.g., Increase brand awareness, Generate leads" hasError={!!errors.goal}/>
                </FormGroup>
                <FormGroup label="Target Audience *" htmlFor="audience" error={errors.audience}>
                    <Input id="audience" value={formData.audience} onChange={handleChange} placeholder="e.g., Millennials, Small business owners" hasError={!!errors.audience}/>
                </FormGroup>
                <FormGroup label="Content Tone" htmlFor="tone">
                    <Select id="tone" value={formData.tone} onChange={handleChange}>
                        <option value="Professional">Professional</option>
                        <option value="Casual">Casual</option>
                        <option value="Informative">Informative</option>
                        <option value="Persuasive">Persuasive</option>
                        <option value="Witty">Witty</option>
                    </Select>
                </FormGroup>
                 <FormGroup label="Framework (Optional)" htmlFor="framework">
                    <Input id="framework" value={formData.framework} onChange={handleChange} placeholder="e.g., AIDA, PAS, BAB" />
                </FormGroup>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full flex justify-center items-center gap-3 p-4 bg-gradient-to-r from-[#6E44FF] to-[#5431D6] text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(110,68,255,0.15)] hover:shadow-[0_10px_25px_rgba(110,68,255,0.25)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isLoading ? (
                        <>
                            <SpinnerIcon />
                            <span>Generating...</span>
                        </>
                    ) : (
                        <span>Generate Strategy</span>
                    )}
                </button>
            </form>
        </Card>
    );
};

export default StrategyForm;