import { useLocation } from "react-router-dom";


const Navbar = () => {

    const location = useLocation();

    const pages: Record<string, string> = {
        "/" : "Valitse toiminta",
        "/camera" : "Ota kuva"
    }

    return(

        <nav className="flex items-center justify-between flex-wrap bg-gray-950 p-6">
            <div className="flex-grow text-center">
                <h1 className="text-white font-bold ">{pages[location.pathname]}</h1>
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
                    <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Asetusnappi</a>
                </div>
            </div>
        </nav>
    )

}

export default Navbar;