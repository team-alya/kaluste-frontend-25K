import { useLocation, useNavigate } from "react-router-dom";
import cam from "/assets/camera.png";
import check from "/assets/check.png";  
import thumb from "/assets/ok.png";
import archive from "/assets/archive.png";
import admin from "/assets/admin.png";

// homepage component that is displayed after the user has logged in

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = window.localStorage.getItem("username") || null;
  const role = window.localStorage.getItem("role") || null;

  return (

      <div className="m-8">
      <div className="mb-6">
        <div className="flex items-center space-x-2">
        <h1 className="text-4xl font-bold">Hei,</h1>
        <p className="text-4xl font-bold text-emerald-700 text-primary">{username}</p>
        </div>
        <p>Tervetuloa töihin, mitä haluaisit tehdä?</p>
      </div>

      { role?.toLowerCase() !== "user" ? (
        
      <div className="space-y-6">
        <div 
        className="grid" 
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, max-content))", 
        gap: "16px" }}>

        {/* button that navigates to camera page */}
        <button
          className=""
          style={{
            backgroundImage: `url(${cam})`,
            height: "150px",
            width: "150px",
          }}
          onClick={() => navigate("/camera", { state: { username, from: location.pathname } })}
        >
          <p className="mt-23 text-white">Tunnista tuote</p>
        </button>
      </div>

      <h2 className="text-lg font-semibold text-gray-700">
        Tunnistetut tuotteet
      </h2>

      <div
        className="grid"
        style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 150px))",
        gap: "16px",
        maxWidth: "500px"}}>

        {/* button that navigates to product list */}
        <button
          className=""
          style={{
            backgroundImage: `url(${check})`,
            height: "150px",
            width: "150px",
          }}
          onClick={() => {
            navigate("/evals", { state: { from: location.pathname } });
          }}
        >
          <p className="mt-23 text-white">Tekoälyn tunnistamat</p>
        </button>

        {/* button that navigates to expert reviewed list */}
        <button
          className=""
          style={{
            backgroundImage: `url(${thumb})`,
            height: "150px",
            width: "150px",
          }}
          onClick={() => {
            navigate("/reviewed", { state: { from: location.pathname } });
          }}
        >
          <p className="mt-23 text-white">Expertin käsittelemät</p>
        </button>

        {/* button that navigates to archived list */}
        <button
          className=""
          style={{
            backgroundImage: `url(${archive})`,
            height: "150px",
            width: "150px",
          }}
          onClick={() => {
            navigate("/archive", { state: { from: location.pathname } });
          }}
        >
          <p className="mt-23 text-white">Arkisto</p>
        </button>
    </div>
    
    <h2 className="text-lg font-semibold text-gray-700">
        Admin-toiminnot
    </h2>
  
    <div
        className="grid"
        style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 150px))",
        gap: "16px",
        maxWidth: "200px"}}>

          {/* button that navigates to admin */}
          {role === "admin" && (
            <button
              className=""
              style={{
                backgroundImage: `url(${admin})`,
                height: "150px",
                width: "150px",
              }}
              onClick={() => {
                navigate("/admin", {
                  state: { username, from: location.pathname },
                });
              }}
            >
              <p className="mt-23 text-white">Admin</p>
            </button>
          )}

    </div>
    </div>

      ) : (
        <div>
          {/* button that navigates to camera page */}
          <button
            className=""
            style={{
              backgroundImage: `url(${cam})`,
              height: "150px",
              width: "150px",
            }}
            onClick={() => navigate("/camera", { state: { username, from: location.pathname } })}
          >
            <p className="mt-23 text-white">Tunnista tuote</p>
        </button>
      </div>
    )}

      </div>

  );
};

export default Home;
