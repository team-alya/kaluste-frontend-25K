import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showLoginFailedMessage, setShowLoginFailedMessage] =
    useState<boolean>(false);

  const handleLogin = (e: React.FormEvent) => {
    setShowLoginFailedMessage(false);
    e.preventDefault();
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          setShowLoginFailedMessage(true);
          throw new Error("Kirjautuminen epäonnistui!");
        }

        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setUsername("");
        setPassword("");
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
       navigate("/home", { state: { username: data.user.username } });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="mt-20 flex flex-col items-center">
      <form onSubmit={handleLogin}>
        <label>
          <p className="text-xs mb-3"> Käyttäjätunnus</p>
          <input
            className="border-2 border-solid min-w-xs max-w-lg min-h-12 mb-8 pl-5"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <p className="text-xs mb-3">Salasana</p>
          <input
            className="border-2 border-solid min-w-xs min-h-12 mb-8 pl-5"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {showLoginFailedMessage && (
          <div className="text-center">
            <p className="text-red-500 text-sm">
              Kirjautuminen epäonnistui. Yritä uudelleen.
            </p>
          </div>
        )}
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
  );
}
