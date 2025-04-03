import { useLocation } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { Pencil } from "lucide-react";
import { useEffect } from "react";

export default function EvalDetails() {

  const location = useLocation();

  const [evaluationData, setEvaluationData] = useState<{
    evaluation: any;
    imageId: string | null;
  } | null>(null);

  // Usestate for editing fields
  const [isEditing, setIsEditing] = useState({
    info: false,
    price: false,
    notes: false,
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

  const evaluation = evaluationData?.evaluation || null;
  const image = evaluationData?.imageId || null;

  const [formData, setFormData] = useState({
    info: evaluation?.info || "",
    price: evaluation?.price || "",
    notes: evaluation?.notes || "",
    brand: evaluation?.brand || "",
    model: evaluation?.model || "",
    color: evaluation?.color || "",
    width: evaluation?.dimensions?.width || "",
    height: evaluation?.dimensions?.height || "",
    length: evaluation?.dimensions?.length || "",
  });


  //Open edit field when pencil icon is clicked
  const handleEditClick = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  // Save edited field and close edit field
  const handleSave = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <div>
      <div>
        {evaluation ? (
          <div>
            <>
              <div className="flex flex-row items-start m-6 mt-10">
                <div>
                  { image ? <img
                      src={import.meta.env.VITE_BACKEND_URL + `image/${evaluationData.imageId} `}
                      alt="Kalusteen kuva"
                      className="mr-5 max-w-40 rounded-lg"
                    /> : <img className="rounded-full max-w-25 aspect-square"
                    src='/assets/pnf.png'
                    alt="Tuotekuvaa ei löytynyt">
                      </img>}
                </div>
                <div>
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
                        {formData.width || evaluation.dimensions?.width} x
                        {formData.height || evaluation.dimensions?.height} x
                        {formData.length || evaluation.dimensions?.length} cm
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
                      <button
                        onClick={() => handleSave("info")}
                        className="bg-emerald-700 text-white p-1 rounded mt-2"
                      >
                        Tallenna
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-row ml-6">
                <div className="max-w-40">
                  <p>
                    <strong>Kunto: </strong>
                  </p>
                  <div>
                  {(() => {
                      const conditionMap: { [key: string]: { img: string; text: string } } = {
                        "Ei tiedossa": { img: "", text: "Ei tiedossa" },
                        Huono: { img: "/assets/cond_poor.png", text: "Huono" },
                        Hyvä: { img: "/assets/cond_good.png", text: "Hyvä" },
                        // Kohtalainen: { img: "/assets/cond_good.png", text: "Kohtalainen" },
                        Erinomainen: { img: "/assets/cond_excellent.png", text: "Erinomainen" },
                        Uusi: { img: "/assets/cond_excellent.png", text: "Uusi" },
                      };

                      const condition = evaluation.condition;
                      const conditionData = conditionMap[condition];

                      if (!conditionData) return <p>{condition || "Tuntematon kunto"}</p>;

                      return (
                         <div>
                          {conditionData.img && <img src={conditionData.img} alt={conditionData.text} />}
                          <p>{conditionData.text}</p>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <div className="flex flex-col ml-8">
                  <div className="flex items-center">
                    <p className="mr-2">
                      <strong>Hinta:</strong>
                    </p>
                    <Pencil
                      size={18}
                      className="text-gray-500 hover:text-gray-700 cursor-pointer"
                      onClick={() => handleEditClick("price")}
                    />
                  </div>
                  <div className="mt-1">
                    {!isEditing.price ? (
                      <p>{formData.price || "Ei tiedossa"}</p>
                    ) : (
                      <input
                        type="text"
                        className="border border-black p-1 rounded mt-1 w-24"
                        value={formData.price}
                        onChange={(e) => handleInputChange(e, "price")}
                        onBlur={() => handleSave("price")}
                        autoFocus
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="m-6 flex flex-col max-w-md">
                {" "}
                <div className="flex items-center">
                  <p className="mr-2">
                    <strong>Lisätiedot:</strong>
                  </p>
                  <Pencil
                    size={18}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={() => handleEditClick("notes")}
                  />
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
                      onBlur={() => handleSave("notes")}
                      autoFocus
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-center absolute m-5 inset-x-0 bottom-0 h-16">
                <button className="gap-2 mt-4 px-12 py-2 h-12 text-white bg-emerald-700 shadow-md hover:bg-emerald-600 transition rounded-sm">
                  Hyväksy tiedot
                </button>
              </div>
            </>
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
