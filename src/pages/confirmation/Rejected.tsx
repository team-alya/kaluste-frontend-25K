import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CircleX } from "lucide-react";

const RejectedPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const photo = location.state?.photo;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center">
    <div className="flex items-center gap-2 mb-4">
        <CircleX size={40} className="text-red-600" />
        <h2 className="text-xl font-bold text-black">Hylkää tai peri kierrätysmaksu</h2>
    </div>

    
    {photo && (
        <img
            src={photo}
            alt="Rejected"
            className="w-[300px] h-[300px] object-cover rounded-lg mb-4 shadow-md"
        />
    )}
    <button
        onClick={() => navigate("/")}
        className="px-6 py-3 text-black bg-white rounded-lg border shadow-md hover:bg-gray-100 transition"
    >
        OK
    </button>
</div>

    );
};

export default RejectedPage;