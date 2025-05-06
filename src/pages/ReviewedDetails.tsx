import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState, useEffect } from "react";
import { EvaluationData } from "../types/evaluationData";
import { FormData } from "../types/formData";
import { EditingState } from "../types/editingState";
import { Pencil, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";

const ReviewedDetails = () => {
  const navigate = useNavigate();
  const role = window.localStorage.getItem("role");

  const [movedToArchiveMsg] = useState<string>(
    "Tuote arkistoitu onnistuneesti. Sinut ohjataan takaisin listaukseen."
  );

  const [moveToArchiveOk, setMoveToArchiveOk] = useState<boolean>(false);
  const [evaluationData, setEvaluationData] = useState<
    EvaluationData | undefined
  >();

  const [formData, setFormData] = useState<FormData>({
    recommended_price: 0,
    description: "",
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
    recommended_price: false,
    description: false,
    condition: false,
  });

  const [saveOk, setSaveOk] = useState<boolean>(false);
  const [okMessage] = useState<string>("Tiedot päivitetty onnistuneesti.");
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [warningMsg] = useState<string>(
    "Tuote poistetaan lopullisesti. Haluatko varmasti poistaa tuotteen?"
  );

  const evaluation = evaluationData?.evaluation ?? null;
  const image = evaluationData?.imageId || null;

  const evalDate = evaluationData?.timeStamp
    ? new Date(evaluationData.timeStamp).toLocaleDateString("fi-FI")
    : "Päivämäärä puuttuu";
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/evaluation/${id}`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setEvaluationData(data);
          localStorage.setItem("evaluationData", JSON.stringify(data));
        } else {
          console.error("Virhe haettaessa tietoja palvelimelta");
        }
      } catch (error) {
        console.error("Virhe palvelimen pyynnössä:", error);
      }
    };
    if (id) {
      fetchEvaluation();
    }
  }, [id]);

  useEffect(() => {
    if (!evaluationData) return;

    const evaluation = evaluationData.evaluation;
    setFormData({
      recommended_price: evaluationData.priceEstimation?.recommended_price || 0,
      description: evaluationData?.description || "",
      brand: evaluation?.brand || "",
      model: evaluation?.model || "",
      color: evaluation?.color || "",
      width: evaluation?.dimensions?.width || "",
      height: evaluation?.dimensions?.height || "",
      length: evaluation?.dimensions?.length || "",
      condition: evaluation?.condition || "Ei tiedossa",
      materials: evaluation?.materials || [],
      status: evaluation?.status || "Ei tiedossa",
    });
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
      description: true,
      recommended_price: true,
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
      description: false,
      recommended_price: false,
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
        priceEstimation: {
          recommended_price: formData.recommended_price,
        },      
        description: formData.description,
        materiaalit: formData.materials || [],
        status: "reviewed",
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

      setEvaluationData(updatedEvaluation);
      setFormData({
        recommended_price:
          updatedEvaluation.priceEstimation?.recommended_price || 0,
        description: updatedEvaluation?.description || "",
        brand: updatedEvaluation?.brand || "",
        model: updatedEvaluation?.model || "",
        color: updatedEvaluation?.color || "",
        width: updatedEvaluation?.dimensions?.width || "",
        height: updatedEvaluation?.dimensions?.height || "",
        length: updatedEvaluation?.dimensions?.length || "",
        condition: updatedEvaluation?.condition || "Ei tiedossa",
        materials: updatedEvaluation?.materials || [],
        status: updatedEvaluation?.status || "Ei tiedossa",
      });

      localStorage.setItem("evaluationData", JSON.stringify(updatedEvaluation));
      console.log(
        "Tallennettu localStorageen:",
        JSON.parse(localStorage.getItem("evaluationData") || "{}")
      );

      setSaveOk(true);
      console.log("Päivitys onnistui:", updatedEvaluation);
    } catch (error) {
      console.error("Virhe päivitettäessä:", error);
    }
  };

  const SendToArchive = async () => {
    if (!evaluationData?.id) {
      console.error("Ei löytynyt tietoja.");
      return;
    }
    try {
      const archiveData = {
        merkki: formData.brand,
        malli: formData.model,
        vari: formData.color,
        mitat: {
          pituus: formData.length,
          leveys: formData.width,
          korkeus: formData.height,
        },
        kunto: formData.condition,
        recommended_price: formData.recommended_price,
        lisatiedot: formData.description,
        materiaalit: formData.materials || [],
        status: "archived",
      };
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL +
          `/api/evaluation/${evaluationData.id}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(archiveData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Palvelimen virhe:", errorText);
        throw new Error("Tietojen lähettäminen epäonnistui");
      }

      setMoveToArchiveOk(true);

      setTimeout(() => {
        navigate("/reviewed", {
          state: { archiveData },
        });
      }, 4000);
    } catch (error) {
      console.error("Virhe lähettäessä:", error);
    }
  };

  const deleteProduct = async () => {
    if (!evaluationData?.id) {
      console.error("Ei löytynyt tietoja.");
      return;
    }

    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL +
          `/api/evaluation/${evaluationData.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(errorText);
        throw new Error("Poisto epäonnistui");
      }

      console.log("Tuote poistettu onnistuneesti");
      navigate("/reviewed");
    } catch (error) {
      console.error("Virhe poistettaessa:", error);
    }
  };

  return (
    <div className="flex md:justify-center">
      {evaluation ? (
        <div>
          <div className="flex flex-row items-start m-6">
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
            </div>

            <div>
              {!isEditing.info ? (
                <>
                  {role !== "user" && (
                    <div
                      onClick={handleEditAllClick}
                      className="mt-3 text-white bg-gray-500 shadow-sm transition rounded-full flex items-center justify-center cursor-pointer ml-auto"
                      style={{ width: "40px", height: "40px" }}
                      aria-label="Muokkaa tietoja"
                    >
                      <Pencil size={20} />
                    </div>
                  )}

                  <div className="flex items-center mt-3 mb-2">
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
                    <strong>Mitat:</strong> {formData.width} x {formData.height}{" "}
                    x {formData.length} cm
                  </p>
                </>
              ) : (
                <div className="flex flex-col">
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
                </div>
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
                      const conditionMap: {
                        [key: string]: { img: string; text: string };
                      } = {
                        Huono: { img: "/assets/cond_poor.png", text: "Huono" },
                        Hyvä: { img: "/assets/cond_good.png", text: "Hyvä" },
                        Kohtalainen: {
                          img: "/assets/cond_good.png",
                          text: "Kohtalainen",
                        },
                        Erinomainen: {
                          img: "/assets/cond_excellent.png",
                          text: "Erinomainen",
                        },
                        Uusi: {
                          img: "/assets/cond_excellent.png",
                          text: "Uusi",
                        },
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
                  <strong>Hinta-arvio:</strong>
                </p>
              </div>
              <div className="mt-1">
                {isEditing.recommended_price ? (
                  <input
                    type="text"
                    className="border border-black p-1 rounded mt-1 w-24"
                    value={formData.recommended_price}
                    onChange={(e) => handleInputChange(e, "recommended_price")}
                    autoFocus
                  />
                ) : (
                  <p>{formData.recommended_price || "Ei tiedossa"} €</p>
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
              {!isEditing.description ? (
                <p className="whitespace-pre-line break-words">
                  {formData.description || "Ei tiedossa"}
                </p>
              ) : (
                <textarea
                  className="border border-black p-1 rounded mt-1 w-full max-w-md resize-y"
                  value={formData.description}
                  rows={3}
                  onChange={(e) => handleInputChange(e, "description")}
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

          <div>
            {deleteConfirmation ? (
              <div className="flex flex-col justify-center items-center mb-3">
                <p className="text-red-600 font-semibold text-lg border-2 my-3 rounded-md border-red-700 text-center md:text-bold md:px-4 md:py-3 p-1 w-3/4">
                  {warningMsg}
                </p>

                <div className="flex flex-row justify-evenly md:justify-start items-center h-10 w-4/5 gap-6 mt-3 md:mt-10 mx-3">
                  <button
                    onClick={deleteProduct}
                    className="flex items-center justify-center text-white bg-red-600 rounded-lg h-12 w-1/2"
                  >
                    <Trash2 size={20} strokeWidth={2} className="mr-2" />
                    Poista
                  </button>
                  <button
                    onClick={() => setDeleteConfirmation(false)}
                    className="flex items-center justify-center px-1 text-white bg-gray-500 rounded-lg h-12 w-1/2"
                  >
                    Peru
                  </button>
                </div>
              </div>
            ) : Object.values(isEditing).some((value) => value) ? (
              <div className="flex flex-row justify-evenly items-center h-20 gap-6 mt-10 mx-3">
                <button
                  onClick={handleSaveAll}
                  className="flex items-center justify-center px-1 text-white bg-emerald-700 rounded-lg btn-primary w-9/10 h-12 md:w-1/2"
                >
                  Tallenna tiedot
                </button>
              </div>
            ) : (
              role !== "user" && (
                <>
                  {moveToArchiveOk && (
                    <div className="m-3 text-lg font-semibold text-[#104930] text-center">
                      {movedToArchiveMsg}
                    </div>
                  )}
                  {!moveToArchiveOk && (
                    <div className="flex flex-row justify-evenly md:justify-start items-center h-20 gap-6 mt-10 mx-3">
                      <button
                        className="flex items-center justify-center px-1 text-white bg-red-600 rounded-lg btn-secondary w-9/10 h-12 md:w-1/2"
                        onClick={() => setDeleteConfirmation(true)}
                      >
                        <Trash2 size={20} strokeWidth={2} className="mr-2" />
                        Poista
                      </button>

                      <button
                        className="flex items-center justify-center px-1 text-white bg-gray-500 rounded-lg w-9/10 h-12 md:w-1/2"
                        onClick={SendToArchive}
                      >
                        Arkistoi
                      </button>
                    </div>
                  )}
                </>
              )
            )}
          </div>
        </div>
      ) : (
        <div>
          <p>Kalustetta ei löytynyt</p>
        </div>
      )}
    </div>
  );
};

export default ReviewedDetails;
