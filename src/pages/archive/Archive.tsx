import { useState, useEffect } from "react";
import LoadingProducts from "../../components/LoadingProductList";
import { Evaluation } from "../../types/evaluation";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Archive = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isFetched, setIsFetched] = useState<boolean>(false);
    const [evals, setEvals] = useState<Evaluation[]>([]);
    const [selectedEvals, setSelectedEvals] = useState<string[]>([]);
    const [showCheckboxes, setShowCheckboxes] = useState<boolean>(false);
    const [notification, setNotification] = useState<string | null>(null);
    const navigate = useNavigate();
    const role = window.localStorage.getItem("role");

    useEffect(() => {
        fetchEvals();
    }, []);

    const fetchEvals = async () => {
        setLoading(true);

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/evaluation/all", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch evaluations");
            }

            const data = await response.json();
            const archivedEvals = data.filter((e: Evaluation) => e.status === "archived");
            const sortedData = sortEvaluationsByDate(archivedEvals);
            setEvals(sortedData);
            setIsFetched(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


  // Function to sort evaluations by date (newest first)
  const sortEvaluationsByDate = (evaluations: Evaluation[]) => {
    return evaluations.sort((a, b) => {
      const dateA = new Date(a.timeStamp || 0).getTime();
      const dateB = new Date(b.timeStamp || 0).getTime();
      return dateB - dateA; // Sort descending
    });
  };

   const handleSelect = (id: string) => {
        setSelectedEvals((prev) =>
            prev.includes(id) ? prev.filter((evalId) => evalId !== id) : [...prev, id]
        );
    };

    const deleteSelectedEvals = async () => {
    if (selectedEvals.length === 0) {
      setNotification("Valitse vähintään yksi tuote poistettavaksi.");
      return;
    }

    try {
      for (const id of selectedEvals) {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/evaluation/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to delete evaluation with ID: ${id}`);
        }
      }

      setEvals((prev) => prev.filter((e) => !selectedEvals.includes(e.id)));
      setSelectedEvals([]);
      setShowCheckboxes(false);
      setNotification("Valitut tuotteet on poistettu onnistuneesti.");
    } catch (error) {
      console.error(error);
      setNotification("Poistossa tapahtui virhe.");
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div>
      {loading && <LoadingProducts />}

      {notification && (
        <div className="p-4 mb-4 text-white bg-green-600 rounded">
          {notification}
        </div>
      )}

      {isFetched && evals.length === 0 ? (
        <div className="flex flex-col items-center p-5 mt-15 text-center">
          <p>Tällä hetkellä arkistossa ei ole tuotteita</p>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-between mt-1">
              <h1 className="text-xl font-bold ml-5">Arkistoidut</h1>
              <button
                className={`m-5 p-2 flex items-center justify-center ${
                  showCheckboxes ? "" : "text-gray-500"
                }`}
                onClick={() => {
                  if (showCheckboxes && selectedEvals.length > 0) {
                    deleteSelectedEvals();
                  } else {
                    setShowCheckboxes(!showCheckboxes);
                  }
                }}
              >
                {showCheckboxes
                  ? ""
                  : role !== "user" && (
                      <span
                        className="bg-gray-300 text-black px-4 py-2 flex items-center cursor-pointer rounded-lg"
                        onClick={() => {
                          setShowCheckboxes(!showCheckboxes);
                        }}
                      >
                        Valitse
                        <Trash2 className="ml-2" />
                      </span>
                    )}
              </button>
            </div>

            {showCheckboxes && (
              <div className="flex justify-start ml-5 mt-4 mb-3">
                <button
                  className="bg-gray-300 text-black px-4 py-2 mr-2 rounded-lg"
                  onClick={() => {
                    setShowCheckboxes(false);
                    setSelectedEvals([]);
                  }}
                >
                  Peru poisto
                </button>
                <button
                  className="bg-red-600 text-white rounded-lg px-4 py-2"
                  onClick={() => {
                    if (selectedEvals.length > 0) {
                      deleteSelectedEvals();
                    }
                  }}
                >
                  Vahvista poisto
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 justify-start m-1">
              {evals.map((e: Evaluation) => {
                const evalDate = e.timeStamp
                  ? new Date(e.timeStamp).toLocaleDateString("fi-FI")
                  : "Päivämäärä puuttuu";
                return (
                  <div
                    key={e.id}
                    className="flex flex-col items-start border border-gray-300 rounded-sm pb-4"
                  >
                    {showCheckboxes && (
                      <input
                        type="checkbox"
                        className="mt-1 ml-1"
                        checked={selectedEvals.includes(e.id)}
                        onChange={() => handleSelect(e.id)}
                      />
                    )}
                    <button
                      className="m-5 flex flex-row w-full"
                      onClick={() => {
                        navigate(`/archive/${e.id}`, {
                          state: { evaluation: e, from: location.pathname },
                        });
                        sessionStorage.setItem(
                          "evalData",
                          JSON.stringify({ evaluation: e, imageId: e.imageId })
                        );
                      }}
                    >
                      <div>
                        {e.imageId ? (
                          <img
                            className="rounded-full max-w-15 aspect-square"
                            src={
                              import.meta.env.VITE_BACKEND_URL +
                              `/api/image/${e.imageId}`
                            }
                            alt="Tuotekuva"
                          />
                        ) : (
                          <img
                            className="rounded-full max-w-25 aspect-square"
                            src="/assets/pnf.png"
                            alt="Tuotekuvaa ei löytynyt"
                          />
                        )}
                      </div>
                      <div className="ml-4 min-w-1/2 flex flex-col justify-center">
                        <p className="m-2">{e.evaluation.brand}</p>
                        <p className="text-sm text-gray-500">{evalDate}</p>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Archive;
