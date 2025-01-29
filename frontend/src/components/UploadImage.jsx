import { Button, Group } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineCloudUpload } from "react-icons/md";

const UploadImage = ({ activeUploadStep, prevStep, nextStep, details, setDetails }) => {
    const [imageURL, setImageURL] = useState(null);
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    const handleNext = () => {
        // Append the uploaded image to the existing image array in propertyDetails
        setDetails((prev) => ({
            ...prev,
            image: [...(prev.image || []), imageURL],
        }));
        setImageURL(null); // Reset for the next image upload
        nextStep();
    };

    // Initialize Cloudinary upload widget
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: "dicrfog1h", // Your cloud name
                uploadPreset: "RealEstate2025", // Your upload preset
                maxFiles: 1,
            },
            (err, result) => {
                if (result.event === "success") {
                    setImageURL(result.info.secure_url); // Set the uploaded image URL
                }
            }
        );
    }, []);

    return (
        <div className="mt-12 flexCenter flex-col">
            {/* If no image is uploaded */}
            {!imageURL ? (
                <div
                    onClick={() => widgetRef.current?.open()}
                    className="flex flex-col justify-center items-center h-[21rem] border-dashed border-2 cursor-pointer"
                >
                    <MdOutlineCloudUpload size={44} color="grey" />
                    <span>Upload Image</span>
                </div>
            ) : (
                // If an image is uploaded, show the preview
                <div
                    onClick={() => widgetRef.current?.open()}
                    className="w-3/4 h-[22rem] rounded-xl overflow-hidden cursor-pointer"
                >
                    <img src={imageURL} alt="Uploaded" className="h-full w-full object-cover" />
                </div>
            )}

            {/* Show uploaded images */}
            {details.image?.length > 0 && (
                <div className="mt-4">
                    <h4>Uploaded Images:</h4>
                    <div className="grid grid-cols-3 gap-4">
                        {details.image.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`Uploaded ${index + 1}`}
                                className="w-24 h-24 object-cover rounded-md"
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Navigation buttons */}
            <Group justify="center" mt={"xl"}>
                <Button onClick={prevStep}>Go Back</Button>
                <Button onClick={handleNext} disabled={!imageURL}>
                    {activeUploadStep < 2 ? "Next Image" : "Finish"}
                </Button>
            </Group>
        </div>
    );
};

export default UploadImage;
