import React from 'react';

const PreviewProperty = ({ propertyDetails }) => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Preview Your Property Details</h2>
            <div className="space-y-4">
                {/* Accommodation Details */}
                <div>
                    <h3 className="text-lg font-medium">Accommodation Details</h3>
                    <p><strong>Type:</strong> {propertyDetails.accommodationType || "N/A"}</p>
                    <p><strong>Property Type:</strong> {propertyDetails.propertyType || "N/A"}</p>
                    <p><strong>Address:</strong> {propertyDetails.address || "N/A"}</p>
                    <p><strong>Rooms:</strong> {propertyDetails.rooms || "N/A"}</p>
                    <p><strong>Size:</strong> {propertyDetails.size || "N/A"} sqm</p>
                    <p><strong>Rent:</strong> {propertyDetails.rent || "N/A"} per month</p>
                    <p><strong>Bond:</strong> {propertyDetails.bond || "N/A"}</p>
                    <p><strong>Available From:</strong> {propertyDetails.dateAvailability.toString() || "N/A"}</p>
                </div>

                {/* Features */}
                <div>
                    <h3 className="text-lg font-medium">Features</h3>
                    <p><strong>Parking:</strong> {propertyDetails.parking || "N/A"}</p>
                    <p><strong>Internet:</strong> {propertyDetails.internet || "N/A"}</p>
                    <p><strong>Furnishing:</strong> {propertyDetails.furnish || "N/A"}</p>
                    <p><strong>Bills Included:</strong> {propertyDetails.billsIncluded || "N/A"}</p>
                    <p><strong>Description</strong> {propertyDetails.description || "N/A"}</p>

                </div>

                {/* Price Range */}
                <div>
                    <h3 className="text-lg font-medium">Price Range</h3>
                    <p><strong>Minimum:</strong> {propertyDetails.min || "N/A"}</p>
                    <p><strong>Maximum:</strong> {propertyDetails.max || "N/A"}</p>
                </div>

                {/* Uploaded Images */}
                <div>
                    <h3 className="text-lg font-medium">Uploaded Images</h3>
                    {propertyDetails.image?.length > 0 ? (
                        <div className="grid grid-cols-3 gap-4">
                            {propertyDetails.image.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Uploaded ${index + 1}`}
                                    className="w-32 h-32 object-cover rounded-md"
                                />
                            ))}
                        </div>
                    ) : (
                        <p>No images uploaded.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PreviewProperty;
