import { useState, useEffect } from "react";
import LoadingProducts from "./LoadingProductList";
import { Evaluation } from "../types/evaluation";
import { useLocation } from "react-router-dom";


const Reviewed = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [isFetched, setIsFetched] = useState<boolean>(false);
    const [evals, ] = useState([]);
    const location = useLocation();
    const expertData =location.state?.expertData || null;

    console.log("Vastaanotetttu", expertData);

    // fetch all evals and filter "reviewed" evals

     useEffect(() => {
        fetchEvals();
      }, []);

    const fetchEvals = async () => {

        setLoading(true);
    
        //  LISÄÄ TÄHÄN FILTERÖINTI
    //     await fetch(import.meta.env.VITE_BACKEND_URL + "/api/evaluation/all", {
    //     method: "GET",
    //     headers: {
    //         "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
    //         "Content-Type": "application/json",
    //     },
    // }) 
//     .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch evaluations");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         // set data to useState
//         // and exit the loading component
//         setEvals(data);
        setIsFetched(true);
        setLoading(false);
//       })

//       .catch((error) => console.error(error));
//   };

    }

    return (
        <div>
            {/* if products are being loaded, render the loading component */}
            { loading && <LoadingProducts />}

            { isFetched && evals.length === 0 ? (
                <div className="flex flex-col items-center  p-5 mt-15 text-center">
                    <p>Ei tuotteita.</p>
                </div>
            ) : (
            // if products are fetched and the list is not empty
            <div>
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold ml-5 mt-4">Käsitellyt</h1>

                {/* listing the products */}
                    {evals.map((e: Evaluation) => {
                        const evalDate = e.timeStamp ? new Date(e.timeStamp).toLocaleDateString("fi-FI") : "Päivämäärä puuttuu";
                        return (
                        <div key={e.id}>
                        {/* create a clickable button for the product card */}
                        <button
                            className="m-5 flex flex-row justify-stretch p-4 border rounded-lg w-xs"
                            onClick={() => {
                            // save the evaluated product's data to sessionStorage for back navigation
                            sessionStorage.setItem(
                            "evalData",
                            JSON.stringify({ evaluation: e, imageId: e.imageId })
                            );
                            }}
                        >
                            {/* display the image if available */}
                            <div className="">
                            {e.imageId ? (
                            <img
                                className="rounded-full max-w-25 aspect-square"
                                src={import.meta.env.VITE_BACKEND_URL + `/api/image/${e.imageId}`}
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
                            <p className="m-2 ">{e.brand}</p>
                            
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
    )
}


export default Reviewed;