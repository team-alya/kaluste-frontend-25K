import { useState } from "react";

export default function FetchAllEvals() { 

    const [evals, setEvals] = useState([]);
    const [isFetched, setIsFetched] = useState<boolean>(false);

    const fetchEvals = () => {

        fetch('https://kalustearvio-25k-backend-kalustearvio-25k.2.rahtiapp.fi/api/image/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch evaluations');
            }
            return response.json();
        })
        .then(data => {
            setEvals(data);
            setIsFetched(true);
        })
        .catch(error => console.error(error));

    }

    return(
        <div>
            <h1>Fetch All Evaluations</h1>

            <button onClick={fetchEvals}>Fetch</button>


            {isFetched && ( 
                <div>
                    {evals.map((e: any) => (
                        <div className="m-5" key={e.id}>
                            <h2>{e.id}</h2>
                            <p>{e.evaluation.brand}</p>
                            <p>{e.evaluation.color}</p>
                            <p>{e.evaluation.condition}</p>
                </div>
                    ))}
                </div>
            )}
        </div>
    )

}