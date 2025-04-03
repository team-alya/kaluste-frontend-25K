import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";
import { useState } from "react";

const AcceptedPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Get the photo from the location state
  const photo = location.state?.photo || null;
  const username = location.state?.username || null;
  const evaluation = location.state?.evaluation || null; 

  const [saveOk, setSaveOk] = useState<boolean>(false);
  const [okMessage, setOkMessage] = useState<string>('Tuote otettu vastaan onnistuneesti. Sinut ohjataan etusivulle.');

  const saveEval = async () => {

    const formData = new FormData();

    const response = await fetch(photo);
    const blob = await response.blob();

    formData.append("merkki", evaluation.brand);
    formData.append("malli", evaluation.model);
    formData.append("vari", evaluation.color);
    formData.append("pituus", evaluation.dimensions.length);
    formData.append("leveys", evaluation.dimensions.width);
    formData.append("korkeus", evaluation.dimensions.height);
    formData.append("materiaalit", evaluation.materials);
    formData.append("kunto", evaluation.condition);

    formData.append("image", blob, "photo.jpg");

  const token = localStorage.getItem("token");

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "evaluation/save ", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Error saving evaluation");
      }
      
      setSaveOk(true);
      setTimeout(() => {
        navigate("/home", { state: { from: location.pathname } });
      }, 4000);

    } catch (error) {
      console.error(error);
    }

  }

  return (
    <div className="flex flex-col items-center justify-center mt-10 p-5 text-center">
      

      <div className="flex items-center gap-2 mb-10">
        <CircleCheckBig size={40} className="text-green-600" />
        <h2 className="text-xl font-bold text-black">Tiedot haettu onnistuneesti</h2>
      </div>
      
      {photo ? (
        <img
          src={photo}
          alt="Approved"
          className="w-[250px] h-[250px] object-cover rounded-lg mb-4 shadow-md"
        />
      ) : (
        <p className="text-gray-500">Kuva ei saatavilla</p>
      )}
      
      <div className="flex flex-col text-left mt-2">
        <p className="mb-2"><strong>Merkki:</strong> {evaluation.brand}</p>
        <p className="mb-2"><strong>Malli:</strong> {evaluation.model}</p>
        <p className="mb-2"><strong>Väri:</strong> {evaluation.color}</p>
        <p className="mb-2"><strong>Mitat:</strong> {evaluation.length || 0} cm x {evaluation.width || 0} cm x {evaluation.height || 0} cm</p>
        <p className="mb-2"><strong>Kunto:</strong> {evaluation.condition}</p>
      </div>

      <div>
        {saveOk && (
          <div>
            <p className="m-5 text-lg font-semibold text-[#104930]">{okMessage}</p>
            
          </div>
        )}
      </div>

      <div className="">
        <button 
          className="gap-2 mt-4 px-6 py-3 h-12 text-white bg-emerald-700 shadow-md hover:bg-emerald-600 transition rounded-sm mr-4"
          onClick={() => saveEval()}
          >Ota vastaan</button>


        <button className="gap-2 mt-4 px-6 py-3 h-12 text-white bg-red-700 shadow-md hover:bg-emerald-600 transition rounded-sm"
          onClick={() => navigate("/home", { state: { from: location.pathname } })}
        >Hylkää</button>
      </div>
      
    </div>

  );
};

export default AcceptedPage;
