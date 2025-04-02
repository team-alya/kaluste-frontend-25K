import React from 'react';

const LoadingPage: React.FC = () => {

    // const navigate = useNavigate();
    // const location = useLocation();
    // const photo = location.state?.photo || null;
    // const username = location.state?.username || null;


    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center">
            <h2 className='text-xl font-bold mb-4'>Tuotetietoja haetaan</h2>
            <div className='w-16 h-16 border-4 border-t-transparent border-green-600 rounded-full animate-spin'></div>
        </div>
    );
};

export default LoadingPage;