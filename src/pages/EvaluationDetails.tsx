import { useLocation } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { Pencil } from "lucide-react";

export default function EvalDetails() {
  const location = useLocation();
  const evaluationData = location.state?.evaluation || null;
  const evaluation = evaluationData.evaluation || null;
  const image = evaluationData.image || null;

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
                <p className="mb-2"><strong>Merkki:</strong> {evaluation.brand}</p>
                <p className="mb-2"><strong>Malli:</strong> {evaluation.model}</p>
                <p className="mb-2"><strong>Väri:</strong> {evaluation.color}</p>
                <p className="mb-2"><strong>Mitat:</strong> {evaluation.dimensions?.width} x {evaluation.dimensions?.height} x {evaluation.dimensions?.length} cm</p>
              </div>
            </div>

            <div className="flex items-start ml-6 gap-8">
              <div className="flex flex-col max-w-40">
                <p>
                  <strong>Kunto:</strong>
                </p>
                <div className="mt-1">
                  {evaluation.condition === "Ei tiedossa" && <p>Ei tiedossa</p>}
                  {evaluation.condition === "Huono" && <img src="/src/assets/cond_poor.png"/>}
                  {evaluation.condition === "Hyvä" && <img src="/src/assets/cond_good.png"/>}
                  {evaluation.condition === "Erinomainen" || evaluation.condition === "Uusi" && <img src='/src/assets/cond_excellent.png' />} | {evaluation.condition}
                </div>
              </div>
              <div className="ml-2">
                <p><strong>Hinta: </strong></p>
              </div>
            </div>

            <div className="m-6">
              <p><strong>Lisätiedot: </strong></p>
            </div>

            <div className="flex justify-center absolute m-5 inset-x-0 bottom-0 h-16">
              <button
                className="gap-2 mt-4 px-12 py-2 h-12 text-white bg-emerald-700 shadow-md hover:bg-emerald-600 transition rounded-sm"
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
