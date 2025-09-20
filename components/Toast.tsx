import React, { useEffect, useState } from 'react';
import type { Toast } from '../types';

interface ToastProps {
    toast: Toast;
    onClose: () => void;
}

const toastConfig = {
    success: { icon: 'fa-check-circle', color: 'bg-green-500', border: 'border-green-400' },
    error: { icon: 'fa-exclamation-circle', color: 'bg-red-500', border: 'border-red-400' },
    warning: { icon: 'fa-exclamation-triangle', color: 'bg-yellow-500', border: 'border-yellow-400' },
    info: { icon: 'fa-info-circle', color: 'bg-[#6E44FF]', border: 'border-[#5431D6]' },
};

const ToastComponent: React.FC<ToastProps> = ({ toast, onClose }) => {
    const [isFadingOut, setIsFadingOut] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFadingOut(true);
        }, 4500); // Start fade out before removing

        const closeTimer = setTimeout(() => {
            onClose();
        }, 5000); // Remove after 5 seconds

        return () => {
            clearTimeout(timer);
            clearTimeout(closeTimer);
        };
    }, [onClose]);

    const config = toastConfig[toast.type];

    return (
        <div 
            className={`toast-slide-in ${isFadingOut ? 'toast-fade-out' : ''} flex items-center gap-3 w-full max-w-sm p-4 text-white ${config.color} rounded-xl shadow-lg border-l-4 ${config.border}`}
            role="alert"
        >
            <i className={`fas ${config.icon} text-xl`}></i>
            <div className="text-sm font-medium">{toast.message}</div>
            <button 
                onClick={() => { setIsFadingOut(true); setTimeout(onClose, 500); }} 
                className="ml-auto -mx-1.5 -my-1.5 bg-white/20 text-white hover:bg-white/30 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8" 
                aria-label="Close"
            >
                <span className="sr-only">Close</span>
                <i className="fas fa-times"></i>
            </button>
        </div>
    );
};

export default ToastComponent;