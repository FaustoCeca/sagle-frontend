import { useEffect, useState } from 'react';

interface ErrorFallbackProps {
    error: Error | null;
}

const ErrorFallback = ({ error }: ErrorFallbackProps) => {
    const [countdown, setCountdown] = useState(10);
    
    useEffect(() => {
        // Auto-reload countdown
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            window.location.reload();
        }
    }, [countdown]);

    const handleManualReload = () => {
        window.location.reload();
    };

    return (
        <div className="flex items-center justify-center min-h-dvh w-full p-4 bg-gradient-to-b from-gray-900 to-gray-800">
            <div 
                className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden"
            >
                <div className="p-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700"></div>
                
                <div className="p-8">
                    <div className="flex items-center mb-6">
                        <div className="rounded-full bg-red-100 p-3 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Something went wrong</h2>
                    </div>
                    
                    <div className="mb-8 bg-red-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-red-500">
                        <p className="text-gray-700 dark:text-gray-300 font-medium">
                            {error ? error.message : "An unknown error occurred"}
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Auto-reloading in <span className="font-semibold">{countdown}</span> seconds...
                        </p>
                        
                        <button
                            onClick={handleManualReload}
                            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Reload Now
                        </button>
                    </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-700 px-8 py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        If the problem persists, try clearing your browser cache.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorFallback;