import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  
  const username = location.state?.username || localStorage.getItem("username") || null;

  const pages: Record<string, string> = {
    "/": "Kirjaudu sisään",
    "/home": "Valitse toiminta",
    "/camera": "Ota kuva",
    "/loading": "Odota hetki",
    "/accepted": "Tuote tunnistettu",
    "/rejected": "Tuotetta ei tunnistettu",
    "/register": "Rekisteröidy",
    "/settings": "Asetukset",
    "/evals": "Tunnistetut tuotteet",
    "/eval": "Tarkista tuotetiedot",
    "/error": "Virhe",
  };

  const previous = location.state?.from || "";
  const restricted = ["/loading", "/accepted", "/rejected", "/error"];

  const isRestricted = restricted.includes(previous);
  const pageToNavigate = isRestricted || previous.startsWith("/eval") ? "/home" : previous || "/home";

  
  const handleNavigate = (path: string) => {
    if (path !== location.pathname) {
      navigate(path, { state: {username, from: location.pathname } });
    }
  };

  return (
    <nav className="relative flex items-center justify-between bg-black p-6">
    {/* shows arrow if user is not on home page */}
      {location.pathname !== "/" && (
        <button className="absolute left-6" onClick={() => handleNavigate(pageToNavigate)}>
          <ArrowLeft size={28} color="#ffffff" strokeWidth={2.25} />
        </button>
      )}
      <div>
      {/* shows text in nav bar based on user location */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 font-sans text-white text-lg font-medium">
          {pages[location.pathname] || "Sivu"}
        </h1>
      </div>
      <div>
        {/* settings button */}
        <button className="text-sm px-2 py-2 leading-none border rounded-full text-white border-zinc-600 bg-zinc-600 hover:border-transparent hover:text-teal-500 hover:bg-black mt-4 lg:mt-0">
          <Settings
            size={20}
            color="#ffffff"
            strokeWidth={2.25}
            onClick={() => {
              navigate("/settings", { state:  { username,  from: location.pathname } });
            }}
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;