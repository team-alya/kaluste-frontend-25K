import { useLocation } from "react-router-dom";

export default function EvalDetails() {

    const location = useLocation();
    const evaluationData = location.state?.evaluation || null;
    const evaluation = evaluationData.evaluation || null;
    const image = evaluationData.image || null;
    

   return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Kalusteen tiedot</h1>

        {evaluation ? (
          <div className="space-y-3">
            <p className="text-lg text-gray-700"><strong>Nimi:</strong> {evaluation.brand}</p>
            <p className="text-lg text-gray-700"><strong>Malli:</strong> {evaluation.model}</p>
            <p className="text-lg text-gray-700"><strong>Väri:</strong> {evaluation.color}</p>
            <p className="text-lg text-gray-700"><strong>Kunto:</strong> {evaluation.condition || "Ei tiedossa"}</p>
            <p className="text-lg text-gray-700"><strong>Mitat:</strong> {evaluation.dimensions?.width} x {evaluation.dimensions?.height} x {evaluation.dimensions?.depth} cm</p>

            {image && (
              <div className="mt-4">
                
                <img 
                  src={image} 
                  alt="Kalusteen kuva" 
                  className="mt-2 w-full rounded-xl shadow-md border border-gray-300"
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            <p>Arviota ei löytynyt</p>
          </div>
        )}
      </div>
    </div>
  );
}