
import React from 'react';

const PreviewProperty = ({ propertyDetails }) => {
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Preview Your Property Details</h2>

            {/* Property Overview */}
            <div className="space-y-6">
                {/* Property Title */}
                <div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Property Title</h3>
                    <p><strong className="font-semibold">Title:</strong> {propertyDetails.title || "N/A"}</p>
                </div>

                {/* Accommodation Details */}
                <div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Accommodation Details</h3>
                    <p><strong className="font-semibold">Property Type:</strong> {propertyDetails.accommodationType || "N/A"}</p>
                    <p><strong className="font-semibold">Type:</strong> {propertyDetails.type || "N/A"}</p>
                    <p><strong className="font-semibold">Address:</strong> {propertyDetails.address || "N/A"}</p>
                    <p><strong className="font-semibold">Room Count:</strong> {propertyDetails.room || "N/A"}</p>
                    <p><strong className="font-semibold">Bathroom Count:</strong> {propertyDetails.bathroom || "N/A"}</p>
                    <p><strong className="font-semibold">Tenant Count:</strong> {propertyDetails.tenants || "N/A"}</p>

                    <p><strong className="font-semibold">Rent:</strong> {propertyDetails.rent ? `${propertyDetails.rent} per month` : "N/A"}</p>
                    <p><strong className="font-semibold">Bond:</strong> {propertyDetails.bond || "N/A"}</p>
                    <p><strong className="font-semibold">Date Availability:</strong> {propertyDetails.dateAvailability.toString() || "N/A"}</p>
                </div>

                {/* Features Section */}
                <div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Features</h3>
                    <p><strong className="font-semibold">Parking:</strong> {propertyDetails.parking || "N/A"}</p>
                    <p><strong className="font-semibold">Internet:</strong> {propertyDetails.internet || "N/A"}</p>
                    <p><strong className="font-semibold">Furnishing:</strong> {propertyDetails.furnish || "N/A"}</p>
                    <p><strong className="font-semibold">Bills Included:</strong> {propertyDetails.billsIncluded ? "Yes" : "No"}</p>
                    <p><strong className="font-semibold">Description:</strong> {propertyDetails.description || "N/A"}</p>
                </div>

                {/* Stay Length Section */}
                <div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Length of Stay</h3>
                    <p><strong className="font-semibold">Minimum Stay:</strong> {propertyDetails.min || "N/A"}</p>
                    <p><strong className="font-semibold">Maximum Stay:</strong> {propertyDetails.max || "N/A"}</p>
                </div>

                {/* Additional Details */}
                <div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Additional Information</h3>
                    <p><strong className="font-semibold">Phone Number:</strong> {propertyDetails.phoneNumber || "N/A"}</p>
                </div>

                {/* Images Section */}
                <div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Uploaded Images</h3>
                    {propertyDetails.image?.length > 0 ? (
                        <div className="grid grid-cols-3 gap-4">
                            {propertyDetails.image.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Uploaded ${index + 1}`}
                                    className="w-32 h-32 object-cover rounded-md shadow-md"
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No images uploaded.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PreviewProperty;
