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

  const token = localStorage.getItem("token");

  const fetchEvals = () => {
    setLoading(true);
    
    fetch(import.meta.env.VITE_BACKEND_URL + "evaluation/all", {
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
    const url = import.meta.env.VITE_BACKEND_URL + `evaluation/${id}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      })

   .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch evaluation");
    }
    return response.json();
   })
    .then((data) => {
      console.log(data);
      navigate (`/eval/${id}`, {state: {evaluation: data, from: location.pathname}});
         
    })
    .catch((error) => console.error(error));
  }

  return (
    <div>
      { loading && <LoadingProducts />}
      { isFetched && evals.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-5 mt-15 text-center">
          <p>Ei tuotteita.</p>
        </div>
      ) : (
        <div>
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold ml-5 mt-4">Käsitellyt</h1>

            {evals.map((e: any) => (
              <div key={e.id}>
                
                <button
                className="m-5 flex flex-row items-center p-4  border rounded-lg w-xs"
                onClick={() => {
                  fetchEval(e.id);
                }}
                >
                  {/* Display image if available*/}
                  
                { e.imageId ? <img
                  className="rounded-full max-w-25 aspect-square"
                  src={import.meta.env.VITE_BACKEND_URL + `image/${e.imageId}`}
                  alt="Tuotekuva"
                /> : 
                // display default image if no image is available
                <img className="rounded-full max-w-25 aspect-square"
                  src='/assets/pnf.png'
                  alt="Tuotekuvaa ei löytynyt">
                </img> }

                <p className="m-2">{e.evaluation.brand}</p>
                <p>{e.evaluation.model}</p>
                  
                </button>             
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
