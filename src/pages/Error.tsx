import { CircleX } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";


const ErrorInfo: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state?.username || null;

    return( 

        <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center">
      

    <p className="text-gray-500">Tietojen hakeminen epäonnistui. Yritä myöhemmin uudelleen.</p>

      <div className="flex items-center gap-2 mb-4">
        <CircleX size={40} className="text-red-600" />
      </div>

      <button className="px-6 py-3 text-black bg-white rounded-lg border shadow-md hover:bg-gray-100 transition"
      onClick={() => navigate("/home", { state: { username, from: location.pathname } })} 
      >OK</button>
     
    </div>
  );
};



export default ErrorInfo;