import React, { useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import { Focus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import UploadButton from "./UploadImage";
import Loading from "./confirmation/Loading";


const CameraApp: React.FC = () => {

  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageFeedbackMsg, setImageFeedbackMsg] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cameraRef = useRef<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || null;
;

  // handles capturing the photo
  const capturePhoto = () => {
    if (cameraRef.current) {
      const imageDataUrl = cameraRef.current.takePhoto();
      setPhoto(imageDataUrl);
      console.log(imageDataUrl);
      console.log("Kuva otettu ja tallennettu");
    }
  };

  // sending the photo to the backend for feedback
  // returns a text-based feedback about the photo quality to the user after analysis
  const imageFeedback = async () => {
    // show loading component while fetching data
    setLoading(true);
    if (photo) {

      const response = await fetch(photo);
      const blob = await response.blob();
  
      // create a formData object and add the photo as a Blob
      const formData = new FormData();
      formData.append("image", blob, "photo.jpg");

      // send the photo to the backend
      fetch(import.meta.env.VITE_BACKEND_URL + "/api/photo", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
        },
        body: formData,
      })
      .then (response => {
        if (!response.ok) {

          setLoading(false);
          navigate("/error", { state: { username, from: location.pathname }});
          throw new Error ("Error fetching");
        }
         return response.json();
      })
      .then(data => {
          
        // exit loading component and show the analysis result to the user
        setLoading(false);
        setImageFeedbackMsg(data.message);
        toggleMessage();

      })
      .catch(error => console.error(error));
    }
    }
  


  // sends image to backend for evaluation and navigates to loading page
  const handleNext = async () => {
    setLoading(true);
    if (photo) {
        // Convert the data URL to a Blob
        const response = await fetch(photo);
        const blob = await response.blob();
  
        // Create form data and append the image Blob
        const formData = new FormData();
        formData.append("image", blob, "photo.jpg");
        
        // Send the POST request
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/image", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
          },
          body: formData,
        })
  
        .then (response => {
          if (!response.ok) {

            setLoading(false);
            navigate("/error", { state: { username, from: location.pathname }});
            throw new Error ("Error fetching");
          }
           return response.json();
        })
        .then(data => {
          // if evaluation ok, return from loading page and navigate to accepted page
          // also sends the evaluation data, username and endpoint info to the accepted page
          setLoading(false);
          navigate("/accepted", 
            { state: 
              { evaluation: data.evaluation, 
                username, 
                photo,
                from: location.pathname }});
        })
        .catch(error => console.error(error));
      }
    }

    const toggleMessage = () => {
      setShowMessage(!showMessage);
    };
  
  return (
    <div>
      {/* camera function styling */}
      {!loading ? (
        
       <div className="flex flex-col items-center justify-center min-h-screen p-5 mt-[-50px]">
          
          {/* show feedback message if available */}
          {showMessage && ( 
            <div className="mb-15 text-center">
            <p className="text-md font-semibold text-[#104930]">
              {imageFeedbackMsg}
            </p>
          </div>
          )}
          
         <div
        style={{
          width: "361px",
          height: "476px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
        className="relative mb-5"
      >
        {/* show photo if available */}
        {photo ? (
          <div className="flex flex-col items-center">
          
          <img
            src={photo}
            alt="Captured"
            className="w-full h-full object-cover"
          />
        </div>
        ) : (
          <div className="w-full h-full object-cover">
            {/* app opens back camera if available and if not shows error messages */}
            <Camera
              ref={cameraRef}
              facingMode="environment"
              errorMessages={{
                noCameraAccessible: "Kameraan ei saada yhteyttä",
                permissionDenied: "Kameran käyttöoikeus evätty",
                switchCamera: "Kameran vaihtaminen epäonnistui",
                canvas: "Canvas-elementtiä ei tueta",
              }}
            />
          </div>
        )}
      </div>
      <div className="flex flex-row gap-2 mt-4 items-center">
        {/* if no feedback message, show options to either take a photo or upload one */}
        {!showMessage && (
          <>
         <div className="flex flex-row gap-2">
             <button
              data-testid="capture-button"
              onClick={capturePhoto}
              className="flex items-center justify-center gap-2 mt-4 px-6 py-3 h-12 text-white bg-emerald-700 rounded-full shadow-lg shadow-emerald-700 hover:bg-emerald-600 transition"
            >
              {/* button that captures the picture */}
              <span className="inline-flex items-center gap-2">
                <Focus color="#ffffff" strokeWidth={2.5} className="w-5 h-5" /> Ota
                kuva
              </span>
            </button>
            {/* button that allows user to upload a picture */}
            <UploadButton setPhoto={setPhoto} />
         </div>
         {/* if photo is taken and available, show it to user */}
          {photo && (
            <button
              data-testid="check-image"
              onClick={imageFeedback}
              className="mt-4 px-6 py-3 text-sm text-white bg-emerald-600 shadow-lg shadow-emerald-600 hover:bg-emerald-500  rounded-full"
            >
              {/* button that submits the photo for the AI feedback analysis */}
              Tarkista kuva
            </button>
          )}
          </>
        )}
        
      </div>
      {/* if feedback message is shown, give the user the option to retake/reupload a photo or to send it to further evaluation*/}
        {showMessage && (
          <div className="flex flex-row gap-2">
            {/* button that allows the user to retake the photo */}
            <button
              className="mt-4 px-6 py-3 text-white bg-emerald-600 shadow-lg shadow-emerald-600 hover:bg-emerald-500  rounded-full"
              onClick={() => {
                setPhoto(null);
                setShowMessage(false);
                setImageFeedbackMsg("");
              }}
            >
              Ota uusi kuva
            </button>
            {/* button that allows the user to send the image to further evaluation */}
            <button
              data-testid="accept-image"
              className="mt-4 px-6 py-3 text-white bg-emerald-600 shadow-lg shadow-emerald-600 hover:bg-emerald-500  rounded-full"
              onClick={handleNext}
            >
              Hyväksy kuva
            </button>
          </div>
            )}
       </div>
      ) : (
        // if loading, show loading component
        <Loading />
      )}
    </div>
  );
};

export default CameraApp;