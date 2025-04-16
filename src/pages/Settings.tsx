import { useEffect, useState } from "react";
import Logout from "./auth/Logout"
import { useNavigate } from "react-router-dom";

// settings page

export default function Settings() {

    const navigate = useNavigate();

    const [colorblindMode, setColorblindMode] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("colorblind-mode");
        if (saved === "true") {
            setColorblindMode(true);
            document.body.classList.add("colorblind");
        }
    }, []);

    const toggleColorblind = () => {
        const newMode = !colorblindMode;
        setColorblindMode(newMode);
        localStorage.setItem("colorblind-mode", newMode.toString());
        document.body.classList.toggle("colorblind", newMode);
    };

    return(
        <div className="mt-20 flex flex-col items-center ">

            <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-medium text-gray-800 mr-4">Värisokeus</span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={colorblindMode}
                        onChange={toggleColorblind}
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                </label>
            </div>

            <button className="gap-2 mt-4 px-12 py-3 h-12 text-white bg-emerald-700 shadow-md hover:bg-emerald-600 transition rounded-sm btn-primary"
            onClick={() => {
                Logout();
                navigate("/", { state: { from: location.pathname } });
            }}>
                Kirjaudu ulos
            </button>
        </div>
    )
}