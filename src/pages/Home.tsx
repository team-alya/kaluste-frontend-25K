import { useNavigate } from "react-router-dom";
import { Camera } from 'lucide-react';
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
                >
                    Tunnista tuote
                </button> 
                           
            {/* <button
            
                className="bg-green-700 hover:bg-green-600 text-white font-bold text-[9px] py-3 px-3 rounded ml-8"
                onClick={handleClick}
                >
                <Camera size={32} strokeWidth={1.5} />
                <p>Tunnista tuote</p>
            </button> */}
            </div>
            
            

        </div>
 
    )

}

export default Home;