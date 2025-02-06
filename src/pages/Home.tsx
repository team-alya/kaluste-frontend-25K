import { useNavigate } from "react-router-dom";
import cam from '../assets/camera.png';

const Home = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/camera");
    }

    return(
        <div>
            <div>
            </div>
            <div className="m-8" >
                <h1 className="text-4xl font-bold">Hei!</h1>
                <p>Tervetuloa töihin, mitä haluaisit tehdä?</p>
            </div>
            <div>
                <button
                    className="ml-8"
                    style={{backgroundImage: `url(${cam})`, height: '150px', width: '150px'}}
                    onClick={handleClick}
                >
                    <p className="mt-23 text-white">Tunnista tuote</p>
                </button> 
            </div>
        </div>
 
    )

}

export default Home;