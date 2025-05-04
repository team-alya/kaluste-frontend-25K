import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/admin", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Käyttäjien haku epäonnistui.");
        }

        const data = await response.json();
        setUsers(data);
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

    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center">
        <h2 className="text-xl font-bold mb-4">Ladataan käyttäjiä...</h2>
        <div className="w-16 h-16 border-4 border-t-transparent border-green-600 rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Käyttäjät</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        {users.length === 0 ? (
          <p>Ei käyttäjiä löytynyt.</p>
        ) : (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="font-bold">{user.username}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500">Rooli: {user.role}</p>
                </div>
                <button
                  className="px-2 py-1 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 transition"
                  onClick={() => navigate(`/users/edit/${user.id}`, { state: { user } })}
                 >
                  Muokkaa
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UsersList;