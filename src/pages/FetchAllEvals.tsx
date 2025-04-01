import { useEffect, useState } from "react"; 
import LoadingProducts from "./LoadingProductList";
import { useLocation, useNavigate } from "react-router-dom";

export default function FetchAllEvals() {
  interface Evaluation {
    id: string;
    timeStamp?: string;
    imageId?: string;
    evaluation: {
      brand: string;
      model: string;
    };
  }

  const [evals, setEvals] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  

  useEffect(() => {
    fetchEvals();
  }, []);

  const fetchEvals = () => {
    setLoading(true);
    fetch(
      "https://kalustearvio-25k-backend-kalustearvio-25k.2.rahtiapp.fi/api/evaluation/all"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch evaluations");
        }
        return response.json();
      })
      .then((data) => {
        setEvals(data);
        setIsFetched(true);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const fetchEval = (id: string) => {
    fetch(`https://kalustearvio-25k-backend-kalustearvio-25k.2.rahtiapp.fi/api/evaluation/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch evaluation");
        }
        return response.json();
      })
      .then((data) => {
        navigate(`/eval/${id}`, { state: { evaluation: data } });
      })
      .catch((error) => console.error(error));
  };
   

  return (
    <div>
      {loading && <LoadingProducts />}
      {isFetched && evals.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-5 mt-15 text-center">
          <p>Ei tuotteita.</p>
        </div>
      ) : (
        <div>
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold ml-5 mt-4">Käsitellyt</h1>

            {evals.map((e: any) => {
              const evalDate = e.timeStamp ? new Date(e.timeStamp).toLocaleDateString("fi-FI") : "Päivämäärä puuttuu";


              return (
                <div key={e.id}>
                  <button
                    className="m-5 flex flex-row items-center p-4 border rounded-lg w-xs"
                    onClick={() => fetchEval(e.id)}
                  >
                    {/* Display image if available */}
                    {e.imageId ? (
                      <img
                        className="rounded-full max-w-25 aspect-square"
                        src={`https://kalustearvio-25k-backend-kalustearvio-25k.2.rahtiapp.fi/api/image/${e.imageId}`}
                        alt="Tuotekuva"
                      />
                    ) : (
                      <img
                        className="rounded-full max-w-25 aspect-square"
                        src="./src/assets/pnf.png"
                        alt="Tuotekuvaa ei löytynyt"
                      />
                    )}

                    <div className="m-2">
                      <p>{e.evaluation.brand}</p>
                      <p>{e.evaluation.model}</p>
                      <p className="text-sm text-gray-500">Lisätty: {evalDate}</p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
