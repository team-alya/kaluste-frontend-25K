import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, Menu } from "lucide-react";

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
    "/register": "Rekisteröidy",
    "/settings": "Asetukset",
    "/evals": "Tunnistetut tuotteet",
    "/error": "Virhe",
    "/reviewed": "Käsitellyt tuotteet",
    "/archive": "Arkisto",
    "/admin": "Admin",
    "/users": "Käyttäjät"
  };

  const previousPage = location.state?.from || "/home";
  const restrictedPages = ["/", "/accepted", "/loading", "/error", "/menu"];

  const handleNavigate = () => {
    if (!restrictedPages.includes(previousPage)) {
      navigate(-1);
    } else {
      navigate("/home", { state: { username, from: location.pathname } });
    }
  }

  return (
    <nav className="relative flex items-center justify-between bg-black p-6">
      {/* shows arrow if user is not on home page */}
      {location.pathname !== "/" && (
        <button className="absolute left-6" onClick={handleNavigate}>
          <ArrowLeft size={28} color="#ffffff" strokeWidth={2.25} />
        </button>
      )}
      <div>
        {/* shows text in nav bar based on user location */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 font-sans text-white text-lg font-medium">
          {pages[location.pathname]}
        </h1>
      </div>
      <div>
        {/* menu button */}
        <button
          className="text-sm px-2 py-2 leading-none border rounded-full text-white border-zinc-600 mt-4 lg:mt-0 mr-2"
          onClick={() => navigate("/menu", { state: { from: location.pathname } })}
        >
          <Menu size={20} color="#ffffff" strokeWidth={2.25} />
        </button>
        {/* settings button */}
        <button className="text-sm px-2 py-2 leading-none border rounded-full text-white border-zinc-600 bg-zinc-600 hover:border-transparent hover:text-teal-500 hover:bg-black mt-4 lg:mt-0">
          <Settings
            size={20}
            color="#ffffff"
            strokeWidth={2.25}
            onClick={() => {
              navigate("/settings", { state: { username, from: location.pathname } });
            }}
          />
        </button>
  
      </div>
    </nav>
  );
};

export default Navbar;