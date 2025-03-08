import { Button, Group } from '@mantine/core';
import React, { useEffect, useRef, useState, FC } from 'react';
import { MdOutlineCloudUpload, MdDelete } from "react-icons/md";

interface UploadImageProps {
    activeUploadStep: number;
    prevStep: () => void;
    nextStep: () => void;
    details: {
        image?: string[];
    };
    setDetails: (details: any) => void;
}

const UploadImage: FC<UploadImageProps> = ({ activeUploadStep, prevStep, nextStep, details, setDetails }) => {
    const [imageURL, setImageURL] = useState<string | null>(null);
    const cloudinaryRef = useRef<any>(null);
    const widgetRef = useRef<any>(null);

    const handleNext = (): void => {
        setDetails((prev: any) => ({
            ...prev,
            image: [...(prev.image || []), imageURL],
        }));
        setImageURL(null);
        nextStep();
    };


    const handleDelete = (index: number): void => {
        setDetails((prev: any) => ({
            ...prev,
            image: prev.image.filter((_: unknown, i: number) => i !== index),
        }));
    };

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
                uploadPreset: import.meta.env.VITE_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
                maxFiles: 1,
            },
            (err: any, result: any) => {
                if (result.event === "success") {
                    setImageURL(result.info.secure_url);
                }
            }
        );
    }, []);




    return (
        <div className="mt-12 flexCenter flex-col">
            {!imageURL ? (
                <div
                    onClick={() => widgetRef.current?.open()}
                    className="flex flex-col justify-center items-center h-[21rem] border-dashed border-2 cursor-pointer"
                >
                    <MdOutlineCloudUpload size={44} color="grey" />
                    <span>Upload Image</span>
                </div>
            ) : (
                <div
                    onClick={() => widgetRef.current?.open()}
                    className="w-3/4 h-[22rem] rounded-xl overflow-hidden cursor-pointer"
                >
                    <img src={imageURL} alt="Uploaded" className="h-full w-full object-cover" />
                </div>
            )}

            {(details.image || []).length > 0 && (
                <div className="mt-4">
                    <h4>Uploaded Images:</h4>
                    <div className="grid grid-cols-3 gap-4">
                        {details.image?.map((url: string, index: number) => (
                            <div key={index} className="relative">
                                <img
                                    src={url}
                                    alt={`Uploaded ${index + 1}`}
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-700 transition"
                                ><MdDelete size={16} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Group justify="center" mt={"xl"}>
                <Button onClick={handleNext} disabled={!imageURL}>
                    Save / Next
                </Button>
            </Group>
        </div>
    );
};

export default UploadImage;
