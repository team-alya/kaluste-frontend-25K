import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface User {
    id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    role: string;
}

const UserEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState<User | null>(JSON.parse(JSON.stringify(location.state.user)) || null);
    const [originalUser, setOriginalUser] = useState<User | null>(JSON.parse(JSON.stringify(location.state.user)) || null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
    const [warningMsg] = useState<string>(
        "Käyttäjä poistetaan lopullisesti. Haluatko varmasti poistaa käyttäjän?"
    );

    useEffect(() => {
        setLoading(false);
        if (!user) {
        const fetchUser = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/admin/${id}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Käyttäjän haku epäonnistui.");
                }

                const data = await response.json();
                setUser(data);
                setOriginalUser(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Tuntematon virhe.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof User) => {
        if (user) {
            setUser({ ...user, [field]: e.target.value });
            setFieldErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
        }
    };

    const handleSave = async () => {
        if (!user || !originalUser) return;

        const isUnchanged =
            user.username === originalUser.username &&
            user.email === originalUser.email &&
            user.firstname === originalUser.firstname &&
            user.lastname === originalUser.lastname &&
            user.role === originalUser.role;

        if (isUnchanged) {
            setNotification({ message: "Ei muutoksia tallennettavaksi.", type: "success" });
            setTimeout(() => navigate("/users"), 1000);
            return;
        }

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/admin/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const errorData = await response.json();

                if (errorData.errors) {
                    setFieldErrors(errorData.errors);
                    console.log("Virheelliset kentät:", errorData.errors);
                } else {
                    throw new Error("Käyttäjän muokkaus epäonnistui.");
                }

                return;
            }

            const data = await response.json();
            const message = data.message;
            setNotification({ message, type: "success" });
            setTimeout(() => navigate("/users"), 1000);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setNotification({ message: err.message, type: "error" });
            } else {
                setNotification({ message: "Tuntematon virhe.", type: "error" });
            }
        }
    };

    const handleDelete = async () => {

        if (!user?.id) {
            console.error("Ei löytynyt käyttäjän tietoja.");
            return;
        }

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/admin/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Käyttäjän poisto epäonnistui.");
            }

            setNotification({ message: "Käyttäjä poistettu onnistuneesti.", type: "success" });
            setTimeout(() => navigate("/users"), 1000);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setNotification({ message: err.message, type: "error" });
            } else {
                setNotification({ message: "Tuntematon virhe.", type: "error" });
            }
        }
    };

    if (loading)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center">
                <h2 className="text-xl font-bold mb-4">Ladataan käyttäjän tietoja...</h2>
                <div className="w-16 h-16 border-4 border-t-transparent border-green-600 rounded-full animate-spin"></div>
            </div>
        );

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Muokkaa käyttäjää</h1>
            {notification && (
                <div
                    className={`fixed top-0 left-0 w-full p-4 text-center text-white ${notification.type === "success" ? "bg-green-600" : "bg-red-600"
                        }`}
                >
                    {notification.message}
                </div>
            )}
            {user && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">Käyttäjätunnus</label>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 rounded w-full"
                            value={user.username}
                            onChange={(e) => handleInputChange(e, "username")}
                        />
                        {fieldErrors.username && <p className="text-red-500 text-xs mt-1">{fieldErrors.username}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Sähköposti</label>
                        <input
                            type="email"
                            className="border border-gray-300 p-2 rounded w-full"
                            value={user.email}
                            onChange={(e) => handleInputChange(e, "email")}
                        />
                        {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Etunimi</label>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 rounded w-full"
                            value={user.firstname}
                            onChange={(e) => handleInputChange(e, "firstname")}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Sukunimi</label>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 rounded w-full"
                            value={user.lastname}
                            onChange={(e) => handleInputChange(e, "lastname")}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Rooli</label>
                        <select
                            className="border border-gray-300 p-2 rounded w-full"
                            value={user.role}
                            onChange={(e) => handleInputChange(e, "role")}
                        >
                            <option value="user">Käyttäjä</option>
                            <option value="expert">Asiantuntija</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex justify-between mt-6">
                        <button
                            className="px-6 py-2 bg-green-600 text-white rounded shadow hover:bg-green-500"
                            onClick={handleSave}
                        >
                            Tallenna
                        </button>
                        <button
                            className="px-6 py-2 bg-red-600 text-white rounded shadow hover:bg-red-500"
                            onClick={() => setDeleteConfirmation(true)}
                        >
                            Poista
                        </button>
                    </div>
                </div>
            )}

            {deleteConfirmation && (
                <div className="flex flex-col justify-center items-center mt-6">
                    <p className="text-red-600 font-semibold text-lg border-2 my-3 rounded-md border-red-700 text-center md:text-bold md:px-4 md:py-3 p-1 w-3/4">
                        {warningMsg}
                    </p>
                    <div className="flex flex-row justify-evenly md:justify-start items-center h-10 w-4/5 gap-6 mt-3 md:mt-10 mx-3">
                        <button
                            onClick={handleDelete}
                            className="flex items-center justify-center text-white bg-red-600 rounded-lg h-12 w-1/2 btn-secondary"
                        >
                            Poista
                        </button>
                        <button
                            onClick={() => setDeleteConfirmation(false)}
                            className="flex items-center justify-center px-1 text-white bg-gray-500 rounded-lg h-12 w-1/2"
                        >
                            Peruuta
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserEdit;