import { useLocation } from "react-router-dom";
import { ChangeEvent, useState, useEffect } from "react";
export default function EvalDetails() {
  const location = useLocation();

  const [evaluationData, setEvaluationData] = useState<{
    evaluation: Evaluation;
    imageId: string;
    id?: string;
    timeStamp?: string;
  }>();

  const evalDate = evaluationData?.timeStamp
    ? new Date(evaluationData.timeStamp).toLocaleDateString("fi-FI")
    : "Päivämäärä puuttuu";

  const [isEditing, setIsEditing] = useState({
    info: false,
    price: false,
    notes: false,
    condition: false,
  });

  const [saveOk, setSaveOk] = useState(false);
  const [okMessage] = useState("Tiedot päivitetty onnistuneesti.");

  const evaluation = evaluationData?.evaluation || {};
  const image = evaluationData?.imageId || null;

  const [formData, setFormData] = useState({
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
  });

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
      });
    }
  }, [evaluationData]);

  useEffect(() => {
    if (saveOk) {
      const timer = setTimeout(() => {
        setSaveOk(false);
      }, 3000); // Näytetään 3 sekuntia

      return () => clearTimeout(timer);
    }
  }, [saveOk]);

  const handleEditClick = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

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
    field: string
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
        throw new Error("Tietojen päivittäminen epäonnistui");
      }

      const updatedEvaluation = await response.json();
      setSaveOk(true);
      console.log("Päivitys onnistui:", updatedEvaluation);
    } catch (error) {
      console.error("Virhe päivitettäessä:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleEditAllClick}
          className="gap-2 px-12 py-2 h-12 text-white bg-blue-700 shadow-md hover:bg-blue-600 transition rounded-sm"
        >
          Muokkaa Kaikkia
        </button>
      </div>

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
            </div>
                <div>

                  {/* evaluation details if not being edited */}
                  {!isEditing.info ? (
                    <>
                      <div className="flex items-center mb-2">
                        <p className="mr-2">
                          <strong>Merkki:</strong>{" "}
                          {formData.brand || evaluation.brand}
                        </p>
                        <Pencil
                          size={18}
                          className=" text-gray-500 hover:text-gray-700 cursor-pointer"
                          onClick={() => handleEditClick("info")}
                        />
                      </div>
                      <p className="mb-2">
                        <strong>Malli:</strong>{" "}
                        {formData.model || evaluation.model}
                      </p>
                      <p className="mb-2">
                        <strong>Väri:</strong>{" "}
                        {formData.color || evaluation.color}
                      </p>
                      <p className="mb-2">
                        <strong>Mitat:</strong>{" "}
                        <br></br>
                        {formData.width || evaluation.dimensions?.width} x {" "}
                        {formData.height || evaluation.dimensions?.height} x {" "}
                        {formData.length || evaluation.dimensions?.length} cm
                      </p>
                    </>
                  ) : (
                    // details in edit view
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
                  
                  {/* condition details visually */}
              <div className="flex flex-row ml-6">
                  
              <div className="flex flex-col">
                  <div className="flex items-center">
                    <p className="mr-2">
                      <strong>Kunto: </strong>
                    </p>
                    <Pencil
                          size={18}
                          className=" text-gray-500 hover:text-gray-700 cursor-pointer"
                          onClick={() => handleEditClick("condition")}
                        />
                  </div>
                  <div className="mt-1">
                    {isEditing.condition && (
                      <input
                        type="text"
                        className="border border-black p-1 rounded mt-1 w-24"
                        value={formData.condition}
                        onChange={(e) => handleInputChange(e, "condition")}
                        onBlur={() => handleSave("condition")}
                        autoFocus
                      />
                    )}
                  </div>
                  <div>
                    
                    {/* show different image based on the reported condition of the product */}
                  {(() => {

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

          <div className="flex justify-center absolute mb-5 inset-x-0 bottom-0 h-16">
            <button
              onClick={handleSaveAll}
              className="gap-2 px-12 py-2 h-12 text-white bg-emerald-700 shadow-md hover:bg-emerald-600 transition rounded-sm"
            >
              Tallenna kaikki
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
