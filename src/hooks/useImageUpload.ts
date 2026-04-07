import { useState } from "react";

export const useImageUpload = () => {
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files;
        
        if (files && files.length > 0) {
            const selectedFiles = Array.from(files);
            selectedFiles.forEach((f) => console.log(f.name));
            // Verification for size and file type
            const validFiles = selectedFiles.filter((file) => {
                if (!file.type.match("image.*")) {
                    alert("Por favor, selecciona un archivo de imagen válido");
                    return false;
                }
                if (file.size > 2 * 1024 * 1024) {
                    alert("La imagen " + file.name + " no debe superar los 2 MB");
                    return false;
                }
                return true;
            });

            if (validFiles.length === 0) return;

            const readers = validFiles.map((file) => {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onload = () => {
                        if (typeof reader.result === "string") {
                            resolve(reader.result);
                        }
                    };
                    reader.onerror = () => reject(reader.error);
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(readers).then((results) => {
 //               const previews:string[] = results;
                setImagePreview((prev) => [...prev, ...results]); // Ensure all previews are added
            });

            setUploadedFiles((prev) => [...prev, ...validFiles]); // Ensure all files are added
        }
    };

    const deleteImageUpload = (value: string | number) => {
        if (typeof value === "number") {
            setUploadedFiles((prev) => prev.filter((_, index) => index !== value));
            setImagePreview((prev) => prev.filter((_, index) => index !== value));
        }
    };

    return {
        handleImageUpload,
        deleteImageUpload,
        imagePreview,
        uploadedFiles,
        setImagePreview,
        setUploadedFiles,
    };
};
