import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Settings } from 'lucide-react';

const Navbar = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const pages: Record<string, string> = {
        "/" : "Valitse toiminta",
        "/camera" : "Ota kuva"
    }

    return(

        <nav className="flex items-center justify-between flex-wrap bg-black p-6">
            {location.pathname !== "/" && (
                <button
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft size={28} color="#ffffff" strokeWidth={2.25} />
                </button>
            )}
            <div className="flex-grow text-center">
                <h1 className="font-sans text-white text-xl font-medium">{pages[location.pathname]}</h1>
            </div>
            <div className="flex items-center flex-shrink-0 text-white mr-6">
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div>
                <div>
                    <button className="inline-block text-sm px-2 py-2 leading-none border rounded-full text-white border-zinc-600 bg-zinc-600 hover:border-transparent hover:text-teal-500 hover:bg-black mt-4 lg:mt-0">
                        <Settings size={28} color="#ffffff" strokeWidth={2.25} />
                    </button>
                    
                    {/* <a href="#" >Asetusnappi</a> */}
                </div>
            </div>
        </nav>
    )

}

export default Navbar;