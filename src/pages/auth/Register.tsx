import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    role: "user",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!user.username.trim())
      newErrors.username = "Käyttäjätunnus on pakollinen.";
    if (!user.firstname.trim()) newErrors.firstname = "Etunimi on pakollinen.";
    if (!user.lastname.trim()) newErrors.lastname = "Sukunimi on pakollinen.";
    if (!user.email.trim()) newErrors.email = "Sähköposti on pakollinen.";
    else if (!validateEmail(user.email))
      newErrors.email = "Virheellinen sähköposti.";
    if (!user.password.trim()) newErrors.password = "Salasana on pakollinen.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    fetch(import.meta.env.VITE_BACKEND_URL + "/api/admin/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            if (errorData.errors) {
              setErrors(errorData.errors);
            } else {
              setErrors({
                general: "Rekisteröinti epäonnistui. Yritä uudelleen.",
              });
            }
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setSuccessMessage(
            "Rekisteröinti onnistui! Ohjataan takaisin admin-näkymään..."
          );
          setTimeout(() => {
            navigate("/admin");
          }, 2000);
        }
      })
      .catch(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: "Palvelinyhteydessä tapahtui virhe.",
        }));
      });
  };

  return (
    <div className="mt-10 flex justify-center">
      <form
        onSubmit={handleRegister}
        className="space-y-7 w-full max-w-md flex flex-col items-center"
      >
        <label className="w-full max-w-xs">
          <p className="text-xs mb-1">Käyttäjätunnus *</p>
          <input
            className="border-2 border-solid w-full min-h-12 pl-5 rounded-sm"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </label>

        <label className="w-full max-w-xs">
          <p className="text-xs mb-1">Etunimi *</p>
          <input
            className="border-2 border-solid w-full min-h-12 pl-5 rounded-sm"
            type="text"
            value={user.firstname}
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
          />
          {errors.firstname && (
            <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>
          )}
        </label>

        <label className="w-full max-w-xs">
          <p className="text-xs mb-1">Sukunimi *</p>
          <input
            className="border-2 border-solid w-full min-h-12 pl-5 rounded-sm"
            type="text"
            value={user.lastname}
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
          />
          {errors.lastname && (
            <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>
          )}
        </label>

        <label className="w-full max-w-xs">
          <p className="text-xs mb-1">Sähköpostiosoite *</p>
          <input
            className="border-2 border-solid w-full min-h-12 pl-5 rounded-sm"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </label>

        <label className="w-full max-w-xs">
          <p className="text-xs mb-1">Salasana *</p>
          <input
            className="border-2 border-solid w-full min-h-12 pl-5 rounded-sm"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </label>

        <label className="w-full max-w-xs">
          <p className="text-xs mb-1">Rooli *</p>
          <select
            className="border-2 border-solid w-full min-h-12 pl-5 rounded-sm"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          >
            <option value="user">Käyttäjä</option>
            <option value="expert">Asiantuntija</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <div className="flex justify-center">
          <button
            className="gap-2 mt-4 px-15 py-3 h-12 text-white bg-emerald-700 shadow-md hover:bg-emerald-600 transition rounded-sm btn-primary"
            type="submit"
          >
            Rekisteröi käyttäjä
          </button>
        </div>

        <div className="text-center">
          {errors.general && (
            <p className="text-red-500 text-xs mb-3">{errors.general}</p>
          )}
          {successMessage && (
            <p className="text-emerald-700 text-xs mb-3">{successMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
}
