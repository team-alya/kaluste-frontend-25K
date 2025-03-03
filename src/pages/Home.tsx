import { useLocation, useNavigate } from "react-router-dom";
import cam from "../assets/camera.png";

type Props = {}

const Home = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || null;

  

  const handleClick = () => {
    navigate("/camera", { state: { username } });
  };

  return (
    <div>
      <div></div>
      <div className="m-8">
        <div className="flex items-center space-x-2">
        <h1 className="text-4xl font-bold">Hei,</h1>
        <p className="text-4xl font-bold text-emerald-700">{username}</p>
        </div>
        <p>Tervetuloa töihin, mitä haluaisit tehdä?</p>
      </div>
      <div>
        <button
          className="ml-8"
          style={{
            backgroundImage: `url(${cam})`,
            height: "150px",
            width: "150px",
          }}
          onClick={handleClick}
        >
          <p className="mt-23 text-white">Tunnista tuote</p>
        </button>
      </div>
    </div>
  );
};

export default Home;
