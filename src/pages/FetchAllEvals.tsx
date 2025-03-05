import { useEffect, useState } from "react";
import LoadingProducts from "./LoadingProductList";

export default function FetchAllEvals() {

  const [evals, setEvals] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    fetchEvals();
  }, []);

  const fetchEvals = () => {
    setLoading(true);
    fetch(
      "https://kalustearvio-25k-backend-kalustearvio-25k.2.rahtiapp.fi/api/evaluation/all "
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
        console.log(data);
        setLoading(false);
      })

      .catch((error) => console.error(error));
  };

  return (
    <div>
      {isFetched ? (
        <div className="flex flex-col">
          {evals.map((e: any) => (
            <div className="m-5 flex flex-row items-center" key={e.id}>
              {/* Display image if available*/}
              { e.image ? <img
                className="rounded-full max-w-25 aspect-square"
                src={
                  e.image.startsWith("data:image")
                    ? e.image
                    : `data:image/jpeg;base64,${e.image}`
                }
                alt="Evaluation"
              /> : 
              // display default image if no image is available
              <img className="rounded-full max-w-25 aspect-square"
            src='./src/assets/pnf.png'>
              </img>}

              <p className="m-2">{e.evaluation.brand}</p>
              <p>{e.evaluation.model}</p>

             
            </div>
          ))}
        </div>
      ) : (
        <div>
          {/* show loading spinner while fetching products */}
          <LoadingProducts />
        </div>
      )}
    </div>
  );
}
