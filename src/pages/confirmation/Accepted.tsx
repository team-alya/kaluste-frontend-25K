import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";

// show the user a successful evaluation and the option to save or reject it

const AcceptedPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const photo = location.state?.photo || null;
  const evaluation = location.state?.evaluation || null;
  const [username, setUsername] = useState<string | null>(null);
  const [saveOk, setSaveOk] = useState<boolean>(false);
  const [okMessage] = useState<string>(
    "Tuote otettu vastaan onnistuneesti. Sinut ohjataan etusivulle."
  );
  const [stockMessage, setStockMessage] = useState<string | null>(null);
  const [, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedUsername = location.state?.username || localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [location.state]);

  
  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    }
  }, [username]);

  // check stock availability when the component is mounted
  useEffect(() => {
    checkStock();
  }, []);

  // saving the evaluation to the backend if the user accepts the evaluation
  const saveEval = async () => {

    // create a formData object
    const formData = new FormData();

    // create a blob object from the photo
    // Blob = Binary Large Object, stores "raw binary data" such as images
    const response = await fetch(photo);
    const blob = await response.blob();

    // add evaluation details to formData
    formData.append("merkki", evaluation.brand);
    formData.append("malli", evaluation.model);
    formData.append("vari", evaluation.color);
    formData.append("pituus", evaluation.dimensions.length);
    formData.append("leveys", evaluation.dimensions.width);
    formData.append("korkeus", evaluation.dimensions.height);
    formData.append("materiaalit", evaluation.materials);
    formData.append("kunto", evaluation.condition);
    formData.append("suositus_hinta", evaluation.suositus_hinta);
    formData.append("description", evaluation.description);
    formData.append("status", evaluation.status);

    // add the photo to formData
    formData.append("image", blob, "photo.jpg");

    try {

      // send to the backend
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/evaluation/save ",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Error saving evaluation");
      }
      
      // if saving is successful, show a success message
      // and redirect the user to the homepage after 4 seconds
      setSaveOk(true);
      setTimeout(() => {
        navigate("/home", { state: { username, from: location.pathname } });
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to check stock availability
  const checkStock = async () => {
    setLoading(true);
    if (!evaluation) {
      setStockMessage("Arviointitietoja ei ole saatavilla.");
      setLoading(false);
      return;
    }
  
    try {
      // create a requestData object with the evaluation details
      const requestData = {
        malli: evaluation.model,
        merkki: evaluation.brand,
      
      };
  
      //
      const stockResponse = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/evaluation/check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
          body: JSON.stringify(requestData),
        }
      );
  
      if (!stockResponse.ok) {
        const errorData = await stockResponse.json();
        setStockMessage(`Virhe: ${errorData.error || "Varastotilanteen tarkistus epäonnistui."}`);
        return;
      }
  
      const data = await stockResponse.json();
      setStockMessage(data.message)
    } catch (error) {
      console.log(error);
      setStockMessage("virhe varastotilanteen tarkistuksessa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 p-5 text-center">
      <div className="flex items-center gap-2 mb-10">
        <CircleCheckBig size={40} className="text-green-600" />
        <h2 className="text-xl font-bold text-black">Tiedot haettu onnistuneesti</h2>
      </div>
      
      {/* show the photo to the user */}
      {photo ? (
        <img
          src={photo}
          alt="Approved"
          className=" w-[250px] h-[250px] object-cover rounded-lg mb-4 shadow-md"
        />
      ) : (
        // or text if the photo is not available for some reason
        <p className="text-gray-500">Kuva ei saatavilla</p>
      )}
      
      {/* show the evaluation details to the user */}
      <div className="flex flex-col text-left mt-2">
        <p className="mb-2">
          <strong>Merkki:</strong> {evaluation.brand}
        </p>
        <p className="mb-2">
          <strong>Malli:</strong> {evaluation.model}
        </p>
      </div>

      <div>
        {/* show success message if the evaluation was saved successfully */}
        {saveOk && (
          <div>
            <p className="m-5 text-lg font-semibold text-[#104930]">{okMessage}</p>
          </div>
        )}
      </div>

      <div>
         {/* Show stock info */}
        
          <p className="text-lg border-emerald-700 border-2 my-6 font-bold rounded-md p-3 text-emerald-900 text-primary">{stockMessage}</p>
       
        {/* save button */}
        <button 
          className="gap-2 mt-4 px-6 py-3 h-12 text-white bg-emerald-700 shadow-md hover:bg-emerald-600 transition rounded-sm mr-4 btn-tertiary"
          onClick={() => saveEval()}
        >
          Ota vastaan
        </button>

        {/* reject button */}
        <button 
          className="gap-2 mt-4 px-6 py-3 h-12 text-white bg-red-700 shadow-md hover:bg-red-600 transition rounded-sm btn-secondary"
          onClick={() => navigate("/home", { state: { username, from: location.pathname } })}
        >
          Hylkää
        </button>

       
      </div>

      
    </div>
  );
};

export default AcceptedPage;
