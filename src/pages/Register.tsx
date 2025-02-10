import { useState } from "react";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState<User> ({
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        role: 'customer'
    })

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(user);

            fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify({
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    role: user.role
                })
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                navigate("/login");
            })
            .catch(err => console.error(err))

        
    }
    

    return(
        <div className="mt-20 flex justify-center">

            <form onSubmit={handleRegister}>

                <label>
                    <p className="text-xs mb-3"> Käyttäjätunnus</p>
                    <input 
                        className="border-2 border-solid min-w-xs max-w-lg min-h-12 mb-8 pl-5" 
                        type="text"
                        value={user.username}
                        onChange={e => setUser({...user, username: e.target.value})}
                        />
                </label>

                <label>
                    <p className="text-xs mb-3"> Etunimi</p>
                    <input 
                        className="border-2 border-solid min-w-xs max-w-lg min-h-12 mb-8 pl-5" 
                        type="text"
                        value={user.firstname}
                        onChange={e => setUser({...user, firstname: e.target.value})}
                        />
                </label>

                <label>
                    <p className="text-xs mb-3"> Sukunimi</p>
                    <input 
                        className="border-2 border-solid min-w-xs max-w-lg min-h-12 mb-8 pl-5" 
                        type="text" 
                        value={user.lastname}
                        onChange={e => setUser({...user, lastname: e.target.value})}
                        />
                </label>

                <label>
                    <p className="text-xs mb-3"> Sähköpostiosoite</p>
                    <input 
                        className="border-2 border-solid min-w-xs max-w-lg min-h-12 mb-8 pl-5" 
                        type="text"
                        value={user.email}
                        onChange={e => setUser({...user, email: e.target.value})}
                        />
                </label>

                <label>
                    <p className="text-xs mb-3">Salasana</p>
                    <input
                        className="border-2 border-solid min-w-xs min-h-12 mb-8 pl-5" 
                        type="password"
                        value={user.password}
                        onChange={e => setUser({...user, password: e.target.value})}
                        />
                </label>

                <div className="flex justify-center">
                    <button 
                        className="gap-2 mt-4 px-15 py-3 h-12 text-white bg-emerald-700 shadow-md hover:bg-emerald-600 transition"
                        type="submit"
                        >
                        Rekisteröidy
                    </button>
                </div>
            </form>
        </div>
    )
}