import { useEffect, useState } from "react";
import LoadingProducts from "../../components/LoadingProductList";
import { useLocation, useNavigate } from "react-router-dom";
import { Evaluation } from "../../types/evaluation";

// fetching all evaluated products and displaying them in a list view

export default function FetchAllEvals() {
  const [evals, setEvals] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  // fetch products when the component is loaded
  useEffect(() => {
    fetchEvals();
  }, []);

  // fetching products from the backend
  const fetchEvals = async () => {
    // show loading component while waiting for a response from the backend
    setLoading(true);

    await fetch(import.meta.env.VITE_BACKEND_URL + "/api/evaluation/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
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
        const sortedData = sortEvaluationsByDate(data);
        setEvals(sortedData);
        setIsFetched(true);
        setLoading(false);
      })

      .catch((error) => console.error(error));
  };

  // Function to sort evaluations by date (newest first)
  const sortEvaluationsByDate = (evaluations: Evaluation[]) => {
    return evaluations.sort((a, b) => {
      const dateA = new Date(a.timeStamp || 0).getTime();
      const dateB = new Date(b.timeStamp || 0).getTime();
      return dateB - dateA; // Sort descending
    });
  };

  // fetch a single product before navigating to the product page
  const fetchEval = async (id: string) => {
    const url = import.meta.env.VITE_BACKEND_URL + `/api/evaluation/${id}`;
    await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
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
        navigate(`/eval/${id}`, {
          state: { evaluation: data, from: location.pathname },
        });
      })
      .catch((error) => console.error(error));
  };

  // filter the products that are not reviewed or archived
  const filterProducts = evals.filter((e: Evaluation) => {
    return e.status !== "reviewed" && e.status !== "archived";
  });

  return (
    <div>
      {/* if products are being loaded, render the loading component */}

      {loading && <LoadingProducts />}

      {/* if products are fetched but the list is empty */}
      {isFetched && evals.length === 0 ? (
        <div className="flex flex-col items-center  p-5 mt-15 text-center">
          <p>Ei tuotteita.</p>
        </div>
      ) : (
        // if products are fetched and the list is not empty
        <div>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold ml-5 mt-4">
              Tekoälyn arvioimat tuotteet
            </h1>

            {/* listing the products */}
            {filterProducts.map((e: Evaluation) => {
              const evalDate = e.timeStamp
                ? new Date(e.timeStamp).toLocaleDateString("fi-FI")
                : "Päivämäärä puuttuu";
              return (
                <div key={e.id}>
                  {/* create a clickable button for the product card */}
                  <button
                    className="m-5 flex flex-row justify-stretch p-4 border rounded-lg w-xs
                      md:p-5 md:w-md md:text-lg
                      lg:p-6 lg:w-lg lg:text-xl"
                    onClick={() => {
                      // save the evaluated product's data to sessionStorage for back navigation
                      sessionStorage.setItem(
                        "evalData",
                        JSON.stringify({ evaluation: e, imageId: e.imageId })
                      );
                      fetchEval(e.id);
                    }}
                  >
                    {/* display the image if available */}
                    <div className="">
                      {e.imageId ? (
                        <img
                          className="rounded-full max-w-25 aspect-square"
                          src={
                            import.meta.env.VITE_BACKEND_URL +
                            `/api/image/${e.imageId}`
                          }
                          alt="Tuotekuva"
                        />
                      ) : (
                        // if no image, display a placeholder image
                        <img
                          className="rounded-full max-w-25 aspect-square"
                          src="/assets/pnf.png"
                          alt="Tuotekuvaa ei löytynyt"
                        />
                      )}
                    </div>
                    {/* display the brand and product addition date to the user */}
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
