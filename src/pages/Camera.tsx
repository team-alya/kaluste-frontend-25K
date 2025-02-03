import { useEffect, useRef, useState } from "react"


const CameraApp: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);

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
                setPhoto(canvas.toDataURL("image/png"));
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

};

export default CameraApp;