import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const [user, setUser] = useState(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data) {
                setUsername('');
                setPassword('');
                localStorage.setItem("token", data.token);
                navigate("/home");
            } else {
                console.log("Virhe");
            }
        })
        .catch(err => console.error(err))


    }

    return(

        <div className="mt-10 flex justify-center">
            {/* form action/onSubmit vai button onClick? */}
            <form>
                <label>
                    <p className="text-xs mb-3"> Käyttäjätunnus</p>
                    <input 
                        className="border-2 border-solid min-w-xs max-w-lg min-h-12 mb-8 pl-5" 
                        type="text" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        />
                </label>
                <label >
                    <p className="text-xs mb-3">Salasana</p>
                    <input
                        className="border-2 border-solid min-w-xs min-h-12 mb-8 pl-5" 
                        type="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                </label>
                <div className="flex justify-center">
                    <button 
                        className="gap-2 mt-4 px-12 py-3 h-12 text-white bg-emerald-700 shadow-md hover:bg-emerald-600 transition"
                        type="submit"
                        >
                        Kirjaudu sisään
                    </button>
                </div>
            </form>
            <button 
                    className="gap-2 mt-4 px-15 py-3 h-12 text-emerald-700 bg-white border rounded-xs hover:bg-emerald-600"
                    onClick={() => navigate("/register")}
                    >
                    Rekisteröidy
                </button>
                
        </div>

    )

    
}