import React, { useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import { Focus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UploadButton from "./UploadImage";


const CameraApp: React.FC = () => {
    const [photo, setPhoto] = useState<string | null>(null);
    const cameraRef = useRef<any>(null);
    const navigate = useNavigate();

    const capturePhoto = () => {
        if (cameraRef.current) {
            const imageDataUrl = cameraRef.current.takePhoto();
            setPhoto(imageDataUrl);
            console.log("Kuva otetty ja tallennettu")
        }
    };

    const handleNext = () => {
        if (photo) {
            navigate("/loading", {state: {photo}});
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-5">
            <div style={{
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
            <button
                onClick={capturePhoto}
                className="mt-4 px-6 py-3 text-white bg-green-600 rounded-full shadow-md hover:bg-green-700 transition"
            >
                <Focus color="#ffffff" strokeWidth={2.5} />
            </button>
            <UploadButton setPhoto={setPhoto} />
            {photo && (
                <button onClick={handleNext} className="mt-4 px-6 py-3 text-white bg-blue-600 rounded-lg"> Jatka</button>
            )}
        </div>
    );
};

export default CameraApp;