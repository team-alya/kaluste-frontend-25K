import { useLocation } from "react-router-dom";

export default function EvalDetails() {

    const location = useLocation();
    const evaluationData = location.state?.evaluation || null;
    const evaluation = evaluationData.evaluation || null;
    const image = evaluationData.imageId || null;
   
   return (
    <div>
      <div>
        {evaluation ? (
          <div>
            <div className="flex flex-row items-start m-6 mt-10">
              <div>
              {image && (
                  <img 
                    src={`https://kalustearvio-25k-backend-kalustearvio-25k.2.rahtiapp.fi/api/image/${evaluationData.imageId} `} 
                    alt="Kalusteen kuva" 
                    className="mr-5 max-w-40 rounded-lg"
                  />
              )}
              </div>
              <div>
                <p className="mb-3 ">Nimi: {evaluation.brand}</p>
                <p className="mb-3"><strong>Malli:</strong> {evaluation.model}</p>
                <p className="mb-3"><strong>Väri:</strong> {evaluation.color}</p>
                <p className="mb-3"><strong>Mitat:</strong> {evaluation.dimensions?.width} x {evaluation.dimensions?.height} x {evaluation.dimensions?.length} cm</p>
              </div>
            </div>
            
            <div className="flex flex-row ml-6">
              <div className="max-w-40">
                <p>
                  <strong>Kunto: </strong> 
                </p>
                <div>
                  {evaluation.condition === "Ei tiedossa" && <p>Ei tiedossa</p>}
                  {evaluation.condition === "Huono" && <img src="/src/assets/cond_poor.png"/>}
                  {evaluation.condition === "Hyvä" && <img src="/src/assets/cond_good.png"/>}
                  {evaluation.condition === "Erinomainen" || evaluation.condition === "Uusi" && <img src='/src/assets/cond_excellent.png' />}
                </div>
              </div>
              <div className="ml-3">
                <p><strong>Hinta: </strong></p>
              </div>
            </div>

            <div className="m-6">
              <p><strong>Lisätiedot: </strong></p>
            </div>

            <div className="flex justify-center absolute m-5 inset-x-0 bottom-0 h-16">
              <button
                className="gap-2 mt-4 px-12 py-3 h-12 text-white bg-emerald-700 shadow-md hover:bg-emerald-600 transition rounded-sm
                "
                onClick={() => console.log(evaluationData)}
                >
                  Hyväksy tiedot
              </button>
            </div>
            
          </div>
        ) : (
         <div>
            <p>Kalustetta ei löytynyt</p>
         </div>
          
        )}
      </div>
    </div>
  );
}