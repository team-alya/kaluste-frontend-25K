import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const username = window.localStorage.getItem("username") || null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Hei,</h1>
        <p className="text-4xl font-bold text-emerald-700 text-primary">
          {username}
        </p>
        <p className="mt-2">Tervetuloa admin-näkymään. Mitä haluaisit tehdä?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Käyttäjät</h2>
          <p className="mb-4">
            Hallinnoi käyttäjiä ja tarkastele heidän tietojaan.
          </p>
          <button
            className="px-6 py-3 text-white bg-yellow-600 rounded-lg shadow-md hover:bg-yellow-500 transition"
            onClick={() => navigate("/users")}
          >
            Näytä käyttäjät
          </button>
        </div>

        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Rekisteröinti</h2>
          <p className="mb-4">Rekisteröi uusia käyttäjiä järjestelmään.</p>
          <button
            className="px-6 py-3 text-white bg-green-600 rounded-lg shadow-md hover:bg-green-500 transition"
            onClick={() => navigate("/register")}
          >
            Rekisteröi uusi käyttäjä
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
