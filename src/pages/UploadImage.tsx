import React, { useRef } from "react";
import { Upload } from "lucide-react";

interface UploadButtonProps {
    setPhoto: (image: string) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ setPhoto }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        // Open file dialog when the button is clicked
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // read the file and set it as the photo
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            // when the file is read, set it as the photo
            reader.onload = () => {
                //convert the image to data url and store it in the state
                setPhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="mt-4">
            {/* open the file selection dialog */}
            <button
                onClick={handleButtonClick}
                className="flex items-center justify-center gap-2 px-6 py-3 h-12 text-white bg-emerald-700 rounded-full shadow-lg shadow-emerald-700 hover:bg-emerald-600 transition"
            >
                <span className="inline-flex items-center gap-2">
                <Upload color="#ffffff" strokeWidth={2.5} className="w-5 h-5"/> Galleria
                </span>
            </button>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
        </div>
    );
};

export default UploadButton;
