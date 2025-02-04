import React, { useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import { useNavigate } from "react-router-dom";
import UploadButton from "./UploadImage";


const CameraApp: React.FC = () => {
    //const videoRef = useRef<HTMLVideoElement | null>(null);
    //const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const cameraRef = useRef<any>(null);
    const navigete = useNavigate();

    const capturePhoto = () => {
        if (cameraRef.current) {
            const imageDataUrl = cameraRef.current.takePhoto();
            setPhoto(imageDataUrl);
            console.log("Kuva otetty ja tallennettu")
        }
    };

    const handleNext = () => {
        if (photo) {
            navigete("/loading", {state: {photo}});
        }
    };

    /*
    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: "enviroment" } })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((err) => console.error("Kamera häiriö:", err));
    }, []); 

    const capturePhoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (canvas && video) {
            const context = canvas.getContext("2d");
            if (context) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const capturedPhoto = canvas.toDataURL("image/png");
                setPhoto(capturedPhoto);
                console.log("Kuva otettu ja tallennettu")
            }
        }
    };

    return (
        <div className="flex flex-col items-center p-5">
            {!photo ? (
                <>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-lg"
                        style={{
                            width: "361px",
                            height: "476px",
                            top: "152px",
                            left: "16px",
                            gap: "0px",
                        }}
                    />
                    <button
                        onClick={capturePhoto}
                        className="mt-4 px-6 py-2 text-lg bg-blue-500 text-black rounded-md cursor-pointer"
                    >
                        Capture Photo
                    </button>
                </>
            ) : (
                <>
                    <img
                        src={photo}
                        alt="Captured"
                        className="w-full rounded-lg mt-4"
                    />
                    <button
                        onClick={() => setPhoto(null)}
                        className="mt-4 px-6 py-2 text-lg bg-gray-500 text-black rounded-md cursor-pointer"
                    >
                        Retake
                    </button>
                </>
            )}
            <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
    );

    */

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
                className="mt-4 px-6 py-3 text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition"
            >
                Ota kuva
            </button>
            <UploadButton setPhoto={setPhoto} />
            {photo && (
                <button onClick={handleNext} className="mt-4 px-6 py-3 text-white bg-blue-600 rounded-lg"> Jatka</button>
            )}
        </div>
    );
};

export default CameraApp;