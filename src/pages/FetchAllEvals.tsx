import { useEffect, useState } from "react";
import LoadingProducts from "./LoadingProductList";
import { useLocation, useNavigate } from "react-router-dom";


export default function FetchAllEvals() {

  const [evals, setEvals] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

   const navigate = useNavigate();
    const location = useLocation();

    

  useEffect(() => {
    fetchEvals();
  }, []);

  const token = window.localStorage.getItem("token");

  const fetchEvals = () => {
    setLoading(true);

    console.log("Token: " + token);
    
    fetch(import.meta.env.VITE_BACKEND_URL + "/api/evaluation/all", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      })
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
    const url = import.meta.env.VITE_BACKEND_URL + `/api/evaluation/${id}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      })

   .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch evaluation!");
    }
    return response.json();
   })
    .then((data) => {
      navigate (`/eval/${id}`, {state: { evaluation: data, from: location.pathname}});
         
    })
    .catch((error) => console.error(error));
  }

  return (
    <div>
      { loading && <LoadingProducts />}
      { isFetched && evals.length === 0 ? (
        <div className="flex flex-col items-center  p-5 mt-15 text-center">
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
                    className="m-5 flex flex-row justify-stretch p-4 border rounded-lg w-xs"
                    onClick={() => {
                      sessionStorage.setItem(
                    "evalData",
                    JSON.stringify({ evaluation: e, imageId: e.imageId })
                  );
                  fetchEval(e.id);
                    }}
                  >
                    {/* Display image if available */}
                    <div className="">
                    {e.imageId ? (
                      <img
                        className="rounded-full max-w-25 aspect-square"
                        src={import.meta.env.VITE_BACKEND_URL + `/api/image/${e.imageId}`}
                        alt="Tuotekuva"
                      />
                    ) : (
                      // Display default image if no image is available
                      <img
                        className="rounded-full max-w-25 aspect-square"
                        src="/assets/pnf.png"
                        alt="Tuotekuvaa ei löytynyt"
                      />
                    )}
                    </div>
                    <div className="ml-4 min-w-1/2 flex flex-col justify-center">
                      <p className="m-2 ">{e.evaluation.brand}</p>
                      
                      <p className="text-sm text-gray-500">{evalDate}</p>
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