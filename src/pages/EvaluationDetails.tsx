import { useLocation } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { Pencil } from "lucide-react";

export default function EvalDetails() {
  const location = useLocation();
  const evaluationData = location.state?.evaluation || null;
  const evaluation = evaluationData.evaluation || null;
  const image = evaluationData.image || null;

  // Usestate for editing fields
  const [isEditing, setIsEditing] = useState({ price: false, notes: false });
  const [formData, setFormData] = useState({
    price: evaluation?.price || "",
    notes: evaluation?.notes || "",
  });

  //Open edit field when pencil icon is clicked
  const handleEditClick = (field: string) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  // Save edited field and close edit field
  const handleSave = (field: string) => {
    setIsEditing({ ...isEditing, [field]: false });
    console.log("Tallennettu:", formData);
  };

  return (
    <div>
      <div>
        {evaluation ? (
          <div>
            <div className="flex flex-row items-start m-6 mt-10">
              <div>
                {image && (
                  <img
                    src={image}
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

            <div className="flex items-start ml-6 gap-8">
              <div className="flex flex-col max-w-40">
                <p>
                  <strong>Kunto:</strong>
                </p>
                <div className="mt-1">
                  {evaluation.condition === "Ei tiedossa" && <p>Ei tiedossa</p>}
                  {evaluation.condition === "Huono" && (
                    <img
                      src="/src/assets/cond_poor.png"
                      className="max-h-8 mt-1"
                    />
                  )}
                  {evaluation.condition === "Hyvä" && (
                    <img
                      src="/src/assets/cond_good.png"
                      className="max-h-8 mt-1"
                    />
                  )}
                  {evaluation.condition === "Erinomainen" && (
                    <img
                      src="/src/assets/cond_excellent.png"
                      className="max-h-8 mt-1"
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-col">
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

            <div className="m-6">
              <button
                className="gap-2 mt-4 px-12 py-3 h-12 text-white bg-emerald-700 shadow-md hover:bg-emerald-600 transition rounded-sm"
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
