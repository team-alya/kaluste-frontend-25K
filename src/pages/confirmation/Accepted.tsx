import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AcceptedPage: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const photo = location.state?.photo;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center">
            <h2 className="text-xl font-bold mb-4 text-green-600">Ota kyytiin ✅</h2>
            {photo && <img src={photo} alt="Approved" className="w-[300px] h-[300px] object-cover rounded-lg mb-4" />}
            <button onClick={() => navigate("/")} className="px-6 py-3 text-white bg-green-600 rounded-lg">
                OK
            </button>
        </div>
    );
};

export default AcceptedPage;