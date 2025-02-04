import Ract, {useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

const LoadingPage: React.FC = () => {

    const navigete = useNavigate();
    const location = useLocation();
    const {photo} = location.state?.photo;

    useEffect (() => {
        const timeout = setTimeout(() => {
            const random = Math.random() < 0.5;
            navigete (random ? "/accepted" : "/rejected", {state: {photo}});
        }, 2000);
        return () => clearTimeout(timeout);
    }, [navigete,photo]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center">
            <h2 className='text-xl font-bold mb-4'>Tuotetietoja haetaan</h2>
            <div className='w-16 h-16 border-4 border-t-transparent border-green-600 rounded-full animate-spin'></div>
        </div>
    );
};

export default LoadingPage;