import React, { useRef } from "react";

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
                className="mt-4 px-6 py-3 text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition"
            >
                Tuo galleriasta
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
