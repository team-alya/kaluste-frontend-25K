import React, { useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';

const LoadingPage: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const photo = location.state?.photo || null;
    const username = location.state?.username || null;

    useEffect (() => {
        const timeout = setTimeout(() => {
            const random = Math.random() < 0.5;
            //navigate randomly to /accepted or /rejected, passing the photo as state
            navigate (random ? "/accepted" : "/rejected", {state: {photo, username}});
        }, 2000);
        //clear the timeout 
        return () => clearTimeout(timeout);
    }, [navigate, photo, username]);
   

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center">
            <h2 className='text-xl font-bold mb-4'>Tuotetietoja haetaan</h2>
            <div className='w-16 h-16 border-4 border-t-transparent border-green-600 rounded-full animate-spin'></div>
        </div>
    );
};

export default LoadingPage;