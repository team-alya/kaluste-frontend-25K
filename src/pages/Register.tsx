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
    });

    // State to store validation errors for form fields
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    //validate email with regex
    const validateEmail = (email: string) =>  {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }; 

    // Validate form fields and store errors in the newErrors object, then update the state
    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};

        if (!user.username.trim()) newErrors.username = "Käyttäjätunnus on pakollinen.";
        if (!user.firstname.trim()) newErrors.firstname = "Etunimi on pakollinen.";
        if (!user.lastname.trim()) newErrors.lastname = "Sukunimi on pakollinen.";
        if (!user.email.trim()) newErrors.email = "Sähköposti on pakollinen.";
        else if (!validateEmail(user.email)) newErrors.email = "Virheellinen sähköposti.";
        if (!user.password.trim()) newErrors.password = "Salasana on pakollinen.";
        else if (user.password.length < 6) newErrors.password = "Salasanan tulee olla vähintään 6 merkkiä pitkä.";

        setErrors(newErrors);
        //return true if there are no errors
        return Object.keys(newErrors).length === 0;
    }
    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        //check if form fields are valid
        if (!validateForm()) {
            return;
        }
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
                navigate("/");
            })
            .catch(err => console.error(err))

        
    }
    

    return(
        <div className="mt-10 flex justify-center">

            <form onSubmit={handleRegister} className="space-y-7">
    <label className="block">
        <p className="text-xs mb-3">Käyttäjätunnus</p>
        <input 
            className="border-2 border-solid min-w-xs max-w-lg min-h-12 pl-5" 
            type="text"
            value={user.username}
            onChange={e => setUser({ ...user, username: e.target.value })}
        />
        {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
        )}
    </label>

    <label className="block">
        <p className="text-xs mb-1">Etunimi</p>
        <input 
            className="border-2 border-solid w-full min-h-12 pl-5" 
            type="text"
            value={user.firstname}
            onChange={e => setUser({ ...user, firstname: e.target.value })}
        />
        {errors.firstname && (
            <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>
        )}
    </label>

     <label className="block">
        <p className="text-xs mb-3">Sukunimi</p>
        <input 
            className="border-2 border-solid min-w-xs max-w-lg min-h-12 pl-5" 
            type="text"
            value={user.lastname}
            onChange={e => setUser({ ...user, lastname: e.target.value })}
        />
        {errors.lastname && (
            <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>
        )}
    </label>

    <label className="block">
        <p className="text-xs mb-1">Sähköpostiosoite</p>
        <input 
            className="border-2 border-solid w-full min-h-12 pl-5" 
            type="email"
            value={user.email}
            onChange={e => setUser({ ...user, email: e.target.value })}
        />
        {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
    </label>

    <label className="block">
        <p className="text-xs mb-1">Salasana</p>
        <input
            className="border-2 border-solid w-full min-h-12 pl-5" 
            type="password"
            value={user.password}
            onChange={e => setUser({ ...user, password: e.target.value })}
        />
        {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
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