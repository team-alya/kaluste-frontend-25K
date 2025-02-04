import { useNavigate } from "react-router-dom";


const Home = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/camera");
    }

    return(

        
        <div>
            <div>
                <p>Valitse toiminta</p>
            </div>
            <div>
                <h1>Hei!</h1>
                <p>Tervetuloa töihin, mitä haluaisit tehdä?</p>

            </div>
            <div>
            <button
                onClick={handleClick}
                >
                Tunnista tuote
            </button>
            </div>
            
            

        </div>
 
    )

}

export default Home;