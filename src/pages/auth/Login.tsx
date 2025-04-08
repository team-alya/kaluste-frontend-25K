import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// login page

const Login = () => {

  const { setAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showLoginFailedMessage, setShowLoginFailedMessage] =
    useState<boolean>(false);

    // handle login form submission
    const handleLogin = (e: React.FormEvent) => {
      setShowLoginFailedMessage(false);
      e.preventDefault();

      // send login credentials to the backend
      fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            // if an error occurs, display an error message in the console and UI
            setShowLoginFailedMessage(true);
            throw new Error("Kirjautuminen epäonnistui!");
          }

          return response.json();
        })
        .then((data) => {

          // if login is successful, clear the fields and set authentication to true
          setUsername("");
          setPassword("");
          setAuthenticated(true);

          // save the token and username to localStorage
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("username", data.user.username);

          // navigate to the homepage and pass the username and previous route for navigation
          navigate("/home", { state: { username: data.user.username, from: location.pathname } });
        })
        .catch((err) => console.error(err));
    };

  return (

    // login form
    <div className="mt-15 flex flex-col items-center">
      <form onSubmit={handleLogin}>
        <label>
          <p className="text-xs mb-3"> Käyttäjätunnus</p>
          <input
            className="border-2 border-solid min-w-xs max-w-lg min-h-12 mb-8 pl-5 rounded-sm"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <p className="text-xs mb-3">Salasana</p>
          <input
            className="border-2 border-solid min-w-xs min-h-12 mb-8 pl-5 rounded-sm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {/* UI error message */}
        {showLoginFailedMessage && (
          <div className="text-center">
            <p className="text-red-500 text-sm">
              Kirjautuminen epäonnistui. Yritä uudelleen.
            </p>
          </div>
        )}
        <div className="flex justify-center">
          <button
            className="gap-2 mt-4 px-12 py-3 h-12 text-white bg-emerald-700 shadow-md hover:bg-emerald-600 transition rounded-sm"
            type="submit"
          >
            Kirjaudu sisään
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;