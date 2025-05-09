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
  const [, setStockMessage] = useState<string | null>(null);
  const [, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedUsername =
      location.state?.username || localStorage.getItem("username");
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
    if (evaluation) {
      checkStock();
    }
  }, [evaluation]);

  // saving the evaluation to the backend if the user accepts the evaluation
  const saveEval = async () => {
    // create a formData object
    const formData = new FormData();

    // create a blob object from the photo
    // Blob = Binary Large Object, stores "raw binary data" such as images
    const response = await fetch(photo);
    const blob = await response.blob();

    // add evaluation details to formData -->
    // changed the keys to match the backend requirements (in dimensions))
    formData.append("merkki", evaluation.merkki);
    formData.append("malli", evaluation.malli);
    formData.append("vari", evaluation.vari);
    formData.append("mitat[pituus]", evaluation.mitat.pituus);
    formData.append("mitat[leveys]", evaluation.mitat.leveys);
    formData.append("mitat[korkeus]", evaluation.mitat.korkeus);
    formData.append("materiaalit", evaluation.materiaalit.join(", "));
    formData.append("kunto", evaluation.kunto);

    formData.append(
      "priceEstimation",
      JSON.stringify({
        recommended_price: evaluation.recommended_price,
        price_reason: evaluation.price_reason,
      })
    );

    // add the photo to formData
    formData.append("image", blob, "photo.jpg");

    try {
      // send to the backend
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/evaluation/save",
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
      await response.json();
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
    if (!evaluation || !photo) {
      setStockMessage("Arviointitietoja tai kuvaa ei ole saatavilla.");
      setLoading(false);
      return;
    }

    if (!evaluation.merkki || !evaluation.malli) {
      setStockMessage("Merkki ja malli puuttuvat.");
      setLoading(false);
      return;
    }

    try {
      // haetaan blobiksi
      const resp = await fetch(photo);
      const blob = await resp.blob();

      // pakkaa FormDataan
      const formData = new FormData();
      formData.append("merkki", evaluation.merkki);
      formData.append("malli", evaluation.malli);
      formData.append("vari", evaluation.vari);
      formData.append("mitat[pituus]", evaluation.mitat.pituus.toString());
      formData.append("mitat[leveys]", evaluation.mitat.leveys.toString());
      formData.append("mitat[korkeus]", evaluation.mitat.korkeus.toString());
      formData.append("materiaalit", evaluation.materiaalit.join(", "));
      formData.append("kunto", evaluation.kunto);
      formData.append("image", blob, "photo.jpg");

      // lähetä ilman Content-Type-headeria, selaimesi asettaa boundaryn
      const stockResponse = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/evaluation/check",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (!stockResponse.ok) {
        const errorData = await stockResponse.json();
        setStockMessage(
          `Virhe: ${
            errorData.error || "Varastotilanteen tarkistus epäonnistui."
          }`
        );
      } else {
        const data = await stockResponse.json();
        setStockMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setStockMessage("Virhe varastotilanteen tarkistuksessa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 p-5 text-center">
      <div className="flex items-center gap-2 mb-10">
        <CircleCheckBig size={40} className="text-green-600" />
        <h2 className="text-xl font-bold text-black">
          Tiedot haettu onnistuneesti
        </h2>
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
          <strong>Merkki:</strong> {evaluation.merkki}
        </p>
        <p className="mb-2">
          <strong>Malli:</strong> {evaluation.malli}
        </p>
      </div>

      <div>
        {/* show success message if the evaluation was saved successfully */}
        {saveOk && (
          <div>
            <p className="m-5 text-lg font-semibold text-[#104930]">
              {okMessage}
            </p>
          </div>
        )}
      </div>

      <div>
        {/* save button */}
        <button
          data-testid="save-button"
          className="gap-2 mt-4 px-6 py-3 h-12 text-white bg-emerald-700 shadow-md hover:bg-emerald-600 transition rounded-sm mr-4 btn-tertiary"
          onClick={() => saveEval()}
        >
          Ota vastaan
        </button>

        {/* reject button */}
        <button
          className="gap-2 mt-4 px-6 py-3 h-12 text-white bg-red-700 shadow-md hover:bg-red-600 transition rounded-sm btn-secondary"
          onClick={() =>
            navigate("/home", { state: { username, from: location.pathname } })
          }
        >
          Hylkää
        </button>
      </div>
    </div>
  );
};

export default AcceptedPage;
