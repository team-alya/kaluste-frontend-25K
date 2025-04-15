import { useLocation, useNavigate } from "react-router-dom";
import cam from "/assets/camera.png";
import check from "/assets/check.png";  
import thumb from "/assets/ok.png";
import archive from "/assets/archive.png";

// homepage component that is displayed after the user has logged in

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || null;

  return (
    <div>
      <div className="m-8">
        <div className="flex items-center space-x-2">
          <h1 className="text-4xl font-bold" data-testid="Hei">
            Hei,
          </h1>
          <p
            className="text-4xl font-bold text-emerald-700"
            data-testid="username"
          >
            {username}
          </p>
        </div>
        <p>Tervetuloa töihin, mitä haluaisit tehdä?</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          {/* button that navigates to camera page */}
        <button
          className="ml-8"
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
      <div>
        {/* button that navigates to product list */}
        <button
          data-testid="evals-button"
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
        </div>
        <div>
        {/* button that navigates to expert reviewed list */}
        <button
          className="ml-8"
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
        </div>
        <div>
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
      </div>
    </div>
  );
};

export default Home;
