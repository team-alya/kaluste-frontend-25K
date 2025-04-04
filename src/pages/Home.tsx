import { useLocation, useNavigate } from "react-router-dom";
import cam from "/assets/camera.png";
import check from "/assets/check.png";  

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || null;


  return (
    <div>
      <div className="m-8">
        <div className="flex items-center space-x-2">
        <h1 className="text-4xl font-bold">Hei,</h1>
        <p className="text-4xl font-bold text-emerald-700">{username}</p>
        </div>
        <p>Tervetuloa töihin, mitä haluaisit tehdä?</p>
      </div>
      <div className="flex flexdirection-row">
        <div>
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
        <button
          className="ml-8"
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
      </div>
    </div>
  );
};

export default Home;
