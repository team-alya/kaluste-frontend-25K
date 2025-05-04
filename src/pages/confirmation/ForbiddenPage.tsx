import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center bg-gray-100">
      <Lock size={64} className="text-red-600 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">403 - Pääsy estetty</h1>
      <p className="text-lg text-gray-600 mb-6">
        Sinulla ei ole oikeuksia päästä tälle sivulle.
      </p>
      <button
        className="px-6 py-3 text-white bg-emerald-700 rounded-lg shadow-md hover:bg-emerald-600 transition"
        onClick={() => navigate("/home")}
      >
        Palaa etusivulle
      </button>
    </div>
  );
};

export default ForbiddenPage;