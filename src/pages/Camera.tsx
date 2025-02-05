import { useRef, useState } from "react"
import { Camera } from "react-camera-pro";
import { Focus } from "lucide-react";


const CameraApp: React.FC = () => {
    const [photo, setPhoto] = useState<string | null>(null);
    const cameraRef = useRef<any>(null);

    const capturePhoto = () => {
        if (cameraRef.current) {
            const imageDataUrl = cameraRef.current.takePhoto();
            setPhoto(imageDataUrl);
            console.log("Kuva otettu ja tallennettu")
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
                <Camera
                    ref={cameraRef}
                    facingMode="environment"
                    errorMessages={{
                        noCameraAccessible:
                            "Kameraan ei saada yhteyttä",
                        permissionDenied:
                            "Kameran käyttöoikeus evätty",
                        switchCamera:
                            "Kameran vaihtaminen epäonnistui",
                        canvas: "Canvas-elementtiä ei tueta",
                    }}
                />
            </div>
            <button
                onClick={capturePhoto}
                className="mt-4 px-6 py-3 text-white bg-green-600 rounded-full shadow-md hover:bg-green-700 transition"
            >
                <Focus color="#ffffff" strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default CameraApp;