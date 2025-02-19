import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showLoginFailedMessage, setShowLoginFailedMessage] = useState<boolean>(false);

    const navigate = useNavigate();

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
        setUsername("");
        setPassword("");
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
       navigate("/home", { state: { username: data.user.username } });
      })
      .catch((err) => console.error(err));
  };
}