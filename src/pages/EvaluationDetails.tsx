import { useLocation } from "react-router-dom";
import { ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EvaluationData } from "../types/EvaluationData";
import { FormData } from "../types/formData";
import { EditingState } from "../types/editingState";

export default function EvalDetails() {
  const location = useLocation();
   const navigate = useNavigate();

  const [evaluationData, setEvaluationData] = useState<EvaluationData | undefined>();
  const [formData, setFormData] = useState<FormData>({
    price: "",
    notes: "",
    brand: "",
    model: "",
    color: "",
    width: "",
    height: "",
    length: "",
    condition: "",
    materials: [],
    status: "",
  });
  const [isEditing, setIsEditing] = useState<EditingState>({
    info: false,
    price: false,
    notes: false,
    condition: false,
  });

  const [saveOk, setSaveOk] = useState<boolean>(false);
  const [okMessage] = useState<string>("Tiedot päivitetty onnistuneesti.");

  const evaluation = evaluationData?.evaluation ?? null;
  const image = evaluationData?.imageId || null;

  const evalDate = evaluationData?.timeStamp
    ? new Date(evaluationData.timeStamp).toLocaleDateString("fi-FI")
    : "Päivämäärä puuttuu";

  useEffect(() => {
    const stateData = location.state?.evaluation;
    if (stateData) {
      setEvaluationData(stateData);
      localStorage.setItem("evaluationData", JSON.stringify(stateData));
    } else {
      const storedData = localStorage.getItem("evaluationData");
      if (storedData) {
        setEvaluationData(JSON.parse(storedData));
      }
    }
  }, [location.state]);

  useEffect(() => {
    if (evaluation) {
      setFormData({
        price: evaluation.price || "",
        notes: evaluation.notes || "",
        brand: evaluation.brand || "",
        model: evaluation.model || "",
        color: evaluation.color || "",
        width: evaluation.dimensions?.width || "",
        height: evaluation.dimensions?.height || "",
        length: evaluation.dimensions?.length || "",
        condition: evaluation.condition || "Ei tiedossa",
        materials: evaluation.materials || [],
        status: evaluation.status || "Ei tiedossa",
      });
    }
  }, [evaluationData]);

  useEffect(() => {
    if (saveOk) {
      const timer = setTimeout(() => {
        setSaveOk(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [saveOk]);

 

  const handleEditAllClick = () => {
    setIsEditing({
      info: true,
      notes: true,
      price: true,
      condition: true,
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: keyof FormData
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSaveAll = async () => {
    setIsEditing({
      info: false,
      notes: false,
      price: false,
      condition: false,
    });

    if (!evaluationData?.id) {
      console.error("Ei löytynyt tietoja.");
      return;
    }

    try {
      const updatedData = {
        merkki: formData.brand,
        malli: formData.model,
        vari: formData.color,
        mitat: {
          pituus: formData.length,
          leveys: formData.width,
          korkeus: formData.height,
        },
        kunto: formData.condition,
        hinta: formData.price,
        lisatiedot: formData.notes,
        materiaalit: formData.materials || [],
        status: formData.status,
      };

      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL +
          `/api/evaluation/${evaluationData.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Palvelimen virhe:", errorText);
        throw new Error("Tietojen päivittäminen epäonnistui");
      }

      const updatedEvaluation = await response.json();
      setSaveOk(true);
      console.log("Päivitys onnistui:", updatedEvaluation);
    } catch (error) {
      console.error("Virhe päivitettäessä:", error);
    }
  };

  const SendToExpert = async () => {

      if (!evaluationData?.id) {
      console.error("Ei löytynyt tietoja.");
      return;
    }
    try {
      const expertData = {
        merkki: formData.brand,
        malli: formData.model,
        vari: formData.color,
        mitat: {
          pituus: formData.length,
          leveys: formData.width,
          korkeus: formData.height,
        },
        kunto: formData.condition,
        hinta: formData.price,
        lisatiedot: formData.notes,
        materiaalit: formData.materials || [],
        status: "reviewed",
      };
 console.log("Lähetettävä data:", expertData);
      const response = await fetch(
        `http://localhost:3000/api/evaluation/${evaluationData.id}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expertData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Palvelimen virhe:", errorText);
        throw new Error("Tietojen lähettäminen epäonnistui");
      }

      const updatedExpertData = await response.json();
      setSaveOk(true);
      console.log("Päivitys onnistui:", updatedExpertData);

      console.log("Lähetetään expertille:", expertData);
      navigate("/reviewed", {
        state: { expertData },
      });
    } catch (error) {
      console.error("Virhe lähettäessä:", error);
    }
  };

  return (
    <div>


      {evaluation ? (
        <div>
          <div className="flex flex-row items-start m-6 mt-10">
            <div>
              <p className="text-gray-500 text-sm mb-2">
                <strong>Lisätty:</strong> {evalDate}
              </p>
              {image ? (
                <img
                  src={
                    import.meta.env.VITE_BACKEND_URL +
                    `/api/image/${evaluationData?.imageId} `
                  }
                  alt="Kalusteen kuva"
                  className="mr-5 max-w-40 rounded-lg"
                />
              ) : (
                <img
                  className="rounded-full max-w-25 aspect-square"
                  src="/assets/pnf.png"
                  alt="Tuotekuvaa ei löytynyt"
                />
              )}
               <button
    onClick={handleEditAllClick}
    className="mt-3 px-4 py-1 text-sm text-white bg-gray-500 shadow-sm transition rounded"
    style={{ width: '90%', height: "40px"}}
  >
    Muokkaa tietoja
  </button>
            </div>

            <div>
              {!isEditing.info ? (
                <>
                  <div className="flex items-center mb-2">
                    <p className="mr-2">
                      <strong>Merkki:</strong> {formData.brand}
                    </p>
                  </div>
                  <p className="mb-2">
                    <strong>Malli:</strong> {formData.model}
                  </p>
                  <p className="mb-2">
                    <strong>Väri:</strong> {formData.color}
                  </p>
                  <p className="mb-2">
                    <strong>Mitat:</strong> {formData.width} x {formData.height} x {formData.length} cm
                  </p>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    className="border border-black p-1 rounded w-40 mb-2"
                    value={formData.brand}
                    onChange={(e) => handleInputChange(e, "brand")}
                    placeholder="Merkki"
                    autoFocus
                  />
                  <input
                    type="text"
                    className="border border-black p-1 rounded w-40 mb-2"
                    value={formData.model}
                    onChange={(e) => handleInputChange(e, "model")}
                    placeholder="Malli"
                  />
                  <input
                    type="text"
                    className="border border-black p-1 rounded w-40 mb-2"
                    value={formData.color}
                    onChange={(e) => handleInputChange(e, "color")}
                    placeholder="Väri"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="border border-black p-1 rounded w-12"
                      value={formData.width}
                      onChange={(e) => handleInputChange(e, "width")}
                      placeholder="Leveys"
                    />
                    <input
                      type="text"
                      className="border border-black p-1 rounded w-12"
                      value={formData.height}
                      onChange={(e) => handleInputChange(e, "height")}
                      placeholder="Korkeus"
                    />
                    <input
                      type="text"
                      className="border border-black p-1 rounded w-12"
                      value={formData.length}
                      onChange={(e) => handleInputChange(e, "length")}
                      placeholder="Pituus"
                    />
                  </div>
                </>
              )}
            </div>
            
          </div>
          

          <div className="flex flex-row ml-6">
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="mr-2">
                  <strong>Kunto:</strong>
                </p>
              </div>
              <div className="mt-1">
                {isEditing.condition ? (
                  <input
                    type="text"
                    className="border border-black p-1 rounded mt-1 w-24"
                    value={formData.condition}
                    onChange={(e) => handleInputChange(e, "condition")}
                    autoFocus
                  />
                ) : (
                  <div className="flex flex-col items-start">
                    {(() => {
                      const conditionMap: { [key: string]: { img: string; text: string } } = {
                        Huono: { img: "/assets/cond_poor.png", text: "Huono" },
                        Hyvä: { img: "/assets/cond_good.png", text: "Hyvä" },
                        Kohtalainen: { img: "/assets/cond_good.png", text: "Kohtalainen" },
                        Erinomainen: { img: "/assets/cond_excellent.png", text: "Erinomainen" },
                        Uusi: { img: "/assets/cond_excellent.png", text: "Uusi" },
                      };

                      const condition = formData.condition;
                      const conditionData = conditionMap[condition];

                      if (!conditionData) return <p>{"Tuntematon kunto"}</p>;

                      return (
                        <div className="flex flex-col items-start">
                          <img
                            className="max-w-40"
                            src={conditionData.img}
                            alt={conditionData.text}
                          />
                          <p className="mt-2">{conditionData.text}</p>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col ml-8">
              <div className="flex items-center">
                <p className="mr-2">
                  <strong>Hinta:</strong>
                </p>
              </div>
              <div className="mt-1">
                {isEditing.price ? (
                  <input
                    type="text"
                    className="border border-black p-1 rounded mt-1 w-24"
                    value={formData.price}
                    onChange={(e) => handleInputChange(e, "price")}
                    autoFocus
                  />
                ) : (
                  <p>{formData.price || "Ei tiedossa"}</p>
                )}
              </div>
            </div>
          </div>

          <div className="m-6 flex flex-col max-w-md">
            <div className="flex items-center">
              <p className="mr-2">
                <strong>Lisätiedot:</strong>
              </p>
            </div>
            <div className="mt-1 break-words">
              {!isEditing.notes ? (
                <p className="whitespace-pre-line break-words">
                  {formData.notes || "Ei tiedossa"}
                </p>
              ) : (
                <textarea
                  className="border border-black p-1 rounded mt-1 w-full max-w-md resize-y"
                  value={formData.notes}
                  rows={3}
                  onChange={(e) => handleInputChange(e, "notes")}
                />
              )}
            </div>
          </div>

          {saveOk && (
            <div>
              <p className="text-lg font-semibold text-[#104930] text-center">
                {okMessage}
              </p>
            </div>
          )}

          <div className="flex justify-center items-center fixed bottom-2 inset-x-5 h-16 gap-6">
            <button
              onClick={handleSaveAll}
              className="flex items-center justify-center px-1 text-white bg-emerald-700 rounded-lg"
              style={{ width: "90%", height: "50px" }}
            >
              Tallenna kaikki
            </button>
            <button
              className="flex items-center justify-center px-1 text-white bg-gray-500 rounded-lg"
              style={{ width: "90%", height: "50px" }}
              onClick={SendToExpert}
            >
              Lisää expertin listaan
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>Kalustetta ei löytynyt</p>
        </div>
      )}
    </div>
  );
  
}

