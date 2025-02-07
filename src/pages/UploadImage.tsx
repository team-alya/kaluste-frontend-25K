import React, { useRef } from "react";
import { Upload } from "lucide-react";

interface UploadButtonProps {
    setPhoto: (image: string) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ setPhoto }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="mt-4">
            <button
                onClick={handleButtonClick}
                className="flex items-center justify-center gap-2 px-6 py-3 h-12 text-white bg-green-600 rounded-full shadow-lg shadow-green-600 hover:bg-green-700 transition"
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
