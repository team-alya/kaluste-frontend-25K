import React, {useState, useRef} from "react";

const UploadButton: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click(); 
    };
    
   

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result as string); 
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="mt-4">
            <button onClick={handleButtonClick} className="mt-4 px-6 py-2 text-lg bg-blue-500 text-black rounded-md cursor-pointer">
                Upload Photo
            </button>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }} 
            />
            {imageSrc && (
                <img src={imageSrc} alt="Captured" className="max-w-[400px] max-h-[300px] rounded-lg mt-4" />

            )}
        </div>
    );
};
 export default UploadButton;