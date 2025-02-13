import { useState } from "react";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    role: "customer",
  });

  // State to store validation errors for form fields
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  //validate email with regex
  const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  // Validate form fields and store errors in the newErrors object, then update the state
  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!user.username.trim())
      newErrors.username = "Käyttäjätunnus on pakollinen.";
    if (!user.firstname.trim()) newErrors.firstname = "Etunimi on pakollinen.";
    if (!user.lastname.trim()) newErrors.lastname = "Sukunimi on pakollinen.";
    if (!user.email.trim()) newErrors.email = "Sähköposti on pakollinen.";
    else if (!validateEmail(user.email))
      newErrors.email = "Virheellinen sähköposti.";
    if (!user.password.trim()) newErrors.password = "Salasana on pakollinen.";
    else if (user.password.length < 6)
      newErrors.password = "Salasanan tulee olla vähintään 6 merkkiä pitkä.";

    setErrors(newErrors);
    //return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    //check if form fields are valid
    if (!validateForm()) {
      return;
    }
    console.log(user);

    fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            let errorMessage = "Rekisteröinti epäonnistui. Yritä uudelleen.";
            // If registration fails due to username or email already being taken, show a more specific error message
            if (
              errorData.message &&
              errorData.message.includes("Username is taken")
            ) {
              errorMessage =
                "Käyttäjätunnus on jo varattu. Valitse toinen käyttäjätunnus.";
              // code 11000 is for duplicate key error MongoDB
            } else if (errorData.error?.code === 11000) {
              if (errorData.error.keyPattern?.email) {
                errorMessage =
                  "Sähköposti on jo käytössä. Käytä toista sähköpostiosoitetta.";
              }
            }
            // Update the state with the error message
            setErrors((prevErrors) => ({
              ...prevErrors,
              general: errorMessage,
            }));
          });
        }
        return response.json();
      })
      // If data is ok, show success message and redirect to login page
      .then((data) => {
        if (data) {
          console.log(data);
          setSuccessMessage("Rekisteröinti onnistui! Jatka kirjautumalla.");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      // If server connection fails, show a general error message
      .catch(() => {
        setErrors((prevErrorrs) => ({
          ...prevErrorrs,
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

        <div className="flex justify-center">
          <button
            className="gap-2 mt-4 px-15 py-3 h-12 text-white bg-emerald-700 shadow-md hover:bg-emerald-600 transition rounded-sm"
            type="submit"
          >
            Rekisteröidy
          </button>
        </div>
        {/* Show error messages and success message */}
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
