import React, { useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import { Focus, ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import UploadButton from "./UploadImage";
import Loading from "./confirmation/Loading";
import ErrorInfo from "./Error";

const CameraApp: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<string>("");
  const [showEvaluation, setShowEvaluation] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false); 

  const cameraRef = useRef<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || null;
  // const photo = location.state?.photo || null;

  // handles capturing the photo
  const capturePhoto = () => {
    if (cameraRef.current) {
      const imageDataUrl = cameraRef.current.takePhoto();
      setPhoto(imageDataUrl);
      console.log(imageDataUrl);
      console.log("Kuva otettu ja tallennettu");
    }
  };

  // sends image to backend and navigates to loading page
  const handleNext = async () => {
    setLoading(true);
    if (photo) {
        // Convert the data URL to a Blob
        const response = await fetch(photo);
        const blob = await response.blob();
  
        // Create form data
        const formData = new FormData();
        formData.append("image", blob, "photo.jpg");
        
        // Send the POST request
        fetch("https://kalustearvio-25k-backend-kalustearvio-25k.2.rahtiapp.fi/api/image", {
          method: "POST",
          body: formData,
        })
  
        .then (response => {
          if (!response.ok) {

            setLoading(false);
            navigate("/error", { state: { username }});
            throw new Error ("Error fetching");
          }
           return response.json();
        })
        .then(data => {
          
          setEvaluation(data.evaluation);
          setLoading(false);
          navigate("/accepted", 
            { state: 
              { evaluation: 
                data.evaluation, 
                username, 
                photo }});

         

        })
        .catch(error => console.error(error));
      }
    }
  
    
          // fetch imagetest
          // näytä tiedot käyttäjälle
          // "ok" -> tallenna evaluaatio
          
    



  return (
    <div>
      {/* camera function styling */}
      {!loading ? (
       <div className="flex flex-col items-center justify-center min-h-screen p-5 mt-[-50px]">
         <div
        style={{
          width: "361px",
          height: "476px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
        className="relative mb-5"
      >
        {photo ? (
          <img
            src={photo}
            alt="Captured"
            className="w-full h-full object-cover"
          />
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
        <button
          onClick={capturePhoto}
          className="flex items-center justify-center gap-2 mt-4 px-6 py-3 h-12 text-white bg-emerald-700 rounded-full shadow-lg shadow-emerald-700 hover:bg-emerald-600 transition"
        >
          {/* button that captures the picture */}
          <span className="inline-flex items-center gap-2">
            <Focus color="#ffffff" strokeWidth={2.5} className="w-5 h-5" /> Ota
            kuva
          </span>
        </button>
        {/* refrences button that allows user to upload a picture */}
        <UploadButton setPhoto={setPhoto} />
        {photo && (
          <button
            onClick={handleNext}
            className="mt-4 px-6 py-3 text-white bg-emerald-600 shadow-lg shadow-emerald-600 hover:bg-emerald-500  rounded-full"
          >
            {/* button that submits the photo for the AI analysis */}
            <ArrowRight color="#0c6a17" strokeWidth={2.5} />
          </button>
        )}
      </div>
       </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default CameraApp;
