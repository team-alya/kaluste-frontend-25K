import React from 'react';

const LoadingProducts: React.FC = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center">
            <h2 className='text-xl font-bold mb-4'>Haetaan tuotteita</h2>
            <div className='w-16 h-16 border-4 border-t-transparent border-green-600 rounded-full animate-spin'></div>
        </div>
    );
};

export default LoadingProducts;