import Logout from "./auth/Logout"
import { useNavigate } from "react-router-dom";


export default function Settings() {

    const navigate = useNavigate();


    return(
        <div className="mt-20 flex flex-col items-center ">
            <button className="gap-2 mt-4 px-12 py-3 h-12 text-white bg-emerald-700 shadow-md hover:bg-emerald-600 transition rounded-sm"
            onClick={() => {
                Logout();
                navigate("/", { state: { from: location.pathname } });
            }}>
                Kirjaudu ulos
            </button>
        </div>
    )
}